import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests/api',
  use: {
    baseURL: process.env.API_BASE_URL || 'http://localhost:3000',
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  },
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['json', { outputFile: 'test-results/api-results.json' }]
  ],
  workers: 1,
  retries: process.env.CI ? 2 : 0,
  timeout: 30000,
  testMatch: '**/*.test.ts',
  globalSetup: './tests/api/global-setup.ts',
  globalTeardown: './tests/api/global-teardown.ts',
  expect: {
    timeout: 10000
  },
  outputDir: 'test-results'
};

export default config;