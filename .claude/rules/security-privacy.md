# Bezpieczeństwo i prywatność (projekt an-psychologia)

- ZERO sekretów w repozytorium: żadnych kluczy API, tokenów, haseł, danych klienta —
  także w dokumentacji, testach i `.claude/`. Integracje produkcyjne = zmienne
  środowiskowe hostingu.
- Minimalizacja danych: formularze zbierają tylko to, co potrzebne do odpowiedzi;
  nie dodawaj pól „na zapas"; telefon w rezerwacji ma hint o celu użycia.
- Walidacja po stronie klienta z `lib/validate.ts`; przy podłączaniu backendu walidacja
  MUSI być powtórzona serwerowo.
- Honeypot antyspamowy (pole `website`, `.visually-hidden`, tabIndex −1) zostaje we
  wszystkich formularzach wysyłkowych.
- Płatności: w wersji demo ŻADNA transakcja nie może być wykonywana ani pozorowana jako
  prawdziwa — komunikat „Płatność demonstracyjna — żadna transakcja nie zostanie
  wykonana." jest obowiązkowy do czasu podpięcia realnej bramki.
- Zgody: checkboxy zgód nigdy domyślnie zaznaczone; kategorie cookies opcjonalne
  (analityczne/marketingowe) domyślnie wyłączone; skrypty stron trzecich ładowane
  wyłącznie po odpowiedniej zgodzie z banera.
- localStorage: tylko klucze `an-*` przez `lib/storage.ts`; nie przechowuj tam danych
  wrażliwych (obecne dane rezerwacji demo to maksimum).
- Dokumenty formalne (`src/content/legal/`) są przykładowe — plakietka o konieczności
  weryfikacji prawnej zostaje do czasu akceptacji prawnika.
- Renderowanie treści: wyłącznie przez JSX (auto-escaping); zakaz
  `dangerouslySetInnerHTML` bez uzasadnionej potrzeby i sanitizacji.
