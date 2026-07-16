# KNOWN ISSUES

> Tylko rzeczywiste, potwierdzone problemy. Po naprawie przenoś do „Resolved".
> Stan na 2026-07-16.

## Aktywne

### 1. Brak testów na silniku WebKit (Safari)

- **Opis:** profile iPhone w Playwright działają na emulacji Chromium; realny Safari nieprzetestowany.
- **Odtworzenie:** `npx playwright test --project=mobile-typical` używa chromium.
- **Urządzenie:** iOS/Safari. **Priorytet:** średni (przed produkcją). **Status:** zaplanowane (Backlog).
- **Przyczyna:** WebKit niezainstalowany (oszczędność ~90 MB w demo).
- **Plan:** `npx playwright install webkit` + usunięcie `browserName: 'chromium'` z projektów iPhone.

### 2. Jeden chunk JS (~141 kB gzip)

- **Opis:** cała aplikacja w jednym bundlu; brak lazy-loadingu tras.
- **Priorytet:** niski (wynik akceptowalny dla demo; LCP nie cierpi — treść to HTML+CSS).
- **Plan:** przy rozroście — `React.lazy` per trasa (najpierw Booking i Knowledge).

### 3. Narzędzie zrzutów panelu przeglądarki Claude przekracza limit czasu

- **Opis:** `computer(screenshot)` w panelu podglądu timeoutuje; sama strona działa.
- **Odtworzenie:** dowolny screenshot panelu w tej sesji. **Priorytet:** niski (środowiskowe, nie dotyczy produktu).
- **Obejście:** zrzuty przez `npm run screenshots` (Playwright) — działa.

## Resolved (2026-07-16)

- ✅ Zdjęcia (hero, sekcje split) renderowane w złych proporcjach — atrybut `height`
  usztywniał wysokość przy `width: 100%` (warsztat: 928×635 → 554×800). Naprawione:
  `height: auto` + `aspect-ratio`/`object-fit: cover` w CSS (`.portrait-frame img`,
  `.split__img img`, `.map-block img`) + atrybuty width/height zgodne z naturalnymi
  wymiarami plików. Reguła projektowa: KAŻDY nowy `<img>` z `width:100%` w CSS musi
  mieć też `height: auto`.
- ✅ Zdjęcie warsztatu wyglądało nienaturalnie (zdublowana postać, artefakty) —
  wygenerowane ponownie (pollinations/FLUX, styl dokumentalny, jedna prowadząca).

- ✅ Menu mobilne renderowało się w pasku 76 px — `backdrop-filter` headera tworzył
  containing block dla `position: fixed`; naprawione portalem do `document.body`.
- ✅ Poziomy scroll 347 px na /kontakt przy 320 px — min-content gridu 1fr (długi e-mail);
  naprawione `min-width: 0` + `overflow-wrap: anywhere`; detektor testowy przepisany na visualViewport.
- ✅ Miniatury artykułów renderowane 800×450 zamiast 16:9 — atrybut `height` obrazka
  nadpisywał CSS `aspect-ratio`; dodane `height: auto`.
- ✅ Dropdown „Oferta" zamykał się przy kliknięciu po otwarciu hoverem — flaga `openedByHover`.
- ✅ Przełączniki w modalu cookies nieklikalne (`.track` przechwytywał pointer) — `z-index: 1` na input.
