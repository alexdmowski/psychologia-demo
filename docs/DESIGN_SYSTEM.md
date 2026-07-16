# DESIGN SYSTEM

> Źródło prawdy: `src/styles/tokens.css`. Nowe komponenty używają tokenów —
> zakaz przypadkowych wartości kolorów/cieni/promieni w komponentach.

## Kolory (CSS custom properties)

| Token | Wartość | Rola |
| --- | --- | --- |
| `--paper` | #faf7f2 | główne tło (złamana biel) |
| `--paper-2` | #f4eee4 | sekcje naprzemienne (`.section--tinted`) |
| `--sand` | #ece3d3 | mocniejszy beż (newsletter, blob portretu) |
| `--pine` / `--pine-deep` | #21403a / #182f2a | kolor prowadzący; przyciski primary; sekcje ciemne; stopka |
| `--pine-tint` | #dfe7e0 | tła ikon „firmy" |
| `--sage` / `--sage-strong` / `--sage-tint` | #8fa08b / #5f7360 / #e9efe6 | ścieżka psychologia; akcenty ikon; zaznaczenia kalendarza |
| `--copper` / `--copper-text` / `--copper-tint` / `--copper-light` | #a9653b / #8c4f2a / #f2e3d6 / #e5b183 | akcent marki („nić"), eyebrow, linki; `-text` = bezpieczny kontrastowo; `-light` na ciemnym tle |
| `--ink` / `--text` / `--muted` | #233029 / #3a4642 / #5c6a64 | nagłówki / tekst / drugorzędny (≥4,5:1 na paper) |
| `--on-dark` / `--on-dark-muted` | #f4f1ea / #c3cdc4 | tekst na zieleni |
| `--line` / `--line-soft` | #ddd3c2 / #e9e1d3 | obramowania |
| `--danger`, `--success` (+ `-bg`) | #a23325, #3c684d | walidacja / statusy |
| `--focus-ring` | #8c4f2a (na ciemnym: `--copper-light` przez `.on-dark`) | focus-visible |

**Kodowanie ścieżek klienta:** psychologia = sage, coaching = copper, firmy = pine
(atrybut `data-area` na kartach/chipach — to informacja, nie dekoracja).

## Typografia

- Display: `--font-display` = Fraunces Variable (`opsz` 40, weight 560, letter-spacing −0.01em) — h1–h3, ceny, cytaty, numer rezerwacji
- Tekst/UI: `--font-body` = Albert Sans Variable — body 1.0625rem/1.65, h4, przyciski
- Skala clamp: h1 2.05→3.4rem · h2 1.6→2.35rem · h3 1.2→1.45rem
- Eyebrow: 0.8rem, 700, letter-spacing 0.14em, uppercase, copper + kreska 26 px

## Layout i spacing

- Kontener: `--container` 1180 px; `.container` = min(100% − 2.5rem, 1180px)
- Sekcje: `.section` padding-block clamp(3.5rem…6.5rem); rytm teł: paper → paper-2 → pine
- Breakpointy (max-width): 560/640/760/860/900/960/1020/1120 (nav desktop ≥1120)
- Header: `--header-h` 76 px, sticky, blur

## Kształty, cienie, animacje

- Radius: `--radius-s/m/l` = 10/16/24 px; przyciski pill (999px)
- Cienie: `--shadow-card` (spoczynek), `--shadow-lift` (hover/modale)
- Wejścia: `.reveal` (opacity+translateY 0.65s, IntersectionObserver) — wyłączane
  przez `prefers-reduced-motion`; hover kart: translateY(−4px) + lift

## Komponenty (klasy)

- Przyciski: `.btn` + `--primary` (pine/biały) `--secondary` (outline pine)
  `--light`/`--outline-light` (na ciemnym) `--small` `--block`; min-height 48 px
- Karty: `.soft-card` (bazowa), `.path-card` (data-area, top-border 4px),
  `.price-card` (+ `--highlight` copper), `.testimonial` (+ `--company` na pine),
  `.article-card` (obraz 16:9 + `height:auto`!)
- Formularze: `.field` (label 600 + input 48px, focus ring sage), `.field-error`
  (⚠ + danger), `.check-field`, `.form-status--error/success`, `.form-success`
- Inne: `.accordion` (WAI-ARIA), `.chip` (aria-pressed), `.steps/.step` (licznik CSS),
  `.eyebrow`, `.brand-quote`, `.cta-band`, `.stat`, `.logo-mark`, `.thread` (sygnatura)
- Rezerwacja: `.booking-progress`, `.booking-card`, `.option-tile`, `.day-cell`,
  `.slot-btn`, `.summary-box`, `.pay-tile`, `.pay-demo-alert`, `.booking-number`

## Stany interaktywne

hover (kolor/cień/transform) · focus-visible (outline 3px `--focus-ring`, offset 3px) ·
active (translateY 1px) · disabled (opacity + not-allowed) · aria-pressed/selected
(pine wypełnienie) · aria-invalid (border danger)

## Mobile-first / dostępność wizualna

Pola dotykowe ≥44 px; inputy font-size ≥1rem (brak zoomu iOS); safe-area w sticky CTA
i menu; kontrast tekstu ≥4,5:1, elementów UI ≥3:1; informacja nigdy tylko kolorem
(ikony/etykiety towarzyszą); grid-dzieci z długimi treściami: `min-width: 0`.
