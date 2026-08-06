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

There's a safety net. If a change to `src/content.js` stops the site from
rebuilding, a job runs automatically and tries to repair it — it fixes a missing
quote mark, a missing comma, the curly “smart quotes” you get from pasting out of
Word or email, and common misspellings. If the repair works, the fix is committed
for you and the site redeploys. You don't have to do anything.

While all this is happening the live site keeps showing the previous version, so
visitors never see a broken page.

If it *can't* work out the fix, it opens an **Issue** on this repository
explaining what's wrong in plain English, rather than guessing at your words. You
can check for one under the **Issues** tab.

### For maintainers

- Workflow: `.github/workflows/fix-content.yml`, triggered by a failed run of the
  deploy workflow on `main`.
- Punctuation repair: `scripts/fix-content.mjs` (run locally with `npm run fix:content`).
  It parses the file with `acorn`, and keeps a candidate fix only if it moves the
  parser further into the file — so it can't quietly mangle text. If it can't
  fully repair the file, it writes nothing.
- Spelling: [`typos`](https://github.com/crate-ci/typos), configured in `.typos.toml`.
  It only rewrites unambiguous, known misspellings, which is why it leaves names
  like *Doherty*, *NIMH* and *Calendly* alone. The trade-off is that it won't catch
  every misspelling — invented or truncated words (`neuroplasticit`) pass through.
  If one ever gets "corrected" wrongly, add it to `.typos.toml`.
- The workflow never pushes a change unless `npm run build` passes first, and it
  won't retry a commit that's already marked `[auto-fix]`.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
