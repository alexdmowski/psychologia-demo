import { Link } from 'react-router-dom'

import Icon, { type IconName } from '../components/Icon'
import CtaBand from '../components/CtaBand'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import Thread from '../components/Thread'
import { articles, categoryLabels } from '../content/articles'
import { images } from '../content/images'
import { pathCards, clientLogos } from '../content/services'
import { bio, brandMessage, painPoints, processSteps, specialist, values } from '../content/site'
import { testimonials } from '../content/testimonials'
import { formatShortDate } from '../lib/dates'

const pathIcons: Record<string, IconName> = {
  psychologia: 'leaf',
  coaching: 'compass',
  firmy: 'building',
}

const valueIcons: IconName[] = ['heart', 'shield', 'target', 'spark', 'chat', 'check']

export default function Home() {
  const latestArticles = articles.slice(0, 3)

  return (
    <>
      <Seo
        description="Konsultacje psychologiczne, coaching i programy rozwojowe dla firm w Warszawie i online. Odzyskaj równowagę, pewność siebie i poczucie wpływu."
        path="/"
      />

      {/* ── Hero ── */}
      <section className="hero" aria-labelledby="hero-title">
        <Thread className="hero__thread" />
        <div className="container hero__inner">
          <div>
            <div className="hero__badges">
              <span className="hero__badge">{specialist.workMode}</span>
              <span className="hero__badge">Konsultacje indywidualne i współpraca z firmami</span>
            </div>
            <h1 id="hero-title">{brandMessage.headline}</h1>
            <p className="hero__sub">{brandMessage.subline}</p>
            <div className="hero__actions">
              <Link to="/rezerwacja" className="btn btn--primary">
                Umów spotkanie
              </Link>
              <Link to="/oferta" className="btn btn--secondary">
                Poznaj ofertę
              </Link>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>
              {specialist.fullTitle} · {specialist.role}
            </p>
          </div>
          <Reveal>
            <div className="portrait-frame">
              <img src={images.portrait.src} alt={images.portrait.alt} width="686" height="858" />
              <p className="portrait-frame__note">14 lat doświadczenia · 2500+ godzin pracy</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Trzy ścieżki ── */}
      <section className="section section--tinted" aria-labelledby="paths-title">
        <div className="container">
          <div className="section-head section-head--center">
            <p className="eyebrow">Od czego zacząć</p>
            <h2 id="paths-title">Wybierz ścieżkę, która brzmi najbliżej Ciebie</h2>
          </div>
          <div className="path-grid">
            {pathCards.map((card, index) => (
              <Reveal key={card.area} delay={index * 90}>
                <article className="path-card" data-area={card.area}>
                  <span className="path-card__icon">
                    <Icon name={pathIcons[card.area]} size={26} />
                  </span>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <Link to={card.path} className="btn btn--secondary">
                    {card.cta}
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Być może jesteś tutaj… ── */}
      <section className="section" aria-labelledby="maybe-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Znasz to?</p>
            <h2 id="maybe-title">Być może jesteś tutaj, ponieważ…</h2>
          </div>
          <ul className="maybe-list">
            {painPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <p style={{ marginTop: '2rem', maxWidth: '46rem', color: 'var(--muted)' }}>
            Jeśli choć jedno zdanie brzmi znajomo — to dobry moment na rozmowę. Nie musisz mieć „gotowej
            diagnozy" ani wiedzieć, czego dokładnie potrzebujesz.
          </p>
        </div>
      </section>

      {/* ── O mnie (skrót) ── */}
      <section className="section section--tinted" aria-labelledby="about-title">
        <div className="container split">
          <Reveal>
            <div className="split__img">
              <img src={images.office.src} alt={images.office.alt} loading="lazy" width="928" height="635" />
            </div>
          </Reveal>
          <div>
            <p className="eyebrow">O mnie</p>
            <h2 id="about-title">
              {specialist.fullTitle} — psycholożka i&nbsp;coachka
            </h2>
            <p style={{ margin: '1rem 0 1.4rem', color: 'var(--muted)' }}>{bio.short}</p>
            <ul style={{ display: 'grid', gap: '0.6rem', marginBottom: '1.8rem' }}>
              {bio.highlights.map((highlight) => (
                <li key={highlight}>
                  <strong>{highlight}</strong>
                </li>
              ))}
            </ul>
            <Link to="/o-mnie" className="btn btn--primary">
              Poznaj mnie lepiej
            </Link>
          </div>
        </div>
      </section>

      {/* ── Jak wygląda współpraca ── */}
      <section className="section" aria-labelledby="process-title">
        <div className="container">
          <div className="section-head section-head--center">
            <p className="eyebrow">Krok po kroku</p>
            <h2 id="process-title">Jak wygląda współpraca</h2>
            <p>Prosty początek — bez skomplikowanych formalności i bez zobowiązań na starcie.</p>
          </div>
          <ol className="steps">
            {processSteps.map((step, index) => (
              <Reveal as="li" className="step" key={step.title} delay={index * 90}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Sposób pracy ── */}
      <section className="section section--tinted" aria-labelledby="values-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Sposób pracy</p>
            <h2 id="values-title">Na czym opiera się nasza praca</h2>
          </div>
          <div className="card-grid card-grid--3">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={(index % 3) * 90}>
                <div className="soft-card" style={{ height: '100%' }}>
                  <span
                    className="path-card__icon"
                    style={{ background: 'var(--sage-tint)', color: 'var(--sage-strong)' }}
                  >
                    <Icon name={valueIcons[index]} size={24} />
                  </span>
                  <h3 style={{ fontSize: '1.15rem' }}>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cytat marki ── */}
      <section className="section" aria-label="Motto">
        <div className="container">
          <Reveal>
            <blockquote className="brand-quote">
              {brandMessage.quote}
              <footer>{specialist.fullTitle}</footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* ── Opinie ── */}
      <section className="section section--tinted" aria-labelledby="opinions-title">
        <div className="container">
          <div className="section-head section-head--center">
            <p className="eyebrow">Opinie</p>
            <h2 id="opinions-title">Co mówią osoby, z którymi pracowałam</h2>
            <p>Wszystkie opinie są demonstracyjne — przygotowane na potrzeby prezentacji projektu.</p>
          </div>
          <div className="testimonial-grid">
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial.author} delay={(index % 3) * 90}>
                <article className={testimonial.company ? 'testimonial testimonial--company' : 'testimonial'}>
                  <blockquote>{testimonial.quote}</blockquote>
                  <footer>
                    <span className="testimonial__author">{testimonial.author}</span>
                    <span className="testimonial__context">{testimonial.context}</span>
                    <span className="demo-badge">opinia demonstracyjna</span>
                  </footer>
                </article>
              </Reveal>
            ))}
          </div>

          <h3 style={{ textAlign: 'center', margin: '3rem 0 1.4rem', fontSize: '1.05rem', fontFamily: 'var(--font-body)', fontWeight: 650, color: 'var(--muted)' }}>
            Warsztaty i programy prowadziłam m.in. dla (logotypy demonstracyjne):
          </h3>
          <ul className="logo-strip" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {clientLogos.map((logo) => (
              <li className="logo-mark" key={logo.name}>
                <span className="logo-mark__name">{logo.name}</span>
                <span className="logo-mark__desc">{logo.descriptor}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Wiedza ── */}
      <section className="section" aria-labelledby="knowledge-title">
        <div className="container">
          <div className="section-head" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'end', gap: '1rem', maxWidth: 'none' }}>
            <div>
              <p className="eyebrow">Baza wiedzy</p>
              <h2 id="knowledge-title">Najnowsze artykuły</h2>
            </div>
            <Link to="/wiedza" className="arrow-link">
              Wszystkie artykuły
            </Link>
          </div>
          <div className="article-grid">
            {latestArticles.map((article, index) => (
              <Reveal key={article.slug} delay={index * 90}>
                <article className="article-card">
                  <img className="article-card__img" src={article.image} alt={article.imageAlt} loading="lazy" width="800" height="450" />
                  <div className="article-card__body">
                    <p className="article-card__meta">
                      <span className="area-chip" data-area="psychologia">
                        {categoryLabels[article.category]}
                      </span>
                      <span>{formatShortDate(article.date)}</span>
                      <span>{article.readingMinutes} min czytania</span>
                    </p>
                    <h3>
                      <Link to={`/wiedza/${article.slug}`}>{article.title}</Link>
                    </h3>
                    <p>{article.excerpt}</p>
                    <Link to={`/wiedza/${article.slug}`} className="arrow-link" aria-label={`Czytaj artykuł: ${article.title}`}>
                      Czytaj dalej
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
