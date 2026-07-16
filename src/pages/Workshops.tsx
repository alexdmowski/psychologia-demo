import { Link } from 'react-router-dom'

import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { images } from '../content/images'
import { workshops, workshopTopics } from '../content/services'

export default function Workshops() {
  return (
    <>
      <Seo
        title="Warsztaty, szkolenia i wystąpienia"
        description="Warsztaty antywypaleniowe, trening odporności psychicznej, komunikacja i wystąpienia motywacyjne dla firm — stacjonarnie i online. Programy szyte na miarę."
        path="/oferta/warsztaty-i-wystapienia"
      />
      <PageHero
        eyebrow="Oferta · dla zespołów"
        title={workshops.title}
        lead={workshops.lead}
        crumbs={[{ label: 'Oferta', path: '/oferta' }, { label: 'Warsztaty i wystąpienia' }]}
      >
        <div className="hero__actions" style={{ marginTop: '1.6rem' }}>
          <Link to="/dla-firm#formularz" className="btn btn--primary">
            Zapytaj o ofertę dla firmy
          </Link>
          <Link to="/rezerwacja?usluga=firma-15" className="btn btn--secondary">
            Umów bezpłatną rozmowę
          </Link>
        </div>
      </PageHero>

      <section className="section" aria-labelledby="w-intro-title">
        <div className="container split">
          <div className="prose">
            <h2 id="w-intro-title" style={{ marginTop: 0 }}>
              Szkolenia, po których zespół naprawdę coś zmienia
            </h2>
            {workshops.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
          <Reveal>
            <div className="split__img">
              <img src={images.workshop.src} alt={images.workshop.alt} loading="lazy" width="941" height="626" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--tinted" aria-labelledby="w-formats-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Formaty</p>
            <h2 id="w-formats-title">Od 45 minut inspiracji po programy rozwojowe</h2>
          </div>
          <div className="card-grid card-grid--2">
            {workshops.formats.map((format, index) => (
              <Reveal key={format.title} delay={(index % 2) * 80}>
                <div className="soft-card" style={{ height: '100%' }}>
                  <h3>{format.title}</h3>
                  <p>{format.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="w-topics-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Przykładowe tematy</p>
            <h2 id="w-topics-title">Najczęściej zamawiane warsztaty</h2>
          </div>
          <div className="card-grid card-grid--2">
            {workshopTopics.map((topic, index) => (
              <Reveal key={topic.title} delay={(index % 2) * 80}>
                <article className="soft-card" style={{ height: '100%', borderLeft: '4px solid var(--pine)' }}>
                  <h3 style={{ fontSize: '1.15rem' }}>{topic.title}</h3>
                  <p>{topic.description}</p>
                  <p style={{ marginTop: '0.8rem' }}>
                    <span className="area-chip" data-area="firmy">
                      {topic.format}
                    </span>
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
          <p style={{ marginTop: '2rem', color: 'var(--muted)', maxWidth: '52rem' }}>
            Każdy temat mogę poprowadzić także jako krótsze wystąpienie na konferencji lub evencie firmowym.
            Pełną ofertę B2B — wraz z przebiegiem współpracy i formularzem zapytania — znajdziesz na stronie{' '}
            <Link to="/dla-firm">Dla firm</Link>.
          </p>
        </div>
      </section>

      <section className="section section--tinted" aria-label="Zapytanie ofertowe">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ maxWidth: '26ch', margin: '0 auto 1rem' }}>Opowiedz mi o swoim zespole</h2>
          <p style={{ color: 'var(--muted)', maxWidth: '52ch', margin: '0 auto 2rem' }}>
            W ciągu 3 dni roboczych otrzymasz konspekt programu i wycenę — bez zobowiązań.
          </p>
          <div className="cta-band__actions">
            <Link to="/dla-firm#formularz" className="btn btn--primary">
              Zapytaj o ofertę
            </Link>
            <Link to="/dla-firm" className="btn btn--secondary">
              Zobacz pełną ofertę dla firm
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
