import { Link } from 'react-router-dom'

import CtaBand from '../components/CtaBand'
import Icon from '../components/Icon'
import PageHero from '../components/PageHero'
import Seo from '../components/Seo'
import Thread from '../components/Thread'
import { processSteps } from '../content/site'

const details = [
  {
    icon: 'chat' as const,
    title: 'Pierwszy kontakt',
    text: 'Możesz zarezerwować termin online, napisać e-mail albo zadzwonić. Odpisuję zwykle w ciągu jednego dnia roboczego. Jeśli nie wiesz, którą usługę wybrać — napisz dwa zdania o swojej sytuacji, podpowiem najlepszą formę.',
  },
  {
    icon: 'users' as const,
    title: 'Pierwsze spotkanie',
    text: 'To spokojna rozmowa o tym, z czym przychodzisz. Nie musisz się przygotowywać. Pod koniec podsumowuję, jak mogę pomóc, i wspólnie decydujemy o dalszych krokach — bez presji na kontynuację.',
  },
  {
    icon: 'target' as const,
    title: 'Ustalanie celów',
    text: 'Na początku współpracy ustalamy, po czym poznasz, że nasza praca działa. Cele zapisujemy i wracamy do nich co kilka spotkań. Masz prawo je zmieniać — życie się zmienia, praca też może.',
  },
  {
    icon: 'calendar' as const,
    title: 'Częstotliwość spotkań',
    text: 'Konsultacje najczęściej co 1–2 tygodnie, sesje coachingowe co 2–3 tygodnie, żeby był czas na wdrożenie. Rytm dopasowujemy do Ciebie i możemy go modyfikować w trakcie.',
  },
  {
    icon: 'video' as const,
    title: 'Praca online',
    text: 'Spotykamy się przez bezpieczne wideopołączenie — link dostajesz w potwierdzeniu rezerwacji. Zadbaj o spokojne miejsce i słuchawki. Skuteczność pracy online jest porównywalna ze spotkaniami w gabinecie.',
  },
  {
    icon: 'pin' as const,
    title: 'Praca stacjonarna',
    text: 'Gabinet znajduje się przy ul. Mokotowskiej 12/4 w Warszawie (adres demonstracyjny), 7 minut pieszo od metra Politechnika. Ciepła, dyskretna przestrzeń — bez poczekalni pełnej ludzi.',
  },
  {
    icon: 'mail' as const,
    title: 'Kontakt między spotkaniami',
    text: 'W sprawach organizacyjnych (zmiana terminu, faktura) jestem dostępna mailowo i telefonicznie. Praca merytoryczna odbywa się na spotkaniach — dzięki temu ma swoją strukturę i bezpieczne ramy.',
  },
  {
    icon: 'clock' as const,
    title: 'Zmiana i odwołanie terminu',
    text: 'Termin możesz bezpłatnie zmienić lub odwołać do 24 godzin przed spotkaniem. Przy krótszym wyprzedzeniu spotkanie jest pełnopłatne — sytuacje losowe zawsze traktuję indywidualnie.',
  },
  {
    icon: 'shield' as const,
    title: 'Kiedy kieruję do innego specjalisty',
    text: 'Jeśli uznam, że lepiej pomoże Ci psychoterapeuta, lekarz psychiatra lub inny specjalista, powiem o tym wprost i pomogę znaleźć odpowiednią osobę. Twoje bezpieczeństwo jest ważniejsze niż moja rola w procesie.',
  },
]

export default function HowIWork() {
  return (
    <>
      <Seo
        title="Jak pracuję"
        description="Od pierwszego kontaktu po regularną współpracę: zasady spotkań online i stacjonarnych, ustalanie celów, zmiana terminów i poufność."
        path="/jak-pracuje"
      />
      <PageHero
        eyebrow="Jak pracuję"
        title="Jasne zasady od pierwszego kontaktu"
        lead="Dobra współpraca potrzebuje bezpiecznych ram. Tu znajdziesz wszystko, co warto wiedzieć, zanim się spotkamy — bez drobnego druku."
        crumbs={[{ label: 'Jak pracuję' }]}
      />

      <section className="section" aria-labelledby="process-diagram-title">
        <div className="container">
          <div className="section-head section-head--center">
            <p className="eyebrow">Proces</p>
            <h2 id="process-diagram-title">Droga od decyzji do zmiany</h2>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <Thread className="" />
          </div>
          <ol className="steps">
            {processSteps.map((step) => (
              <li className="step" key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--tinted" aria-labelledby="details-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Szczegóły</p>
            <h2 id="details-title">Wszystko, o co zwykle pytają klienci</h2>
          </div>
          <div className="card-grid card-grid--3">
            {details.map((detail) => (
              <div className="soft-card" key={detail.title}>
                <span className="path-card__icon" style={{ background: 'var(--sage-tint)', color: 'var(--sage-strong)' }}>
                  <Icon name={detail.icon} size={24} />
                </span>
                <h3 style={{ fontSize: '1.12rem' }}>{detail.title}</h3>
                <p>{detail.text}</p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: '2rem', color: 'var(--muted)' }}>
            Pozostałe pytania? Sprawdź <Link to="/faq">FAQ</Link> albo <Link to="/kontakt">napisz do mnie</Link>.
          </p>
        </div>
      </section>

      <CtaBand
        title="Brzmi jak zasady, z którymi możesz pracować?"
        text="Zarezerwuj pierwsze spotkanie — online lub w gabinecie w Warszawie."
      />
    </>
  )
}
