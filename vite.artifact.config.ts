import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Build „do udostępniania": jeden samowystarczalny plik HTML (wszystkie zasoby
// osadzone jako data URI, routing przez HashRouter). Użycie: npm run build:share
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  define: {
    'import.meta.env.VITE_ROUTER': JSON.stringify('hash'),
  },
  build: {
    outDir: 'dist-artifact',
    assetsInlineLimit: 100_000_000,
    chunkSizeWarningLimit: 10_000,
  },
})
