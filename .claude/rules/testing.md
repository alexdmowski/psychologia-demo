# Testowanie (projekt an-psychologia)

- Przed zakończeniem każdej sesji: `npm run lint` + `npx tsc -b` — oba muszą być czyste.
- Po zmianach obejmujących build/zależności/importy: `npm run build` musi przejść.
- Zakres testów po typach zmian:
  - trasy/nawigacja → `npx playwright test routes.spec.ts`
  - formularze → `forms.spec.ts` (walidacja, błędy, sukces, blokada podwójnej wysyłki)
  - rezerwacja → `booking.spec.ts` (pełny przepływ + płatność demo + localStorage)
  - cookies → `cookies.spec.ts` · klawiatura → `keyboard.spec.ts`
  - zmiany wizualne/layout → `npm run test:mobile` (320/390/430/Pixel 7) + desktop
- Pełny przebieg `npm test` (81 testów) przed oznaczeniem większego etapu jako Done.
- Nowa funkcjonalność = nowy test Playwright w `tests/`; użyj helperów z `tests/helpers.ts`
  (`presetConsent` wycisza baner cookies; `collectErrors` łapie błędy konsoli;
  `hasHorizontalScroll` sprawdza overflow przez visualViewport).
- Selektory: role/label (getByRole/getByLabel) zamiast klas; uwaga na niejednoznaczne
  etykiety — używaj `{ exact: true }` lub zawężaj do kontenera (dialog/nav).
- ZAKAZ oznaczania zadania jako ukończonego przed uruchomieniem właściwych testów
  i sprawdzeniem konsoli przeglądarki.
- Nie zwiększaj timeoutów, żeby ukryć problem — znajdź przyczynę (typowo: element
  niestabilny przez animację/scroll → reducedMotion już ustawione globalnie w configu).
