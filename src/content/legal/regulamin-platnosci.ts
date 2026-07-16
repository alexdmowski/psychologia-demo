import type { LegalDoc } from '../types'

// ─────────────────────────────────────────────────────────────────────────────
// REGULAMIN PŁATNOŚCI I USŁUG ONLINE — TREŚĆ PRZYKŁADOWA (WERSJA DEMONSTRACYJNA)
// Przed publikacją produkcyjną dokument wymaga weryfikacji prawnej.
// ─────────────────────────────────────────────────────────────────────────────

export const doc: LegalDoc = {
  slug: 'regulamin-platnosci',
  title: 'Regulamin płatności i usług online',
  updated: '2026-07-01',
  intro:
    'Niniejszy regulamin określa zasady dokonywania płatności za usługi psychologiczne, coachingowe i szkoleniowe świadczone przez Aleksandrę Nowicką, prowadzącą działalność pod marką „Aleksandra Nowicka — Psychologia i Rozwój", a także warunki korzystania z usług realizowanych online. Dokument ma charakter przykładowy — został przygotowany na potrzeby wersji demonstracyjnej i przed publikacją wymaga weryfikacji prawnej. W wersji demonstracyjnej witryny wszystkie płatności są wyłącznie symulowane, a żadna rzeczywista transakcja nie jest wykonywana.',
  sections: [
    {
      heading: '1. Postanowienia ogólne i dane usługodawcy',
      paragraphs: [
        'Usługodawcą jest Aleksandra Nowicka, prowadząca działalność gospodarczą pod marką „Aleksandra Nowicka — Psychologia i Rozwój", NIP: [do uzupełnienia], REGON: [do uzupełnienia], adres do korespondencji: [do uzupełnienia], Warszawa. Kontakt z usługodawcą jest możliwy pod adresem e-mail kontakt@aleksandranowicka.pl oraz pod numerem telefonu +48 500 600 700.',
        'Regulamin dotyczy usług świadczonych stacjonarnie w Warszawie oraz online — w szczególności konsultacji psychologicznych, sesji coachingowych i warsztatów. Usługi nie stanowią psychoterapii ani świadczeń leczniczych.',
        'Złożenie rezerwacji i opłacenie usługi oznacza akceptację niniejszego regulaminu. Administratorem danych osobowych przetwarzanych w związku z płatnościami jest Aleksandra Nowicka; szczegółowe zasady przetwarzania danych opisuje polityka prywatności dostępna w witrynie.',
      ],
    },
    {
      heading: '2. Metody płatności',
      paragraphs: [
        'Płatności za usługi można dokonać za pośrednictwem operatora płatności elektronicznych zintegrowanego z systemem rezerwacji. Dostępne są następujące metody:',
      ],
      list: [
        'BLIK — płatność kodem generowanym w aplikacji bankowej,',
        'karta płatnicza — Visa, Mastercard (debetowa lub kredytowa),',
        'szybki przelew online — za pośrednictwem banku klienta,',
        'Apple Pay — na urządzeniach obsługujących tę metodę,',
        'Google Pay — na urządzeniach obsługujących tę metodę.',
      ],
    },
    {
      heading: '3. Płatności w wersji demonstracyjnej',
      paragraphs: [
        'Niniejsza witryna działa w trybie demonstracyjnym. Oznacza to, że proces płatności jest wyłącznie symulowany — służy prezentacji działania systemu rezerwacji i nie prowadzi do zawarcia umowy ani do obciążenia jakiegokolwiek rachunku.',
        'W wersji demonstracyjnej nie należy podawać rzeczywistych danych karty płatniczej, kodów BLIK ani danych logowania do bankowości elektronicznej. Żadne dane płatnicze nie są zbierane, przetwarzane ani przekazywane operatorowi płatności.',
        'W wersji produkcyjnej witryny płatności będą obsługiwane przez licencjonowanego operatora płatności, a niniejsza sekcja zostanie odpowiednio zaktualizowana.',
      ],
    },
    {
      heading: '4. Zasady płatności za usługi online',
      paragraphs: [
        'Rezerwacja terminu sesji online staje się wiążąca po opłaceniu usługi z góry, najpóźniej na 24 godziny przed planowanym rozpoczęciem spotkania. Do tego czasu termin ma status rezerwacji wstępnej.',
        'Cena usługi jest ceną brutto i odpowiada kwocie widocznej w cenniku w chwili dokonywania rezerwacji. O ewentualnych zmianach cen usługodawca informuje z wyprzedzeniem; zmiany nie dotyczą usług już opłaconych.',
        'Po zaksięgowaniu płatności klient otrzymuje na podany adres e-mail potwierdzenie rezerwacji wraz z danymi dostępowymi do spotkania online.',
      ],
    },
    {
      heading: '5. Faktury',
      paragraphs: [
        'Na życzenie klienta usługodawca wystawia fakturę za opłaconą usługę. Chęć otrzymania faktury wraz z danymi do jej wystawienia należy zgłosić najpóźniej w chwili dokonywania płatności lub niezwłocznie po niej, pisząc na adres kontakt@aleksandranowicka.pl.',
        'Faktury wystawiane są w formie elektronicznej i przesyłane na adres e-mail wskazany przez klienta, na co klient wyraża zgodę, akceptując niniejszy regulamin. Faktura jest wystawiana w terminie zgodnym z obowiązującymi przepisami podatkowymi.',
      ],
    },
    {
      heading: '6. Odwołanie terminu i zwroty',
      paragraphs: [
        'Klient może bezpłatnie odwołać opłaconą sesję lub zmienić jej termin najpóźniej na 24 godziny przed planowanym rozpoczęciem spotkania. W takim przypadku klient wybiera zwrot pełnej wpłaconej kwoty albo przeniesienie płatności na nowy termin.',
        'W przypadku odwołania sesji później niż na 24 godziny przed jej rozpoczęciem lub nieobecności bez wcześniejszego zgłoszenia wpłacona kwota nie podlega zwrotowi, chyba że nieobecność wynikała z nagłych, udokumentowanych okoliczności losowych — wówczas usługodawca proponuje nowy termin.',
        'Jeżeli sesję odwołuje usługodawca, klient otrzymuje — według własnego wyboru — zwrot pełnej kwoty albo nowy termin. Zwroty są realizowane tą samą metodą, którą dokonano płatności, w terminie do 14 dni od dnia uznania zwrotu.',
      ],
    },
    {
      heading: '7. Wymagania techniczne spotkań online',
      paragraphs: [
        'Sesje online odbywają się za pośrednictwem wskazanej w potwierdzeniu rezerwacji platformy wideokonferencyjnej. Aby spotkanie przebiegło sprawnie i komfortowo, po stronie klienta niezbędne są:',
      ],
      list: [
        'stabilne łącze internetowe o przepustowości pozwalającej na rozmowę wideo (zalecane co najmniej 10 Mb/s),',
        'urządzenie z kamerą i mikrofonem — komputer, tablet lub telefon,',
        'aktualna wersja przeglądarki internetowej lub aplikacji wskazanej w potwierdzeniu rezerwacji,',
        'prywatne, ciche pomieszczenie, w którym rozmowa nie będzie słyszana przez osoby trzecie.',
      ],
    },
    {
      heading: '8. Poufność i zakaz nagrywania',
      paragraphs: [
        'Spotkania online nie są nagrywane przez usługodawcę — ani w formie zapisu obrazu, ani dźwięku. Treść rozmów objęta jest zasadą poufności, z zastrzeżeniem wyjątków przewidzianych przepisami prawa.',
        'Klient zobowiązuje się nie nagrywać przebiegu sesji ani nie udostępniać jej treści osobom trzecim bez wyraźnej, uprzedniej zgody usługodawcy. Zasada ta chroni obie strony i sprzyja atmosferze zaufania, która jest warunkiem dobrej współpracy.',
      ],
    },
    {
      heading: '9. Odstąpienie od umowy zawartej na odległość',
      paragraphs: [
        'Klient będący konsumentem, który zawarł umowę na odległość, ma prawo odstąpić od niej w terminie 14 dni bez podawania przyczyny. Oświadczenie o odstąpieniu można przesłać na adres kontakt@aleksandranowicka.pl; do zachowania terminu wystarczy wysłanie oświadczenia przed jego upływem.',
        'Prawo odstąpienia nie przysługuje w odniesieniu do usługi w pełni wykonanej, jeżeli usługodawca wykonał ją za wyraźną zgodą konsumenta, który został poinformowany przed rozpoczęciem świadczenia, że po jego spełnieniu utraci prawo odstąpienia od umowy.',
        'Jeżeli klient odstępuje od umowy po zgłoszeniu żądania rozpoczęcia świadczenia przed upływem terminu odstąpienia, ma obowiązek zapłaty za świadczenia spełnione do chwili odstąpienia — proporcjonalnie do zakresu wykonanej usługi.',
      ],
    },
    {
      heading: '10. Reklamacje i kontakt',
      paragraphs: [
        'Reklamacje dotyczące płatności lub przebiegu usług online można składać na adres e-mail kontakt@aleksandranowicka.pl lub telefonicznie pod numerem +48 500 600 700. Zgłoszenie powinno zawierać opis problemu oraz dane umożliwiające identyfikację rezerwacji.',
        'Usługodawca rozpatruje reklamacje w terminie 14 dni od dnia ich otrzymania i informuje klienta o wyniku tą samą drogą, którą złożono zgłoszenie. Konsument może również skorzystać z pozasądowych sposobów rozpatrywania reklamacji i dochodzenia roszczeń, w tym z platformy ODR prowadzonej przez Komisję Europejską.',
        'W sprawach nieuregulowanych niniejszym regulaminem zastosowanie mają przepisy prawa polskiego, w szczególności Kodeksu cywilnego oraz ustawy o prawach konsumenta.',
      ],
    },
  ],
}
