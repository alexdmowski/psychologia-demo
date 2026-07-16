import { Link } from 'react-router-dom'

import Seo from '../components/Seo'

export default function NotFound() {
  return (
    <>
      <Seo
        title="Strona nie istnieje (404)"
        description="Nie znaleziono strony o podanym adresie. Wróć na stronę główną lub sprawdź ofertę."
        path="/404"
      />
      <section className="notfound" aria-label="Błąd 404">
        <div className="container">
          <p className="code" aria-hidden="true">
            404
          </p>
          <h1 style={{ marginBottom: '0.8rem' }}>Ta strona nie istnieje</h1>
          <p style={{ color: 'var(--muted)', maxWidth: '44ch', margin: '0 auto 2rem' }}>
            Adres mógł się zmienić albo w linku wkradła się literówka. Nic straconego — wszystko, czego
            szukasz, znajdziesz z poziomu strony głównej.
          </p>
          <div className="cta-band__actions">
            <Link to="/" className="btn btn--primary">
              Wróć na stronę główną
            </Link>
            <Link to="/oferta" className="btn btn--secondary">
              Zobacz ofertę
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
