import { useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

import CookieBanner from './CookieBanner'
import Footer from './Footer'
import Header from './Header'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView()
      return
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}

/** Stały mobilny przycisk rezerwacji — ukryty na stronie rezerwacji, by nie zasłaniał formularza. */
function StickyCta() {
  const { pathname } = useLocation()
  const hidden = pathname === '/rezerwacja'

  useEffect(() => {
    document.body.classList.toggle('has-sticky-cta', !hidden)
    return () => document.body.classList.remove('has-sticky-cta')
  }, [hidden])

  if (hidden) return null
  return (
    <div className="sticky-cta">
      <Link to="/rezerwacja" className="btn btn--primary btn--block">
        Umów spotkanie
      </Link>
    </div>
  )
}

export default function Layout() {
  return (
    <>
      {/* preventDefault: goła kotwica #tresc kolidowałaby z trybem HashRouter */}
      <a
        href="#tresc"
        className="skip-link"
        onClick={(e) => {
          e.preventDefault()
          const main = document.getElementById('tresc')
          main?.focus()
          main?.scrollIntoView()
        }}
      >
        Przejdź do treści
      </a>
      <ScrollToTop />
      <Header />
      <main id="tresc" tabIndex={-1} style={{ outline: 'none' }}>
        <Outlet />
      </main>
      <Footer />
      <StickyCta />
      <CookieBanner />
    </>
  )
}
