import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from 'react-router-dom'

import { navigation, specialist } from '../content/site'
import { useFocusTrap } from '../lib/useFocusTrap'

function OfferDropdown({ children }: { children: { label: string; path: string }[] }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const wrapRef = useRef<HTMLLIElement>(null)
  const closeTimer = useRef<number | undefined>(undefined)
  const openedByHover = useRef(false)
  const isActive = location.pathname.startsWith('/oferta')

  useEffect(() => setOpen(false), [location.pathname])

  useEffect(() => {
    if (!open) return
    function onPointerDown(event: PointerEvent) {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false)
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  function scheduleClose() {
    closeTimer.current = window.setTimeout(() => setOpen(false), 160)
  }

  function cancelClose() {
    window.clearTimeout(closeTimer.current)
  }

  return (
    <li
      className="nav-drop"
      ref={wrapRef}
      onPointerEnter={(event) => {
        if (event.pointerType !== 'mouse') return
        cancelClose()
        if (!open) {
          openedByHover.current = true
          setOpen(true)
        }
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== 'mouse') return
        scheduleClose()
      }}
    >
      <button
        type="button"
        className="nav-drop__toggle"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="oferta-menu"
        data-active={isActive}
        onClick={() => {
          // kliknięcie zaraz po otwarciu hoverem nie powinno zamykać menu
          if (openedByHover.current) {
            openedByHover.current = false
            setOpen(true)
            return
          }
          setOpen((v) => !v)
        }}
      >
        Oferta
        <span className="chev" aria-hidden="true">
          ▼
        </span>
      </button>
      <ul className="nav-drop__menu" id="oferta-menu" data-open={open}>
        <li>
          <NavLink to="/oferta" end>
            Przegląd oferty
          </NavLink>
        </li>
        {children.map((child) => (
          <li key={child.path}>
            <NavLink to={child.path}>{child.label}</NavLink>
          </li>
        ))}
      </ul>
    </li>
  )
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null)
  useFocusTrap(true, panelRef, onClose)

  useEffect(() => {
    document.body.classList.add('no-scroll')
    return () => document.body.classList.remove('no-scroll')
  }, [])

  return (
    <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu strony" ref={panelRef}>
      <div className="mobile-menu__top">
        <span className="brand" aria-hidden="true">
          <span className="brand__name">{specialist.brandShort}</span>
          <span className="brand__tag">Psychologia i Rozwój</span>
        </span>
        <button type="button" className="mobile-menu__close" onClick={onClose} aria-label="Zamknij menu">
          ✕
        </button>
      </div>
      <nav aria-label="Nawigacja mobilna">
        <ul>
          {navigation.map((item) =>
            item.children ? (
              <li key={item.path} className="mobile-menu__group">
                <p className="mobile-menu__group-label" id="mobile-oferta-label">
                  Oferta
                </p>
                <ul aria-labelledby="mobile-oferta-label">
                  <li>
                    <NavLink to="/oferta" end onClick={onClose}>
                      Przegląd oferty
                    </NavLink>
                  </li>
                  {item.children.map((child) => (
                    <li key={child.path}>
                      <NavLink to={child.path} onClick={onClose}>
                        {child.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={item.path}>
                <NavLink to={item.path} end={item.path === '/'} onClick={onClose}>
                  {item.label}
                </NavLink>
              </li>
            ),
          )}
        </ul>
      </nav>
      <div className="mobile-menu__cta">
        <Link className="btn btn--primary" to="/rezerwacja" onClick={onClose}>
          Umów spotkanie
        </Link>
        <Link className="btn btn--secondary" to="/dla-firm#formularz" onClick={onClose}>
          Zapytaj o ofertę dla firmy
        </Link>
      </div>
      <p className="mobile-menu__contact">
        <a href={specialist.phoneHref}>{specialist.phone}</a>
        <a href={`mailto:${specialist.email}`}>{specialist.email}</a>
        <span>{specialist.workMode}</span>
      </p>
    </div>
  )
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => setMenuOpen(false), [location.pathname])
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="brand" aria-label={`${specialist.brand} — strona główna`}>
          <span className="brand__name">{specialist.brandShort}</span>
          <span className="brand__tag">Psychologia i Rozwój</span>
        </Link>

        <nav className="main-nav" aria-label="Nawigacja główna">
          <ul>
            {navigation.map((item) =>
              item.children ? (
                <OfferDropdown key={item.path}>{item.children}</OfferDropdown>
              ) : (
                <li key={item.path}>
                  <NavLink to={item.path} end={item.path === '/'}>
                    {item.label}
                  </NavLink>
                </li>
              ),
            )}
          </ul>
        </nav>

        <Link to="/rezerwacja" className="btn btn--primary btn--small header-cta">
          Umów spotkanie
        </Link>

        <button
          type="button"
          className="nav-burger"
          aria-expanded={menuOpen}
          aria-controls="menu-mobilne"
          aria-label={menuOpen ? 'Zamknij menu' : 'Otwórz menu'}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>
      {/* portal: backdrop-filter nagłówka nie może być containing blockiem dla position: fixed */}
      <div id="menu-mobilne">
        {menuOpen && createPortal(<MobileMenu onClose={closeMenu} />, document.body)}
      </div>
    </header>
  )
}
