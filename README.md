# Aleksandra Nowicka — Psychologia i Rozwój (wersja demonstracyjna)

Kompletna, responsywna strona demonstracyjna specjalistki łączącej konsultacje psychologiczne,
coaching oraz warsztaty i wystąpienia dla firm.

> **Wersja demonstracyjna** — wszystkie dane, opinie i informacje o specjalistce są fikcyjne.

## Szybki start

```bash
npm install          # instalacja zależności
npm run dev          # serwer deweloperski → http://localhost:5173
npm run build        # build produkcyjny (tsc + vite) → dist/
npm run preview      # podgląd builda produkcyjnego
npm run lint         # oxlint
npm test             # testy Playwright (desktop + 4 profile mobilne)
npm run test:desktop # tylko desktop 1440×900
npm run test:mobile  # tylko urządzenia mobilne (320/390/430/Pixel 7)
npm run screenshots  # zrzuty ekranu → artifacts/previews/ + public/og-image.png
npm run build:share  # samowystarczalny plik HTML (HashRouter) → dist-artifact/artifact.html
npm run preview:share # lokalny podgląd wersji single-file (port 4174)
```

Wersja „do udostępnienia linkiem": `build:share` tworzy jeden plik HTML z osadzonymi
zasobami — można go opublikować w dowolnym miejscu (Artifact na claude.ai, Netlify Drop,
załącznik) i strona działa w całości, łącznie z rezerwacją.

Przy pierwszym uruchomieniu testów: `npx playwright install chromium`.

## Stos technologiczny

- **Vite 8 + React 19 + TypeScript** — SPA z routingiem `react-router-dom`
- czysty CSS z design tokens (bez frameworków CSS) — `src/styles/tokens.css`
- czcionki lokalne (`@fontsource-variable`: Fraunces + Albert Sans) — zero zewnętrznych żądań
- testy: Playwright (81 testów: trasy, formularze, rezerwacja, cookies, klawiatura, mobile)

## Gdzie edytować treści (centralne zarządzanie)

| Plik | Zawartość |
| --- | --- |
| `src/content/site.ts` | **dane specjalistki** (imię, telefon, e-mail, adres, godziny), nawigacja, social media, biografia, kwalifikacje, wartości, proces |
| `src/content/services.ts` | opisy usług, obszary wsparcia, tematy warsztatów, statystyki B2B, fikcyjne logotypy |
| `src/content/pricing.ts` | **ceny**, karty cennika, usługi w systemie rezerwacji, zasady płatności |
| `src/content/testimonials.ts` | opinie (wszystkie oznaczone jako demonstracyjne) |
| `src/content/faq.ts` | pytania i odpowiedzi FAQ |
| `src/content/articles/*.ts` | artykuły bazy wiedzy (6 szt.) |
| `src/content/legal/*.ts` | dokumenty formalne (4 szt., wymagają weryfikacji prawnej) |
| `src/content/images.ts` | ścieżki i opisy alternatywne obrazów |
| `src/styles/tokens.css` | **paleta kolorów**, typografia, cienie, promienie |

## Zdjęcia

Fotorealistyczne zdjęcia (portret, gabinet, warsztat) w `src/assets/photos/` są
**wygenerowane przez AI** (image.pollinations.ai, model FLUX) — nie przedstawiają
prawdziwych osób ani miejsc. Aby podmienić na prawdziwe fotografie:

1. Wgraj plik do `src/assets/photos/` (portret: pion 4:5, min. 800 px szerokości).
2. Podmień import i tekst `alt` w `src/content/images.ts`.
3. Miniatury artykułów (abstrakcyjne SVG): `src/assets/articles/` + mapa slug→obraz w `src/content/articles/index.ts`.

## Elementy demonstracyjne (do podłączenia w produkcji)

| Funkcja | Stan w demo | Punkt integracji |
| --- | --- | --- |
| Formularz kontaktowy | symulacja wysyłki (bez serwera) | `src/pages/Contact.tsx` → `onSubmit` |
| Formularz B2B | symulacja wysyłki | `src/pages/Business.tsx` → `onSubmit` |
| Newsletter | zapis w localStorage | `src/components/Newsletter.tsx` |
| Dostępność terminów | generowana deterministycznie | `src/lib/dates.ts` → `getDaySlots()` |
| Zapis rezerwacji | localStorage + numer AN-RRRR-XXXX | `src/pages/Booking.tsx` → `confirmBooking()` |
| Płatności (BLIK, karta, przelew, Apple/Google Pay) | wyłącznie interfejs, żadna transakcja nie jest wykonywana | `src/pages/Booking.tsx` → krok „Płatność" |
| Mapa dojazdu | statyczna grafika SVG | `src/pages/Contact.tsx` |
| Analityka | brak (kategorie zgód gotowe) | `src/components/CookieBanner.tsx` |

Wymagane później realne dane dostępowe: bramka płatności, usługa e-mail/newsletter
(np. MailerLite), kalendarz (np. Google Calendar API), mapa (Google Maps/OpenStreetMap),
narzędzie analityczne (podpinane wyłącznie po zgodzie z banera cookies).

## Struktura

```
src/
  components/   # Header (menu + dropdown), Footer, CookieBanner, Accordion, Seo…
  content/      # WSZYSTKIE treści demonstracyjne (patrz tabela wyżej)
  lib/          # dates (kalendarz), ics (eksport do kalendarza), storage, walidacja
  pages/        # 18 podstron (Home, About, Booking, Business, Knowledge…)
  styles/       # tokens → base → layout → components → pages
tests/          # testy Playwright
scripts/        # generator zrzutów ekranu
public/         # obrazy, favicon, og-image, robots.txt, sitemap.xml
artifacts/previews/  # zrzuty ekranu (desktop + mobile)
```

## Dostępność i SEO

- WCAG: nawigacja klawiaturą, focus-visible, pułapki fokusu w modalach, ARIA w akordeonie,
  menu i kreatorze rezerwacji, `prefers-reduced-motion`, link „Przejdź do treści"
- SEO: unikalne tytuły/opisy podstron, canonical, Open Graph + obraz, JSON-LD
  (ProfessionalService, FAQPage, Article), sitemap.xml, robots.txt

## Uwaga prawna

Dokumenty w `src/content/legal/` oraz zapisy o RODO są **przykładowe** i przed
publikacją produkcyjną wymagają weryfikacji przez prawnika.
