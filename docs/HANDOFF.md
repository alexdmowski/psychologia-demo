# HANDOFF — przekazanie projektu

## Uruchomienie i weryfikacja

```bash
npm install                      # zależności
npx playwright install chromium  # jednorazowo, dla testów
npm run dev                      # http://localhost:5173
npm run lint && npx tsc -b       # jakość kodu
npm test                         # 81 testów e2e (desktop + mobile)
npm run build                    # produkcja → dist/
npm run preview                  # podgląd builda
npm run screenshots              # zrzuty → artifacts/previews/
```

## Wdrożenie

`dist/` to statyczny SPA — hosting: Netlify/Vercel/Cloudflare Pages lub dowolny serwer
z fallbackiem wszystkich ścieżek na `index.html`. Checklist:

1. Podmień `siteUrl` w `src/content/site.ts` na realną domenę.
2. Zaktualizuj domenę w `public/sitemap.xml` i `public/robots.txt`.
3. Ustaw nagłówki bezpieczeństwa na hostingu (CSP, HSTS, X-Content-Type-Options).
4. HTTPS + przekierowanie HTTP→HTTPS.

## Edycja treści (bez dotykania komponentów)

- Dane specjalistki / telefon / e-mail / adres / godziny → `src/content/site.ts`
- Ceny i usługi rezerwacji → `src/content/pricing.ts`
- Opisy usług, warsztaty, statystyki → `src/content/services.ts`
- Opinie → `src/content/testimonials.ts` · FAQ → `src/content/faq.ts`
- Artykuły → `src/content/articles/` (instrukcja: docs/CONTENT_MODEL.md)
- Kolory/typografia → `src/styles/tokens.css`

## Podmiana zdjęć

Wgraj do `public/images/` (portret 4:5 ≥800 px; gabinet/warsztat 3:2 ≥1200 px),
zmień ścieżki i alty w `src/content/images.ts`. Miniatury artykułów:
`public/images/articles/<slug>.*` + pole `image` w pliku artykułu.

## Podłączenie integracji (obecnie symulowane)

| Integracja | Gdzie | Co zrobić |
| --- | --- | --- |
| Formularz kontaktowy | `src/pages/Contact.tsx` → `onSubmit` | zamień `setTimeout` na fetch do API/usługi mailowej; obsłuż błąd sieci (`form-status--error`) |
| Formularz B2B | `src/pages/Business.tsx` → `onSubmit` | jw. |
| Newsletter + lead magnet | `src/components/Newsletter.tsx` | podłącz np. MailerLite/Mailchimp; PDF wyślij w powitalnym mailu |
| Kalendarz dostępności | `src/lib/dates.ts` → `getDaySlots()`, `isDayAvailable()` | zamień hash-generator na zapytanie do API kalendarza |
| Zapis rezerwacji | `src/pages/Booking.tsx` → `confirmBooking()` | POST do backendu/kalendarza; numer rezerwacji z serwera |
| Płatności | `src/pages/Booking.tsx` → krok „Płatność" | podłącz bramkę (Przelewy24/Stripe/PayU); USUŃ komunikat „Płatność demonstracyjna" dopiero wtedy |
| Mapa | `src/pages/Contact.tsx` (`map-block`) | osadź OpenStreetMap/Google Maps (pamiętaj o zgodzie cookies, jeśli Google) |
| Analityka | `src/components/CookieBanner.tsx` | ładuj skrypt WYŁĄCZNIE gdy `consent.analytics === true` |

Wymagane od właściciela: konto/klucze bramki płatności, usługi mailowej, kalendarza,
narzędzia analitycznego oraz domena i hosting. **Żadnych kluczy nie commituj** — użyj
zmiennych środowiskowych hostingu.

## Elementy demonstracyjne (stan obecny)

Fikcyjne: dane specjalistki, opinie, certyfikaty, statystyki, logotypy firm, ceny,
godziny, adres. Symulowane: wysyłka formularzy, płatność, zapis rezerwacji (localStorage),
newsletter. Dokumenty w `src/content/legal/` wymagają weryfikacji prawnej.
Grafiki to placeholdery SVG. Disclaimery demo (stopka, opinie, cennik, płatność)
usuwaj dopiero po zastąpieniu treści realnymi.
