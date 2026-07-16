import { expect, test } from '@playwright/test'

import { presetConsent } from './helpers'

test('link „Przejdź do treści" jest pierwszym elementem fokusa', async ({ page }) => {
  await presetConsent(page)
  await page.goto('/')
  await page.keyboard.press('Tab')
  const skipLink = page.getByRole('link', { name: 'Przejdź do treści' })
  await expect(skipLink).toBeFocused()
  await page.keyboard.press('Enter')
  // fokus przenosi się do <main id="tresc"> (bez zmiany URL — zgodność z HashRouterem)
  await expect(page.locator('main#tresc')).toBeFocused()
})

test('dropdown Oferta: otwieranie Enterem, zamykanie Escape', async ({ page }) => {
  await presetConsent(page)
  await page.goto('/')
  const toggle = page.getByRole('button', { name: 'Oferta' })
  await toggle.focus()
  await page.keyboard.press('Enter')
  await expect(toggle).toHaveAttribute('aria-expanded', 'true')
  await expect(page.getByRole('link', { name: 'Przegląd oferty' })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(toggle).toHaveAttribute('aria-expanded', 'false')
})

test('formularz kontaktowy jest w pełni obsługiwalny klawiaturą', async ({ page }) => {
  await presetConsent(page)
  await page.goto('/kontakt')
  const name = page.getByLabel('Imię', { exact: false }).first()
  await name.focus()
  await page.keyboard.type('Jan')
  await page.keyboard.press('Tab')
  await page.keyboard.type('jan@przyklad.pl')
  const message = page.getByLabel('Wiadomość', { exact: true })
  await message.focus()
  await page.keyboard.type('Test klawiatury.')
  const consent = page.getByLabel(/Wyrażam zgodę/)
  await consent.focus()
  await page.keyboard.press('Space')
  await expect(consent).toBeChecked()
})

test('modal cookies ma pułapkę fokusu', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Ustawienia', exact: true }).click()
  const dialog = page.getByRole('dialog', { name: 'Ustawienia cookies' })
  await expect(dialog).toBeVisible()

  // fokus startuje wewnątrz modala i pozostaje w nim po wielu Tabach
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press('Tab')
    const inDialog = await page.evaluate(() => {
      const dlg = document.querySelector('[role="dialog"]')
      return dlg ? dlg.contains(document.activeElement) : false
    })
    expect(inDialog, `fokus wewnątrz modala po ${i + 1} tabach`).toBe(true)
  }
})
