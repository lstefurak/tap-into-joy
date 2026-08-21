#!/usr/bin/env node
// Checks that the built site actually appears in a real browser.
//
// `npm run build` only proves the code can be bundled. It cannot tell you
// whether anything shows up on the page: a mistake like a stray word at the
// top of content.js bundles perfectly and then throws the moment the browser
// runs it, leaving a blank white page with the menu and everything else gone.
// This script is the check that catches that.
//
// It opens the site the way a visitor would and fails if:
//   - the browser hit an error while running the page
//   - the page came out empty
//   - a piece of the site itself (not an outside service) failed to load
//
// Errors from outside services -- the booking calendar, Google Fonts -- are
// ignored on purpose. They come and go, and failing a deploy over someone
// else's hiccup would be worse than useless.
//
// Usage:
//   node scripts/smoke-test.mjs --dir dist --base /tap-into-joy/
//   node scripts/smoke-test.mjs --url https://example.com/ --expect-asset assets/index-abc.js

import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { existsSync, appendFileSync } from 'node:fs'
import { extname, join, normalize } from 'node:path'
import { chromium } from 'playwright'

const args = new Map()
for (let i = 2; i < process.argv.length; i += 2) {
  args.set(process.argv[i].replace(/^--/, ''), process.argv[i + 1])
}

const DIR = args.get('dir')
const BASE = args.get('base') ?? '/'
const URL_ARG = args.get('url')
const EXPECT_ASSET = args.get('expect-asset')
const WAIT_SECONDS = Number(args.get('wait') ?? 180)
// Enough text that we know the page really rendered, not just a stray wrapper.
const MIN_TEXT = 200

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.woff2': 'font/woff2'
}

// Serves the built files locally so we test exactly what will be published.
async function serve(dir, base) {
  const server = createServer(async (req, res) => {
    try {
      let path = decodeURIComponent(new URL(req.url, 'http://x').pathname)
      if (base !== '/' && path.startsWith(base)) path = path.slice(base.length - 1)
      let file = join(dir, normalize(path).replace(/^(\.\.[/\\])+/, ''))
      // Anything without a file extension is a page route -> hand back index.html.
      if (!extname(file) || !existsSync(file)) file = join(dir, 'index.html')
      const body = await readFile(file)
      res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' })
      res.end(body)
    } catch {
      res.writeHead(404).end('not found')
    }
  })
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
  return { server, origin: `http://127.0.0.1:${server.address().port}` }
}

// Waits until the live site is serving the version we just published. GitHub
// Pages caches pages for ten minutes, so we ask for a fresh copy every time.
async function waitForPublish(url, asset, seconds) {
  const deadline = Date.now() + seconds * 1000
  let attempt = 0
  while (Date.now() < deadline) {
    attempt++
    try {
      const res = await fetch(`${url}${url.includes('?') ? '&' : '?'}v=${attempt}`, {
        cache: 'no-store',
        headers: { 'cache-control': 'no-cache', pragma: 'no-cache' }
      })
      const html = await res.text()
      if (res.ok && html.includes(asset)) return true
    } catch {
      // The site can briefly refuse connections mid-publish; keep waiting.
    }
    await new Promise((r) => setTimeout(r, 5000))
  }
  return false
}

const problems = []
let target = URL_ARG
let server = null

if (!target) {
  if (!DIR) {
    console.error('Tell it what to check: either --dir <folder> or --url <address>.')
    process.exit(2)
  }
  const started = await serve(DIR, BASE)
  server = started.server
  target = started.origin + BASE
}

const pageOrigin = new URL(target).origin

if (EXPECT_ASSET) {
  process.stdout.write(`Waiting for the live site to finish updating (up to ${WAIT_SECONDS}s)...\n`)
  const published = await waitForPublish(target, EXPECT_ASSET, WAIT_SECONDS)
  if (!published) {
    problems.push(
      `The live site never switched to the newly published version within ${WAIT_SECONDS} seconds. ` +
      `Expected it to start using: ${EXPECT_ASSET}`
    )
  }
}

const browser = await chromium.launch()
const page = await browser.newPage()

// Something the page's own code threw. This is what a blank page looks like.
page.on('pageerror', (err) => {
  problems.push(`The browser hit an error while running the site: ${err.message}`)
})

page.on('console', (msg) => {
  if (msg.type() !== 'error') return
  const from = msg.location()?.url ?? ''
  // Only our own code counts; the booking calendar is not ours to fix.
  if (from && !from.startsWith(pageOrigin)) return
  problems.push(`The browser reported an error: ${msg.text()}`)
})

page.on('response', (res) => {
  if (res.status() < 400) return
  if (!res.url().startsWith(pageOrigin)) return
  problems.push(`Part of the site failed to load (${res.status()}): ${res.url()}`)
})

const bust = EXPECT_ASSET ? `${target}${target.includes('?') ? '&' : '?'}v=check` : target
process.stdout.write(`Opening ${bust}\n`)

try {
  const response = await page.goto(bust, { waitUntil: 'load', timeout: 60000 })
  if (response && !response.ok()) {
    problems.push(`The page itself did not load (${response.status()}).`)
  }

  // Give the site a moment to draw itself onto the page.
  await page
    .waitForFunction(() => document.querySelector('#root')?.children.length > 0, { timeout: 15000 })
    .catch(() => {})

  const result = await page.evaluate(() => {
    const root = document.querySelector('#root')
    return {
      hasRoot: Boolean(root),
      children: root ? root.children.length : 0,
      text: root ? root.innerText.replace(/\s+/g, ' ').trim() : '',
      headings: [...document.querySelectorAll('h1')].map((h) => h.innerText.trim())
    }
  })

  if (!result.hasRoot) {
    problems.push('The page is missing the container the site is built into.')
  } else if (result.children === 0) {
    problems.push('The page loaded but came out completely blank -- nothing was drawn onto it.')
  } else if (result.text.length < MIN_TEXT) {
    problems.push(
      `The page has almost no text on it (${result.text.length} characters), ` +
        'which usually means it only half-loaded.'
    )
  } else if (result.headings.length === 0) {
    problems.push('The page has no main heading, so it did not finish building itself.')
  }

  if (problems.length === 0) {
    process.stdout.write(`Looks good. Main heading: "${result.headings[0]}"\n`)
    process.stdout.write(`Text on the page: ${result.text.length} characters\n`)
  }
} catch (err) {
  problems.push(`Could not open the page at all: ${err.message}`)
} finally {
  await browser.close()
  server?.close()
}

const summary = problems.length
  ? ['The website did not come out right:', ...problems.map((p) => `  - ${p}`)].join('\n')
  : 'The website loads and displays correctly.'

console.log(summary)

if (process.env.GITHUB_STEP_SUMMARY) {
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, `### Website check\n\n\`\`\`\n${summary}\n\`\`\`\n`)
}

process.exit(problems.length ? 1 : 0)
