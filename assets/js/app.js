(() => {
  'use strict';
  const data = window.TEMPLE_DATA || {};
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;
  const header = document.querySelector('.site-header');
  const nav = document.getElementById('primary-nav');
  const menuBtn = document.getElementById('menu-toggle');
  const overlay = document.getElementById('mobile-overlay');
  const backTop = document.getElementById('back-top');

  function closeMenu() {
    if (!nav || !menuBtn) return;
    nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Open menu');
    overlay?.classList.remove('show');
    document.body.classList.remove('menu-open');
  }
  function toggleMenu() {
    if (header) document.documentElement.style.setProperty('--mobile-overlay-top', `${header.getBoundingClientRect().bottom}px`);
    const open = !nav.classList.contains('open');
    nav.classList.toggle('open', open);
    overlay?.classList.toggle('show', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('menu-open', open);
  }
  menuBtn?.addEventListener('click', toggleMenu);
  overlay?.addEventListener('click', closeMenu);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  document.querySelectorAll('.nav-link').forEach(a => a.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => { if (window.innerWidth > 900) closeMenu(); });

  function onScroll() {
    header?.classList.toggle('scrolled', window.scrollY > 15);
    if (header) document.documentElement.style.setProperty('--mobile-overlay-top', `${header.getBoundingClientRect().bottom}px`);
    backTop?.classList.toggle('visible', window.scrollY > 360);
  }
  window.addEventListener('scroll', onScroll, {passive: true});
  onScroll();
  backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reducedMotion ? 'instant' : 'smooth' }));

  // A keyboard-accessible carousel: timed slides, arrows, dots and pause-on-focus.
  const hero = document.querySelector('[data-carousel]');
  if (hero) {
    const slides = [...hero.querySelectorAll('.hero-slide')];
    const dots = [...hero.querySelectorAll('.carousel-dot')];
    let current = 0, interval = null, paused = false;
    const setSlide = (index) => {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        const active = i === current;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', String(!active));
        slide.querySelectorAll('a').forEach(link => { link.tabIndex = active ? 0 : -1; });
      });
      dots.forEach((dot,i) => {
        dot.setAttribute('aria-current', i === current ? 'true' : 'false');
        dot.setAttribute('aria-label', `Show slide ${i+1} of ${slides.length}`);
      });
    };
    const stop = () => { if (interval) clearInterval(interval); interval = null; };
    const start = () => { stop(); if (!paused && !reducedMotion) interval = setInterval(() => setSlide(current + 1), 6600); };
    setSlide(0);
    hero.querySelector('[data-prev]')?.addEventListener('click', () => { setSlide(current-1); start(); });
    hero.querySelector('[data-next]')?.addEventListener('click', () => { setSlide(current+1); start(); });
    dots.forEach((dot,i) => dot.addEventListener('click', () => { setSlide(i); start(); }));
    hero.addEventListener('mouseenter', () => { paused = true; stop(); });
    hero.addEventListener('mouseleave', () => { paused = false; start(); });
    hero.addEventListener('focusin', () => { paused = true; stop(); });
    hero.addEventListener('focusout', e => { if (!hero.contains(e.relatedTarget)) { paused = false; start(); } });
    hero.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); setSlide(current + (e.key === 'ArrowRight' ? 1 : -1)); }
    });
    document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); else start(); });
    start();
  }

  // Sample details live in site-data.js so they can be replaced in one place.
  const person = (item) => {
    const card = document.createElement('article'); card.className = 'person-card'; card.setAttribute('data-reveal','');
    const img = document.createElement('img'); img.className = 'person-avatar'; img.alt = `Sample portrait for ${item.name}`;
    img.loading = 'lazy'; img.decoding = 'async'; img.src = item.photo || 'assets/images/avatar-placeholder.svg';
    img.onerror = () => { img.onerror = null; img.src = 'assets/images/avatar-placeholder.svg'; };
    const details = document.createElement('div');
    const role = document.createElement('p'); role.className = 'person-role'; role.textContent = item.role;
    const name = document.createElement('h3'); name.textContent = item.name;
    const phone = document.createElement('p'); phone.className = 'person-phone'; phone.textContent = item.phone;
    details.append(role,name,phone); card.append(img,details); return card;
  };
  [{id:'contact-list',items:data.contactPeople},{id:'matrimonial-contact-list',items:data.matrimonialPeople}].forEach(({id,items}) => {
    const target = document.getElementById(id);
    if (!target || !Array.isArray(items)) return;
    items.forEach(item => target.appendChild(person(item)));
  });
  const bank = document.getElementById('bank-details');
  if (bank && data.donation) {
    const fields = [ ['Account holder',data.donation.beneficiary], ['Bank',data.donation.bank], ['Account number',data.donation.account], ['IFSC',data.donation.ifsc], ['Branch',data.donation.branch], ['UPI',data.donation.upi] ];
    fields.forEach(([label,value]) => {
      const row = document.createElement('div'); row.className = 'bank-line';
      const dt = document.createElement('dt'); dt.textContent = label;
      const dd = document.createElement('dd'); dd.textContent = value;
      row.append(dt,dd); bank.append(row);
    });
  }
  // Progressive enhancement: cards remain visible when intersection API isn't supported.
  const revealables = document.querySelectorAll('[data-reveal]');
  if (reducedMotion || !('IntersectionObserver' in window)) revealables.forEach(el=>el.classList.add('revealed'));
  else {
    const revealObserver = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add('revealed'); revealObserver.unobserve(entry.target); }
    }, {threshold: 0.04, rootMargin:'0px 0px 45px 0px'});
    revealables.forEach(el => revealObserver.observe(el));
  }
  document.querySelectorAll('[data-current-year]').forEach(el => el.textContent = String(new Date().getFullYear()));
})();
