import { expect, test } from '@playwright/test'

import { collectErrors, hasHorizontalScroll, presetConsent } from './helpers'

test('strona główna: brak poziomego scrolla i błędów konsoli', async ({ page }) => {
  await presetConsent(page)
  const errors = collectErrors(page)
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Odzyskaj równowagę')
  await page.mouse.wheel(0, 4000)
  await page.waitForTimeout(400)
  expect(await hasHorizontalScroll(page)).toBe(false)
  expect(errors, errors.join('; ')).toHaveLength(0)
})

test('kluczowe podstrony bez poziomego scrolla', async ({ page }) => {
  await presetConsent(page)
  for (const path of ['/oferta', '/cennik', '/dla-firm', '/faq', '/kontakt', '/wiedza']) {
    await page.goto(path)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    expect(await hasHorizontalScroll(page), `poziomy scroll na ${path}`).toBe(false)
  }
})

test('menu mobilne: otwieranie, ARIA, nawigacja i zamykanie', async ({ page }) => {
  await presetConsent(page)
  await page.goto('/')

  const burger = page.getByRole('button', { name: 'Otwórz menu' })
  await expect(burger).toBeVisible()
  await expect(burger).toHaveAttribute('aria-expanded', 'false')
  await burger.click()

  const menu = page.getByRole('dialog', { name: 'Menu strony' })
  await expect(menu).toBeVisible()

  // blokada przewijania tła
  const bodyOverflow = await page.evaluate(() => getComputedStyle(document.body).overflow)
  expect(bodyOverflow).toBe('hidden')

  // zamknięcie Escape
  await page.keyboard.press('Escape')
  await expect(menu).toBeHidden()

  // nawigacja przez link zamyka menu i zmienia trasę
  await burger.click()
  await menu.getByRole('link', { name: 'Cennik' }).click()
  await expect(page).toHaveURL(/cennik/)
  await expect(menu).toBeHidden()
})

test('menu mobilne: przycisk zamknięcia i grupa Oferta', async ({ page }) => {
  await presetConsent(page)
  await page.goto('/')
  await page.getByRole('button', { name: 'Otwórz menu' }).click()
  const menu = page.getByRole('dialog', { name: 'Menu strony' })
  await expect(menu.getByRole('link', { name: 'Konsultacje psychologiczne' })).toBeVisible()
  await menu.getByRole('button', { name: 'Zamknij menu' }).click()
  await expect(menu).toBeHidden()
})

test('stały przycisk „Umów spotkanie": widoczny, ale nie na stronie rezerwacji', async ({ page }) => {
  await presetConsent(page)
  await page.goto('/')
  const sticky = page.locator('.sticky-cta')
  await expect(sticky).toBeVisible()
  await sticky.getByRole('link', { name: 'Umów spotkanie' }).click()
  await expect(page).toHaveURL(/rezerwacja/)
  await expect(sticky).toBeHidden()
})

test('pełna rezerwacja na małym ekranie', async ({ page }) => {
  await presetConsent(page)
  await page.goto('/rezerwacja')
  expect(await hasHorizontalScroll(page)).toBe(false)

  await page.getByRole('button', { name: /Konsultacja psychologiczna/ }).click()
  await page.getByRole('button', { name: 'Online', exact: false }).first().click()
  await page.getByRole('button', { name: /Dalej: termin/ }).click()
  await page.locator('.day-cell[data-available="true"]').first().click()
  await page.locator('.slot-btn').first().click()
  await page.getByRole('button', { name: /Dalej: Twoje dane/ }).click()
  await page.getByLabel('Imię i nazwisko').fill('Test Mobilny')
  await page.getByLabel('E-mail').fill('mobile@przyklad.pl')
  await page.getByLabel('Telefon').fill('500600700')
  await page.getByLabel(/Akceptuję/).check()
  await page.getByRole('button', { name: /Dalej: podsumowanie/ }).click()
  await page.getByRole('button', { name: /Dalej: płatność/ }).click()
  await page.getByRole('button', { name: 'Karta', exact: false }).click()
  await expect(page.getByText('Płatność demonstracyjna')).toBeVisible()
  await page.getByRole('button', { name: /Zapłać 220 zł/ }).click()
  await expect(page.getByRole('heading', { name: 'Rezerwacja potwierdzona!' })).toBeVisible({ timeout: 8000 })
  expect(await hasHorizontalScroll(page)).toBe(false)
})

test('akordeon FAQ działa na dotyk', async ({ page }) => {
  await presetConsent(page)
  await page.goto('/faq')
  const second = page.locator('.accordion__trigger').nth(1)
  await second.tap()
  await expect(second).toHaveAttribute('aria-expanded', 'true')
  expect(await hasHorizontalScroll(page)).toBe(false)
})

test('formularz kontaktowy używalny na mobile', async ({ page }) => {
  await presetConsent(page)
  await page.goto('/kontakt')
  await page.getByLabel('Imię', { exact: false }).first().fill('Ola')
  await page.getByLabel('E-mail').fill('ola@przyklad.pl')
  await page.getByLabel('Wiadomość', { exact: true }).fill('Wiadomość testowa z telefonu.')
  await page.getByLabel(/Wyrażam zgodę/).check()
  await page.getByRole('button', { name: 'Wyślij wiadomość' }).click()
  await expect(page.getByRole('status')).toContainText('Wiadomość przyjęta', { timeout: 5000 })
  expect(await hasHorizontalScroll(page)).toBe(false)
})
