import { Link } from 'react-router-dom'

import CtaBand from '../components/CtaBand'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { priceCards, pricingDemoNote, pricingNotes } from '../content/pricing'

export default function Pricing() {
  return (
    <>
      <Seo
        title="Cennik"
        description="Cennik konsultacji psychologicznych (220 zł / 50 min), coachingu (od 250 zł) i pakietów. Warsztaty dla firm — wycena indywidualna. Ceny demonstracyjne."
        path="/cennik"
      />
      <PageHero
        eyebrow="Cennik"
        title="Przejrzyste ceny, bez ukrytych kosztów"
        lead={'Płacisz za spotkanie — nie za „diagnozę wstępną", „opłatę administracyjną" ani inne niespodzianki. Faktura na życzenie.'}
        crumbs={[{ label: 'Cennik' }]}
      />

      <section className="section" aria-label="Karty cenowe">
        <div className="container">
          <div className="price-grid">
            {priceCards.map((card, index) => (
              <Reveal key={card.id} delay={(index % 3) * 80}>
                <div className={card.highlighted ? 'price-card price-card--highlight' : 'price-card'} style={{ height: '100%' }}>
                  {card.highlighted && <span className="price-card__flag">najkorzystniej</span>}
                  <span className="area-chip" data-area={card.area} style={{ alignSelf: 'flex-start' }}>
                    {card.area === 'psychologia' ? 'psychologia' : card.area === 'coaching' ? 'coaching' : 'dla firm'}
                  </span>
                  <h3>{card.name}</h3>
                  <p className="price-card__duration">{card.duration}</p>
                  <p className="price-card__price">{card.price}</p>
                  {card.priceNote && <p className="price-card__price-note">{card.priceNote}</p>}
                  <ul>
                    {card.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                  {card.bookingServiceId ? (
                    <Link to={`/rezerwacja?usluga=${card.bookingServiceId}`} className="btn btn--primary btn--block">
                      {card.ctaLabel}
                    </Link>
                  ) : (
                    <Link to="/dla-firm#formularz" className="btn btn--primary btn--block">
                      {card.ctaLabel}
                    </Link>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
          <p style={{ marginTop: '1.6rem', color: 'var(--muted)', fontSize: '0.92rem' }}>{pricingDemoNote}</p>
        </div>
      </section>

      <section className="section section--tinted" aria-labelledby="pricing-info-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Organizacja</p>
            <h2 id="pricing-info-title">Płatności, faktury i zmiany terminów</h2>
          </div>
          <div className="card-grid card-grid--2">
            {pricingNotes.map((note) => (
              <div className="soft-card" key={note.title}>
                <h3 style={{ fontSize: '1.12rem' }}>{note.title}</h3>
                <p>{note.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Masz pytanie o cennik albo formę współpracy?"
        text="Napisz — odpowiadam w ciągu jednego dnia roboczego. Możesz też od razu zarezerwować termin."
      />
    </>
  )
}
