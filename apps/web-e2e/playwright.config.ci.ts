/* eslint-disable import/no-default-export */

import type { PlaywrightTestConfig } from '@playwright/test';
import { baseConfig } from './playwright.config';

const config: PlaywrightTestConfig = {
  ...baseConfig,
  use: {
    ...baseConfig.use,
    baseURL: 'http://localhost:3000',
  },
  /* Run your local dev server before starting the tests */
  webServer: {
    cwd: '../web',
    command: 'npm run dev',
    reuseExistingServer: true,
    port: 3000,
  },
};

export default config;
