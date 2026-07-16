import { useEffect } from 'react'

import { siteUrl, specialist } from '../content/site'

interface SeoProps {
  /** Tytuł podstrony (bez nazwy marki — dodawana automatycznie) */
  title?: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article'
  /** Dane strukturalne JSON-LD dla tej podstrony */
  jsonLd?: object
}

function ensureMeta(attr: 'name' | 'property', key: string, content: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function ensureLink(rel: string, href: string): void {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export default function Seo({ title, description, path, image, type = 'website', jsonLd }: SeoProps) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} | ${specialist.brandShort} — Psychologia i Rozwój`
      : `${specialist.brand} | psycholożka i coachka, Warszawa i online`
    const url = `${siteUrl}${path === '/' ? '' : path}`
    const ogImage = `${siteUrl}${image ?? '/og-image.png'}`

    document.title = fullTitle
    ensureMeta('name', 'description', description)
    ensureLink('canonical', url)
    ensureMeta('property', 'og:title', fullTitle)
    ensureMeta('property', 'og:description', description)
    ensureMeta('property', 'og:url', url)
    ensureMeta('property', 'og:type', type)
    ensureMeta('property', 'og:image', ogImage)
    ensureMeta('property', 'og:locale', 'pl_PL')
    ensureMeta('property', 'og:site_name', specialist.brand)
    ensureMeta('name', 'twitter:card', 'summary_large_image')
    ensureMeta('name', 'twitter:title', fullTitle)
    ensureMeta('name', 'twitter:description', description)
    ensureMeta('name', 'twitter:image', ogImage)

    let script = document.getElementById('jsonld-page')
    if (jsonLd) {
      if (!script) {
        script = document.createElement('script')
        script.id = 'jsonld-page'
        script.setAttribute('type', 'application/ld+json')
        document.head.appendChild(script)
      }
      script.textContent = JSON.stringify(jsonLd)
    } else {
      script?.remove()
    }
  }, [title, description, path, image, type, jsonLd])

  return null
}
