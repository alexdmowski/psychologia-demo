import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import Icon from '../components/Icon'
import Newsletter from '../components/Newsletter'
import PageHero from '../components/PageHero'
import Seo from '../components/Seo'
import { articles, categoryLabels } from '../content/articles'
import type { ArticleCategory } from '../content/types'
import { formatShortDate } from '../lib/dates'
import { specialist } from '../content/site'

const allCategories = Object.keys(categoryLabels) as ArticleCategory[]

export default function Knowledge() {
  const [category, setCategory] = useState<ArticleCategory | 'wszystkie'>('wszystkie')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return articles.filter((article) => {
      if (category !== 'wszystkie' && article.category !== category) return false
      if (!needle) return true
      return (
        article.title.toLowerCase().includes(needle) ||
        article.excerpt.toLowerCase().includes(needle) ||
        categoryLabels[article.category].toLowerCase().includes(needle)
      )
    })
  }, [category, query])

  return (
    <>
      <Seo
        title="Wiedza — artykuły o emocjach, stresie i rozwoju"
        description="Baza wiedzy: praktyczne artykuły o stresie, wypaleniu, motywacji, emocjach, karierze i rozwoju liderów. Bez psychologicznego żargonu."
        path="/wiedza"
      />
      <PageHero
        eyebrow="Baza wiedzy"
        title="Praktyczna psychologia — bez żargonu"
        lead="Artykuły o tym, co dzieje się w głowie, kiedy życie przyspiesza. Konkretne, rzetelne i do zastosowania od razu."
        crumbs={[{ label: 'Wiedza' }]}
      />

      <section className="section" aria-label="Lista artykułów">
        <div className="container">
          <div className="knowledge-tools">
            <div className="knowledge-search">
              <Icon name="search" size={18} />
              <label htmlFor="article-search" className="visually-hidden">
                Szukaj artykułu
              </label>
              <input
                id="article-search"
                type="search"
                placeholder="Szukaj artykułu…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="chip-row" role="group" aria-label="Filtruj według kategorii">
              <button
                type="button"
                className="chip"
                aria-pressed={category === 'wszystkie'}
                onClick={() => setCategory('wszystkie')}
              >
                Wszystkie
              </button>
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className="chip"
                  aria-pressed={category === cat}
                  onClick={() => setCategory(cat)}
                >
                  {categoryLabels[cat]}
                </button>
              ))}
            </div>
          </div>

          <p aria-live="polite" className="field-hint" style={{ marginBottom: '1.4rem' }}>
            {filtered.length === 0
              ? 'Brak artykułów spełniających kryteria.'
              : `Znaleziono ${filtered.length} ${filtered.length === 1 ? 'artykuł' : filtered.length < 5 ? 'artykuły' : 'artykułów'}.`}
          </p>

          {filtered.length === 0 ? (
            <div className="form-success">
              <h3>Nic tu nie ma… jeszcze!</h3>
              <p>Zmień kategorię lub wyczyść wyszukiwanie, aby zobaczyć wszystkie artykuły.</p>
              <p style={{ marginTop: '1rem' }}>
                <button
                  type="button"
                  className="btn btn--secondary"
                  onClick={() => {
                    setCategory('wszystkie')
                    setQuery('')
                  }}
                >
                  Wyczyść filtry
                </button>
              </p>
            </div>
          ) : (
            <div className="article-grid">
              {filtered.map((article) => (
                <article className="article-card" key={article.slug}>
                  <img className="article-card__img" src={article.image} alt={article.imageAlt} loading="lazy" width="800" height="450" />
                  <div className="article-card__body">
                    <p className="article-card__meta">
                      <span className="area-chip" data-area="psychologia">
                        {categoryLabels[article.category]}
                      </span>
                      <span>{formatShortDate(article.date)}</span>
                      <span>{article.readingMinutes} min</span>
                    </p>
                    <h3>
                      <Link to={`/wiedza/${article.slug}`}>{article.title}</Link>
                    </h3>
                    <p>{article.excerpt}</p>
                    <p className="article-card__meta" style={{ marginBottom: 0 }}>
                      <span>{specialist.fullTitle}</span>
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Newsletter />
    </>
  )
}
