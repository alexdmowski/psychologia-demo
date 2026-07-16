import { Link } from 'react-router-dom'

import { disclaimers, navigation, socialLinks, specialist } from '../content/site'

const legalLinks = [
  { label: 'Polityka prywatności', path: '/polityka-prywatnosci' },
  { label: 'Polityka cookies', path: '/polityka-cookies' },
  { label: 'Regulamin rezerwacji', path: '/regulamin-rezerwacji' },
  { label: 'Regulamin płatności i usług online', path: '/regulamin-platnosci' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  const offer = navigation.find((item) => item.children)

  return (
    <footer className="site-footer on-dark">
      <div className="container">
        <div className="site-footer__grid">
          <div className="footer-brand">
            <p className="footer-brand__name">{specialist.brandShort}</p>
            <p className="footer-brand__tag">Psychologia i Rozwój</p>
            <p>
              Konsultacje psychologiczne, coaching i programy rozwojowe dla firm. Spokojnie, poufnie i z
              konkretnym planem — w Warszawie i online.
            </p>
            <ul className="footer-social" aria-label="Media społecznościowe (profile demonstracyjne)">
              {socialLinks.map((social) => (
                <li key={social.short}>
                  <a href={social.href} target="_blank" rel="noreferrer noopener" aria-label={social.label}>
                    {social.short}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Stopka — nawigacja">
            <h3>Na skróty</h3>
            <ul>
              {navigation
                .filter((item) => !item.children)
                .map((item) => (
                  <li key={item.path}>
                    <Link to={item.path}>{item.label}</Link>
                  </li>
                ))}
              <li>
                <Link to="/rezerwacja">Umów spotkanie</Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Stopka — oferta i dokumenty">
            <h3>Oferta</h3>
            <ul>
              {offer?.children?.map((child) => (
                <li key={child.path}>
                  <Link to={child.path}>{child.label}</Link>
                </li>
              ))}
            </ul>
            <h3 style={{ marginTop: '1.5rem' }}>Dokumenty</h3>
            <ul>
              {legalLinks.map((doc) => (
                <li key={doc.path}>
                  <Link to={doc.path}>{doc.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3>Kontakt</h3>
            <ul className="footer-contact">
              <li>
                <a href={specialist.phoneHref}>{specialist.phone}</a>
              </li>
              <li>
                <a href={`mailto:${specialist.email}`}>{specialist.email}</a>
              </li>
              <li>{specialist.address.street}</li>
              <li>{specialist.address.postal}</li>
              <li>{specialist.workMode}</li>
            </ul>
          </div>
        </div>

        <p className="footer-crisis">
          <strong>Ważne:</strong> {disclaimers.crisis} {disclaimers.crisisLinks}
        </p>

        <div className="site-footer__bottom">
          <p className="demo-note">{disclaimers.demo}</p>
          <button
            type="button"
            className="cookie-settings-link"
            onClick={() => window.dispatchEvent(new CustomEvent('an:open-cookie-settings'))}
          >
            Ustawienia cookies
          </button>
          <p>
            © {year} {specialist.brand}
          </p>
        </div>
      </div>
    </footer>
  )
}
