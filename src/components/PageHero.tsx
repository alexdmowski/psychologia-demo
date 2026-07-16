import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface Crumb {
  label: string
  path?: string
}

interface PageHeroProps {
  title: string
  lead?: string
  eyebrow?: string
  crumbs?: Crumb[]
  dark?: boolean
  children?: ReactNode
}

export default function PageHero({ title, lead, eyebrow, crumbs, dark, children }: PageHeroProps) {
  return (
    <div className={dark ? 'page-hero page-hero--dark on-dark' : 'page-hero'}>
      <div className="container">
        {crumbs && crumbs.length > 0 && (
          <nav className="breadcrumbs" aria-label="Okruszki nawigacyjne">
            <ol>
              <li>
                <Link to="/">Start</Link>
              </li>
              {crumbs.map((crumb) =>
                crumb.path ? (
                  <li key={crumb.label}>
                    <Link to={crumb.path}>{crumb.label}</Link>
                  </li>
                ) : (
                  <li key={crumb.label} aria-current="page">
                    {crumb.label}
                  </li>
                ),
              )}
            </ol>
          </nav>
        )}
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {lead && <p className="page-hero__lead">{lead}</p>}
        {children}
      </div>
    </div>
  )
}
