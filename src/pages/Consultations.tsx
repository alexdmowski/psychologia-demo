import { Link } from 'react-router-dom'

import Accordion from '../components/Accordion'
import Icon from '../components/Icon'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { images } from '../content/images'
import { consultations } from '../content/services'

export default function Consultations() {
  return (
    <>
      <Seo
        title="Konsultacje psychologiczne"
        description="Konsultacje psychologiczne w Warszawie i online — 50 minut, 220 zł. Stres, przeciążenie, kryzys, wypalenie, emocje i relacje. Pełna poufność."
        path="/oferta/konsultacje-psychologiczne"
      />
      <PageHero
        eyebrow="Oferta · psychologia"
        title={consultations.title}
        lead={consultations.lead}
        crumbs={[{ label: 'Oferta', path: '/oferta' }, { label: 'Konsultacje psychologiczne' }]}
      >
        <div className="hero__actions" style={{ marginTop: '1.6rem' }}>
          <Link to="/rezerwacja?usluga=konsultacja-50" className="btn btn--primary">
            Umów konsultację
          </Link>
          <span className="hero__badge">50 minut · 220 zł · online lub stacjonarnie</span>
        </div>
      </PageHero>

      <section className="section" aria-labelledby="what-title">
        <div className="container split" style={{ alignItems: 'start' }}>
          <div className="prose">
            <h2 id="what-title" style={{ marginTop: 0 }}>
              Czym są konsultacje psychologiczne?
            </h2>
            {consultations.what.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
            <h3>Konsultacje mogą być dla Ciebie, jeśli…</h3>
            <ul>
              {consultations.forWhom.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <Reveal>
            <div>
              <div className="split__img">
                <img src={images.office.src} alt={images.office.alt} loading="lazy" width="928" height="635" />
              </div>
              <div className="soft-card" style={{ marginTop: '1.2rem' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Icon name="shield" size={20} className="inline-ico" /> Poufność
                </h3>
                <p>{consultations.confidentiality}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--tinted" aria-labelledby="areas-c-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Obszary wsparcia</p>
            <h2 id="areas-c-title">Z czym możesz przyjść</h2>
          </div>
          <ul className="chip-row" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {consultations.areas.map((area) => (
              <li key={area}>
                <span className="chip" style={{ display: 'inline-flex', alignItems: 'center' }}>
                  {area}
                </span>
              </li>
            ))}
          </ul>

          <div className="card-grid card-grid--2" style={{ marginTop: '2.5rem' }}>
            <div className="soft-card">
              <h3>Jak wygląda pierwsze spotkanie</h3>
              {consultations.firstMeeting.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} style={{ marginTop: '0.6rem' }}>
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="soft-card" style={{ borderTop: '4px solid var(--copper)' }}>
              <h3>Czego konsultacje nie zastępują</h3>
              {consultations.notReplacing.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} style={{ marginTop: '0.6rem' }}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <dl className="info-rows" style={{ marginTop: '2.5rem', maxWidth: '640px' }}>
            <div className="info-row">
              <dt>Czas trwania</dt>
              <dd>50 minut</dd>
            </div>
            <div className="info-row">
              <dt>Cena</dt>
              <dd>220 zł (cena demonstracyjna)</dd>
            </div>
            <div className="info-row">
              <dt>Forma</dt>
              <dd>online (bezpieczne wideopołączenie) lub stacjonarnie w Warszawie</dd>
            </div>
            <div className="info-row">
              <dt>Częstotliwość</dt>
              <dd>najczęściej co 1–2 tygodnie — ustalana wspólnie</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-c-title">
        <div className="container" style={{ maxWidth: '820px' }}>
          <div className="section-head">
            <p className="eyebrow">Pytania</p>
            <h2 id="faq-c-title">Częste pytania o konsultacje</h2>
          </div>
          <Accordion items={consultations.faq} />
          <p style={{ marginTop: '1.5rem', color: 'var(--muted)' }}>
            Więcej odpowiedzi znajdziesz w <Link to="/faq">pełnym FAQ</Link>.
          </p>
        </div>
      </section>

      <section className="section section--tinted" aria-label="Rezerwacja konsultacji">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ maxWidth: '24ch', margin: '0 auto 1rem' }}>Zrób pierwszy krok — resztę ustalimy razem</h2>
          <p style={{ color: 'var(--muted)', maxWidth: '46ch', margin: '0 auto 2rem' }}>
            Wybierz dogodny termin w kalendarzu. Jeśli wolisz najpierw zapytać — napisz lub zadzwoń.
          </p>
          <div className="cta-band__actions">
            <Link to="/rezerwacja?usluga=konsultacja-50" className="btn btn--primary">
              Umów konsultację
            </Link>
            <Link to="/kontakt" className="btn btn--secondary">
              Zadaj pytanie
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
