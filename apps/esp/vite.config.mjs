import path from 'node:path';
import preact from '@preact/preset-vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [tailwindcss(), preact()],
  build: {
    polyfillDynamicImport: true,
  },
  test: {
    environment: 'jsdom',
    setupFiles: [path.resolve(__dirname, './setupTest.ts')],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/index.tsx'],
    },
  },
});
