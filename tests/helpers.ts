import type { Page } from '@playwright/test'

/** Wycisza baner cookies (ustawia zgodę przed załadowaniem strony). */
export async function presetConsent(page: Page): Promise<void> {
  await page.addInitScript(() => {
    window.localStorage.setItem(
      'an-cookie-consent',
      JSON.stringify({ necessary: true, analytics: false, marketing: false, decidedAt: '2026-01-01T00:00:00.000Z' }),
    )
  })
}

/** Zbiera błędy konsoli i wyjątki strony. */
export function collectErrors(page: Page): string[] {
  const errors: string[] = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text())
  })
  page.on('pageerror', (err) => errors.push(err.message))
  return errors
}

/**
 * Sprawdza brak poziomego przewijania. Na urządzeniach mobilnych layout
 * viewport potrafi się rozszerzyć do szerokości treści (innerWidth rośnie),
 * dlatego porównujemy z realną szerokością visual viewport.
 */
export async function hasHorizontalScroll(page: Page): Promise<boolean> {
  return page.evaluate(() => {
    const viewport = window.visualViewport
      ? Math.round(window.visualViewport.width * window.visualViewport.scale)
      : window.innerWidth
    return document.documentElement.scrollWidth > viewport + 1
  })
}

/** Przechodzi pełny proces rezerwacji do kroku danych osobowych. */
export async function bookingToPersonalData(page: Page): Promise<void> {
  await page.goto('/rezerwacja')
  await page.getByRole('button', { name: /Konsultacja psychologiczna/ }).click()
  await page.getByRole('button', { name: 'Online', exact: false }).first().click()
  await page.getByRole('button', { name: /Dalej: termin/ }).click()
  const day = page.locator('.day-cell[data-available="true"]').first()
  await day.click()
  await page.locator('.slot-btn').first().click()
  await page.getByRole('button', { name: /Dalej: Twoje dane/ }).click()
}
