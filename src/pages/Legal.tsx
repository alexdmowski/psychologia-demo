import PageHero from '../components/PageHero'
import Seo from '../components/Seo'
import { getLegalDoc, legalDisclaimer } from '../content/legal'
import { formatShortDate } from '../lib/dates'
import NotFound from './NotFound'

export default function Legal({ slug }: { slug: string }) {
  const doc = getLegalDoc(slug)
  if (!doc) return <NotFound />

  return (
    <>
      <Seo
        title={doc.title}
        description={`${doc.title} — dokument przykładowy przygotowany dla wersji demonstracyjnej strony. Ostatnia aktualizacja: ${doc.updated}.`}
        path={`/${doc.slug}`}
      />
      <PageHero
        eyebrow="Dokumenty"
        title={doc.title}
        lead={`Ostatnia aktualizacja: ${formatShortDate(doc.updated)}`}
        crumbs={[{ label: doc.title }]}
      />
      <section className="section" aria-label={doc.title}>
        <div className="container legal-layout">
          <p className="legal-alert" role="note">
            {legalDisclaimer}
          </p>
          <div className="prose">
            <p>{doc.intro}</p>
            {doc.sections.map((section, index) => (
              <section key={section.heading}>
                <h2>
                  {index + 1}. {section.heading}
                </h2>
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
        </div>
      </section>
    </>
  )
}
