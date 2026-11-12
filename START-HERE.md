# V5: Direct project photo links

Each of the first three project photos and its label is a standard HTML link to the supplied destination, opening in a new tab. JavaScript is not required. Jazz Trio/Quartet remains unlinked. Upload the files inside this ZIP into the existing repository root, then commit changes.

# November 12 update — V4

Upload the contents of this ZIP into the root of the existing GitHub repository. Include the assets folder: it contains two new higher-resolution photos. This package includes the existing jjstanbury.com CNAME and Formspree endpoint.

Completed: aligned equal service-photo rows; Other copy fits; Send message button; full contact divider with group photo touching below; footer alignment; larger About photo; higher-resolution top and About photos.

Clear Fields, Detroit Soul Revue, and Coconut Superfreak now open the supplied external pages in a new tab when their cards are clicked. Jazz Trio/Quartet is intentionally unlinked. These destinations are stored in config.js under window.PROJECT_LINKS.

# James Stanbury Music — desktop website

This is a buildless static website. Upload these files to GitHub Pages; no Wix subscription, Node installation, or build command is needed.

## What is included

- Desktop reference layout, original text, eleven original photos, locally served Syne and Madefor Text fonts, original colors, image crops, borders, project cards, and form styling.
- Wix promotion banner removed. Top photo/title and Projects centered; all four service photos use equal, proportionally cropped frames without the old background boxes.
- Independent scroll entrance effects. They recreate the observed reveals, but their timing/easing is approximate rather than a copy of Wix's animation engine.
- Functional form integration for Formspree, with validation, pending/success/error states and a searchable country code selector.
- All site images/fonts are local. Only submitting the contact form requires the external Formspree service. Email links open the visitor's mail application.
- Desktop only. No mobile redesign has been applied.

## Contact form configured

Your supplied Formspree endpoint (`https://formspree.io/f/moedqlnn`) is already saved in `config.js`. No code editing is needed before uploading the website.

Confirm that your receiving email is verified in Formspree, then follow the published-site test in section 3 below. Real inbox delivery has not yet been verified.

The endpoint is intended to be public. Do not paste your password, API token, or receiving email into this setting. Formspree stores the notification recipient privately. Its free plan currently allows 50 submissions per month; check your account's current limits.

Your email remains visibly displayed in three places because it is part of the Wix reference. The form itself does not disclose its receiving address. The Wix footer's incorrect `mailto:info@mysite.com` target has been corrected to the displayed address.

## 1. Create the GitHub repository

1. Sign in to https://github.com/ (create a free account if needed).
2. Choose **+ → New repository**.
3. Name it `YOURUSERNAME.github.io`, replacing YOURUSERNAME with your actual lowercase GitHub username. For example, a username of `jamesmusic` gives `jamesmusic.github.io`.
4. Choose **Public** for free GitHub Pages hosting.
5. Check **Add a README file**, then click **Create repository**.

If that repository already hosts another site, use a new repository named `music-website` instead. Its initial Pages URL will include `/music-website/`. This package uses relative paths and supports either option.

## 2. Upload and publish

1. Unzip the download on your computer.
2. Open the repository on GitHub. Choose **Add file → Upload files**.
3. Drag the extracted website files and folders into the upload area. Upload the contents, not the ZIP and not a containing parent folder.
4. Confirm `index.html`, `styles.css`, `site.js`, `config.js`, `countries.json`, and the `assets` folder are directly in the repository root. Include the `licenses` folder too. Documentation files may be uploaded as well.
5. Click **Commit changes**.
6. Open **Settings → Pages**.
7. Under **Build and deployment**, select **Deploy from a branch**.
8. Select branch **main**, folder **/(root)**, then **Save**.
9. Wait for GitHub to finish deployment, then use **Visit site** on that same screen. Publication can take several minutes.

The included `.nojekyll` file disables Jekyll processing. If your computer hides it and the browser upload omits it, create it directly with **Add file → Create new file**, name it `.nojekyll`, leave it empty, and commit. The other files do not require Jekyll either.

No GitHub Actions workflow is required. Do not upload `.openai`, preview-server settings, or any credentials; those are not part of the deliverable.

## 3. Test the contact form

1. Open the published HTTPS site in a new browser tab. Scroll to Contact Me.
2. Click **Subscriptions** with required fields empty; your browser should require first name, last name, and email.
3. Enter your name, an email you can check, an optional phone number, and a unique message such as “Website test November 11”. Submit once.
4. Confirm the page shows **Thank you! Your message has been sent.**
5. Check your receiving inbox and spam folder. Also verify the submission appears in your Formspree dashboard. A success message confirms service acceptance; checking the actual inbox confirms email delivery.
6. Reply to the test email and verify the reply goes to the visitor email you entered.
7. If you see **awaiting activation**, confirm that the uploaded `config.js` is the updated version containing your endpoint. If you see **could not be sent**, inspect your Formspree endpoint, verified recipient, submission allowance, and any domain restrictions.
8. Repeat once after connecting your custom domain. If you enabled domain restrictions in Formspree, allow both your GitHub Pages domain and your final custom domain as appropriate.

Never regard a local preview or a simulated test as proof that email was delivered.

## 4. Connect your Porkbun domain

Do this after the GitHub URL and form work. Replace `YOURDOMAIN.com` and `YOURUSERNAME` below with your real values.

1. In GitHub, open the website repository → **Settings → Pages**.
2. Under **Custom domain**, enter your domain without a protocol or slash, for example `YOURDOMAIN.com`, and click **Save**. GitHub creates a `CNAME` file in the repository for branch publishing. Keep that file in future uploads.
3. In Porkbun, open **Account → Domain Management**, find your domain, and open its **DNS** records.
4. Remove or replace only existing website-routing records that conflict at the root (`@`/blank Host) or `www`, such as old Wix A/AAAA/CNAME/ALIAS records. Preserve MX, email-related TXT, DKIM, SPF, and other unrelated records so your email keeps working.
5. Add the following records. Porkbun usually represents the root using a blank Host field, rather than typing `@`:

   | Type | Host | Answer |
   |---|---|---|
   | A | blank/root | 185.199.108.153 |
   | A | blank/root | 185.199.109.153 |
   | A | blank/root | 185.199.110.153 |
   | A | blank/root | 185.199.111.153 |
   | CNAME | www | YOURUSERNAME.github.io |

   Use the GitHub hostname only for the CNAME answer: no `https://`, repository path, or trailing slash. Leave TTL at Porkbun's default.

6. Return to GitHub **Settings → Pages** and wait for its DNS check to pass. Propagation may take up to 24–48 hours.
7. Open both your root domain and `www` domain. GitHub should redirect the secondary address to your selected custom domain.

Porkbun also offers **Quick DNS Config → GitHub**. Manual records above let you preserve unrelated email records more carefully. Before changing nameservers, check whether Porkbun is actually your authoritative DNS host; if it is not, edit the DNS records at the current DNS provider instead.

## 5. Enable HTTPS

1. Once GitHub's DNS check succeeds, stay in **Settings → Pages**.
2. Wait for GitHub to issue the domain certificate. The **Enforce HTTPS** checkbox may initially be unavailable.
3. Check **Enforce HTTPS** when available.
4. Test `https://YOURDOMAIN.com`, confirm no certificate warning, and submit one final contact-form test.
5. If HTTPS stays unavailable, check for leftover conflicting root/`www` A, AAAA, ALIAS, or CNAME records. Do not change email MX/TXT records to solve a website certificate issue.

## Editing later

Edit `index.html` for wording, `styles.css` for appearance, and `config.js` for the Formspree endpoint. Commit changed files to the publishing branch. Preserve `CNAME` once GitHub creates it. Photos are under `assets/`.

The HTML and CSS retain the reference's component identifiers to preserve its precise desktop geometry. The page runs without Wix JavaScript, Wix APIs, analytics, or a Wix account.

## Verification and limits

Inspected the live Wix desktop homepage from top to bottom in the Cloud Browser, including the four project cards, contact form, country selector, and footer. The page exposes no separate page navigation and no YouTube/video, Spotify, or Apple Music embeds or links. None were invented.

Visually compared the standalone page against the reference at the same desktop browser size, including hero, About, Services, Projects, Contact, and footer. This is a close desktop recreation, not a claim of pixel identity at every screen width. Scroll-reveal timing and country-selector implementation differ from Wix's runtime. Mobile work is deferred.

Browser-tested form fields, activation guard, and validation. Real Formspree submission, inbox delivery, GitHub publication, DNS, and HTTPS require your account/domain setup and remain unverified until completed above.

Photos were retrieved from the user-supplied reference website for this recreation; their existing ownership and permissions remain applicable. Font license notices are included in `licenses/`. The photos are not licensed for unrelated redistribution.

## Official references

- GitHub publishing source: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- GitHub custom domains: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
- GitHub HTTPS: https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https
- Porkbun GitHub Pages: https://kb.porkbun.com/article/64-how-to-connect-your-domain-to-github-pages
- Formspree plans: https://formspree.io/plans
- Formspree AJAX: https://help.formspree.io/articles/building-your-form/submit-forms-with-javascript-ajax/
