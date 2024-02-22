module.exports = {
  root: true,
  extends: ['plugin:@next/next/recommended', 'custom/next'],
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['.next/**/*', 'next*.config.js'],
  overrides: [],
};
