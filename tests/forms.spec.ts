import { expect, test } from '@playwright/test'

import { presetConsent } from './helpers'

test.describe('Formularz kontaktowy', () => {
  test('walidacja: puste pola pokazują komunikaty błędów', async ({ page }) => {
    await presetConsent(page)
    await page.goto('/kontakt')
    await page.getByRole('button', { name: 'Wyślij wiadomość' }).click()
    await expect(page.getByText('Podaj imię.')).toBeVisible()
    await expect(page.getByText('Podaj adres e-mail.')).toBeVisible()
    await expect(page.getByText('Napisz wiadomość.')).toBeVisible()
    await expect(page.getByText('Zgoda na przetwarzanie danych jest wymagana.')).toBeVisible()
    await expect(page.getByRole('alert')).toContainText('Formularz zawiera błędy')
  })

  test('walidacja: niepoprawny e-mail', async ({ page }) => {
    await presetConsent(page)
    await page.goto('/kontakt')
    await page.getByLabel('Imię', { exact: false }).first().fill('Jan')
    await page.getByLabel('E-mail').fill('to-nie-jest-email')
    await page.getByLabel('Wiadomość', { exact: true }).fill('Dzień dobry, proszę o kontakt.')
    await page.getByLabel(/Wyrażam zgodę/).check()
    await page.getByRole('button', { name: 'Wyślij wiadomość' }).click()
    await expect(page.getByText(/Podaj prawidłowy adres e-mail/)).toBeVisible()
  })

  test('poprawne wysłanie pokazuje potwierdzenie i blokuje ponowną wysyłkę', async ({ page }) => {
    await presetConsent(page)
    await page.goto('/kontakt')
    await page.getByLabel('Imię', { exact: false }).first().fill('Jan')
    await page.getByLabel('E-mail').fill('jan@przyklad.pl')
    await page.getByLabel('Wiadomość', { exact: true }).fill('Dzień dobry, proszę o kontakt w sprawie coachingu.')
    await page.getByLabel(/Wyrażam zgodę/).check()
    await page.getByRole('button', { name: 'Wyślij wiadomość' }).click()
    // w trakcie wysyłania przycisk jest zablokowany (etykieta „Wysyłam…")
    await expect(page.getByRole('button', { name: 'Wysyłam…' })).toBeDisabled()
    await expect(page.getByRole('status')).toContainText('Wiadomość przyjęta', { timeout: 5000 })
  })
})

test.describe('Formularz B2B (Dla firm)', () => {
  test('walidacja wymaganych pól', async ({ page }) => {
    await presetConsent(page)
    await page.goto('/dla-firm')
    await page.getByRole('button', { name: 'Wyślij zapytanie' }).click()
    await expect(page.getByText('Podaj imię i nazwisko.')).toBeVisible()
    await expect(page.getByText('Podaj nazwę firmy.')).toBeVisible()
    await expect(page.getByText('Podaj numer telefonu.')).toBeVisible()
    await expect(page.getByText('Wybierz rodzaj usługi.')).toBeVisible()
    await expect(page.getByText('Wybierz liczbę uczestników.')).toBeVisible()
  })

  test('pełne wypełnienie kończy się ekranem potwierdzenia', async ({ page }) => {
    await presetConsent(page)
    await page.goto('/dla-firm')
    await page.getByLabel('Imię i nazwisko').fill('Anna Kowalska')
    await page.getByLabel('Nazwa firmy').fill('Testowa Sp. z o.o.')
    await page.getByLabel('Służbowy e-mail').fill('anna@testowa.pl')
    await page.getByLabel('Numer telefonu').fill('+48 600 700 800')
    await page.getByLabel('Rodzaj usługi').selectOption({ label: 'Warsztat / szkolenie' })
    await page.getByLabel('Liczba uczestników').selectOption({ label: '11–16 osób' })
    await page.getByLabel('Wiadomość', { exact: true }).fill('Szukamy warsztatu antywypaleniowego dla zespołu IT.')
    await page.getByLabel(/Wyrażam zgodę/).check()
    await page.getByRole('button', { name: 'Wyślij zapytanie' }).click()
    await expect(page.getByRole('status')).toContainText('Dziękuję za zapytanie', { timeout: 5000 })
  })
})

test.describe('Newsletter', () => {
  test('walidacja i poprawny zapis z lead magnetem', async ({ page }) => {
    await presetConsent(page)
    await page.goto('/wiedza')
    const submit = page.getByRole('button', { name: /Zapisz się i odbierz przewodnik/ })
    await submit.scrollIntoViewIfNeeded()
    await submit.click()
    await expect(page.getByText('Podaj adres e-mail.')).toBeVisible()
    await expect(page.getByText(/Zaznacz zgodę/)).toBeVisible()

    await page.getByLabel('Adres e-mail').fill('test@przyklad.pl')
    await page.getByLabel(/Chcę otrzymywać newsletter/).check()
    await submit.click()
    await expect(page.getByRole('status')).toContainText('Zapis przyjęty', { timeout: 5000 })
    await page.getByRole('link', { name: 'Otwórz przewodnik' }).click()
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Psycholog czy coach?')
  })
})

test.describe('Akordeon FAQ', () => {
  test('rozwija i zwija odpowiedzi, działa z klawiatury', async ({ page }) => {
    await presetConsent(page)
    await page.goto('/faq')
    const triggers = page.locator('.accordion__trigger')
    await expect(triggers).toHaveCount(12)

    const second = triggers.nth(1)
    await expect(second).toHaveAttribute('aria-expanded', 'false')
    await second.click()
    await expect(second).toHaveAttribute('aria-expanded', 'true')
    await expect(page.getByText(/Nie musisz wybierać samodzielnie/)).toBeVisible()

    // Klawiatura: strzałka w dół przenosi fokus, Enter otwiera
    await second.focus()
    await page.keyboard.press('ArrowDown')
    const third = triggers.nth(2)
    await expect(third).toBeFocused()
    await page.keyboard.press('Enter')
    await expect(third).toHaveAttribute('aria-expanded', 'true')
    await expect(second).toHaveAttribute('aria-expanded', 'false')
  })
})
