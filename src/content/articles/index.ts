import emocjeImg from '../../assets/articles/emocje.svg'
import liderImg from '../../assets/articles/lider.svg'
import motywacjaImg from '../../assets/articles/motywacja.svg'
import psychologImg from '../../assets/articles/psycholog-czy-coach.svg'
import stresImg from '../../assets/articles/stres.svg'
import wypalenieImg from '../../assets/articles/wypalenie.svg'
import type { Article, ArticleCategory } from '../types'
import { article as wypalenie } from './jak-rozpoznac-pierwsze-oznaki-wypalenia'
import { article as psychologCzyCoach } from './psycholog-czy-coach-jak-wybrac-wsparcie'
import { article as motywacja } from './dlaczego-motywacja-nie-zawsze-wystarcza'
import { article as stres } from './stres-pod-kontrola-jak-dziala-uklad-nerwowy'
import { article as emocje } from './emocje-w-pracy-jak-o-nich-mowic'
import { article as lider } from './pierwsze-90-dni-w-roli-lidera'

// ─────────────────────────────────────────────────────────────────────────────
// BAZA WIEDZY — ARTYKUŁY DEMONSTRACYJNE
// Nowe artykuły dodajesz jako pliki w tym katalogu i dopisujesz do listy niżej
// (wraz z miniaturą w src/assets/articles/ i wpisem w articleImages).
// Lista jest sortowana malejąco po dacie publikacji.
// ─────────────────────────────────────────────────────────────────────────────

/** Miniatury importowane przez bundler (działają też w buildzie single-file). */
const articleImages: Record<string, string> = {
  'jak-rozpoznac-pierwsze-oznaki-wypalenia': wypalenieImg,
  'psycholog-czy-coach-jak-wybrac-wsparcie': psychologImg,
  'dlaczego-motywacja-nie-zawsze-wystarcza': motywacjaImg,
  'stres-pod-kontrola-jak-dziala-uklad-nerwowy': stresImg,
  'emocje-w-pracy-jak-o-nich-mowic': emocjeImg,
  'pierwsze-90-dni-w-roli-lidera': liderImg,
}

export const articles: Article[] = [wypalenie, psychologCzyCoach, motywacja, stres, emocje, lider]
  .map((article) => ({ ...article, image: articleImages[article.slug] ?? article.image }))
  .sort((a, b) => b.date.localeCompare(a.date))

export const categoryLabels: Record<ArticleCategory, string> = {
  emocje: 'Emocje',
  stres: 'Stres',
  wypalenie: 'Wypalenie',
  motywacja: 'Motywacja',
  kariera: 'Kariera',
  'rozwoj-liderow': 'Rozwój liderów',
}

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

export function relatedArticles(current: Article, count = 3): Article[] {
  const sameCategory = articles.filter((a) => a.slug !== current.slug && a.category === current.category)
  const others = articles.filter((a) => a.slug !== current.slug && a.category !== current.category)
  return [...sameCategory, ...others].slice(0, count)
}
