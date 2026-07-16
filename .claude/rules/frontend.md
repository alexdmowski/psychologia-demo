# Frontend (projekt an-psychologia)

- Architektura komponentowa: strona (`src/pages/`) składa sekcje z komponentów i treści;
  komponenty współdzielone w `src/components/`.
- Semantyczny HTML: jeden `<h1>` na stronę, sekwencyjne h2–h4, landmarki (`<nav>`,
  `<main id="tresc">`, `<footer>`), `<button>` dla akcji, `<a>`/`<Link>` dla nawigacji.
- Dane i treści wyłącznie z `src/content/` — nowy tekst biznesowy trafia tam, nie do JSX.
- Każdy asynchroniczny/symulowany proces ma stany: idle → sending (przycisk disabled,
  etykieta „…") → done (ekran sukcesu) / error (`.form-status--error`, role="alert").
- Linki prowadzą tylko do istniejących tras z `App.tsx`; nowa trasa = App.tsx +
  nawigacja w `content/site.ts` + `public/sitemap.xml`.
- Przyciski zawsze wykonują realną akcję; funkcje demo mają widoczne oznaczenie.
- Style tylko przez tokeny i klasy z design systemu (docs/DESIGN_SYSTEM.md);
  zakaz przypadkowych hexów, cieni i promieni w inline-style poza drobną kompozycją layoutu.
- Elementy `position: fixed` NIGDY wewnątrz `.site-header` (backdrop-filter) — użyj portalu.
- Obrazy: wymiary width/height + `loading="lazy"` poniżej pierwszego ekranu + sensowny alt
  (lub alt="" dla dekoracji); w CSS pamiętaj o `height: auto` gdy używasz aspect-ratio.
