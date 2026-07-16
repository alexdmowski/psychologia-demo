import { Link, useParams } from 'react-router-dom'

import PageHero from '../components/PageHero'
import Seo from '../components/Seo'
import NotFound from './NotFound'
import { categoryLabels, getArticle, relatedArticles } from '../content/articles'
import { images } from '../content/images'
import { siteUrl, specialist } from '../content/site'
import { formatShortDate } from '../lib/dates'

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const article = slug ? getArticle(slug) : undefined

  if (!article) return <NotFound />

  const related = relatedArticles(article)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    image: `${siteUrl}${article.image}`,
    author: { '@type': 'Person', name: specialist.fullTitle },
  }

  return (
    <>
      <Seo
        title={article.title}
        description={article.excerpt}
        path={`/wiedza/${article.slug}`}
        image={article.image}
        type="article"
        jsonLd={jsonLd}
      />
      <PageHero
        eyebrow={categoryLabels[article.category]}
        title={article.title}
        crumbs={[{ label: 'Wiedza', path: '/wiedza' }, { label: article.title }]}
      >
        <p className="article-meta">
          <span>{specialist.fullTitle}</span>
          <span aria-hidden="true">·</span>
          <span>{formatShortDate(article.date)}</span>
          <span aria-hidden="true">·</span>
          <span>{article.readingMinutes} min czytania</span>
        </p>
      </PageHero>

      <article className="section" aria-label={article.title}>
        <div className="container article-layout">
          <img className="article-hero-img" src={article.image} alt={article.imageAlt} width="800" height="450" />
          <div className="article-body">
            {article.sections.map((section, index) => (
              <section key={section.heading ?? `sekcja-${index}`}>
                {section.heading && <h2>{section.heading}</h2>}
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
                {section.list && (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item.slice(0, 32)}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <div className="author-box">
            <img src={images.portrait.src} alt="" width="68" height="68" />
            <div>
              <strong>{specialist.fullTitle}</strong>
              <p>
                Psycholożka, certyfikowana coachka i trenerka. Pracuje z osobami w przeciążeniu i zmianie
                oraz z zespołami — w Warszawie i online.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
            <Link to="/rezerwacja" className="btn btn--primary">
              Umów spotkanie
            </Link>
            <Link to="/wiedza" className="btn btn--secondary">
              Wróć do bazy wiedzy
            </Link>
          </div>
        </div>
      </article>

      <section className="section section--tinted" aria-labelledby="related-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Czytaj dalej</p>
            <h2 id="related-title">Podobne artykuły</h2>
          </div>
          <div className="article-grid">
            {related.map((rel) => (
              <article className="article-card" key={rel.slug}>
                <img className="article-card__img" src={rel.image} alt={rel.imageAlt} loading="lazy" width="800" height="450" />
                <div className="article-card__body">
                  <p className="article-card__meta">
                    <span className="area-chip" data-area="psychologia">
                      {categoryLabels[rel.category]}
                    </span>
                    <span>{rel.readingMinutes} min</span>
                  </p>
                  <h3>
                    <Link to={`/wiedza/${rel.slug}`}>{rel.title}</Link>
                  </h3>
                  <p>{rel.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
