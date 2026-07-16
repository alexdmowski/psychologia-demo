import { useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'

import { readStorage, STORAGE_KEYS, writeStorage } from '../lib/storage'
import { validEmail, type Errors } from '../lib/validate'

interface NewsletterState {
  email: string
  subscribedAt: string
}

type FieldName = 'email' | 'consent'

export default function Newsletter() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [errors, setErrors] = useState<Errors<FieldName>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle')

  useEffect(() => {
    if (readStorage<NewsletterState>(STORAGE_KEYS.newsletter)) setStatus('done')
  }, [])

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (status !== 'idle') return

    const nextErrors: Errors<FieldName> = {}
    const emailError = validEmail(email)
    if (emailError) nextErrors.email = emailError
    if (!consent) nextErrors.consent = 'Zaznacz zgodę, abyśmy mogli wysyłać Ci newsletter.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('sending')
    // Wersja demonstracyjna: symulujemy zapis (tu podłączysz realną usługę newslettera).
    window.setTimeout(() => {
      writeStorage<NewsletterState>(STORAGE_KEYS.newsletter, {
        email,
        subscribedAt: new Date().toISOString(),
      })
      setStatus('done')
    }, 700)
  }

  return (
    <section className="section" aria-labelledby="newsletter-title">
      <div className="container">
        <div className="newsletter">
          <div>
            <p className="eyebrow">Newsletter</p>
            <h2 id="newsletter-title">Raz w miesiącu: praktyczna psychologia w Twojej skrzynce</h2>
            <p style={{ color: 'var(--muted)', marginTop: '0.7rem' }}>
              Bez spamu i „złotych rad". Konkretne narzędzia, artykuły i zaproszenia na warsztaty.
            </p>
            <div className="newsletter__lead-magnet">
              <span className="pdf-ico" aria-hidden="true">
                PDF
              </span>
              <p>
                <strong>Na start: „Psycholog czy coach? Krótki przewodnik po formach wsparcia."</strong>
                Materiał otrzymasz od razu po zapisie.
              </p>
            </div>
          </div>

          {status === 'done' ? (
            <div className="form-success" role="status">
              <span className="success-icon" aria-hidden="true">
                ✓
              </span>
              <h3>Dziękuję! Zapis przyjęty.</h3>
              <p>
                W prawdziwej wersji strony potwierdzenie trafi na Twój e-mail. W wersji demonstracyjnej
                możesz od razu otworzyć przewodnik.
              </p>
              <p style={{ marginTop: '1.2rem' }}>
                <Link className="btn btn--primary" to="/materialy/psycholog-czy-coach">
                  Otwórz przewodnik
                </Link>
              </p>
            </div>
          ) : (
            <form className="form-grid" onSubmit={onSubmit} noValidate>
              <div className="field">
                <label htmlFor="nl-name">
                  Imię <span className="optional">(opcjonalnie)</span>
                </label>
                <input
                  id="nl-name"
                  type="text"
                  name="name"
                  autoComplete="given-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="nl-email">Adres e-mail</label>
                <input
                  id="nl-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? 'nl-email-error' : undefined}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <p className="field-error" id="nl-email-error">
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="check-field">
                <input
                  id="nl-consent"
                  type="checkbox"
                  checked={consent}
                  aria-invalid={errors.consent ? true : undefined}
                  aria-describedby={errors.consent ? 'nl-consent-error' : undefined}
                  onChange={(e) => setConsent(e.target.checked)}
                />
                <label htmlFor="nl-consent">
                  Chcę otrzymywać newsletter i akceptuję{' '}
                  <Link to="/polityka-prywatnosci">politykę prywatności</Link>. Zgodę mogę wycofać w każdej
                  chwili.
                </label>
              </div>
              {errors.consent && (
                <p className="field-error" id="nl-consent-error">
                  {errors.consent}
                </p>
              )}
              <div>
                <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Zapisuję…' : 'Zapisz się i odbierz przewodnik'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
