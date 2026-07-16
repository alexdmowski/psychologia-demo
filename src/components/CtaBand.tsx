import { Link } from 'react-router-dom'

interface CtaBandProps {
  title?: string
  text?: string
  primaryLabel?: string
  primaryTo?: string
  secondaryLabel?: string
  secondaryTo?: string
}

export default function CtaBand({
  title = 'Nie musisz od razu wiedzieć, jakiej formy wsparcia potrzebujesz.',
  text = 'Umów pierwszą konsultację lub napisz krótką wiadomość. Wspólnie określimy najlepszy kierunek.',
  primaryLabel = 'Zarezerwuj termin',
  primaryTo = '/rezerwacja',
  secondaryLabel = 'Napisz wiadomość',
  secondaryTo = '/kontakt',
}: CtaBandProps) {
  return (
    <section className="section" aria-label="Zaproszenie do kontaktu">
      <div className="container">
        <div className="cta-band on-dark">
          <h2>{title}</h2>
          <p>{text}</p>
          <div className="cta-band__actions">
            <Link to={primaryTo} className="btn btn--light">
              {primaryLabel}
            </Link>
            <Link to={secondaryTo} className="btn btn--outline-light">
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
