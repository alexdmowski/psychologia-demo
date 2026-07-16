// Przekształca dist-artifact/index.html (pełny dokument) we fragment HTML
// nadający się do publikacji jako strona (host sam dodaje doctype/html/head/body).
import { readFileSync, writeFileSync } from 'node:fs'

const SRC = 'dist-artifact/index.html'
const OUT = 'dist-artifact/artifact.html'

let html = readFileSync(SRC, 'utf8')

// Usuwamy wyłącznie znaczniki szkieletu — zawartość (style, skrypty, root) zostaje.
html = html
  .replace(/<!doctype html>/i, '')
  .replace(/<html[^>]*>/i, '')
  .replace(/<\/html>/i, '')
  .replace(/<head>/i, '')
  .replace(/<\/head>/i, '')
  .replace(/<body[^>]*>/i, '')
  .replace(/<\/body>/i, '')
  .replace(/<meta charset[^>]*>/i, '')
  .replace(/<meta name="viewport"[^>]*>/i, '')
  .replace(/<link rel="icon"[^>]*>/i, '')
  .trim()

// Redukcja rozmiaru pod limit udostępniania: usuwamy @font-face dla subsetu
// wietnamskiego (nieużywany w polskiej treści). Minifier zapisuje zakres bez zer
// wiodących: U+102-103.
html = html.replace(/@font-face\{[^}]*U\+0?102-0?103[^}]*\}/gi, '')

writeFileSync(OUT, html)
console.log(`Zapisano ${OUT} (${Math.round(html.length / 1024)} kB)`)
