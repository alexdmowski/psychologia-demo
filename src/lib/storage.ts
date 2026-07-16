// Bezpieczne opakowanie localStorage (SSR/tryb prywatny nie wywala aplikacji).

export function readStorage<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

export function writeStorage<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // brak dostępu do localStorage — świadomie ignorujemy (tryb prywatny)
  }
}

export const STORAGE_KEYS = {
  cookieConsent: 'an-cookie-consent',
  lastBooking: 'an-last-booking',
  newsletter: 'an-newsletter',
} as const
