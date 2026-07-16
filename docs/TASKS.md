# TASKS

> Statusy: Backlog → Ready → In progress → Blocked → Done.
> Po ukończeniu przenoś zadanie do Done (z datą i informacją o testach).

## Backlog (produkcyjne, po akceptacji demo)

- **Podmiana zdjęć AI na prawdziwe fotografie specjalistki**
  Kryteria: portret 4:5, gabinet, warsztat w `src/assets/photos/`; aktualne importy i alty w `src/content/images.ts`; testy wizualne desktop+mobile. (Obecnie: zdjęcia AI — wystarczające dla demo.)
- **Integracja wysyłki formularzy** (kontakt, B2B)
  Kryteria: realny endpoint/e-mail, obsługa błędów sieci, zachowana walidacja; testy Playwright zaktualizowane. Zależność: wybór usługi (np. własne API / Formspree).
- **Integracja newslettera** (np. MailerLite)
  Kryteria: double opt-in, wysyłka lead magnetu PDF; zgoda marketingowa przekazywana.
- **Prawdziwy kalendarz dostępności + rezerwacje**
  Kryteria: podmiana `getDaySlots()` w `src/lib/dates.ts` na API; blokada podwójnych rezerwacji. Zależność: wybór backendu/kalendarza.
- **Bramka płatności** (np. Przelewy24/Stripe)
  Kryteria: krok „Płatność" w `src/pages/Booking.tsx` podpięty do bramki; usunięcie komunikatu demo. Zależność: umowa z operatorem.
- **Analityka za zgodą** (np. Plausible/GA4)
  Kryteria: skrypt ładowany wyłącznie po zgodzie „analityczne" z banera cookies.
- **Weryfikacja prawna dokumentów** (`src/content/legal/`)
  Kryteria: akceptacja prawnika; usunięcie plakietek „przykładowy"; NIP/REGON uzupełnione.
- **Wdrożenie na hosting** (statyczny + SPA fallback)
  Kryteria: HTTPS, przekierowania, nagłówki bezpieczeństwa (CSP, HSTS), realna domena w `siteUrl` (`src/content/site.ts`), sitemap z nową domeną.
- **Testy WebKit/Safari** — `npx playwright install webkit` + usunięcie wymuszenia chromium z projektów iPhone w `playwright.config.ts`.

## Ready

*(pusto)*

## In progress

*(pusto)*

## Blocked

*(pusto — wszystkie zadania z Backlogu wymagają decyzji/danych dostępowych od właściciela)*

## Done

- ✅ 2026-07-16 — Scaffold Vite+React+TS, design system, tokeny (lint/tsc pass)
- ✅ 2026-07-16 — Model treści + wszystkie treści w `src/content/` (10 plików przez agentów)
- ✅ 2026-07-16 — Ilustracje SVG, favicon, og-image, fikcyjne logotypy
- ✅ 2026-07-16 — Layout: Header (dropdown + menu mobilne przez portal), Footer, CookieBanner, StickyCta
- ✅ 2026-07-16 — 18 podstron, w tym Dla firm z formularzem B2B
- ✅ 2026-07-16 — System rezerwacji z płatnością demo i .ics (testy e2e pass)
- ✅ 2026-07-16 — SEO: meta/canonical/OG/JSON-LD/sitemap/robots
- ✅ 2026-07-16 — 81 testów Playwright (desktop + 4 profile mobilne) — wszystkie zielone
- ✅ 2026-07-16 — Zrzuty ekranu w `artifacts/previews/` (11 plików)
- ✅ 2026-07-16 — README + dokumentacja projektu + konfiguracja Claude Code
- ✅ 2026-07-16 — Fotorealistyczne zdjęcia AI (portret/gabinet/warsztat) zamiast ilustracji; 81/81 testów
- ✅ 2026-07-16 — Build single-file `build:share` + publikacja jako Artifact (link do udostępnienia); smoke test hash-routingu OK
