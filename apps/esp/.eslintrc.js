module.exports = {
  root: true,
  extends: ['custom/next'],
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['.next/**/*', 'next*.config.js'],
  overrides: [],
};
