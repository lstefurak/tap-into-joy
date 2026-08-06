#!/usr/bin/env node
// Repairs the common ways src/content.js gets broken while editing text.
//
// This only ever runs when the file will not parse. If it parses, the file is
// left exactly as it is — this script never rewords anything.
//
// It fixes three things, one at a time, keeping a change only if it moves the
// parser further into the file:
//   1. Curly "smart quotes" pasted from Word/email, which JavaScript can't read
//   2. A line of text missing its closing quote mark
//   3. A missing comma between two entries in a list
//
// Usage: node scripts/fix-content.mjs [file]

import { readFileSync, writeFileSync, appendFileSync } from 'node:fs'
import { parse } from 'acorn'

const FILE = process.argv[2] ?? 'src/content.js'
const MAX_PASSES = 50

// Returns null when the file parses, otherwise the position of the first error.
function firstError(source) {
  try {
    parse(source, { ecmaVersion: 'latest', sourceType: 'module' })
    return null
  } catch (err) {
    return {
      line: err.loc?.line ?? 0,
      column: err.loc?.column ?? 0,
      message: err.message.replace(/\s*\(\d+:\d+\)$/, '')
    }
  }
}

// True when `next` is further into the file than `prev` (or the file now parses).
function advanced(prev, next) {
  if (!next) return true
  if (next.line !== prev.line) return next.line > prev.line
  return next.column > prev.column
}

// Walks a line the way the parser does, so quote marks inside `// comments`
// don't get mistaken for the start of a string.
function openQuoteAt(line) {
  let quote = null
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (quote) {
      if (ch === '\\') i++
      else if (ch === quote) quote = null
      continue
    }
    if (ch === '/' && line[i + 1] === '/') return null
    if (ch === '"' || ch === "'" || ch === '`') quote = ch
  }
  // Backticks are allowed to span lines, so an open one isn't a mistake.
  return quote === '`' ? null : quote
}

function closeUnterminatedString(line) {
  const quote = openQuoteAt(line)
  if (!quote) return null
  const trimmed = line.replace(/\s+$/, '')
  // `"some text,` almost always wants the comma outside the quotes.
  if (trimmed.endsWith(',')) {
    return trimmed.slice(0, -1).replace(/\s+$/, '') + quote + ','
  }
  return trimmed + quote
}

function straightenQuotes(line) {
  const fixed = line
    .replace(/[“”„‟]/g, '"')
    .replace(/[‘’‚‛]/g, "'")
  return fixed === line ? null : fixed
}

// Index of the last line before `index` that could need a trailing comma.
function previousCodeLine(lines, index) {
  for (let i = index - 1; i >= 0; i--) {
    const trimmed = lines[i].trim()
    if (trimmed && !trimmed.startsWith('//')) return i
  }
  return -1
}

function addMissingComma(line) {
  const trimmed = line.replace(/\s+$/, '')
  if (!trimmed || trimmed.endsWith(',')) return null
  if (!/["'\]}\d)]$/.test(trimmed)) return null
  return trimmed + ','
}

const original = readFileSync(FILE, 'utf8')
let source = original
const repairs = []

let error = firstError(source)
const initialError = error

for (let pass = 0; error && pass < MAX_PASSES; pass++) {
  const lines = source.split('\n')
  const index = error.line - 1
  if (index < 0 || index >= lines.length) break

  const previous = previousCodeLine(lines, index)
  const candidates = [
    ['replaced curly “smart quotes” with plain quote marks', index, straightenQuotes(lines[index])],
    ['added the missing quote mark at the end of the line', index, closeUnterminatedString(lines[index])],
    ['added the missing comma at the end of the line', previous, previous >= 0 ? addMissingComma(lines[previous]) : null]
  ]

  let applied = false
  for (const [description, target, replacement] of candidates) {
    if (replacement == null || replacement === lines[target]) continue
    const attempt = [...lines]
    attempt[target] = replacement
    const attemptSource = attempt.join('\n')
    const attemptError = firstError(attemptSource)
    if (!advanced(error, attemptError)) continue

    repairs.push(`line ${target + 1}: ${description}`)
    source = attemptSource
    error = attemptError
    applied = true
    break
  }

  if (!applied) break
}

const lines = []
if (!initialError) {
  lines.push(`${FILE} looks fine — no changes made.`)
} else if (!error) {
  lines.push(`Fixed ${FILE}:`, ...repairs.map((r) => `  - ${r}`))
} else {
  lines.push(
    `Could not fully repair ${FILE}.`,
    ...repairs.map((r) => `  - ${r}`),
    `  - still stuck at line ${error.line}: ${error.message}`
  )
}
const report = lines.join('\n')
console.log(report)

if (process.env.GITHUB_STEP_SUMMARY) {
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, `### Content repair\n\n\`\`\`\n${report}\n\`\`\`\n`)
}

// Only write a fully repaired file — a half-fixed one is no better than the
// original and is harder for a person to make sense of.
if (!error && source !== original) writeFileSync(FILE, source)

process.exit(error ? 1 : 0)
