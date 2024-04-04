module.exports = {
  root: true,
  extends: ['custom-react'],
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  rules: {},
  overrides: [],
  ignorePatterns: [
    '!**/*',
    'turbo/generators/**/*',
    'tailwind.config.cjs',
    'postcss.config.cjs',
    'tsconfig.json',
    'node_modules/**/*',
  ],
};
