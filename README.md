# Website Hosting:

Site is hosted at:
https://lstefurak.github.io/tap-into-joy/

# Sue's notes
we use the pencil icon t update the read me
we use the commit button to save the changes

# How to Edit the Website's Text and Info

Almost everything you'd want to change — headings, descriptions, prices, your bio, testimonials, your email — lives in **one file**: `src/content.js`. You don't need to touch any other file to update text.

## Editing text (same way you edit this README)

1. On GitHub, open the file `src/content.js` (in the `src` folder).
2. Click the **pencil icon** to edit it, same as you do for this README.
3. Find the line with the text you want to change. For example, to change a service price you'd find:
   ```
   price: "$75"
   ```
   and change `$75` to whatever the new price is — just keep the quote marks `"..."` around it.
4. Only change the text **between the quote marks**. Don't delete commas, colons, or curly braces `{ }` — those are what keep the file working. If you're not sure whether something is safe to edit, leave it as-is and ask for help.
5. Click the **Commit** button to save, same as you do for the README.
6. The live site updates automatically within a few minutes — no extra steps needed.

## What's in `content.js`

- `about` — your bio heading and paragraphs
- `hero` — the big title/tagline at the top of the site, and the two button labels
- `services` — the three session cards: title, description, and price for each
- `booking` — the heading/description above the Calendly scheduler, and the Calendly link
- `testimonials` — client reviews (text + author)
- `contact` — your contact email
- `footer` — the copyright line at the bottom
- `nav` — the menu links at the top of the site

## Changing photos

Photo filenames are listed at the very top of `content.js`, in the `photos` section (e.g. `about: "sue-doherty.jpg"`). The actual image files live in the `public` folder.

To swap a photo:
1. Go to the `public` folder on GitHub.
2. Click **Add file → Upload files**, and upload your new photo.
3. In `content.js`, update the filename next to the matching entry in `photos` to match what you just uploaded (filenames are case-sensitive, so `Photo.jpg` and `photo.jpg` are different).
4. Commit your changes — the site rebuilds automatically.

If you're just replacing a photo with a new one of the *same name* (e.g. uploading a new `sue-doherty.jpg`), you can skip step 3 entirely — just re-upload the file and GitHub will ask if you want to overwrite it.

## If you make a mistake

There's a safety net, and it works in two stages.

**Before anything is published**, your change is checked three ways: the code is
read for obvious mistakes, the site is rebuilt, and then the rebuilt site is
opened in a real browser to confirm the page actually appears. If any of that
fails, **the change is simply not published** — the live site carries on showing
the last version that worked, and visitors never see anything wrong.

If the problem is punctuation — a missing quote mark, a missing comma, the curly
“smart quotes” you get from pasting out of Word or email, or a common
misspelling — a repair is attempted automatically. If the repair works and the
site passes all its checks again, the fix is committed for you and the site
redeploys. You don't have to do anything.

If it *can't* work out the fix, you'll get an **email** and an **Issue** on this
repository explaining what's wrong in plain English, rather than it guessing at
your words. You can find issues under the **Issues** tab.

**After publishing**, the real public website is opened and checked one more
time. If it isn't working, the change is undone automatically and the site is
put back to the version that worked — usually within a minute or two — and you
get told what happened.

The short version: you cannot take the site down by mistyping the text. The
worst that happens is your change doesn't go live and you get told why.

### For maintainers

**The gates.** `.github/workflows/deploy.yml` runs four jobs in order:

| Job | What it does | If it fails |
| --- | --- | --- |
| `verify` | `npm run lint`, `npm run build`, then `npm run smoke` | Nothing is published; the live site is untouched |
| `deploy` | Publishes `dist` to the `gh-pages` branch | Nothing reached visitors; re-run the job |
| `live-check` | Opens the real public URL and checks it | The commit is reverted automatically and redeployed |
| `recover` | Runs only on failure: reverts if needed, then alerts | — |

Run the whole pre-deploy chain locally with **`npm run verify`**.

**Why lint is in there.** `vite build` only proves the code *bundles*. A stray
word left in `content.js` (`uroplastic// Website Content...`) is valid
JavaScript — a bare identifier — so it builds and deploys perfectly, then throws
`ReferenceError` in the browser and leaves a blank page. ESLint's `no-undef`
catches that class in seconds. This is not hypothetical; it took the site down
on 2026-08-21.

**The website check**: `scripts/smoke-test.mjs` (run with `npm run smoke`, or
`npm run smoke:live` against production). It serves the built files, opens them
in headless Chromium, and fails if the page throws, comes out blank, has almost
no text, or if part of the site itself 404s. Errors from *outside* services —
the Calendly iframe, Google Fonts — are deliberately ignored so someone else's
outage can't block your deploy. Against a live URL it takes `--expect-asset` and
waits for that bundle to actually appear, cache-busting each poll, because Pages
serves HTML with `max-age=600` and will otherwise hand back a stale page.

**Alerts** go to a single issue titled *"The website needs attention"* (new
failures are added as comments) plus an email. **Email needs three repository
secrets before it will send anything** — until they exist the email step skips
quietly and only the issue is raised:

| Secret | Value |
| --- | --- |
| `MAIL_USERNAME` | The Gmail address sending the alert |
| `MAIL_PASSWORD` | A Google [App Password](https://myaccount.google.com/apppasswords) — *not* the account password |
| `ALERT_EMAIL` | Optional. Where alerts go; defaults to `tappingintojoy@gmail.com` |

Add them under **Settings → Secrets and variables → Actions**.

**Loop guards.** The auto-revert skips any commit already marked
`[auto-revert]`, and the repair workflow skips any commit already marked
`[auto-fix]`, so a bad fix can't push in circles. Because a push made by Actions
doesn't start another workflow, both paths dispatch the deploy explicitly by
name afterwards.

**Repair (punctuation only).** `.github/workflows/fix-content.yml`, triggered by
a failed run of the deploy workflow on `main`.

- Punctuation repair: `scripts/fix-content.mjs` (run locally with `npm run fix:content`).
  It parses the file with `acorn`, and keeps a candidate fix only if it moves the
  parser further into the file — so it can't quietly mangle text. If it can't
  fully repair the file, it writes nothing.
- Spelling: [`typos`](https://github.com/crate-ci/typos), configured in `.typos.toml`.
  It only rewrites unambiguous, known misspellings, which is why it leaves names
  like *Doherty*, *NIMH* and *Calendly* alone. The trade-off is that it won't catch
  every misspelling — invented or truncated words (`neuroplasticit`) pass through.
  If one ever gets "corrected" wrongly, add it to `.typos.toml`.
- The workflow never pushes a repair unless `npm run verify` — lint, build *and*
  the browser check — passes first, so a repair can't restore a file that parses
  but still renders a blank page.
- It only repairs text that stops the file being *readable*. A leftover word that
  happens to be readable but meaningless is the lint gate's job, not this one.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
