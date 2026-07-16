# ARCHITECTURE

> Aktualizuj po zmianach architektonicznych.

## Stos

Vite 8 · React 19 · TypeScript (strict) · react-router-dom · czysty CSS (tokeny) ·
Playwright · oxlint. Brak backendu — wszystkie funkcje demo są frontendowe.

## Struktura katalogów

```
src/
  main.tsx            # bootstrap: fonty, style (kolejność!), BrowserRouter
  App.tsx             # WSZYSTKIE trasy (jedno źródło prawdy o routingu)
  components/         # współdzielone: Layout, Header, Footer, CookieBanner,
                      # Accordion, Seo, Reveal, Icon, PageHero, CtaBand,
                      # Newsletter, Thread (sygnatura marki)
  pages/              # 1 plik = 1 trasa (18 stron)
  content/            # CAŁA treść demonstracyjna (typy w types.ts)
    articles/         # 6 artykułów + index.ts (sort, kategorie, related)
    legal/            # 4 dokumenty + index.ts
  lib/                # dates (kalendarz demo), ics, storage, validate, useFocusTrap
  styles/             # tokens → base → layout → components → pages (ta kolejność importu)
tests/                # Playwright: routes, forms, booking, cookies, keyboard, mobile
scripts/screenshots.mjs  # zrzuty → artifacts/previews/ + public/og-image.png
public/               # images/ (SVG), favicon, og-image.png, robots.txt, sitemap.xml
```

## Przepływ danych

Treść: `src/content/*.ts` → import w stronach/komponentach. Komponenty NIE zawierają
twardych treści biznesowych (teksty sekcji stron mieszkają w pages/, dane — w content/).

## Routing

Deklaratywnie w `App.tsx`, wrapper `Layout` (skip-link, Header, main#tresc, Footer,
StickyCta, CookieBanner, ScrollToTop). Nowa trasa = wpis w `App.tsx` + link w
`content/site.ts` (nav) + `public/sitemap.xml`.

## Formularze

Wzorzec (Contact/Business/Newsletter): stan `values` + `errors` + `status
('idle'|'sending'|'done')`; walidacja z `lib/validate.ts` (polskie komunikaty);
`aria-invalid` + `aria-describedby` na polach; `role="alert"` przy błędach zbiorczych;
honeypot (`website`, klasa .visually-hidden); symulowana wysyłka `setTimeout` —
**punkt integracji produkcyjnej = funkcja onSubmit**.

## Rezerwacja (`pages/Booking.tsx`)

Maszyna kroków 0–5 (usługa → forma → termin → dane → podsumowanie → płatność) +
widok potwierdzenia. Usługi z `content/pricing.ts` (`bookingServices`). Preselekcja
`?usluga=<id>`. Dostępność terminów: `lib/dates.ts` (deterministyczny hash,
horyzont 42 dni). Płatność wyłącznie demo (komunikat wymagany!). Potwierdzenie:
numer `AN-RRRR-XXXX`, eksport .ics (`lib/ics.ts`), zapis localStorage.

## Local storage (`lib/storage.ts`)

Klucze: `an-cookie-consent` (zgody), `an-last-booking` (ostatnia rezerwacja),
`an-newsletter` (zapis). Wyłącznie przez `readStorage/writeStorage` (bezpieczne try/catch).

## Walidacja

`lib/validate.ts`: `required`, `validEmail`, `optionalPhone`, `requiredPhone`,
typ `Errors<T>`. Nie duplikuj regexów w komponentach.

## SEO / metadane

Komponent `components/Seo.tsx` na każdej stronie: title, description, canonical,
OG/Twitter, opcjonalny JSON-LD per strona. Globalny JSON-LD (ProfessionalService)
w `index.html`. `siteUrl` w `content/site.ts` — podmień przy wdrożeniu.

## Testy

Playwright, konfiguracja `playwright.config.ts`: projekt `desktop` (1440×900,
ignoruje mobile.spec) + 4 projekty mobilne (tylko mobile.spec; iPhone'y na silniku
chromium — decyzja w DECISIONS.md). `reducedMotion: 'reduce'` globalnie.
Helpery w `tests/helpers.ts` (presetConsent, collectErrors, hasHorizontalScroll
przez visualViewport, bookingToPersonalData). webServer reuse: 5173.

## Pułapki znane w tym projekcie

1. `backdrop-filter` na headerze = containing block dla fixed → elementy fixed
   z wnętrza headera renderuj portalem do body.
2. Dzieci gridów `1fr` z długimi treściami wymagają `min-width: 0`.
3. Atrybuty width/height na <img> nadpisują CSS `aspect-ratio` — daj `height: auto` w CSS.
4. Polskie cudzysłowy „" w JSX pisz w `{'…'}`, nie w atrybucie "…".

## Przyszłe punkty integracyjne

Formularze → onSubmit; kalendarz → `getDaySlots()/isDayAvailable()`; płatność →
krok 5 Booking; newsletter → `Newsletter.tsx`; analityka → `CookieBanner` (ładuj
tylko po zgodzie). Szczegóły: docs/HANDOFF.md.
