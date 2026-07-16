import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'

import Icon from '../components/Icon'
import PageHero from '../components/PageHero'
import Seo from '../components/Seo'
import { images } from '../content/images'
import { socialLinks, specialist } from '../content/site'
import { optionalPhone, required, validEmail, type Errors } from '../lib/validate'

type FieldName = 'name' | 'email' | 'phone' | 'message' | 'consent'

export default function Contact() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Nie wiem jeszcze — poproszę o pomoc w wyborze',
    preferred: 'e-mail',
    message: '',
    consent: false,
    website: '', // honeypot antyspamowy
  })
  const [errors, setErrors] = useState<Errors<FieldName>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle')

  function set<K extends keyof typeof values>(key: K, value: (typeof values)[K]) {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (status !== 'idle') return
    if (values.website) return

    const nextErrors: Errors<FieldName> = {}
    nextErrors.name = required(values.name, 'Podaj imię.') ?? undefined
    nextErrors.email = validEmail(values.email) ?? undefined
    nextErrors.phone = optionalPhone(values.phone) ?? undefined
    nextErrors.message = required(values.message, 'Napisz wiadomość.') ?? undefined
    if (!values.consent) nextErrors.consent = 'Zgoda na przetwarzanie danych jest wymagana.'

    const filtered = Object.fromEntries(Object.entries(nextErrors).filter(([, v]) => v)) as Errors<FieldName>
    setErrors(filtered)
    if (Object.keys(filtered).length > 0) return

    setStatus('sending')
    // Wersja demonstracyjna — tu podłączysz realną wysyłkę wiadomości.
    window.setTimeout(() => setStatus('done'), 900)
  }

  return (
    <>
      <Seo
        title="Kontakt"
        description="Skontaktuj się: telefon +48 500 600 700, e-mail kontakt@aleksandranowicka.pl. Gabinet w Warszawie (Śródmieście) i spotkania online."
        path="/kontakt"
      />
      <PageHero
        eyebrow="Kontakt"
        title="Porozmawiajmy"
        lead="Napisz, zadzwoń albo od razu zarezerwuj termin. Odpowiadam zwykle w ciągu jednego dnia roboczego."
        crumbs={[{ label: 'Kontakt' }]}
      />

      <section className="section" aria-label="Dane kontaktowe i formularz">
        <div className="container contact-layout">
          <div>
            <ul className="contact-list">
              <li>
                <span className="ico">
                  <Icon name="phone" size={20} />
                </span>
                <div>
                  <strong>Telefon</strong>
                  <a href={specialist.phoneHref}>{specialist.phone}</a>
                </div>
              </li>
              <li>
                <span className="ico">
                  <Icon name="mail" size={20} />
                </span>
                <div>
                  <strong>E-mail</strong>
                  <a href={`mailto:${specialist.email}`}>{specialist.email}</a>
                </div>
              </li>
              <li>
                <span className="ico">
                  <Icon name="pin" size={20} />
                </span>
                <div>
                  <strong>Gabinet</strong>
                  <p style={{ margin: 0 }}>
                    {specialist.address.street}
                    <br />
                    {specialist.address.postal} · {specialist.workMode}
                  </p>
                </div>
              </li>
              <li>
                <span className="ico">
                  <Icon name="clock" size={20} />
                </span>
                <div>
                  <strong>Godziny kontaktu (demonstracyjne)</strong>
                  {specialist.hours.map((entry) => (
                    <p style={{ margin: 0 }} key={entry.days}>
                      {entry.days}: {entry.time}
                    </p>
                  ))}
                </div>
              </li>
            </ul>

            <div className="map-block">
              <img src={images.map.src} alt={images.map.alt} loading="lazy" width="1200" height="640" />
              <p className="map-block__pin">
                <strong>Dojazd:</strong> 7 minut pieszo od metra Politechnika, przystanek „Piękna" (tramwaje
                4, 15, 18), parking publiczny przy pl. Zbawiciela. Wejście od podwórza, domofon „12".
              </p>
            </div>

            <h2 style={{ fontSize: '1.1rem', margin: '1.8rem 0 0.7rem' }}>Media społecznościowe</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {socialLinks.map((social) => (
                <li key={social.short}>
                  <a
                    className="chip"
                    style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {social.label.replace(' (profil demonstracyjny)', '')}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            {status === 'done' ? (
              <div className="form-success" role="status">
                <span className="success-icon" aria-hidden="true">
                  ✓
                </span>
                <h3>Wiadomość przyjęta!</h3>
                <p>
                  To wersja demonstracyjna — wiadomość nie została nigdzie wysłana. W działającej wersji
                  otrzymasz kopię na swój e-mail, a ja odpowiem w ciągu jednego dnia roboczego.
                </p>
                <p style={{ marginTop: '1.2rem' }}>
                  <Link to="/rezerwacja" className="btn btn--primary">
                    Zarezerwuj termin od razu
                  </Link>
                </p>
              </div>
            ) : (
              <form className="form-grid" onSubmit={onSubmit} noValidate aria-describedby="contact-note">
                <h2 style={{ fontSize: '1.35rem' }}>Formularz kontaktowy</h2>
                <p className="field-hint" style={{ marginTop: '-0.4rem' }}>
                  Nie opisuj w wiadomości szczegółów dotyczących zdrowia — wystarczy temat, w którym szukasz
                  wsparcia. O reszcie porozmawiamy bezpiecznie na spotkaniu.
                </p>
                <div className="form-grid form-grid--2">
                  <div className="field">
                    <label htmlFor="c-name">Imię</label>
                    <input
                      id="c-name"
                      type="text"
                      autoComplete="given-name"
                      required
                      value={values.name}
                      aria-invalid={errors.name ? true : undefined}
                      aria-describedby={errors.name ? 'c-name-err' : undefined}
                      onChange={(e) => set('name', e.target.value)}
                    />
                    {errors.name && (
                      <p className="field-error" id="c-name-err">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div className="field">
                    <label htmlFor="c-email">E-mail</label>
                    <input
                      id="c-email"
                      type="email"
                      autoComplete="email"
                      required
                      value={values.email}
                      aria-invalid={errors.email ? true : undefined}
                      aria-describedby={errors.email ? 'c-email-err' : undefined}
                      onChange={(e) => set('email', e.target.value)}
                    />
                    {errors.email && (
                      <p className="field-error" id="c-email-err">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="field">
                    <label htmlFor="c-phone">
                      Telefon <span className="optional">(opcjonalnie)</span>
                    </label>
                    <input
                      id="c-phone"
                      type="tel"
                      autoComplete="tel"
                      value={values.phone}
                      aria-invalid={errors.phone ? true : undefined}
                      aria-describedby={errors.phone ? 'c-phone-err' : undefined}
                      onChange={(e) => set('phone', e.target.value)}
                    />
                    {errors.phone && (
                      <p className="field-error" id="c-phone-err">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  <div className="field">
                    <label htmlFor="c-service">Interesująca usługa</label>
                    <select id="c-service" value={values.service} onChange={(e) => set('service', e.target.value)}>
                      <option>Nie wiem jeszcze — poproszę o pomoc w wyborze</option>
                      <option>Konsultacja psychologiczna</option>
                      <option>Coaching</option>
                      <option>Oferta dla firmy</option>
                      <option>Inny temat</option>
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="c-preferred">Preferowany sposób kontaktu</label>
                    <select id="c-preferred" value={values.preferred} onChange={(e) => set('preferred', e.target.value)}>
                      <option>e-mail</option>
                      <option>telefon</option>
                      <option>bez znaczenia</option>
                    </select>
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="c-message">Wiadomość</label>
                  <textarea
                    id="c-message"
                    required
                    value={values.message}
                    aria-invalid={errors.message ? true : undefined}
                    aria-describedby={errors.message ? 'c-message-err' : undefined}
                    onChange={(e) => set('message', e.target.value)}
                  />
                  {errors.message && (
                    <p className="field-error" id="c-message-err">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="visually-hidden" aria-hidden="true">
                  <label htmlFor="c-website">Nie wypełniaj tego pola</label>
                  <input
                    id="c-website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={values.website}
                    onChange={(e) => set('website', e.target.value)}
                  />
                </div>

                <div className="check-field">
                  <input
                    id="c-consent"
                    type="checkbox"
                    checked={values.consent}
                    aria-invalid={errors.consent ? true : undefined}
                    aria-describedby={errors.consent ? 'c-consent-err' : undefined}
                    onChange={(e) => set('consent', e.target.checked)}
                  />
                  <label htmlFor="c-consent">
                    Wyrażam zgodę na przetwarzanie podanych danych w celu odpowiedzi na wiadomość — zgodnie z{' '}
                    <Link to="/polityka-prywatnosci">polityką prywatności</Link>.
                  </label>
                </div>
                {errors.consent && (
                  <p className="field-error" id="c-consent-err">
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
                    {status === 'sending' ? 'Wysyłam…' : 'Wyślij wiadomość'}
                  </button>
                </div>
                <p className="field-hint" id="contact-note">
                  Wersja demonstracyjna — formularz symuluje wysyłkę i nie przekazuje danych na żaden serwer.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
