import { expect, test } from '@playwright/test'

import { bookingToPersonalData, presetConsent } from './helpers'

test('pełny proces rezerwacji z płatnością demo', async ({ page }) => {
  await presetConsent(page)
  await bookingToPersonalData(page)

  // walidacja danych
  await page.getByRole('button', { name: /Dalej: podsumowanie/ }).click()
  await expect(page.getByText('Podaj imię i nazwisko.')).toBeVisible()
  await expect(page.getByText(/Akceptacja regulaminu/)).toBeVisible()

  await page.getByLabel('Imię i nazwisko').fill('Jan Testowy')
  await page.getByLabel('E-mail').fill('jan@przyklad.pl')
  await page.getByLabel('Telefon').fill('+48 500 100 200')
  await page.getByLabel(/Akceptuję/).check()
  await page.getByRole('button', { name: /Dalej: podsumowanie/ }).click()

  // podsumowanie
  await expect(page.getByRole('heading', { name: 'Podsumowanie rezerwacji' })).toBeVisible()
  await expect(page.getByText('Konsultacja psychologiczna (50 min)')).toBeVisible()
  await expect(page.getByText('220 zł')).toBeVisible()

  // możliwość powrotu
  await page.getByRole('button', { name: '← Wstecz' }).click()
  await expect(page.getByRole('heading', { name: 'Twoje dane' })).toBeVisible()
  await page.getByRole('button', { name: /Dalej: podsumowanie/ }).click()

  // płatność demo
  await page.getByRole('button', { name: /Dalej: płatność/ }).click()
  await expect(page.getByRole('heading', { name: /Płatność — 220 zł/ })).toBeVisible()
  const payButton = page.getByRole('button', { name: /Zapłać 220 zł/ })
  await expect(payButton).toBeDisabled()
  await page.getByRole('button', { name: 'BLIK', exact: false }).click()
  await expect(page.getByRole('status')).toContainText('Płatność demonstracyjna — żadna transakcja nie zostanie wykonana.')
  await payButton.click()

  // potwierdzenie
  await expect(page.getByRole('heading', { name: 'Rezerwacja potwierdzona!' })).toBeVisible({ timeout: 8000 })
  const number = await page.locator('.booking-number').textContent()
  expect(number).toMatch(/^AN-\d{4}-\d{4}$/)
  await expect(page.getByRole('button', { name: 'Dodaj do kalendarza' })).toBeVisible()

  // trwałość w localStorage po odświeżeniu
  await page.reload()
  await expect(page.getByText('Ostatnia rezerwacja:')).toBeVisible()
  await page.getByRole('button', { name: 'Pokaż potwierdzenie' }).click()
  await expect(page.getByRole('heading', { name: 'Rezerwacja potwierdzona!' })).toBeVisible()
  await expect(page.locator('.booking-number')).toHaveText(number!)

  // nowa rezerwacja resetuje kreator
  await page.getByRole('button', { name: 'Zarezerwuj kolejne spotkanie' }).click()
  await expect(page.getByRole('heading', { name: 'Jaką usługę chcesz zarezerwować?' })).toBeVisible()
})

test('bezpłatna rozmowa dla firm pomija płatność', async ({ page }) => {
  await presetConsent(page)
  await page.goto('/rezerwacja?usluga=firma-15')
  // preselekcja z URL → od razu krok „Forma"; stacjonarnie zablokowane
  await expect(page.getByRole('heading', { name: 'Jak chcesz się spotkać?' })).toBeVisible()
  await expect(page.getByRole('button', { name: /Stacjonarnie — Warszawa/ })).toBeDisabled()
  await page.getByRole('button', { name: 'Online', exact: false }).first().click()
  await page.getByRole('button', { name: /Dalej: termin/ }).click()
  await page.locator('.day-cell[data-available="true"]').first().click()
  await page.locator('.slot-btn').first().click()
  await page.getByRole('button', { name: /Dalej: Twoje dane/ }).click()
  await page.getByLabel('Imię i nazwisko').fill('Anna Firmowa')
  await page.getByLabel('E-mail').fill('anna@firma.pl')
  await page.getByLabel('Telefon').fill('600700800')
  await page.getByLabel(/Akceptuję/).check()
  await page.getByRole('button', { name: /Dalej: podsumowanie/ }).click()
  await expect(page.getByText('bezpłatnie')).toBeVisible()
  await page.getByRole('button', { name: 'Potwierdź rezerwację' }).click()
  await expect(page.getByRole('heading', { name: 'Rezerwacja potwierdzona!' })).toBeVisible({ timeout: 8000 })
})

test('preselekcja usługi z cennika', async ({ page }) => {
  await presetConsent(page)
  await page.goto('/cennik')
  await page.getByRole('link', { name: 'Wybierz pakiet' }).click()
  await expect(page).toHaveURL(/usluga=pakiet-coaching-5/)
  await expect(page.getByRole('heading', { name: 'Jak chcesz się spotkać?' })).toBeVisible()
})

test('kalendarz: nawigacja miesięcy i blokada niedostępnych dni', async ({ page }) => {
  await presetConsent(page)
  await page.goto('/rezerwacja')
  await page.getByRole('button', { name: /Sesja coachingowa/ }).click()
  await page.getByRole('button', { name: 'Online', exact: false }).first().click()
  await page.getByRole('button', { name: /Dalej: termin/ }).click()

  // horyzont 42 dni → 1–2 kliknięcia w przód, potem przycisk zablokowany
  const next = page.getByRole('button', { name: 'Następny miesiąc' })
  await expect(next).toBeEnabled()
  await next.click()
  if (await next.isEnabled()) await next.click()
  await expect(next).toBeDisabled()

  const disabledDays = page.locator('.day-cell:disabled')
  expect(await disabledDays.count()).toBeGreaterThan(0)
})
