import mapSvg from '../assets/map.svg'
import officeJpg from '../assets/photos/office.jpg'
import portraitJpg from '../assets/photos/portrait.jpg'
import workshopJpg from '../assets/photos/workshop.jpg'

// ─────────────────────────────────────────────────────────────────────────────
// OBRAZY — CENTRALNA MAPA ZASOBÓW
// Zdjęcia (portret, gabinet, warsztat) są FOTOREALISTYCZNE, ale wygenerowane
// przez AI na potrzeby wersji demonstracyjnej — nie przedstawiają prawdziwych
// osób ani miejsc.
// PODMIANA NA PRAWDZIWE ZDJĘCIA:
//   1. Wgraj plik do src/assets/photos/ (portret: pion 4:5, min. 800 px).
//   2. Podmień import powyżej i ewentualnie tekst alternatywny (alt).
// Obrazy importujemy (zamiast ścieżek z public/), aby build potrafił je
// zoptymalizować i w pełni osadzić w wersji single-file do udostępniania.
// ─────────────────────────────────────────────────────────────────────────────

export const images = {
  portrait: {
    src: portraitJpg,
    alt: 'Aleksandra Nowicka — uśmiechnięta kobieta w ciemnozielonej marynarce w jasnym wnętrzu biurowym (zdjęcie demonstracyjne wygenerowane przez AI)',
  },
  office: {
    src: officeJpg,
    alt: 'Jasny, przytulny gabinet: dwa fotele, drewniany stolik, rośliny i duże okno z zasłonami (zdjęcie demonstracyjne wygenerowane przez AI)',
  },
  workshop: {
    src: workshopJpg,
    alt: 'Prowadząca w zielonej marynarce podczas warsztatu przy tablicy, przy stole uczestniczki (zdjęcie demonstracyjne wygenerowane przez AI)',
  },
  map: {
    src: mapSvg,
    alt: 'Poglądowa mapa okolic gabinetu przy ul. Mokotowskiej w Warszawie (grafika demonstracyjna)',
  },
} as const
