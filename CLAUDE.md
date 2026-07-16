# CLAUDE.md — konstytucja projektu

## Tożsamość

- **Projekt:** „Aleksandra Nowicka — Psychologia i Rozwój" (nazwa robocza: an-psychologia)
- Premium **demonstracyjna** strona fikcyjnej psycholożki, coachki i trenerki biznesu.
- Cel biznesowy: prowadzić do rezerwacji spotkania / wiadomości / zapytania B2B.
- Odbiorcy: (1) osoby szukające wsparcia psychologicznego, (2) klienci coachingowi, (3) firmy.
- **Wszystkie dane osobowe, opinie, certyfikaty i ceny są fikcyjne** i muszą być tak oznaczane.
- Nadrzędne wymaganie: najwyższa jakość na desktopie i mobile (od 320 px).

@docs/PROJECT_BRIEF.md
@docs/CURRENT_STATE.md

## Standard jakości (nienegocjowalny)

1. Projekt nie może wyglądać jak typowy szablon AI — trzymaj się design systemu i sygnatur marki.
2. Każda podstrona, link i przycisk musi realnie działać (zero atrap bez czytelnego oznaczenia „demo").
3. Mobile-first; zero poziomego scrolla; pola dotykowe ≥ 44 px.
4. Zero błędów: TypeScript, oxlint, build, konsola przeglądarki.
5. Zero „Lorem ipsum".
6. Zero nieetycznych obietnic medycznych/terapeutycznych; konsultacje ≠ psychoterapia.
7. Każda zmiana zachowuje dostępność (WCAG) i responsywność — obie sprawdzone przed zakończeniem.

## Architektura (skrót — szczegóły: docs/ARCHITECTURE.md)

- Vite 8 + React 19 + TypeScript strict + react-router (SPA). Trasy: `src/App.tsx`.
- Komponenty współdzielone: `src/components/`; strony 1:1 z trasami: `src/pages/`.
- **Cała treść** w `src/content/` (typy: `content/types.ts`) — nie hardkoduj danych w komponentach.
- Style: czysty CSS z tokenami — `src/styles/` (kolejność: tokens → base → layout → components → pages);
  wartości wyłącznie z tokenów (docs/DESIGN_SYSTEM.md).
- Formularze: wzorzec values/errors/status + `lib/validate.ts` + aria-invalid/describedby + honeypot;
  wysyłka symulowana (punkty integracji: docs/HANDOFF.md).
- Rezerwacja: `pages/Booking.tsx` (kroki 0–5) + deterministyczne terminy z `lib/dates.ts`.
- Pamięć przeglądarki: tylko przez `lib/storage.ts` (klucze `an-*`).
- Testy: Playwright w `tests/` (desktop + 4 profile mobilne), helpery w `tests/helpers.ts`.
- SEO: komponent `components/Seo.tsx` na każdej stronie + statyczne sitemap/robots w `public/`.

## Komendy (zweryfikowane w package.json)

```bash
npm install              # zależności (+ raz: npx playwright install chromium)
npm run dev              # dev server → http://localhost:5173
npm run lint             # oxlint
npx tsc -b               # typecheck
npm test                 # wszystkie testy Playwright (81)
npm run test:desktop     # tylko desktop
npm run test:mobile      # tylko profile mobilne (320/390/430/Pixel 7)
npm run build            # produkcyjny build (tsc + vite) → dist/
npm run preview          # serwuje dist/
npm run screenshots      # zrzuty → artifacts/previews/ + public/og-image.png (wymaga dev servera)
```

Nie ma testów jednostkowych — pokrycie zapewniają testy e2e Playwright.

## Obowiązkowy workflow

1. Przed rozpoczęciem zadania przeczytaj `docs/CURRENT_STATE.md`.
2. Sprawdź `docs/TASKS.md` (statusy, zależności).
3. Przed istotną decyzją sprawdź `docs/DECISIONS.md` — nie podejmuj jej wyłącznie na
   podstawie starego czatu.
4. Po każdym ukończonym etapie zaktualizuj dokumentację (CURRENT_STATE, TASKS,
   ewentualnie DECISIONS/KNOWN_ISSUES/ARCHITECTURE/DESIGN_SYSTEM).
5. Przed zakończeniem sesji uruchom właściwe testy (`npm test` lub celowany projekt).
6. Nie deklaruj ukończenia funkcji, której działania nie zweryfikowano.
7. Po zmianach wizualnych sprawdź desktop **i** mobile (320 px minimum).
8. Po zmianach formularzy przetestuj walidację, stany błędów i sukcesu.
9. Powtarzalne odkrycia zapisuj w `docs/` lub auto memory.

## Protokół startu sesji

`CLAUDE.md` → PROJECT_BRIEF → CURRENT_STATE → aktywne TASKS → `git status` →
porównaj dokumentację z realnym kodem (stary czat ≠ prawda); rozbieżności popraw
w dokumentacji zanim zaczniesz nowe zadanie.

## Protokół końca sesji

Testy → build (jeśli zakres wymaga) → konsola bez błędów → aktualizacja
CURRENT_STATE + TASKS (+ DECISIONS/KNOWN_ISSUES gdy dotyczy) → krótkie podsumowanie
dla użytkownika: co zrobiono / co przetestowano / co zostało / blokery / następny krok.

## Reguły i agenci

- Szczegółowe reguły: `.claude/rules/` (code-quality, frontend, responsive-design,
  accessibility, testing, content-ethics, security-privacy).
- Wyspecjalizowani subagenci: `.claude/agents/` — używaj ich do audytów, QA,
  architektury, UX, dostępności; główny agent integruje i odpowiada za wynik.
- Dokumenty czytane na żądanie: ARCHITECTURE, DESIGN_SYSTEM, CONTENT_MODEL,
  KNOWN_ISSUES, HANDOFF, DECISIONS, TASKS (nie są importowane automatycznie).

## Pułapki specyficzne dla tego repo

- `backdrop-filter` na headerze = containing block dla `position: fixed` → elementy
  fixed montowane w headerze renderuj portalem do `document.body`.
- Dzieci gridów `1fr` z długimi treściami (e-maile!) wymagają `min-width: 0`.
- Atrybuty width/height na `<img>` biją CSS `aspect-ratio` — dodawaj `height: auto`.
- Polskie cudzysłowy „…" w atrybutach JSX pisz przez `{'…'}`.
- Windows/PowerShell: brak `&&` w PS 5.1; preferuj narzędzie Bash dla poleceń łańcuchowych.
