import { Route, Routes } from 'react-router-dom'

import Layout from './components/Layout'
import About from './pages/About'
import ArticlePage from './pages/ArticlePage'
import Booking from './pages/Booking'
import Business from './pages/Business'
import Coaching from './pages/Coaching'
import Consultations from './pages/Consultations'
import Contact from './pages/Contact'
import Faq from './pages/Faq'
import Home from './pages/Home'
import HowIWork from './pages/HowIWork'
import Knowledge from './pages/Knowledge'
import LeadMagnet from './pages/LeadMagnet'
import Legal from './pages/Legal'
import NotFound from './pages/NotFound'
import Offer from './pages/Offer'
import Pricing from './pages/Pricing'
import Workshops from './pages/Workshops'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/o-mnie" element={<About />} />
        <Route path="/oferta" element={<Offer />} />
        <Route path="/oferta/konsultacje-psychologiczne" element={<Consultations />} />
        <Route path="/oferta/coaching" element={<Coaching />} />
        <Route path="/oferta/warsztaty-i-wystapienia" element={<Workshops />} />
        <Route path="/jak-pracuje" element={<HowIWork />} />
        <Route path="/dla-firm" element={<Business />} />
        <Route path="/cennik" element={<Pricing />} />
        <Route path="/wiedza" element={<Knowledge />} />
        <Route path="/wiedza/:slug" element={<ArticlePage />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/kontakt" element={<Contact />} />
        <Route path="/rezerwacja" element={<Booking />} />
        <Route path="/materialy/psycholog-czy-coach" element={<LeadMagnet />} />
        <Route path="/polityka-prywatnosci" element={<Legal slug="polityka-prywatnosci" />} />
        <Route path="/polityka-cookies" element={<Legal slug="polityka-cookies" />} />
        <Route path="/regulamin-rezerwacji" element={<Legal slug="regulamin-rezerwacji" />} />
        <Route path="/regulamin-platnosci" element={<Legal slug="regulamin-platnosci" />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
