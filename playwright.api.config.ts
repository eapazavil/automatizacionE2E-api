import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests/api',
  use: {
    baseURL: 'https://www.saucedemo.com/api',
    extraHTTPHeaders: {
      'Accept': 'application/json',
    },
  },
  reporter: [
    ['list'],
    ['html', { open: 'never' }]
  ],
}

export default config;