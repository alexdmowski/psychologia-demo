# CURRENT STATE — aktualny stan projektu

> Ostatnia aktualizacja: **2026-07-16 (po południu)**. Ten plik opisuje wyłącznie obecną prawdę.
> Nadpisuj go po każdej większej zmianie; nie prowadź tu historii.

## Faza

**Demo v1.3 UKOŃCZONE** — poprawione proporcje zdjęć (height:auto + aspect-ratio),
nowe zdjęcia (portret, warsztat), a wersja do udostępnienia odchudzona do 986 kB
(rekompresja JPEG + usunięcie wietnamskiego subsetu fontu w make-artifact.mjs),
bo limit publicznego udostępniania artefaktu to ~1 MB (wcześniejsze 1,07 MB blokowało
Share). Link (wersja v3): https://claude.ai/code/artifact/4218e067-4085-49a8-a367-d1397d538a33
— właściciel włącza General access → „Anyone with the link" w menu Share.
Fallback bez claude.ai: plik `dist-artifact/artifact.html` działa samodzielnie
(można wysłać mailem i otworzyć lokalnie).

## Co jest ukończone i działa

- Wszystkie 18 podstron + nawigacja (dropdown „Oferta", menu mobilne przez portal)
- System rezerwacji (6 kroków, płatność demo, .ics, localStorage, numer AN-RRRR-XXXX)
- Formularze: kontaktowy, B2B, newsletter — walidacja + ekrany sukcesu + honeypot
- Baner cookies + modal ustawień + zmiana decyzji ze stopki
- Baza wiedzy: 6 pełnych artykułów, filtrowanie, wyszukiwarka, podobne artykuły
- 4 dokumenty formalne (oznaczone jako przykładowe)
- SEO: unikalne meta, canonical, OG + og-image.png, JSON-LD, sitemap.xml, robots.txt
- Dostępność: klawiatura, focus-visible, pułapki fokusu, ARIA, reduced-motion, skip-link
- Zdjęcia: fotorealistyczne, wygenerowane przez AI (pollinations.ai/FLUX) — portret,
  gabinet, warsztat w `src/assets/photos/`; miniatury artykułów: abstrakcyjne SVG
- Build „do udostępnienia": `npm run build:share` → jeden plik HTML (HashRouter,
  wszystkie zasoby inline, 1,07 MB) → opublikowany jako Artifact na claude.ai

## Ostatnie testy (2026-07-16)

- `npx playwright test` → **81/81 pass** (desktop 1440×900 + mobile 320/390/430/Pixel 7)
- `npm run lint` → czysto · `npx tsc -b` → czysto
- `npm run build` → OK (JS ~141 kB gzip, CSS ~8,5 kB gzip)
- Konsola przeglądarki: bez błędów

## Częściowo / brakuje

- Brak realnych integracji (celowo — demo): płatności, e-mail, kalendarz, analityka
- Testy mobilne działają na emulacji Chromium (WebKit niezainstalowany)
- Zdjęcia to SVG placeholdery — czekają na prawdziwe fotografie

## Znane problemy

Patrz `docs/KNOWN_ISSUES.md` (obecnie: brak aktywnych błędów funkcjonalnych).

## Najbliższy logiczny krok

Prezentacja klientowi → zebranie uwag → ewentualnie: podmiana zdjęć, realne treści,
wybór hostingu i wdrożenie (patrz Backlog w `docs/TASKS.md`).
