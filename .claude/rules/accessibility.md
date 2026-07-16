# Dostępność (projekt an-psychologia)

- Nagłówki: jeden h1 na stronę, hierarchia bez przeskoków; landmarki już istnieją — utrzymuj.
- Pełna obsługa klawiaturą: każda interakcja osiągalna Tabem w logicznej kolejności;
  Escape zamyka modale/menu/dropdown; wzorce strzałek w akordeonie (WAI-ARIA) zachowaj.
- Fokus: nie usuwaj globalnego `:focus-visible` (3 px, `--focus-ring`); w modalach
  i menu mobilnym używaj `lib/useFocusTrap.ts` (pułapka + przywrócenie fokusu).
- Kontrast: tekst ≥ 4,5:1, duży tekst/UI ≥ 3:1 — nowe kolory tylko z tokenów,
  na jasnym tle tekst miedziany to `--copper-text` (nie `--copper`).
- Formularze: `<label htmlFor>` zawsze; błędy przez `aria-invalid` +
  `aria-describedby` wskazujące element z komunikatem; zbiorczy błąd `role="alert"`.
- ARIA tylko gdy HTML nie wystarcza; nigdy `aria-hidden="true"` na elementach fokusowalnych;
  dynamiczne wyniki (licznik artykułów) w `aria-live="polite"`.
- Animacje respektują `prefers-reduced-motion` (mechanizm globalny w base.css +
  komponent `Reveal` — nie obchodź go).
- Alty: opisowe dla treściowych, `alt=""` + `aria-hidden` dla dekoracji (Thread, ikony).
- Informacja nigdy wyłącznie kolorem — status zawsze z tekstem/ikoną (wzór: `.field-error` ⚠).
- Test po zmianach interakcji: `npx playwright test keyboard.spec.ts` + ręczny Tab-through.
