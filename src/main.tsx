import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'

import '@fontsource-variable/albert-sans/index.css'
import '@fontsource-variable/fraunces/opsz.css'

import './styles/tokens.css'
import './styles/base.css'
import './styles/layout.css'
import './styles/components.css'
import './styles/pages.css'

import App from './App'

// Build „do udostępniania" (single-file, hosting bez kontroli ścieżek) używa
// HashRouter — patrz vite.artifact.config.ts. Standardowy build: BrowserRouter.
const Router = import.meta.env.VITE_ROUTER === 'hash' ? HashRouter : BrowserRouter

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
)
