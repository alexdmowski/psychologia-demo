import { expect, test } from '@playwright/test'

test('baner cookies: akceptacja wszystkich zapisuje zgodę', async ({ page }) => {
  await page.goto('/')
  const banner = page.getByRole('region', { name: 'Zgody na pliki cookies' })
  await expect(banner).toBeVisible()
  await banner.getByRole('button', { name: 'Akceptuję wszystkie' }).click()
  await expect(banner).toBeHidden()

  const consent = await page.evaluate(() => JSON.parse(window.localStorage.getItem('an-cookie-consent') ?? 'null'))
  expect(consent).toMatchObject({ necessary: true, analytics: true, marketing: true })

  await page.reload()
  await expect(page.getByRole('region', { name: 'Zgody na pliki cookies' })).toBeHidden()
})

test('baner cookies: odrzucenie opcjonalnych', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Odrzucam opcjonalne' }).click()
  const consent = await page.evaluate(() => JSON.parse(window.localStorage.getItem('an-cookie-consent') ?? 'null'))
  expect(consent).toMatchObject({ necessary: true, analytics: false, marketing: false })
})

test('ustawienia cookies: kategorie opcjonalne domyślnie wyłączone, wybór zapisywany', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Ustawienia', exact: true }).click()
  const dialog = page.getByRole('dialog', { name: 'Ustawienia cookies' })
  await expect(dialog).toBeVisible()
  await expect(dialog.getByText('zawsze aktywne')).toBeVisible()

  const analytics = dialog.locator('input[type="checkbox"]').first()
  const marketing = dialog.locator('input[type="checkbox"]').nth(1)
  await expect(analytics).not.toBeChecked()
  await expect(marketing).not.toBeChecked()

  await analytics.check()
  await dialog.getByRole('button', { name: 'Zapisz wybór' }).click()
  await expect(dialog).toBeHidden()

  const consent = await page.evaluate(() => JSON.parse(window.localStorage.getItem('an-cookie-consent') ?? 'null'))
  expect(consent).toMatchObject({ analytics: true, marketing: false })
})

test('decyzję można zmienić później z poziomu stopki, Escape zamyka modal', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Akceptuję wszystkie' }).click()

  await page.getByRole('button', { name: 'Ustawienia cookies' }).click()
  const dialog = page.getByRole('dialog', { name: 'Ustawienia cookies' })
  await expect(dialog).toBeVisible()
  // aktualny stan zgód odzwierciedlony w przełącznikach
  await expect(dialog.locator('input[type="checkbox"]').first()).toBeChecked()

  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()

  // zmiana decyzji: odrzucenie opcjonalnych
  await page.getByRole('button', { name: 'Ustawienia cookies' }).click()
  await dialog.getByRole('button', { name: 'Odrzucam opcjonalne' }).click()
  const consent = await page.evaluate(() => JSON.parse(window.localStorage.getItem('an-cookie-consent') ?? 'null'))
  expect(consent).toMatchObject({ analytics: false, marketing: false })
})
