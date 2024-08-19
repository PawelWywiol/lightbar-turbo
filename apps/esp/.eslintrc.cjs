module.exports = {
  root: true,
  extends: ['custom-next'],
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['vite.config.mjs', 'src/vite-env.d.ts', 'tailwind.config.js', 'vite-env.d.ts'],
  overrides: [],
};
