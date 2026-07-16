import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import Seo from '../components/Seo'
import { bookingServices } from '../content/pricing'
import { disclaimers, specialist } from '../content/site'
import type { BookingService } from '../content/types'
import {
  BOOKING_HORIZON_DAYS,
  addDays,
  calendarCells,
  formatLongDate,
  formatMonthYear,
  getDaySlots,
  isDayAvailable,
  startOfToday,
  toIsoDate,
} from '../lib/dates'
import { downloadIcs } from '../lib/ics'
import { readStorage, STORAGE_KEYS, writeStorage } from '../lib/storage'
import { requiredPhone, required, validEmail, type Errors } from '../lib/validate'

// ─────────────────────────────────────────────────────────────────────────────
// Demonstracyjny system rezerwacji (frontend).
// Punkty integracji na przyszłość:
//  - dostępność terminów: lib/dates.ts (getDaySlots / isDayAvailable),
//  - płatności: krok „Płatność" (payMethod) — tu podłączysz bramkę,
//  - zapis rezerwacji: confirmBooking() — tu wywołasz API kalendarza/CRM.
// ─────────────────────────────────────────────────────────────────────────────

const STEPS = ['Usługa', 'Forma', 'Termin', 'Twoje dane', 'Podsumowanie', 'Płatność'] as const

const PAY_METHODS = [
  { id: 'blik', name: 'BLIK', hint: 'kod z aplikacji banku' },
  { id: 'card', name: 'Karta', hint: 'Visa, Mastercard' },
  { id: 'transfer', name: 'Szybki przelew', hint: 'Twój bank online' },
  { id: 'applepay', name: 'Apple Pay', hint: 'na urządzeniach Apple' },
  { id: 'googlepay', name: 'Google Pay', hint: 'na Androidzie i w Chrome' },
] as const

interface StoredBooking {
  number: string
  serviceId: string
  serviceName: string
  durationMinutes: number
  price: number
  form: 'online' | 'stacjonarnie'
  date: string
  time: string
  name: string
  email: string
  createdAt: string
}

type FieldName = 'name' | 'email' | 'phone' | 'consent'

function makeBookingNumber(): string {
  const year = new Date().getFullYear()
  const digits = String(Math.floor(1000 + Math.random() * 9000))
  return `AN-${year}-${digits}`
}

export default function Booking() {
  const [searchParams] = useSearchParams()
  const preselected = searchParams.get('usluga')

  const [step, setStep] = useState(0)
  const [service, setService] = useState<BookingService | null>(
    () => bookingServices.find((s) => s.id === preselected) ?? null,
  )
  const [form, setForm] = useState<'online' | 'stacjonarnie' | null>(null)
  const [viewMonth, setViewMonth] = useState(() => {
    const today = startOfToday()
    return { year: today.getFullYear(), month: today.getMonth() }
  })
  const [dateIso, setDateIso] = useState<string | null>(null)
  const [time, setTime] = useState<string | null>(null)
  const [person, setPerson] = useState({ name: '', email: '', phone: '', notes: '', invoice: false })
  const [consent, setConsent] = useState(false)
  const [errors, setErrors] = useState<Errors<FieldName>>({})
  const [payMethod, setPayMethod] = useState<string | null>(null)
  const [paying, setPaying] = useState(false)
  const [confirmed, setConfirmed] = useState<StoredBooking | null>(null)
  const [lastBooking, setLastBooking] = useState<StoredBooking | null>(null)

  const headingRef = useRef<HTMLHeadingElement>(null)
  const skipPayment = service !== null && service.price === 0
  const visibleSteps = skipPayment ? STEPS.slice(0, 5) : STEPS

  useEffect(() => {
    setLastBooking(readStorage<StoredBooking>(STORAGE_KEYS.lastBooking))
  }, [])

  useEffect(() => {
    if (preselected && service && step === 0) setStep(1)
    // preselekcja z adresu URL (?usluga=...) przenosi od razu do kroku „Forma"
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    headingRef.current?.focus()
  }, [step, confirmed])

  const today = startOfToday()
  const maxDate = addDays(today, BOOKING_HORIZON_DAYS)
  const cells = useMemo(() => calendarCells(viewMonth.year, viewMonth.month), [viewMonth])
  const monthDate = new Date(viewMonth.year, viewMonth.month, 1)
  const canPrevMonth = monthDate > new Date(today.getFullYear(), today.getMonth(), 1)
  const canNextMonth = new Date(viewMonth.year, viewMonth.month + 1, 1) <= maxDate

  function goTo(next: number) {
    setStep(next)
  }

  function chooseService(next: BookingService) {
    setService(next)
    if (!next.inPerson) setForm('online')
    else if (form === null) setForm(null)
    setDateIso(null)
    setTime(null)
    goTo(1)
  }

  function validatePerson(): boolean {
    const nextErrors: Errors<FieldName> = {}
    nextErrors.name = required(person.name, 'Podaj imię i nazwisko.') ?? undefined
    nextErrors.email = validEmail(person.email) ?? undefined
    nextErrors.phone = requiredPhone(person.phone) ?? undefined
    if (!consent) nextErrors.consent = 'Akceptacja regulaminu i zgoda na przetwarzanie danych są wymagane.'
    const filtered = Object.fromEntries(Object.entries(nextErrors).filter(([, v]) => v)) as Errors<FieldName>
    setErrors(filtered)
    return Object.keys(filtered).length === 0
  }

  function confirmBooking() {
    if (!service || !form || !dateIso || !time) return
    setPaying(true)
    // Wersja demonstracyjna: symulacja przetwarzania płatności / zapisu rezerwacji.
    window.setTimeout(() => {
      const booking: StoredBooking = {
        number: makeBookingNumber(),
        serviceId: service.id,
        serviceName: service.name,
        durationMinutes: service.durationMinutes,
        price: service.price,
        form,
        date: dateIso,
        time,
        name: person.name,
        email: person.email,
        createdAt: new Date().toISOString(),
      }
      writeStorage(STORAGE_KEYS.lastBooking, booking)
      setLastBooking(booking)
      setConfirmed(booking)
      setPaying(false)
    }, 1100)
  }

  function resetAll() {
    setConfirmed(null)
    setService(null)
    setForm(null)
    setDateIso(null)
    setTime(null)
    setPerson({ name: '', email: '', phone: '', notes: '', invoice: false })
    setConsent(false)
    setPayMethod(null)
    setErrors({})
    setStep(0)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const daySlots = dateIso && service ? getDaySlots(new Date(dateIso), service.id) : []

  // ── Widok potwierdzenia ──
  if (confirmed) {
    return (
      <>
        <Seo title="Rezerwacja potwierdzona" description="Potwierdzenie rezerwacji demonstracyjnej." path="/rezerwacja" />
        <section className="section" aria-label="Potwierdzenie rezerwacji">
          <div className="container booking-shell">
            <div className="booking-card" style={{ textAlign: 'center' }}>
              <span className="success-icon" style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--pine)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.7rem' }} aria-hidden="true">
                ✓
              </span>
              <h1 ref={headingRef} tabIndex={-1} style={{ fontSize: '1.9rem', margin: '1rem 0 0.4rem' }}>
                Rezerwacja potwierdzona!
              </h1>
              <p style={{ color: 'var(--muted)' }}>Twój numer rezerwacji (demonstracyjny):</p>
              <p className="booking-number">{confirmed.number}</p>

              <div className="summary-box" style={{ textAlign: 'left', maxWidth: 480, margin: '0 auto' }}>
                <dl>
                  <div className="sum-row">
                    <dt>Usługa</dt>
                    <dd>{confirmed.serviceName}</dd>
                  </div>
                  <div className="sum-row">
                    <dt>Termin</dt>
                    <dd>
                      {formatLongDate(confirmed.date)}, {confirmed.time}
                    </dd>
                  </div>
                  <div className="sum-row">
                    <dt>Forma</dt>
                    <dd>{confirmed.form === 'online' ? 'online (wideorozmowa)' : 'stacjonarnie, Warszawa'}</dd>
                  </div>
                  <div className="sum-row sum-row--total">
                    <dt>{confirmed.price === 0 ? 'Koszt' : 'Opłacono (demo)'}</dt>
                    <dd>{confirmed.price === 0 ? 'bezpłatnie' : `${confirmed.price} zł`}</dd>
                  </div>
                </dl>
              </div>

              <p style={{ color: 'var(--muted)', fontSize: '0.95rem', margin: '1.4rem auto', maxWidth: '44ch' }}>
                W działającej wersji strony potwierdzenie oraz szczegóły dojazdu / link do spotkania
                otrzymasz na adres <strong>{confirmed.email}</strong>.
              </p>

              <div className="cta-band__actions">
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={() =>
                    downloadIcs(
                      {
                        title: `${confirmed.serviceName} — ${specialist.brandShort}`,
                        description: `Rezerwacja ${confirmed.number} (demonstracyjna). Forma: ${confirmed.form}.`,
                        location:
                          confirmed.form === 'online' ? 'Online (link w e-mailu)' : `${specialist.address.street}, ${specialist.address.postal}`,
                        dateIso: confirmed.date,
                        time: confirmed.time,
                        durationMinutes: confirmed.durationMinutes,
                      },
                      `rezerwacja-${confirmed.number}.ics`,
                    )
                  }
                >
                  Dodaj do kalendarza
                </button>
                <button type="button" className="btn btn--secondary" onClick={resetAll}>
                  Zarezerwuj kolejne spotkanie
                </button>
              </div>
              <p style={{ marginTop: '1.6rem', fontSize: '0.85rem', color: 'var(--muted)' }}>{disclaimers.demo}</p>
            </div>
          </div>
        </section>
      </>
    )
  }

  // ── Kreator rezerwacji ──
  return (
    <>
      <Seo
        title="Umów spotkanie"
        description="Zarezerwuj konsultację psychologiczną, sesję coachingową lub bezpłatną rozmowę dla firmy. Wybierz usługę, termin i formę — online lub w Warszawie."
        path="/rezerwacja"
      />
      <section className="section" aria-label="Rezerwacja terminu">
        <div className="container booking-shell">
          <div className="section-head">
            <p className="eyebrow">Rezerwacja online</p>
            <h1 style={{ fontSize: 'clamp(1.7rem, 4vw, 2.4rem)' }}>Umów spotkanie</h1>
          </div>

          {lastBooking && step === 0 && (
            <div className="form-status form-status--success" style={{ marginBottom: '1.4rem', display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>
                Ostatnia rezerwacja: <strong>{lastBooking.number}</strong> — {formatLongDate(lastBooking.date)}, {lastBooking.time}
              </span>
              <button type="button" className="btn btn--secondary btn--small" onClick={() => setConfirmed(lastBooking)}>
                Pokaż potwierdzenie
              </button>
            </div>
          )}

          <ol className="booking-progress" aria-label="Postęp rezerwacji">
            {visibleSteps.map((label, index) => (
              <li
                key={label}
                data-state={index < step ? 'done' : index === step ? 'current' : 'todo'}
                aria-current={index === step ? 'step' : undefined}
              >
                <span className="visually-hidden">
                  {label} {index < step ? '(ukończono)' : index === step ? '(bieżący krok)' : ''}
                </span>
              </li>
            ))}
          </ol>

          <div className="booking-card">
            <p className="booking-step-label">
              Krok {step + 1} z {visibleSteps.length}: {visibleSteps[step]}
            </p>

            {/* KROK 1: USŁUGA */}
            {step === 0 && (
              <>
                <h2 ref={headingRef} tabIndex={-1}>
                  Jaką usługę chcesz zarezerwować?
                </h2>
                <div className="option-list">
                  {bookingServices.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className="option-tile"
                      data-selected={service?.id === item.id}
                      onClick={() => chooseService(item)}
                    >
                      <span className="option-tile__name">
                        {item.name} · {item.durationMinutes} min
                      </span>
                      <span className="option-tile__price">{item.price === 0 ? 'bezpłatnie' : `${item.price} zł`}</span>
                      <span className="option-tile__desc">{item.description}</span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* KROK 2: FORMA */}
            {step === 1 && service && (
              <>
                <h2 ref={headingRef} tabIndex={-1}>
                  Jak chcesz się spotkać?
                </h2>
                <div className="option-list">
                  <button type="button" className="option-tile" data-selected={form === 'online'} onClick={() => setForm('online')}>
                    <span className="option-tile__name">Online</span>
                    <span className="option-tile__desc">
                      Bezpieczne wideopołączenie — link otrzymasz w potwierdzeniu. Zadbaj o spokojne miejsce i słuchawki.
                    </span>
                  </button>
                  <button
                    type="button"
                    className="option-tile"
                    data-selected={form === 'stacjonarnie'}
                    disabled={!service.inPerson}
                    style={!service.inPerson ? { opacity: 0.5, cursor: 'not-allowed' } : undefined}
                    onClick={() => service.inPerson && setForm('stacjonarnie')}
                  >
                    <span className="option-tile__name">Stacjonarnie — Warszawa</span>
                    <span className="option-tile__desc">
                      {service.inPerson
                        ? `Gabinet: ${specialist.address.street}, ${specialist.address.postal}.`
                        : 'Ta usługa jest dostępna wyłącznie online.'}
                    </span>
                  </button>
                </div>
                <div className="booking-nav">
                  <button type="button" className="btn btn--secondary" onClick={() => goTo(0)}>
                    ← Wstecz
                  </button>
                  <button type="button" className="btn btn--primary" disabled={!form} onClick={() => goTo(2)}>
                    Dalej: termin →
                  </button>
                </div>
              </>
            )}

            {/* KROK 3: TERMIN */}
            {step === 2 && service && (
              <>
                <h2 ref={headingRef} tabIndex={-1}>
                  Wybierz dzień i godzinę
                </h2>
                <div className="calendar-nav">
                  <button
                    type="button"
                    onClick={() => setViewMonth((v) => ({ year: v.month === 0 ? v.year - 1 : v.year, month: v.month === 0 ? 11 : v.month - 1 }))}
                    disabled={!canPrevMonth}
                    aria-label="Poprzedni miesiąc"
                  >
                    ‹
                  </button>
                  <strong aria-live="polite">{formatMonthYear(monthDate)}</strong>
                  <button
                    type="button"
                    onClick={() => setViewMonth((v) => ({ year: v.month === 11 ? v.year + 1 : v.year, month: v.month === 11 ? 0 : v.month + 1 }))}
                    disabled={!canNextMonth}
                    aria-label="Następny miesiąc"
                  >
                    ›
                  </button>
                </div>
                <div className="calendar-grid" role="grid" aria-label="Kalendarz dostępnych terminów">
                  {['pn', 'wt', 'śr', 'cz', 'pt', 'so', 'nd'].map((dow) => (
                    <span className="dow" key={dow} aria-hidden="true">
                      {dow}
                    </span>
                  ))}
                  {cells.map((cell, index) =>
                    cell === null ? (
                      <span key={`empty-${index}`} />
                    ) : (
                      <button
                        key={toIsoDate(cell)}
                        type="button"
                        className="day-cell"
                        data-available={isDayAvailable(cell, service.id)}
                        disabled={!isDayAvailable(cell, service.id)}
                        aria-pressed={dateIso === toIsoDate(cell)}
                        aria-label={`${formatLongDate(toIsoDate(cell))}${isDayAvailable(cell, service.id) ? '' : ' — brak wolnych terminów'}`}
                        onClick={() => {
                          setDateIso(toIsoDate(cell))
                          setTime(null)
                        }}
                      >
                        {cell.getDate()}
                      </button>
                    ),
                  )}
                </div>
                <p className="field-hint" style={{ margin: '0.8rem 0 1.2rem' }}>
                  Terminy demonstracyjne, generowane automatycznie. Widoczne {BOOKING_HORIZON_DAYS} dni w przód.
                </p>

                {dateIso && (
                  <>
                    <h3 style={{ marginBottom: '0.8rem' }}>
                      Wolne godziny — {formatLongDate(dateIso)}
                    </h3>
                    {daySlots.length === 0 ? (
                      <p className="form-status form-status--error">Brak wolnych godzin w tym dniu — wybierz inny dzień.</p>
                    ) : (
                      <div className="slot-grid" role="group" aria-label="Dostępne godziny">
                        {daySlots.map((slot) => (
                          <button key={slot} type="button" className="slot-btn" aria-pressed={time === slot} onClick={() => setTime(slot)}>
                            {slot}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                )}

                <div className="booking-nav">
                  <button type="button" className="btn btn--secondary" onClick={() => goTo(1)}>
                    ← Wstecz
                  </button>
                  <button type="button" className="btn btn--primary" disabled={!dateIso || !time} onClick={() => goTo(3)}>
                    Dalej: Twoje dane →
                  </button>
                </div>
              </>
            )}

            {/* KROK 4: DANE */}
            {step === 3 && (
              <>
                <h2 ref={headingRef} tabIndex={-1}>
                  Twoje dane
                </h2>
                <div className="form-grid">
                  <div className="form-grid form-grid--2">
                    <div className="field">
                      <label htmlFor="bk-name">Imię i nazwisko</label>
                      <input
                        id="bk-name"
                        type="text"
                        autoComplete="name"
                        required
                        value={person.name}
                        aria-invalid={errors.name ? true : undefined}
                        aria-describedby={errors.name ? 'bk-name-err' : undefined}
                        onChange={(e) => setPerson((p) => ({ ...p, name: e.target.value }))}
                      />
                      {errors.name && (
                        <p className="field-error" id="bk-name-err">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="field">
                      <label htmlFor="bk-email">E-mail</label>
                      <input
                        id="bk-email"
                        type="email"
                        autoComplete="email"
                        required
                        value={person.email}
                        aria-invalid={errors.email ? true : undefined}
                        aria-describedby={errors.email ? 'bk-email-err' : undefined}
                        onChange={(e) => setPerson((p) => ({ ...p, email: e.target.value }))}
                      />
                      {errors.email && (
                        <p className="field-error" id="bk-email-err">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div className="field">
                      <label htmlFor="bk-phone">Telefon</label>
                      <input
                        id="bk-phone"
                        type="tel"
                        autoComplete="tel"
                        required
                        value={person.phone}
                        aria-invalid={errors.phone ? true : undefined}
                        aria-describedby={errors.phone ? 'bk-phone-err' : 'bk-phone-hint'}
                        onChange={(e) => setPerson((p) => ({ ...p, phone: e.target.value }))}
                      />
                      {errors.phone ? (
                        <p className="field-error" id="bk-phone-err">
                          {errors.phone}
                        </p>
                      ) : (
                        <p className="field-hint" id="bk-phone-hint">
                          Potrzebny wyłącznie do kontaktu w sprawie tego spotkania.
                        </p>
                      )}
                    </div>
                    <div className="field">
                      <label htmlFor="bk-notes">
                        Uwagi <span className="optional">(opcjonalnie)</span>
                      </label>
                      <input
                        id="bk-notes"
                        type="text"
                        value={person.notes}
                        placeholder="np. preferuję kontakt SMS"
                        onChange={(e) => setPerson((p) => ({ ...p, notes: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="check-field">
                    <input
                      id="bk-invoice"
                      type="checkbox"
                      checked={person.invoice}
                      onChange={(e) => setPerson((p) => ({ ...p, invoice: e.target.checked }))}
                    />
                    <label htmlFor="bk-invoice">Chcę otrzymać fakturę (dane podasz w odpowiedzi na potwierdzenie).</label>
                  </div>

                  <div className="check-field">
                    <input
                      id="bk-consent"
                      type="checkbox"
                      checked={consent}
                      aria-invalid={errors.consent ? true : undefined}
                      aria-describedby={errors.consent ? 'bk-consent-err' : undefined}
                      onChange={(e) => setConsent(e.target.checked)}
                    />
                    <label htmlFor="bk-consent">
                      Akceptuję <Link to="/regulamin-rezerwacji">regulamin rezerwacji</Link> i wyrażam zgodę na
                      przetwarzanie danych zgodnie z <Link to="/polityka-prywatnosci">polityką prywatności</Link>.
                    </label>
                  </div>
                  {errors.consent && (
                    <p className="field-error" id="bk-consent-err">
                      {errors.consent}
                    </p>
                  )}

                  {Object.keys(errors).length > 0 && (
                    <p className="form-status form-status--error" role="alert">
                      Formularz zawiera błędy — popraw zaznaczone pola i spróbuj ponownie.
                    </p>
                  )}
                </div>
                <div className="booking-nav">
                  <button type="button" className="btn btn--secondary" onClick={() => goTo(2)}>
                    ← Wstecz
                  </button>
                  <button
                    type="button"
                    className="btn btn--primary"
                    onClick={() => {
                      if (validatePerson()) goTo(4)
                    }}
                  >
                    Dalej: podsumowanie →
                  </button>
                </div>
              </>
            )}

            {/* KROK 5: PODSUMOWANIE */}
            {step === 4 && service && form && dateIso && time && (
              <>
                <h2 ref={headingRef} tabIndex={-1}>
                  Podsumowanie rezerwacji
                </h2>
                <div className="summary-box">
                  <dl>
                    <div className="sum-row">
                      <dt>Usługa</dt>
                      <dd>
                        {service.name} ({service.durationMinutes} min)
                      </dd>
                    </div>
                    <div className="sum-row">
                      <dt>Forma</dt>
                      <dd>{form === 'online' ? 'online (wideorozmowa)' : 'stacjonarnie, Warszawa'}</dd>
                    </div>
                    <div className="sum-row">
                      <dt>Termin</dt>
                      <dd>
                        {formatLongDate(dateIso)}, {time}
                      </dd>
                    </div>
                    <div className="sum-row">
                      <dt>Rezerwujesz jako</dt>
                      <dd>
                        {person.name} · {person.email}
                      </dd>
                    </div>
                    <div className="sum-row sum-row--total">
                      <dt>Do zapłaty</dt>
                      <dd>{service.price === 0 ? 'bezpłatnie' : `${service.price} zł`}</dd>
                    </div>
                  </dl>
                </div>
                <p className="field-hint" style={{ marginTop: '0.9rem' }}>
                  Możesz wrócić do dowolnego kroku, aby zmienić szczegóły — nic jeszcze nie zostało zarezerwowane.
                </p>
                <div className="booking-nav">
                  <button type="button" className="btn btn--secondary" onClick={() => goTo(3)}>
                    ← Wstecz
                  </button>
                  {skipPayment ? (
                    <button type="button" className="btn btn--primary" disabled={paying} onClick={confirmBooking}>
                      {paying ? 'Potwierdzam…' : 'Potwierdź rezerwację'}
                    </button>
                  ) : (
                    <button type="button" className="btn btn--primary" onClick={() => goTo(5)}>
                      Dalej: płatność →
                    </button>
                  )}
                </div>
              </>
            )}

            {/* KROK 6: PŁATNOŚĆ (DEMO) */}
            {step === 5 && service && !skipPayment && (
              <>
                <h2 ref={headingRef} tabIndex={-1}>
                  Płatność — {service.price} zł
                </h2>
                <div className="pay-grid" role="group" aria-label="Metody płatności">
                  {PAY_METHODS.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      className="pay-tile"
                      aria-pressed={payMethod === method.id}
                      onClick={() => setPayMethod(method.id)}
                    >
                      {method.name}
                      <small>{method.hint}</small>
                    </button>
                  ))}
                </div>
                {payMethod && (
                  <p className="pay-demo-alert" role="status">
                    Płatność demonstracyjna — żadna transakcja nie zostanie wykonana.
                  </p>
                )}
                <div className="booking-nav">
                  <button type="button" className="btn btn--secondary" onClick={() => goTo(4)}>
                    ← Wstecz
                  </button>
                  <button type="button" className="btn btn--primary" disabled={!payMethod || paying} onClick={confirmBooking}>
                    {paying ? 'Przetwarzam płatność…' : `Zapłać ${service.price} zł (demo)`}
                  </button>
                </div>
              </>
            )}
          </div>

          <p style={{ marginTop: '1.6rem', fontSize: '0.88rem', color: 'var(--muted)', textAlign: 'center' }}>
            {disclaimers.crisis}
          </p>
        </div>
      </section>
    </>
  )
}
