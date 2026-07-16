import { expect, test } from '@playwright/test'

import { collectErrors, hasHorizontalScroll, presetConsent } from './helpers'

const routes: { path: string; heading: RegExp; title: RegExp }[] = [
  { path: '/', heading: /Odzyskaj równowagę/, title: /Aleksandra Nowicka/ },
  { path: '/o-mnie', heading: /Psycholożka, coachka i trenerka/, title: /O mnie/ },
  { path: '/oferta', heading: /Sprawdź, jak mogę Ci pomóc/, title: /Oferta/ },
  { path: '/oferta/konsultacje-psychologiczne', heading: /Konsultacje psychologiczne/, title: /Konsultacje/ },
  { path: '/oferta/coaching', heading: /Coaching indywidualny i zawodowy/, title: /Coaching/ },
  { path: '/oferta/warsztaty-i-wystapienia', heading: /Warsztaty, szkolenia i wystąpienia/, title: /Warsztaty/ },
  { path: '/jak-pracuje', heading: /Jasne zasady od pierwszego kontaktu/, title: /Jak pracuję/ },
  { path: '/dla-firm', heading: /Zespoły, które umieją zadbać/, title: /Dla firm/ },
  { path: '/cennik', heading: /Przejrzyste ceny/, title: /Cennik/ },
  { path: '/wiedza', heading: /Praktyczna psychologia/, title: /Wiedza/ },
  { path: '/wiedza/jak-rozpoznac-pierwsze-oznaki-wypalenia', heading: /pierwsze oznaki wypalenia/, title: /wypalenia/ },
  { path: '/wiedza/psycholog-czy-coach-jak-wybrac-wsparcie', heading: /Psycholog czy coach/, title: /Psycholog czy coach/ },
  { path: '/wiedza/dlaczego-motywacja-nie-zawsze-wystarcza', heading: /motywacja nie zawsze wystarcza/i, title: /motywacja/i },
  { path: '/wiedza/stres-pod-kontrola-jak-dziala-uklad-nerwowy', heading: /Stres pod kontrolą/, title: /Stres/ },
  { path: '/wiedza/emocje-w-pracy-jak-o-nich-mowic', heading: /Emocje w pracy/, title: /Emocje/ },
  { path: '/wiedza/pierwsze-90-dni-w-roli-lidera', heading: /Pierwsze 90 dni/, title: /90 dni/ },
  { path: '/faq', heading: /Częste pytania/, title: /FAQ/ },
  { path: '/kontakt', heading: /Porozmawiajmy/, title: /Kontakt/ },
  { path: '/rezerwacja', heading: /Umów spotkanie/, title: /Umów spotkanie/ },
  { path: '/materialy/psycholog-czy-coach', heading: /Psycholog czy coach\?/, title: /Przewodnik/ },
  { path: '/polityka-prywatnosci', heading: /Polityka prywatności/, title: /Polityka prywatności/ },
  { path: '/polityka-cookies', heading: /Polityka cookies/, title: /Polityka cookies/ },
  { path: '/regulamin-rezerwacji', heading: /Regulamin rezerwacji/, title: /Regulamin rezerwacji/ },
  { path: '/regulamin-platnosci', heading: /Regulamin płatności/, title: /Regulamin płatności/ },
]

for (const route of routes) {
  test(`trasa ${route.path} renderuje się bez błędów`, async ({ page }) => {
    await presetConsent(page)
    const errors = collectErrors(page)
    await page.goto(route.path)
    await expect(page.getByRole('heading', { level: 1 })).toContainText(route.heading)
    await expect(page).toHaveTitle(route.title)
    expect(await hasHorizontalScroll(page), 'brak poziomego scrolla').toBe(false)
    expect(errors, `błędy konsoli: ${errors.join('; ')}`).toHaveLength(0)
  })
}

test('nieistniejąca trasa pokazuje stronę 404', async ({ page }) => {
  await presetConsent(page)
  await page.goto('/nie-ma-takiej-strony')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Ta strona nie istnieje')
  await page.getByRole('link', { name: 'Wróć na stronę główną' }).click()
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Odzyskaj równowagę')
})

test('nawigacja desktop: dropdown Oferta działa', async ({ page }) => {
  await presetConsent(page)
  await page.goto('/')
  const toggle = page.getByRole('button', { name: 'Oferta' })
  await toggle.click()
  await expect(toggle).toHaveAttribute('aria-expanded', 'true')
  await page.getByLabel('Nawigacja główna').getByRole('link', { name: 'Konsultacje psychologiczne' }).click()
  await expect(page).toHaveURL(/konsultacje-psychologiczne/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Konsultacje psychologiczne')
})

test('każdy link w stopce prowadzi do działającej strony', async ({ page }) => {
  await presetConsent(page)
  await page.goto('/')
  const hrefs = await page.locator('footer a[href^="/"]').evaluateAll((links) =>
    Array.from(new Set(links.map((a) => (a as HTMLAnchorElement).getAttribute('href') ?? ''))),
  )
  expect(hrefs.length).toBeGreaterThan(8)
  for (const href of hrefs) {
    await page.goto(href)
    await expect(page.getByRole('heading', { level: 1 })).not.toContainText('Ta strona nie istnieje')
  }
})

test('strona główna: karty ścieżek prowadzą do podstron', async ({ page }) => {
  await presetConsent(page)
  await page.goto('/')
  await page.getByRole('link', { name: 'Zobacz coaching' }).click()
  await expect(page).toHaveURL(/oferta\/coaching/)
  await page.goto('/')
  await page.getByRole('link', { name: 'Zobacz ofertę dla firm' }).click()
  await expect(page).toHaveURL(/dla-firm/)
})

test('wiedza: filtrowanie i wyszukiwarka działają', async ({ page }) => {
  await presetConsent(page)
  await page.goto('/wiedza')
  await expect(page.locator('.article-card')).toHaveCount(6)
  await page.getByRole('button', { name: 'Wypalenie' }).click()
  await expect(page.locator('.article-card')).toHaveCount(1)
  await page.getByRole('button', { name: 'Wszystkie' }).click()
  await page.getByLabel('Szukaj artykułu').fill('motywacja')
  await expect(page.locator('.article-card')).toHaveCount(1)
  await page.getByLabel('Szukaj artykułu').fill('xyzxyz')
  await expect(page.getByText('Brak artykułów spełniających kryteria.')).toBeVisible()
  await page.getByRole('button', { name: 'Wyczyść filtry' }).click()
  await expect(page.locator('.article-card')).toHaveCount(6)
})

test('artykuł: sekcja podobnych artykułów linkuje poprawnie', async ({ page }) => {
  await presetConsent(page)
  await page.goto('/wiedza/jak-rozpoznac-pierwsze-oznaki-wypalenia')
  const related = page.locator('.section--tinted .article-card h3 a')
  await expect(related.first()).toBeVisible()
  await related.first().click()
  await expect(page).toHaveURL(/\/wiedza\/.+/)
  await expect(page.getByRole('heading', { level: 1 })).not.toContainText('pierwsze oznaki wypalenia')
})
