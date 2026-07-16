import { Link } from 'react-router-dom'

import PageHero from '../components/PageHero'
import Seo from '../components/Seo'

const sections = [
  {
    heading: 'Po co ten przewodnik?',
    text: 'Szukanie wsparcia bywa trudniejsze niż samo wsparcie: psycholog, coach, psychoterapeuta, mentor… Ten krótki przewodnik pomoże Ci w 10 minut zrozumieć różnice i wybrać formę, która pasuje do Twojej sytuacji.',
  },
  {
    heading: '1. Konsultacja psychologiczna — kiedy?',
    text: 'Gdy na pierwszym planie jest to, co trudne: przeciążenie, silny stres, kryzys, spadek nastroju, emocje, które przejmują ster. Konsultacja pomaga zrozumieć sytuację, ustabilizować ją i zaplanować dalsze kroki. Nie wymaga „poważnego problemu" — wystarczy potrzeba rozmowy ze specjalistką.',
  },
  {
    heading: '2. Coaching — kiedy?',
    text: 'Gdy masz cel (zmiana pracy, awans, nawyki, pewność siebie) i potrzebujesz struktury oraz konsekwencji w działaniu. Coaching zakłada, że Twoje zasoby są dostępne — pomaga je uruchomić i utrzymać kierunek. To praca zadaniowa: plan, wdrożenie, przegląd.',
  },
  {
    heading: '3. Psychoterapia — kiedy?',
    text: 'Gdy trudności trwają długo, mają głębsze źródła lub znacząco utrudniają codzienne funkcjonowanie. Psychoterapię prowadzi psychoterapeuta w certyfikowanym nurcie — to inna, dłuższa forma pracy. Jeśli będzie dla Ciebie lepsza, dowiesz się tego na konsultacji wraz ze wskazówkami, gdzie jej szukać.',
  },
  {
    heading: 'Szybki test: 3 pytania',
    list: [
      'Czy wiesz, co konkretnie chcesz osiągnąć? TAK → coaching. NIE → konsultacja.',
      'Czy najpierw potrzebujesz się zatrzymać i zrozumieć, co się dzieje? TAK → konsultacja.',
      'Czy trudności trwają od miesięcy i dotykają wielu obszarów życia? TAK → porozmawiaj na konsultacji o psychoterapii.',
    ],
  },
  {
    heading: 'Najważniejsze na koniec',
    text: 'Wybór nie jest ostateczny ani „na zawsze". Wiele osób zaczyna od konsultacji i płynnie przechodzi do coachingu — albo odwrotnie. Pierwsze spotkanie zawsze obejmuje wspólne ustalenie, jaka forma pracy będzie dla Ciebie najlepsza.',
  },
]

export default function LeadMagnet() {
  return (
    <>
      <Seo
        title="Przewodnik: Psycholog czy coach?"
        description="Bezpłatny przewodnik po formach wsparcia: czym różni się konsultacja psychologiczna, coaching i psychoterapia — i jak wybrać dobrze za pierwszym razem."
        path="/materialy/psycholog-czy-coach"
      />
      <PageHero
        eyebrow="Materiał dla subskrybentów"
        title="Psycholog czy coach? Krótki przewodnik po formach wsparcia"
        lead="Wersja online materiału PDF — w wersji produkcyjnej ten przewodnik trafia do subskrybentów newslettera jako plik do pobrania."
        crumbs={[{ label: 'Wiedza', path: '/wiedza' }, { label: 'Przewodnik' }]}
      />
      <section className="section" aria-label="Treść przewodnika">
        <div className="container legal-layout">
          <div className="prose">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.text && <p>{section.text}</p>}
                {section.list && (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item.slice(0, 24)}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <p style={{ marginTop: '2rem' }}>
              <strong>Chcesz porozmawiać o swojej sytuacji?</strong> Umów pierwsze spotkanie — wspólnie
              ustalimy najlepszy kierunek.
            </p>
            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginTop: '1.2rem' }}>
              <Link to="/rezerwacja" className="btn btn--primary">
                Zarezerwuj termin
              </Link>
              <button type="button" className="btn btn--secondary" onClick={() => window.print()}>
                Pobierz / drukuj (PDF)
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
