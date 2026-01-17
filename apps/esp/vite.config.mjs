import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const preactPath = path.resolve(__dirname, 'node_modules/preact');

export default defineConfig({
  plugins: [tailwindcss()],
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    jsxImportSource: 'preact',
    jsxInject: `import { h, Fragment } from 'preact'`,
  },
  resolve: {
    dedupe: ['preact'],
    alias: [
      {
        find: 'react/jsx-runtime',
        replacement: `${preactPath}/jsx-runtime/dist/jsxRuntime.module.js`,
      },
      {
        find: 'react/jsx-dev-runtime',
        replacement: `${preactPath}/jsx-runtime/dist/jsxRuntime.module.js`,
      },
      {
        find: 'react-dom/test-utils',
        replacement: `${preactPath}/test-utils/dist/testUtils.module.js`,
      },
      { find: 'react-dom', replacement: `${preactPath}/compat/dist/compat.module.js` },
      { find: 'react', replacement: `${preactPath}/compat/dist/compat.module.js` },
      { find: /^preact\/compat$/, replacement: `${preactPath}/compat/dist/compat.module.js` },
      {
        find: /^preact\/jsx-runtime$/,
        replacement: `${preactPath}/jsx-runtime/dist/jsxRuntime.module.js`,
      },
      {
        find: /^preact\/jsx-dev-runtime$/,
        replacement: `${preactPath}/jsx-runtime/dist/jsxRuntime.module.js`,
      },
      { find: /^preact\/hooks$/, replacement: `${preactPath}/hooks/dist/hooks.module.js` },
      { find: /^preact$/, replacement: `${preactPath}/dist/preact.module.js` },
    ],
  },
  build: {
    polyfillDynamicImport: true,
  },
  test: {
    environment: 'jsdom',
    setupFiles: [path.resolve(__dirname, './setupTest.ts')],
    server: {
      deps: {
        inline: ['preact', '@testing-library/preact'],
      },
    },
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/index.tsx'],
    },
  },
});
