// Publikuje dist-pages/ na gałąź gh-pages repozytorium psychologia-demo.
// Użycie: npm run deploy (wymaga zalogowanego gh / poświadczeń git dla GitHub).
import { execSync } from 'node:child_process'
import { writeFileSync, rmSync } from 'node:fs'

const REPO = 'https://github.com/alexdmowski/psychologia-demo.git'
const run = (cmd, cwd = 'dist-pages') => execSync(cmd, { cwd, stdio: 'inherit' })

writeFileSync('dist-pages/.nojekyll', '')
rmSync('dist-pages/.git', { recursive: true, force: true })
run('git init -q -b gh-pages')
run('git add -A')
run('git commit -q -m "deploy: strona demo (build pages)"')
run(`git push -f ${REPO} gh-pages`)
rmSync('dist-pages/.git', { recursive: true, force: true })
console.log('Wdrożono: https://alexdmowski.github.io/psychologia-demo/')
