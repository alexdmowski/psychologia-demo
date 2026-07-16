# CONTENT MODEL

> Cała treść demonstracyjna mieszka w `src/content/` (typy: `src/content/types.ts`).
> Komponenty importują dane — nie przechowują danych biznesowych na sztywno.

## Mapa plików treści

| Plik | Co edytujesz |
| --- | --- |
| `site.ts` | dane specjalistki (`specialist`), `siteUrl`, disclaimery (demo/kryzysowy), przekaz marki (`brandMessage`), nawigacja, social media, „być może jesteś tutaj" (`painPoints`), proces (`processSteps`), wartości, biografia (`bio`), kwalifikacje (`credentials`) |
| `services.ts` | karty 3 ścieżek (`pathCards`), pełne treści: `consultations`, `coaching`, `workshops`, tematy warsztatów, proces B2B, statystyki demo, fikcyjne logotypy |
| `pricing.ts` | `bookingServices` (usługi kreatora rezerwacji — **id łączy cennik z rezerwacją**), `priceCards`, zasady płatności (`pricingNotes`), nota demo |
| `testimonials.ts` | opinie (pole `area`: psychologia/coaching/firmy; `company: true` = rekomendacja firmowa) |
| `faq.ts` | 12 pytań FAQ (`FaqItem`) |
| `articles/*.ts` | artykuł = `Article` { slug, title, excerpt, category, date ISO, readingMinutes, image, imageAlt, sections[] }; sekcja = { heading?, paragraphs[], list? }; pierwsza sekcja bez heading = lead |
| `articles/index.ts` | rejestr artykułów (sort po dacie), etykiety kategorii, `relatedArticles()` |
| `legal/*.ts` | dokument = `LegalDoc` { slug, title, updated, intro, sections[] }; intro MUSI zawierać zdanie o charakterze przykładowym |
| `images.ts` | ścieżki + alty obrazów, instrukcja podmiany zdjęć |

## Jak dodać artykuł

1. Nowy plik `src/content/articles/<slug>.ts` eksportujący `article: Article`.
2. Dopisz import do `articles/index.ts`.
3. Miniatura SVG/JPG → `public/images/articles/` + `image`/`imageAlt`.
4. Dopisz URL do `public/sitemap.xml`.
Kategorie: emocje · stres · wypalenie · motywacja · kariera · rozwoj-liderow.

## Oznaczanie treści demonstracyjnych

- Opinie: komponenty renderują plakietkę `.demo-badge` „opinia demonstracyjna" — zawsze.
- Statystyki B2B, ceny, godziny: nota w sekcji lub przy danych.
- Certyfikaty: fikcyjne nazwy instytucji + dopisek w sekcji „O mnie".
- Dokumenty prawne: `legalDisclaimer` (legal/index.ts) renderowany nad treścią.
- Stopka: globalny disclaimer demo + informacja kryzysowa (112) — nie usuwać.

## Zasady języka

- Polski, druga osoba l.poj., ton spokojny, empatyczny, konkretny; polskie „cudzysłowy" i półpauzy (—).
- ZAKAZ: „wyleczysz się", „gwarantuję", „pozbędziesz się lęku", żargon coachingowy, Lorem ipsum.
- Konsultacje ≠ psychoterapia; Aleksandra ≠ psychoterapeutka/lekarka.
- B2B: język biznesowy, bez frazesów motywacyjnych; treści psychologiczne z wyważoną
  notą „artykuł nie zastępuje diagnozy/pomocy specjalisty" tam, gdzie temat dotyka zdrowia.
- Formularze proszą o temat, nie o szczegóły zdrowotne (hint przy formularzu kontaktowym).
