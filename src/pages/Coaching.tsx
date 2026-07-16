import { Link } from 'react-router-dom'

import Icon from '../components/Icon'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { coaching } from '../content/services'

const packages = [
  { id: 'coaching-60', name: 'Pojedyncza sesja', duration: '60 minut', price: '250 zł' },
  { id: 'coaching-90', name: 'Sesja rozszerzona', duration: '90 minut', price: '340 zł' },
  { id: 'pakiet-coaching-5', name: 'Pakiet 5 spotkań', duration: '5 × 60 minut', price: '1150 zł' },
]

export default function Coaching() {
  return (
    <>
      <Seo
        title="Coaching indywidualny i zawodowy"
        description="Coaching kariery, coaching managerski i życiowy w Warszawie i online. Sesje 60 i 90 minut, pakiet 5 spotkań. Praca nad celem z konkretnym planem."
        path="/oferta/coaching"
      />
      <PageHero
        eyebrow="Oferta · coaching"
        title={coaching.title}
        lead={coaching.lead}
        crumbs={[{ label: 'Oferta', path: '/oferta' }, { label: 'Coaching' }]}
      >
        <div className="hero__actions" style={{ marginTop: '1.6rem' }}>
          <Link to="/rezerwacja?usluga=coaching-60" className="btn btn--primary">
            Umów sesję coachingową
          </Link>
          <span className="hero__badge">60 lub 90 minut · online lub stacjonarnie</span>
        </div>
      </PageHero>

      <section className="section" aria-labelledby="coaching-what-title">
        <div className="container">
          <div className="split" style={{ alignItems: 'start' }}>
            <div className="prose">
              <h2 id="coaching-what-title" style={{ marginTop: 0 }}>
                Na czym polega ta praca
              </h2>
              {coaching.what.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
              <h3>Nad czym najczęściej pracujemy</h3>
              <ul>
                {coaching.goals.map((goal) => (
                  <li key={goal}>{goal}</li>
                ))}
              </ul>
            </div>
            <div className="card-grid" style={{ gap: '1rem' }}>
              {coaching.types.map((type, index) => (
                <Reveal key={type.title} delay={index * 80}>
                  <div className="soft-card" style={{ borderLeft: '4px solid var(--copper)' }}>
                    <h3 style={{ fontSize: '1.15rem' }}>{type.title}</h3>
                    <p>{type.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tinted" aria-labelledby="vs-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Ważna różnica</p>
            <h2 id="vs-title">{coaching.vsPsychology.title}</h2>
            <p>{coaching.vsPsychology.intro}</p>
          </div>
          <div className="card-grid card-grid--2">
            <div className="soft-card" style={{ borderTop: '4px solid var(--copper)' }}>
              <span className="path-card__icon" style={{ background: 'var(--copper-tint)', color: 'var(--copper-text)' }}>
                <Icon name="compass" size={24} />
              </span>
              <h3>Wybierz coaching, gdy…</h3>
              <p>{coaching.vsPsychology.coaching}</p>
            </div>
            <div className="soft-card" style={{ borderTop: '4px solid var(--sage)' }}>
              <span className="path-card__icon" style={{ background: 'var(--sage-tint)', color: 'var(--sage-strong)' }}>
                <Icon name="leaf" size={24} />
              </span>
              <h3>Wybierz konsultacje, gdy…</h3>
              <p>{coaching.vsPsychology.psychology}</p>
            </div>
          </div>
          <p style={{ marginTop: '1.8rem', maxWidth: '52rem', color: 'var(--muted)' }}>{coaching.vsPsychology.outro}</p>
        </div>
      </section>

      <section className="section" aria-labelledby="coaching-process-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Struktura procesu</p>
            <h2 id="coaching-process-title">Jak przebiega proces coachingowy</h2>
          </div>
          <ol className="steps">
            {coaching.process.map((step) => (
              <li className="step" key={step.slice(0, 24)}>
                <p style={{ color: 'var(--text)' }}>{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--tinted" aria-labelledby="coaching-pricing-title">
        <div className="container">
          <div className="section-head section-head--center">
            <p className="eyebrow">Cennik demonstracyjny</p>
            <h2 id="coaching-pricing-title">Wybierz format pracy</h2>
          </div>
          <div className="price-grid">
            {packages.map((pack, index) => (
              <Reveal key={pack.id} delay={index * 80}>
                <div className={index === 2 ? 'price-card price-card--highlight' : 'price-card'} style={{ height: '100%' }}>
                  {index === 2 && <span className="price-card__flag">najkorzystniej</span>}
                  <h3>{pack.name}</h3>
                  <p className="price-card__duration">{pack.duration}</p>
                  <p className="price-card__price">{pack.price}</p>
                  <ul>
                    <li>online lub stacjonarnie</li>
                    <li>zadania wdrożeniowe między sesjami</li>
                    {index === 2 ? <li>podsumowania postępów + materiały</li> : <li>notatka podsumowująca</li>}
                  </ul>
                  <Link to={`/rezerwacja?usluga=${pack.id}`} className="btn btn--primary btn--block">
                    Zarezerwuj
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: '1.6rem', color: 'var(--muted)', fontSize: '0.92rem' }}>
            Ceny demonstracyjne. Pakiet wybierzesz również bezpośrednio w formularzu rezerwacji.
          </p>
        </div>
      </section>
    </>
  )
}
