import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  timeout: 45_000,
  fullyParallel: true,
  retries: 0,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'retain-on-failure',
    // stabilizuje automatyczne przewijanie i testuje ścieżkę prefers-reduced-motion
    reducedMotion: 'reduce',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
    timeout: 60_000,
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
      testIgnore: /mobile\.spec\.ts/,
    },
    {
      name: 'mobile-small',
      use: {
        ...devices['iPhone SE'],
        browserName: 'chromium',
        viewport: { width: 320, height: 568 },
      },
      testMatch: /mobile\.spec\.ts/,
    },
    {
      name: 'mobile-typical',
      use: {
        ...devices['iPhone 14'],
        browserName: 'chromium',
        viewport: { width: 390, height: 844 },
      },
      testMatch: /mobile\.spec\.ts/,
    },
    {
      name: 'mobile-large',
      use: {
        ...devices['iPhone 14 Pro Max'],
        browserName: 'chromium',
        viewport: { width: 430, height: 932 },
      },
      testMatch: /mobile\.spec\.ts/,
    },
    {
      name: 'android',
      use: {
        ...devices['Pixel 7'],
      },
      testMatch: /mobile\.spec\.ts/,
    },
  ],
})
