import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { readStorage, STORAGE_KEYS, writeStorage } from '../lib/storage'
import { useFocusTrap } from '../lib/useFocusTrap'

export interface CookieConsent {
  necessary: true
  analytics: boolean
  marketing: boolean
  decidedAt: string
}

function saveConsent(analytics: boolean, marketing: boolean): CookieConsent {
  const consent: CookieConsent = {
    necessary: true,
    analytics,
    marketing,
    decidedAt: new Date().toISOString(),
  }
  writeStorage(STORAGE_KEYS.cookieConsent, consent)
  return consent
}

export default function CookieBanner() {
  const [consent, setConsent] = useState<CookieConsent | null | 'loading'>('loading')
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  const closeSettings = useCallback(() => setSettingsOpen(false), [])
  useFocusTrap(settingsOpen, modalRef, closeSettings)

  useEffect(() => {
    setConsent(readStorage<CookieConsent>(STORAGE_KEYS.cookieConsent))
  }, [])

  useEffect(() => {
    function openSettings() {
      const stored = readStorage<CookieConsent>(STORAGE_KEYS.cookieConsent)
      setAnalytics(stored?.analytics ?? false)
      setMarketing(stored?.marketing ?? false)
      setSettingsOpen(true)
    }
    window.addEventListener('an:open-cookie-settings', openSettings)
    return () => window.removeEventListener('an:open-cookie-settings', openSettings)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('no-scroll', settingsOpen)
    return () => document.body.classList.remove('no-scroll')
  }, [settingsOpen])

  if (consent === 'loading') return null

  const acceptAll = () => {
    setConsent(saveConsent(true, true))
    setSettingsOpen(false)
  }
  const rejectOptional = () => {
    setConsent(saveConsent(false, false))
    setSettingsOpen(false)
  }
  const saveChoice = () => {
    setConsent(saveConsent(analytics, marketing))
    setSettingsOpen(false)
  }

  return (
    <>
      {consent === null && !settingsOpen && (
        <section className="cookie-banner" aria-label="Zgody na pliki cookies">
          <h2>Szanujemy Twoją prywatność</h2>
          <p>
            Ta strona używa niezbędnych plików cookies oraz — za Twoją zgodą — analitycznych i
            marketingowych. Szczegóły znajdziesz w <Link to="/polityka-cookies">polityce cookies</Link>.
          </p>
          <div className="cookie-banner__actions">
            <button type="button" className="btn btn--primary btn--small" onClick={acceptAll}>
              Akceptuję wszystkie
            </button>
            <button type="button" className="btn btn--secondary btn--small" onClick={rejectOptional}>
              Odrzucam opcjonalne
            </button>
            <button
              type="button"
              className="btn btn--secondary btn--small"
              onClick={() => {
                setAnalytics(false)
                setMarketing(false)
                setSettingsOpen(true)
              }}
            >
              Ustawienia
            </button>
          </div>
        </section>
      )}

      {settingsOpen && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && closeSettings()}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-modal-title"
            ref={modalRef}
          >
            <div className="modal__head">
              <h2 id="cookie-modal-title">Ustawienia cookies</h2>
              <button type="button" className="modal__close" onClick={closeSettings} aria-label="Zamknij ustawienia cookies">
                ✕
              </button>
            </div>

            <div className="cookie-cat">
              <div className="cookie-cat__row">
                <h3>Niezbędne</h3>
                <span className="always-on">zawsze aktywne</span>
              </div>
              <p>
                Umożliwiają działanie strony: zapamiętanie Twojej decyzji o cookies oraz demonstracyjnej
                rezerwacji. Nie da się ich wyłączyć.
              </p>
            </div>

            <div className="cookie-cat">
              <div className="cookie-cat__row">
                <h3 id="cookie-analytics-label">Analityczne</h3>
                <span className="switch">
                  <input
                    type="checkbox"
                    aria-labelledby="cookie-analytics-label"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                  />
                  <span className="track" aria-hidden="true" />
                </span>
              </div>
              <p>Pomagają zrozumieć, jak korzystasz ze strony (w wersji demo żadne narzędzie nie jest ładowane).</p>
            </div>

            <div className="cookie-cat">
              <div className="cookie-cat__row">
                <h3 id="cookie-marketing-label">Marketingowe</h3>
                <span className="switch">
                  <input
                    type="checkbox"
                    aria-labelledby="cookie-marketing-label"
                    checked={marketing}
                    onChange={(e) => setMarketing(e.target.checked)}
                  />
                  <span className="track" aria-hidden="true" />
                </span>
              </div>
              <p>Służą dopasowaniu komunikacji (w wersji demo żadne narzędzie nie jest ładowane).</p>
            </div>

            <div className="modal__actions">
              <button type="button" className="btn btn--primary" onClick={saveChoice}>
                Zapisz wybór
              </button>
              <button type="button" className="btn btn--secondary" onClick={acceptAll}>
                Akceptuję wszystkie
              </button>
              <button type="button" className="btn btn--secondary" onClick={rejectOptional}>
                Odrzucam opcjonalne
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
