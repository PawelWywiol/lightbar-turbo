import defaultTheme from 'ui/tailwind.config.cjs';

import type { Config } from 'tailwindcss';

const theme: Config = {
  ...defaultTheme,
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
};

export default theme;
