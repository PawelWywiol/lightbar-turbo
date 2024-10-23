module.exports = {
  plugins: ['jest-dom', 'testing-library', '@tanstack/query'],
  extends: ['custom-react', 'prettier'],
  rules: {
    'react/jsx-key': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.tsx'],
      },
    ],
    'unicorn/prevent-abbreviations': 'off',
  },
  overrides: [
    {
      extends: ['plugin:jest-dom/recommended', 'plugin:testing-library/react'],
      files: ['*.test.tsx', '*.test.ts'],
      rules: {
        '@typescript-eslint/consistent-type-imports': [
          'error',
          {
            disallowTypeAnnotations: false,
          },
        ],
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
    {
      files: ['app/**/*.{ts,tsx}'],
      rules: {
        'import/prefer-default-export': 'error',
        'import/no-default-export': 'off',
        'unicorn/filename-case': 'off',
        'unicorn/prevent-abbreviations': [
          'error',
          {
            allowList: {
              generateStaticParams: true,
            },
          },
        ],
      },
    },
  ],
};
