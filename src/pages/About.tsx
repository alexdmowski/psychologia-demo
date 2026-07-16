import { Link } from 'react-router-dom'

import CtaBand from '../components/CtaBand'
import Icon from '../components/Icon'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { images } from '../content/images'
import { bio, brandMessage, credentials, specialist } from '../content/site'

export default function About() {
  return (
    <>
      <Seo
        title="O mnie"
        description="Poznaj Aleksandrę Nowicką — psycholożkę, certyfikowaną coachkę i trenerkę rozwoju. 14 lat doświadczenia w pracy indywidualnej i z organizacjami."
        path="/o-mnie"
      />
      <PageHero
        eyebrow="O mnie"
        title="Psycholożka, coachka i trenerka — z jedną nogą w gabinecie, drugą w biznesie"
        lead="Od kilkunastu lat pomagam ludziom przechodzić przez przeciążenie, zmianę i zawodowe rozdroża. Spokojnie, konkretnie i bez oceniania."
        crumbs={[{ label: 'O mnie' }]}
      />

      <section className="section" aria-label="Historia zawodowa">
        <div className="container split" style={{ alignItems: 'start' }}>
          <Reveal>
            <div className="portrait-frame" style={{ position: 'sticky', top: 'calc(var(--header-h) + 2rem)' }}>
              <img src={images.portrait.src} alt={images.portrait.alt} width="686" height="858" />
            </div>
          </Reveal>
          <div className="prose">
            <h2 style={{ marginTop: 0 }}>Moja historia</h2>
            {bio.story.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
            <h3>Jak pracuję</h3>
            {bio.approach.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
            <p>
              Więcej o przebiegu współpracy przeczytasz na stronie{' '}
              <Link to="/jak-pracuje">Jak pracuję</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--tinted" aria-labelledby="areas-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Specjalizacja</p>
            <h2 id="areas-title">Główne obszary pracy</h2>
          </div>
          <ul className="maybe-list">
            {bio.areas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
          <div className="card-grid card-grid--2" style={{ marginTop: '2.5rem' }}>
            <div className="soft-card">
              <span className="path-card__icon" style={{ background: 'var(--sage-tint)', color: 'var(--sage-strong)' }}>
                <Icon name="leaf" size={24} />
              </span>
              <h3>Praca indywidualna</h3>
              <p>
                Ponad 2500 godzin konsultacji i sesji coachingowych. Towarzyszę osobom w przeciążeniu,
                kryzysie i zmianie — od pierwszej rozmowy po samodzielne, stabilne działanie. Pracuję
                krótkoterminowo i celowo: sprawdzamy regularnie, czy nasza praca przynosi realną różnicę.
              </p>
            </div>
            <div className="soft-card">
              <span className="path-card__icon" style={{ background: 'var(--pine-tint)', color: 'var(--pine)' }}>
                <Icon name="building" size={24} />
              </span>
              <h3>Współpraca z firmami</h3>
              <p>
                Kilkadziesiąt organizacji — od software house'ów po banki. Warsztaty antywypaleniowe,
                programy odporności psychicznej, rozwój liderów i wystąpienia na eventach firmowych. Zawsze
                po badaniu potrzeb i zawsze z planem wdrożenia, nie tylko „inspiracją".
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="credentials-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Wykształcenie i certyfikaty</p>
            <h2 id="credentials-title">Rzetelne podstawy, nie tylko intuicja</h2>
            <p>
              Poniższe szkolenia i certyfikaty są treścią demonstracyjną — nazwy instytucji są fikcyjne i
              nie odnoszą się do rzeczywistych organizacji.
            </p>
          </div>
          <dl className="info-rows">
            {credentials.map((credential) => (
              <div className="info-row" key={credential.title}>
                <dt>
                  {credential.year} · {credential.kind}
                </dt>
                <dd>
                  <strong>{credential.title}</strong>
                  <br />
                  {credential.place}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section section--dark on-dark" aria-label="Motto">
        <div className="container">
          <blockquote className="brand-quote" style={{ color: 'var(--on-dark)' }}>
            {brandMessage.quote}
            <footer style={{ color: 'var(--on-dark-muted)' }}>{specialist.fullTitle}</footer>
          </blockquote>
        </div>
      </section>

      <section className="section" aria-labelledby="personal-title">
        <div className="container split">
          <div>
            <p className="eyebrow">Poza gabinetem</p>
            <h2 id="personal-title">Trochę mniej oficjalnie</h2>
            <ul className="prose" style={{ marginTop: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {bio.personal.map((item) => (
                <li key={item.slice(0, 24)}>{item}</li>
              ))}
            </ul>
          </div>
          <Reveal>
            <div className="split__img">
              <img src={images.workshop.src} alt={images.workshop.alt} loading="lazy" width="941" height="626" />
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Porozmawiajmy — bez zobowiązań."
        text="Pierwsze spotkanie to przede wszystkim rozmowa o tym, czego potrzebujesz. Zdecydujesz po nim, czy chcesz kontynuować."
      />
    </>
  )
}
