import { Link } from 'react-router-dom'

import Accordion from '../components/Accordion'
import PageHero from '../components/PageHero'
import Seo from '../components/Seo'
import { faqItems } from '../content/faq'

export default function Faq() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  return (
    <>
      <Seo
        title="FAQ — częste pytania"
        description="Odpowiedzi na najczęstsze pytania: różnica między konsultacją a coachingiem, poufność, spotkania online, zmiana terminu, faktury i pakiety."
        path="/faq"
        jsonLd={jsonLd}
      />
      <PageHero
        eyebrow="FAQ"
        title="Częste pytania"
        lead="Zebrałam tu odpowiedzi na pytania, które słyszę najczęściej. Jeśli nie znajdziesz swojego — po prostu napisz."
        crumbs={[{ label: 'FAQ' }]}
      />
      <section className="section" aria-label="Lista pytań i odpowiedzi">
        <div className="container" style={{ maxWidth: '820px' }}>
          <Accordion items={faqItems} headingLevel="h2" />
          <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
            <p style={{ color: 'var(--muted)', marginBottom: '1.2rem' }}>Nie znalazłeś / nie znalazłaś odpowiedzi?</p>
            <Link to="/kontakt" className="btn btn--primary">
              Zadaj pytanie
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
