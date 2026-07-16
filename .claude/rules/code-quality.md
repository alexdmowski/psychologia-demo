# Jakość kodu (projekt an-psychologia)

- TypeScript strict; nie używaj `any` bez uzasadnienia w komentarzu.
- Komponenty małe i jednozadaniowe; gdy plik strony przekracza ~300 linii logiki
  (nie treści), wydziel podkomponenty.
- Zero duplikacji: walidacja → `src/lib/validate.ts`, daty → `src/lib/dates.ts`,
  storage → `src/lib/storage.ts`; nie kopiuj tych funkcji do komponentów.
- Nazewnictwo: komponenty PascalCase, funkcje/zmienne camelCase, pliki stron PascalCase,
  klasy CSS kebab-case zgodnie z istniejącą konwencją (BEM-owate `blok__element--wariant`).
- Zero martwego kodu i zakomentowanych, porzuconych implementacji — usuń zamiast komentować.
- Zero błędów i warningów w konsoli przeglądarki — sprawdzaj po każdej zmianie.
- Komentarze wyłącznie tam, gdzie kod nie może wyrazić ograniczenia (pułapki: portal
  menu, min-width: 0, height: auto na img).
- Importy: zewnętrzne → wewnętrzne (components/content/lib), puste linie między grupami.
