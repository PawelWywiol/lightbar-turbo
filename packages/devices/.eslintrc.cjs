module.exports = {
  root: true,
  extends: ['custom-react'],
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  rules: {},
  overrides: [],
  ignorePatterns: ['!**/*'],
};
