// Generuje zrzuty ekranu do artifacts/previews/ oraz obraz Open Graph.
// Wymaga działającego dev servera: npm run dev (http://localhost:5173).
import { mkdirSync } from 'node:fs'
import { chromium, devices } from '@playwright/test'

const BASE = process.env.BASE_URL ?? 'http://localhost:5173'
const OUT = 'artifacts/previews'
mkdirSync(OUT, { recursive: true })

const consentInit = () =>
  localStorage.setItem(
    'an-cookie-consent',
    JSON.stringify({ necessary: true, analytics: false, marketing: false, decidedAt: '2026-01-01T00:00:00.000Z' }),
  )

const browser = await chromium.launch()

async function makeContext(options) {
  const context = await browser.newContext({ reducedMotion: 'reduce', ...options })
  const page = await context.newPage()
  await page.addInitScript(consentInit)
  return { context, page }
}

// ── Desktop 1440×900 ──
{
  const { context, page } = await makeContext({ viewport: { width: 1440, height: 900 } })

  await page.goto(`${BASE}/`)
  await page.waitForTimeout(600)
  await page.screenshot({ path: `${OUT}/home-desktop.png`, fullPage: true })

  await page.goto(`${BASE}/oferta`)
  await page.waitForTimeout(400)
  await page.screenshot({ path: `${OUT}/offer-desktop.png`, fullPage: true })

  await page.goto(`${BASE}/rezerwacja`)
  await page.waitForTimeout(400)
  await page.screenshot({ path: `${OUT}/booking-desktop.png`, fullPage: true })

  // krok kalendarza w rezerwacji
  await page.getByRole('button', { name: /Konsultacja psychologiczna/ }).click()
  await page.getByRole('button', { name: 'Online', exact: false }).first().click()
  await page.getByRole('button', { name: /Dalej: termin/ }).click()
  await page.locator('.day-cell[data-available="true"]').first().click()
  await page.waitForTimeout(300)
  await page.screenshot({ path: `${OUT}/booking-calendar-desktop.png` })

  await page.goto(`${BASE}/dla-firm`)
  await page.waitForTimeout(400)
  await page.screenshot({ path: `${OUT}/business-desktop.png`, fullPage: true })

  await context.close()
}

// ── Baner cookies (desktop, świeża sesja) ──
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })
  const page = await context.newPage()
  await page.goto(`${BASE}/`)
  await page.waitForTimeout(600)
  await page.screenshot({ path: `${OUT}/cookies-desktop.png` })
  await context.close()
}

// ── Mały telefon 320×568 ──
{
  const { context, page } = await makeContext({
    ...devices['iPhone SE'],
    browserName: undefined,
    viewport: { width: 320, height: 568 },
  })
  await page.goto(`${BASE}/`)
  await page.waitForTimeout(500)
  await page.screenshot({ path: `${OUT}/home-mobile-small.png`, fullPage: true })
  await context.close()
}

// ── Duży telefon 430×932 ──
{
  const { context, page } = await makeContext({
    ...devices['iPhone 14 Pro Max'],
    browserName: undefined,
    viewport: { width: 430, height: 932 },
  })
  await page.goto(`${BASE}/`)
  await page.waitForTimeout(500)
  await page.screenshot({ path: `${OUT}/home-mobile-large.png`, fullPage: true })

  // menu mobilne
  await page.getByRole('button', { name: 'Otwórz menu' }).click()
  await page.waitForTimeout(400)
  await page.screenshot({ path: `${OUT}/menu-mobile.png` })
  await page.getByRole('dialog', { name: 'Menu strony' }).getByRole('button', { name: 'Zamknij menu' }).click()

  // rezerwacja — krok wyboru terminu
  await page.goto(`${BASE}/rezerwacja`)
  await page.getByRole('button', { name: /Konsultacja psychologiczna/ }).click()
  await page.getByRole('button', { name: 'Online', exact: false }).first().click()
  await page.getByRole('button', { name: /Dalej: termin/ }).click()
  await page.locator('.day-cell[data-available="true"]').first().click()
  await page.waitForTimeout(300)
  await page.screenshot({ path: `${OUT}/booking-mobile.png`, fullPage: true })

  // kontakt
  await page.goto(`${BASE}/kontakt`)
  await page.waitForTimeout(400)
  await page.screenshot({ path: `${OUT}/contact-mobile.png`, fullPage: true })
  await context.close()
}

// ── Obraz Open Graph 1200×630 → public/og-image.png ──
{
  const context = await browser.newContext({ viewport: { width: 1200, height: 630 } })
  const page = await context.newPage()
  await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>
    body { margin: 0; width: 1200px; height: 630px; display: flex; flex-direction: column;
      justify-content: center; padding: 0 96px; box-sizing: border-box;
      background: radial-gradient(120% 180% at 88% -30%, rgba(169,101,59,.34), transparent 55%), #21403a;
      font-family: Georgia, serif; color: #faf7f2; position: relative; overflow: hidden; }
    .tag { font-family: Arial, sans-serif; font-size: 22px; letter-spacing: .3em; text-transform: uppercase; color: #e5b183; margin-bottom: 28px; }
    h1 { font-size: 76px; margin: 0 0 26px; font-weight: 600; line-height: 1.08; max-width: 900px; }
    p { font-family: Arial, sans-serif; font-size: 28px; color: #c3cdc4; margin: 0; max-width: 820px; line-height: 1.4; }
    svg { position: absolute; bottom: 60px; left: 96px; }
  </style></head><body>
    <div class="tag">Aleksandra Nowicka — Psychologia i Rozwój</div>
    <h1>Odzyskaj równowagę, pewność siebie i&nbsp;poczucie wpływu.</h1>
    <p>Konsultacje psychologiczne · coaching · warsztaty dla firm — Warszawa i online</p>
    <svg width="420" height="60" viewBox="0 0 560 120" fill="none">
      <path d="M4 96 C 90 40, 150 108, 236 68 S 380 10, 452 54 c 36 22, 72 18, 104 -6" stroke="#a9653b" stroke-width="3" stroke-linecap="round"/>
      <circle cx="4" cy="96" r="5" fill="#a9653b"/><circle cx="556" cy="48" r="5" fill="#a9653b"/>
    </svg>
  </body></html>`)
  await page.waitForTimeout(300)
  await page.screenshot({ path: 'public/og-image.png' })
  await context.close()
}

await browser.close()
console.log('Zrzuty zapisane w', OUT, 'oraz public/og-image.png')
