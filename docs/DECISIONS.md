# DECISIONS — dziennik decyzji projektowych

> Dopisuj nowe decyzje na końcu. Nie nadpisuj historycznych wpisów.
> Nie notuj drobnych zmian kosmetycznych.

## 2026-07-16 — Stos: Vite + React SPA zamiast Next.js

- **Problem:** wybór frameworka dla wielostronicowej strony demo z systemem rezerwacji.
- **Rozważane:** Next.js (SSR/SSG), Astro, Vite+React SPA.
- **Wybrano:** Vite + React + react-router (SPA).
- **Uzasadnienie:** brak backendu w demo, cała logika frontendowa; najszybszy dev-loop na
  Windows; SEO rozwiązane przez komponent `Seo` + statyczne sitemap/robots/JSON-LD.
- **Konsekwencje:** hosting wymaga SPA fallback; przy realnym wdrożeniu z blogiem można
  rozważyć migrację do SSG. **Odwracalna:** tak, treści w `src/content/` są przenośne.

## 2026-07-16 — Czysty CSS z tokenami zamiast Tailwind/UI-kit

- **Problem:** premium wygląd „nie jak szablon AI" + pełna kontrola.
- **Wybrano:** ręczny design system w 5 plikach CSS (`tokens → base → layout → components → pages`).
- **Uzasadnienie:** unikalna estetyka, mały bundle (8,5 kB gzip), zero zależności.
- **Konsekwencje:** nowe komponenty muszą używać tokenów (patrz DESIGN_SYSTEM.md). Odwracalna: częściowo.

## 2026-07-16 — Czcionki lokalne przez @fontsource (Fraunces + Albert Sans)

- **Problem:** premium typografia bez zewnętrznych żądań (RODO/wydajność).
- **Wybrano:** `@fontsource-variable/fraunces` (opsz) + `@fontsource-variable/albert-sans`; oba mają latin-ext (polskie znaki).
- **Konsekwencje:** fonty w bundlu (~200 kB woff2 łącznie, ładowane per-subset). Odwracalna: tak.

## 2026-07-16 — Ilustracje SVG zamiast zdjęć stockowych

- **Problem:** brak dostępu do sensownych zdjęć; zakaz stockowych klisz; wymóg lokalnych zasobów.
- **Wybrano:** autorskie ilustracje SVG w palecie marki (portret, gabinet, warsztat, mapa) jako oznaczone placeholdery.
- **Konsekwencje:** spójna estetyka demo; instrukcja podmiany w `src/content/images.ts`. Odwracalna: tak (zaplanowana podmiana).

## 2026-07-16 — Deterministyczny generator terminów zamiast atrapy statycznej

- **Problem:** kalendarz rezerwacji ma zawsze wyglądać realistycznie bez backendu.
- **Wybrano:** `src/lib/dates.ts` — sloty liczone hashem z daty/godziny/usługi, względem dnia bieżącego (42 dni w przód, niedziele + pseudolosowe dni wolne zablokowane).
- **Konsekwencje:** demo nigdy nie pokazuje przeterminowanych dat; testy wybierają pierwszy dostępny dzień programowo. Punkt integracji API opisany w pliku. Odwracalna: tak.

## 2026-07-16 — Menu mobilne renderowane portalem do document.body

- **Problem:** `backdrop-filter` na `.site-header` czyni nagłówek containing blockiem dla
  `position: fixed` — menu o `inset: 0` miało wysokość nagłówka (76 px), nie ekranu.
- **Rozważane:** usunięcie backdrop-filter (strata estetyki) vs portal.
- **Wybrano:** `createPortal(<MobileMenu/>, document.body)` w `Header.tsx`.
- **Konsekwencje:** KAŻDY przyszły element `position: fixed` montowany wewnątrz headera
  musi używać portalu. **Nieodwracalna** dopóki nagłówek ma backdrop-filter.

## 2026-07-16 — Testy mobilne na emulacji Chromium (bez WebKit)

- **Problem:** profile iPhone w Playwright domyślnie wymagają WebKit (niezainstalowany, ~90 MB).
- **Wybrano:** `browserName: 'chromium'` w projektach iPhone; Pixel 7 natywnie chromium.
- **Konsekwencje:** brak pokrycia silnika Safari — zadanie w Backlogu przed produkcją. Odwracalna: tak (1 linia na projekt).

## 2026-07-16 — Wykrywanie poziomego scrolla przez visualViewport

- **Problem:** na mobile layout viewport rozszerza się do szerokości treści, więc
  `scrollWidth > innerWidth` nie wykrywa przepełnienia (bug znaleziony na /kontakt).
- **Wybrano:** helper porównuje `scrollWidth` z `visualViewport.width * scale` (tests/helpers.ts).
- **Konsekwencje:** testy realnie łapią overflow; przy okazji reguła CSS `min-width: 0`
  dla dzieci gridów 1fr z długimi treściami.

## 2026-07-16 — Zdjęcia AI zamiast ilustracji SVG (na życzenie użytkownika)

- **Problem:** ilustracje wektorowe wyglądały „kreskówkowo"; użytkownik chce fotorealizmu.
- **Rozważane:** stock (klisze, licencje), generatory z kluczem API, pollinations.ai (bez klucza).
- **Wybrano:** image.pollinations.ai (FLUX) — portret 4:5, gabinet i warsztat 3:2;
  pliki w `src/assets/photos/`, importowane w `src/content/images.ts`.
- **Uzasadnienie:** zero kosztów/kluczy; osoba nie istnieje (etycznie czyste dla demo);
  alty jawnie opisują pochodzenie AI.
- **Konsekwencje:** obrazy przeszły z public/ na importy bundlera (wymóg buildu
  single-file); miniatury artykułów mapowane w `articles/index.ts`. Odwracalna: tak.

## 2026-07-16 — Udostępnianie strony linkiem: single-file + Artifact

- **Problem:** użytkownik chce wysłać działającą stronę jako link (inny komputer/IP),
  bez kont hostingowych i danych dostępowych.
- **Rozważane:** Netlify/Vercel (wymagają konta), tunel cloudflared (żyje tylko przy
  włączonym PC), GitHub Pages (wymaga auth), Artifact na claude.ai (bez kont).
- **Wybrano:** build single-file (`vite-plugin-singlefile`, wszystkie zasoby data-URI,
  HashRouter przez `VITE_ROUTER=hash` w vite.artifact.config.ts) + publikacja jako
  Artifact. Skrypty: `npm run build:share`, `npm run preview:share`.
- **Konsekwencje:** gołe kotwice `#...` musiały zostać zastąpione obsługą JS
  (skip-link, przycisk „Zapytaj o ofertę") — kompatybilne z oboma routerami;
  artefakt jest prywatny do czasu włączenia udostępniania przez właściciela.
  Plik `dist-artifact/artifact.html` działa też wysłany mailem lub wrzucony na
  dowolny hosting. Odwracalna: tak (build standardowy nietknięty).
