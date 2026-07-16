import { Link } from 'react-router-dom'

import CtaBand from '../components/CtaBand'
import Icon, { type IconName } from '../components/Icon'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { pathCards } from '../content/services'

const pathIcons: Record<string, IconName> = {
  psychologia: 'leaf',
  coaching: 'compass',
  firmy: 'building',
}

const details: Record<string, { items: string[]; note: string }> = {
  psychologia: {
    items: ['stres i przeciążenie', 'kryzys i trudne emocje', 'wypalenie zawodowe', 'relacje i decyzje'],
    note: '50 minut · 220 zł · online lub stacjonarnie',
  },
  coaching: {
    items: ['coaching kariery i życiowy', 'coaching managerski', 'pewność siebie i nawyki', 'pakiet 5 spotkań'],
    note: '60–90 minut · od 250 zł · online lub stacjonarnie',
  },
  firmy: {
    items: ['warsztaty i szkolenia', 'programy wellbeingowe', 'rozwój liderów', 'wystąpienia motywacyjne'],
    note: 'wycena indywidualna · bezpłatna rozmowa o potrzebach',
  },
}

export default function Offer() {
  return (
    <>
      <Seo
        title="Oferta"
        description="Konsultacje psychologiczne, coaching indywidualny i zawodowy oraz warsztaty i wystąpienia dla firm — Warszawa i online. Sprawdź, jak mogę Ci pomóc."
        path="/oferta"
      />
      <PageHero
        eyebrow="Oferta"
        title="Sprawdź, jak mogę Ci pomóc"
        lead="Trzy obszary pracy — jeden spokojny, konkretny sposób działania. Jeśli nie wiesz, co wybrać, umów bezpłatną rozmowę lub napisz."
        crumbs={[{ label: 'Oferta' }]}
      />

      <section className="section" aria-label="Obszary oferty">
        <div className="container">
          <div className="offer-tiles">
            {pathCards.map((card, index) => (
              <Reveal key={card.area} delay={index * 90}>
                <article className="path-card" data-area={card.area} style={{ height: '100%' }}>
                  <span className="path-card__icon">
                    <Icon name={pathIcons[card.area]} size={26} />
                  </span>
                  <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>{card.title}</h2>
                  <p>{card.description}</p>
                  <ul style={{ margin: '0 0 1.2rem', paddingLeft: '1.2rem', color: 'var(--muted)', display: 'grid', gap: '0.35rem' }}>
                    {details[card.area].items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p style={{ fontWeight: 650, color: 'var(--ink)', fontSize: '0.95rem', marginBottom: '1.2rem' }}>
                    {details[card.area].note}
                  </p>
                  <Link to={card.path} className="btn btn--primary">
                    {card.cta}
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
          <p style={{ marginTop: '2.5rem', color: 'var(--muted)', maxWidth: '46rem' }}>
            Nie masz pewności, która forma będzie odpowiednia? Zajrzyj do artykułu{' '}
            <Link to="/wiedza/psycholog-czy-coach-jak-wybrac-wsparcie">
              „Psycholog czy coach — jak wybrać odpowiednie wsparcie?"
            </Link>{' '}
            albo po prostu <Link to="/kontakt">napisz do mnie</Link> — pomogę Ci wybrać.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
