import preact from '@preact/preset-vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [tailwindcss(), preact()],
  build: {
    polyfillDynamicImport: true,
  },
  test: {
    environment: 'jsdom',
    setupFiles: './setupTest.ts',
    coverage: {
      provider: 'v8',
    },
  },
});
