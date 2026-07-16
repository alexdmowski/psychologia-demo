import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'

import Icon, { type IconName } from '../components/Icon'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { images } from '../content/images'
import { businessProcess, businessStats, clientLogos, workshopTopics } from '../content/services'
import { testimonials } from '../content/testimonials'
import { requiredPhone, required, validEmail, type Errors } from '../lib/validate'

const offerAreas: { icon: IconName; title: string; text: string }[] = [
  { icon: 'shield', title: 'Przeciwdziałanie wypaleniu', text: 'Warsztaty profilaktyczne i wsparcie zespołów w intensywnych okresach.' },
  { icon: 'spark', title: 'Zarządzanie stresem', text: 'Trening technik regulacji — od fizjologii po codzienne mikropraktyki.' },
  { icon: 'target', title: 'Odporność psychiczna', text: 'Programy budujące zasoby zespołu na czas zmian i presji.' },
  { icon: 'heart', title: 'Wellbeing pracowników', text: 'Cykle webinarów i konsultacji wspierających zdrowie psychiczne w organizacji.' },
  { icon: 'chat', title: 'Komunikacja w zespole', text: 'Feedback, granice i trudne rozmowy — bez eskalacji i bez wycofania.' },
  { icon: 'users', title: 'Rozwój liderów', text: 'Warsztaty i coaching managerski dla nowych oraz doświadczonych liderów.' },
  { icon: 'compass', title: 'Coaching managerski', text: 'Indywidualna praca z liderami: rola, decyzje, autorytet, odporność.' },
  { icon: 'building', title: 'Wystąpienia motywacyjne', text: 'Merytoryczne prelekcje na konferencje i eventy firmowe — bez frazesów.' },
  { icon: 'file', title: 'Programy rozwojowe', text: 'Projektowanie kompleksowych programów: od badania potrzeb po ewaluację.' },
]

type FieldName = 'name' | 'company' | 'email' | 'phone' | 'service' | 'participants' | 'message' | 'consent'

export default function Business() {
  const [values, setValues] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    participants: '',
    date: '',
    format: 'do ustalenia',
    message: '',
    consent: false,
    website: '', // honeypot antyspamowy — pole niewidoczne dla ludzi
  })
  const [errors, setErrors] = useState<Errors<FieldName>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle')

  function set<K extends keyof typeof values>(key: K, value: (typeof values)[K]) {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (status !== 'idle') return
    if (values.website) return // bot wypełnił honeypot — cicho ignorujemy

    const nextErrors: Errors<FieldName> = {}
    nextErrors.name = required(values.name, 'Podaj imię i nazwisko.') ?? undefined
    nextErrors.company = required(values.company, 'Podaj nazwę firmy.') ?? undefined
    nextErrors.email = validEmail(values.email) ?? undefined
    nextErrors.phone = requiredPhone(values.phone) ?? undefined
    nextErrors.service = required(values.service, 'Wybierz rodzaj usługi.') ?? undefined
    nextErrors.participants = required(values.participants, 'Wybierz liczbę uczestników.') ?? undefined
    nextErrors.message = required(values.message, 'Napisz krótko, czego potrzebuje Twój zespół.') ?? undefined
    if (!values.consent) nextErrors.consent = 'Zgoda na przetwarzanie danych jest wymagana.'

    const filtered = Object.fromEntries(Object.entries(nextErrors).filter(([, v]) => v)) as Errors<FieldName>
    setErrors(filtered)
    if (Object.keys(filtered).length > 0) return

    setStatus('sending')
    // Wersja demonstracyjna — tu podłączysz wysyłkę (API / e-mail).
    window.setTimeout(() => setStatus('done'), 900)
  }

  const firmTestimonials = testimonials.filter((t) => t.area === 'firmy')

  return (
    <>
      <Seo
        title="Dla firm — warsztaty, wellbeing, rozwój liderów"
        description="Warsztaty antywypaleniowe, zarządzanie stresem, odporność psychiczna, rozwój liderów i wystąpienia motywacyjne. Programy szyte na miarę organizacji."
        path="/dla-firm"
      />
      <PageHero
        dark
        eyebrow="Dla firm"
        title="Zespoły, które umieją zadbać o swoją energię, osiągają więcej"
        lead="Warsztaty, programy rozwojowe i wystąpienia oparte na psychologii — mówione językiem biznesu i mierzone realną zmianą, nie liczbą slajdów."
        crumbs={[{ label: 'Dla firm' }]}
      >
        <div className="hero__actions" style={{ marginTop: '1.8rem' }}>
          {/* button zamiast kotwicy #formularz — zgodność z trybem HashRouter */}
          <button
            type="button"
            className="btn btn--light"
            onClick={() => document.getElementById('formularz')?.scrollIntoView()}
          >
            Zapytaj o ofertę
          </button>
          <Link to="/rezerwacja?usluga=firma-15" className="btn btn--outline-light">
            Bezpłatna rozmowa — 15 minut
          </Link>
        </div>
      </PageHero>

      <section className="section" aria-labelledby="b2b-offer-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Zakres współpracy</p>
            <h2 id="b2b-offer-title">W czym mogę wesprzeć Twoją organizację</h2>
          </div>
          <div className="card-grid card-grid--3">
            {offerAreas.map((area, index) => (
              <Reveal key={area.title} delay={(index % 3) * 70}>
                <div className="soft-card" style={{ height: '100%' }}>
                  <span className="path-card__icon" style={{ background: 'var(--pine-tint)', color: 'var(--pine)' }}>
                    <Icon name={area.icon} size={24} />
                  </span>
                  <h3 style={{ fontSize: '1.12rem' }}>{area.title}</h3>
                  <p>{area.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark on-dark" aria-labelledby="b2b-stats-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Dotychczasowa współpraca</p>
            <h2 id="b2b-stats-title">Liczby, które mówią same za siebie</h2>
            <p>Statystyki demonstracyjne — przygotowane na potrzeby prezentacji projektu.</p>
          </div>
          <div className="stat-grid">
            {businessStats.map((stat) => (
              <div className="stat" key={stat.label}>
                <p className="stat__value">{stat.value}</p>
                <p className="stat__label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="b2b-topics-title">
        <div className="container split">
          <div>
            <p className="eyebrow">Tematy</p>
            <h2 id="b2b-topics-title">Przykładowe warsztaty</h2>
            <ul style={{ marginTop: '1.2rem', display: 'grid', gap: '0.9rem', paddingLeft: '1.2rem' }}>
              {workshopTopics.slice(0, 4).map((topic) => (
                <li key={topic.title}>
                  <strong>{topic.title}</strong>
                  <br />
                  <span style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>{topic.format}</span>
                </li>
              ))}
            </ul>
            <p style={{ marginTop: '1.4rem' }}>
              <Link to="/oferta/warsztaty-i-wystapienia" className="arrow-link">
                Pełna lista tematów i formatów
              </Link>
            </p>
          </div>
          <Reveal>
            <div className="split__img">
              <img src={images.workshop.src} alt={images.workshop.alt} loading="lazy" width="941" height="626" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--tinted" aria-labelledby="b2b-process-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Przebieg współpracy</p>
            <h2 id="b2b-process-title">Od pierwszej rozmowy do raportu po szkoleniu</h2>
          </div>
          <ol className="steps" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            {businessProcess.map((step) => (
              <li className="step" key={step.title}>
                <h3 style={{ fontSize: '1.05rem' }}>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="b2b-social-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Rekomendacje</p>
            <h2 id="b2b-social-title">Zaufali mi (dane demonstracyjne)</h2>
          </div>
          <div className="testimonial-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {firmTestimonials.map((testimonial) => (
              <article key={testimonial.author} className={testimonial.company ? 'testimonial testimonial--company' : 'testimonial'}>
                <blockquote>{testimonial.quote}</blockquote>
                <footer>
                  <span className="testimonial__author">{testimonial.author}</span>
                  <span className="testimonial__context">{testimonial.context}</span>
                  <span className="demo-badge">opinia demonstracyjna</span>
                </footer>
              </article>
            ))}
          </div>
          <ul className="logo-strip" style={{ listStyle: 'none', padding: 0, margin: '2rem 0 0' }}>
            {clientLogos.map((logo) => (
              <li className="logo-mark" key={logo.name}>
                <span className="logo-mark__name">{logo.name}</span>
                <span className="logo-mark__desc">{logo.descriptor}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--tinted" aria-labelledby="b2b-form-title" id="formularz">
        <div className="container" style={{ maxWidth: '820px' }}>
          <div className="section-head">
            <p className="eyebrow">Zapytanie ofertowe</p>
            <h2 id="b2b-form-title">Opowiedz o potrzebach swojego zespołu</h2>
            <p>Odpowiadam w ciągu jednego dnia roboczego. Konspekt i wycenę otrzymasz do 3 dni roboczych.</p>
          </div>

          {status === 'done' ? (
            <div className="form-success" role="status">
              <span className="success-icon" aria-hidden="true">
                ✓
              </span>
              <h3>Dziękuję za zapytanie!</h3>
              <p>
                To wersja demonstracyjna — wiadomość nie została nigdzie wysłana. W działającej wersji
                otrzymasz potwierdzenie e-mail, a ja odezwę się w ciągu jednego dnia roboczego, aby umówić
                krótką rozmowę o potrzebach.
              </p>
              <p style={{ marginTop: '1.2rem' }}>
                <Link to="/rezerwacja?usluga=firma-15" className="btn btn--primary">
                  Umów od razu bezpłatną rozmowę
                </Link>
              </p>
            </div>
          ) : (
            <form className="form-grid" onSubmit={onSubmit} noValidate aria-describedby="b2b-form-note">
              <div className="form-grid form-grid--2">
                <div className="field">
                  <label htmlFor="b2b-name">Imię i nazwisko</label>
                  <input
                    id="b2b-name"
                    type="text"
                    autoComplete="name"
                    required
                    value={values.name}
                    aria-invalid={errors.name ? true : undefined}
                    aria-describedby={errors.name ? 'b2b-name-err' : undefined}
                    onChange={(e) => set('name', e.target.value)}
                  />
                  {errors.name && (
                    <p className="field-error" id="b2b-name-err">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div className="field">
                  <label htmlFor="b2b-company">Nazwa firmy</label>
                  <input
                    id="b2b-company"
                    type="text"
                    autoComplete="organization"
                    required
                    value={values.company}
                    aria-invalid={errors.company ? true : undefined}
                    aria-describedby={errors.company ? 'b2b-company-err' : undefined}
                    onChange={(e) => set('company', e.target.value)}
                  />
                  {errors.company && (
                    <p className="field-error" id="b2b-company-err">
                      {errors.company}
                    </p>
                  )}
                </div>
                <div className="field">
                  <label htmlFor="b2b-email">Służbowy e-mail</label>
                  <input
                    id="b2b-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={values.email}
                    aria-invalid={errors.email ? true : undefined}
                    aria-describedby={errors.email ? 'b2b-email-err' : undefined}
                    onChange={(e) => set('email', e.target.value)}
                  />
                  {errors.email && (
                    <p className="field-error" id="b2b-email-err">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="field">
                  <label htmlFor="b2b-phone">Numer telefonu</label>
                  <input
                    id="b2b-phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    value={values.phone}
                    aria-invalid={errors.phone ? true : undefined}
                    aria-describedby={errors.phone ? 'b2b-phone-err' : undefined}
                    onChange={(e) => set('phone', e.target.value)}
                  />
                  {errors.phone && (
                    <p className="field-error" id="b2b-phone-err">
                      {errors.phone}
                    </p>
                  )}
                </div>
                <div className="field">
                  <label htmlFor="b2b-service">Rodzaj usługi</label>
                  <select
                    id="b2b-service"
                    required
                    value={values.service}
                    aria-invalid={errors.service ? true : undefined}
                    aria-describedby={errors.service ? 'b2b-service-err' : undefined}
                    onChange={(e) => set('service', e.target.value)}
                  >
                    <option value="">— wybierz —</option>
                    <option>Warsztat / szkolenie</option>
                    <option>Program rozwojowy (cykl)</option>
                    <option>Wystąpienie / prelekcja</option>
                    <option>Coaching managerski</option>
                    <option>Program wellbeingowy</option>
                    <option>Inne / nie wiem jeszcze</option>
                  </select>
                  {errors.service && (
                    <p className="field-error" id="b2b-service-err">
                      {errors.service}
                    </p>
                  )}
                </div>
                <div className="field">
                  <label htmlFor="b2b-participants">Liczba uczestników</label>
                  <select
                    id="b2b-participants"
                    required
                    value={values.participants}
                    aria-invalid={errors.participants ? true : undefined}
                    aria-describedby={errors.participants ? 'b2b-participants-err' : undefined}
                    onChange={(e) => set('participants', e.target.value)}
                  >
                    <option value="">— wybierz —</option>
                    <option>do 10 osób</option>
                    <option>11–16 osób</option>
                    <option>17–30 osób</option>
                    <option>31–100 osób</option>
                    <option>ponad 100 osób (event/konferencja)</option>
                  </select>
                  {errors.participants && (
                    <p className="field-error" id="b2b-participants-err">
                      {errors.participants}
                    </p>
                  )}
                </div>
                <div className="field">
                  <label htmlFor="b2b-date">
                    Preferowany termin <span className="optional">(opcjonalnie)</span>
                  </label>
                  <input
                    id="b2b-date"
                    type="text"
                    placeholder="np. wrzesień 2026"
                    value={values.date}
                    onChange={(e) => set('date', e.target.value)}
                  />
                </div>
                <div className="field">
                  <label htmlFor="b2b-format">Forma</label>
                  <select id="b2b-format" value={values.format} onChange={(e) => set('format', e.target.value)}>
                    <option>do ustalenia</option>
                    <option>stacjonarnie (u nas w firmie)</option>
                    <option>stacjonarnie (sala zewnętrzna)</option>
                    <option>online</option>
                    <option>hybrydowo</option>
                  </select>
                </div>
              </div>

              <div className="field">
                <label htmlFor="b2b-message">Wiadomość</label>
                <textarea
                  id="b2b-message"
                  required
                  placeholder="Napisz krótko: jaki jest cel, dla kogo i w jakim kontekście (np. reorganizacja, szybki wzrost zespołu)."
                  value={values.message}
                  aria-invalid={errors.message ? true : undefined}
                  aria-describedby={errors.message ? 'b2b-message-err' : undefined}
                  onChange={(e) => set('message', e.target.value)}
                />
                {errors.message && (
                  <p className="field-error" id="b2b-message-err">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Honeypot antyspamowy — ukryty dla ludzi i czytników */}
              <div className="visually-hidden" aria-hidden="true">
                <label htmlFor="b2b-website">Nie wypełniaj tego pola</label>
                <input
                  id="b2b-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.website}
                  onChange={(e) => set('website', e.target.value)}
                />
              </div>

              <div className="check-field">
                <input
                  id="b2b-consent"
                  type="checkbox"
                  checked={values.consent}
                  aria-invalid={errors.consent ? true : undefined}
                  aria-describedby={errors.consent ? 'b2b-consent-err' : undefined}
                  onChange={(e) => set('consent', e.target.checked)}
                />
                <label htmlFor="b2b-consent">
                  Wyrażam zgodę na przetwarzanie podanych danych w celu odpowiedzi na zapytanie — zgodnie z{' '}
                  <Link to="/polityka-prywatnosci">polityką prywatności</Link>.
                </label>
              </div>
              {errors.consent && (
                <p className="field-error" id="b2b-consent-err">
                  {errors.consent}
                </p>
              )}

              {Object.keys(errors).length > 0 && (
                <p className="form-status form-status--error" role="alert">
                  Formularz zawiera błędy — popraw zaznaczone pola i spróbuj ponownie.
                </p>
              )}

              <div>
                <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Wysyłam…' : 'Wyślij zapytanie'}
                </button>
              </div>
              <p className="field-hint" id="b2b-form-note">
                Wersja demonstracyjna — formularz symuluje wysyłkę i nie przekazuje danych na żaden serwer.
              </p>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
