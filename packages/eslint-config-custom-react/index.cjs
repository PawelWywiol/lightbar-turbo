module.exports = {
  extends: [
    'custom',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'prettier',
  ],
  plugins: ['jest-dom', 'testing-library', '@tanstack/query', 'eslint-plugin-react-compiler'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react-compiler/react-compiler': 'error',
  },
  overrides: [
    {
      files: ['**/*.styled.{ts,tsx}'],
      rules: {
        'sonarjs/no-duplicate-string': 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      typescript: {},
    },
    react: {
      version: 'detect',
    },
  },
};
