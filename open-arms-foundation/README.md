# Open Arms Foundation website (rebuild)

Plain static site: 9 HTML pages plus `assets/site.css` and `assets/site.js`. No build step.
Open `index.html` in a browser, or upload the whole folder to any static host
(GitHub Pages, Netlify, Cloudflare Pages).

## Before going live
- **Photos** live in `assets/images/`. The GitHub Actions workflow downloads them from the old SnapPages site (`scripts/fetch-images.sh`).
- **Give online** button points to the existing SnapPages giving page (`/give`). Replace it with the
  foundation's real giving link (Stripe, PayPal, Givebutter, etc.). Search for `TODO` in `give.html`.
- **Contact form** opens the visitor's email app addressed to Foundationopenarms@gmail.com.
  For a real inbox form, connect a form service such as Formspree or Netlify Forms.
- **Amazon charity list** link came from the old AmazonSmile program, which Amazon ended in 2023. Check it still works.
- **Media** buttons link to the Gallery / Current Projects / Updates series on the old site.
- The old **About** and **Connect** pages could not be retrieved; their content is folded into Our Story,
  Leadership, Mission Trips and Contact.
