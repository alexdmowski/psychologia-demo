// Prosta, czytelna walidacja formularzy z polskimi komunikatami.

export const isEmail = (value: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())

export const isPhone = (value: string): boolean =>
  /^[+\d][\d\s-]{7,15}$/.test(value.trim())

export function required(value: string, message: string): string | null {
  return value.trim() ? null : message
}

export function validEmail(value: string): string | null {
  if (!value.trim()) return 'Podaj adres e-mail.'
  return isEmail(value) ? null : 'Podaj prawidłowy adres e-mail, np. jan@przyklad.pl.'
}

export function optionalPhone(value: string): string | null {
  if (!value.trim()) return null
  return isPhone(value) ? null : 'Podaj prawidłowy numer telefonu, np. +48 500 600 700.'
}

export function requiredPhone(value: string): string | null {
  if (!value.trim()) return 'Podaj numer telefonu.'
  return isPhone(value) ? null : 'Podaj prawidłowy numer telefonu, np. +48 500 600 700.'
}

export type Errors<T extends string> = Partial<Record<T, string>>
