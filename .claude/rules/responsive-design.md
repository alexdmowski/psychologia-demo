# Responsywność (projekt an-psychologia)

- Mobile-first: projektuj od 320 px w górę; widok mobilny to NIE pomniejszony desktop —
  przemyśl kolejność treści i ergonomię kciuka.
- Zero poziomego scrolla na każdej szerokości; weryfikacja: helper `hasHorizontalScroll`
  z `tests/helpers.ts` (porównuje z visualViewport — innerWidth kłamie na mobile).
- Długie treści (e-maile, URL-e) w gridach/flex: `min-width: 0` na dziecku +
  `overflow-wrap: anywhere` na tekście.
- Pola dotykowe ≥ 44×44 px (przyciski mają min-height 48 px z design systemu).
- Inputy z font-size ≥ 1rem (16 px) — inaczej iOS powiększa stronę przy fokusie.
- Safe-area: elementy przyklejone do dołu ekranu używają `env(safe-area-inset-bottom)`
  (wzór: `.sticky-cta`, `.mobile-menu`).
- Stały mobilny CTA nie może zasłaniać treści (body.has-sticky-cta daje padding) ani
  występować na /rezerwacja.
- Po każdej zmianie wizualnej przetestuj kluczowe funkcje na małym (320 px) i dużym
  (430 px) telefonie: `npm run test:mobile` + w razie wątpliwości zrzut ekranu.
- Breakpointy tylko z istniejącego zestawu (560/640/760/860/900/960/1020/1120) —
  nie wprowadzaj nowych bez potrzeby.
