# Shri Durga Mandir Sabha (Regd.) — Website

A responsive, six-page temple website using **plain HTML, CSS and JavaScript**. No build tools, package managers, frameworks or backend required.

## Pages and URLs

| Navigation menu | Local URL |
| --- | --- |
| Home | `index.html` |
| Location | `location.html` |
| Contact Us | `contact-us.html` |
| About Us | `about-us.html` |
| Donations | `donations.html` |
| Matrimonial | `matrimonial.html` |

Each is a separate HTML document with the same navigation, responsive header and footer. On a domain, `index.html` generally serves as `/`.

## Open locally

**Quick preview:** Open `index.html` in a browser. Links between pages work without a server.

**Recommended:** From this folder, run one of these:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000/`. Stop the server with `Ctrl+C`.

All key website illustrations are bundled locally. Google Fonts, sample contact photos and embedded Google Maps require an internet connection. Contact photo fallbacks are local.

## Where to edit the content

- `assets/js/site-data.js`: replace all sample **contact names, roles, photos and phone numbers**; replace sample bank details. There are separate `contactPeople` (6 items) and `matrimonialPeople` (3 items) arrays.
- `about-us.html`: replace the introductory placeholder paragraphs with verified information.
- `matrimonial.html`: edit service description or success message when needed. Currently states services resumed on **15 August 2026** and that many couples have been matched.
- `donations.html`: place an approved QR-code image where the `qr-placeholder` block currently appears. For example:

```html
<img src="assets/images/official-donation-qr.png" alt="Official temple donation QR code">
```

- `location.html`: the map is embedded there; clicking it opens directions. The exact supplied Google Maps listing link is also provided.
- `index.html`: edit the home carousel headlines, slides, homepage cards, and community introduction.
- `assets/css/styles.css`: colors, spacing, type, cards, mobile breakpoints and animations.
- `assets/js/app.js`: accessible carousel, mobile menu, smooth return-to-top and rendering of centralised contacts/payment details.
- `assets/images/`: replace devotional artwork with approved high-resolution photos of the temple, keeping the same filenames or updating references.

## Important before publishing

1. Replace **all demo contact photographs, names and phone numbers** (the example numbers deliberately use `00000` prefixes).
2. Replace the **fictional bank details** and add the official verified QR image. Do **not** invite actual bank transfers while sample details are present.
3. Obtain approval for the About Us copy, temple branding, and pictures. The devotional images currently are decorative artwork, **not authenticated photos of this temple**.
4. Verify the map pin/directions and test it on mobile.
5. Optionally configure a custom domain, analytics, official events, language selection, and accessibility review after launch.

## Deploy

Upload the folder contents to GitHub Pages, Netlify, Vercel (static mode), or any traditional web host. Set the publish directory to the folder containing `index.html`. There is no build step.

## Notes

- The `assets/images/maa-durga.jpg` devotional image was generated for this design. Its image is representational, not an actual photograph of the listed temple.
- `assets/images/temple-architecture.svg`, `diya-lights.svg`, and `matrimonial-art.svg` are decorative SVG illustrations.
- Profile photos are third-party placeholder images (`i.pravatar.cc`) with a built-in local placeholder if unavailable. Replace them with approved photos before deployment.
- No payment integration, backend contact directory or matchmaking registration backend has been configured, because real details and integrations were not provided.
