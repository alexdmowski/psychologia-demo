import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Build pod GitHub Pages: względna ścieżka bazowa (działa pod /nazwa-repo/)
// + HashRouter (brak potrzeby fallbacku 404 dla tras SPA).
// Użycie: npm run build:pages → dist-pages/
export default defineConfig({
  plugins: [react()],
  base: './',
  define: {
    'import.meta.env.VITE_ROUTER': JSON.stringify('hash'),
  },
  build: {
    outDir: 'dist-pages',
    chunkSizeWarningLimit: 1000,
  },
})
