module.exports = {
  root: true,
  extends: ['custom/react-internal'],
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  rules: {},
  overrides: [],
  ignorePatterns: [
    '!**/*',
    'turbo/generators/**/*',
    'tailwind.config.js',
    'postcss.config.js',
    'tsconfig.json',
  ],
};
