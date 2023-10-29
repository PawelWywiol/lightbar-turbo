module.exports = {
  extends: [
    'turbo',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:sonarjs/recommended',
    'plugin:unicorn/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'sonarjs', 'unicorn', 'import', 'jest'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': 'error',
    'no-debugger': 'error',
    'no-void': ['error', { allowAsStatement: true }],
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        pathGroups: [
          {
            pattern: 'react**',
            group: 'builtin',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react**'],
        'newlines-between': 'always',
      },
    ],
    'import/no-extraneous-dependencies': [
      'off',
      {
        devDependencies: ['*.test.ts', '*.test.tsx'],
      },
    ],
    'import/no-cycle': [
      'error',
      {
        maxDepth: 1,
      },
    ],
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-unsafe-call': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'no-undef': 'off',
    '@typescript-eslint/no-unsafe-argument': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-namespace': 'off', // We use ES modules anyway, otherwise namespaces can be used for encapsulating types
    '@typescript-eslint/no-floating-promises': [
      'error',
      {
        ignoreIIFE: true,
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'lodash',
            message: 'Import [module] from lodash/[module] instead.',
          },
          {
            name: 'date-fns',
            message: 'Import [module] from date-fns/[module] instead.',
          },
        ],
      },
    ],
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          camelCase: true,
          pascalCase: true,
        },
        ignore: ['next-env.d.ts'],
      },
    ],
    'unicorn/prevent-abbreviations': [
      'error',
      {
        allowList: {
          props: true,
          Props: true,
          res: true,
          req: true,
          env: true,
          Env: true,
          args: true,
          dev: true,
          param: true,
          Param: true,
          ref: true,
        },
      },
    ],
    'unicorn/consistent-function-scoping': [
      'error',
      {
        checkArrowFunctions: false,
      },
    ],
    'unicorn/no-null': ['off'],
    'unicorn/no-array-reduce': ['off'],
    'unicorn/no-array-for-each': ['off'],
    'unicorn/no-useless-undefined': [
      'error',
      {
        checkArguments: false,
      },
    ],
  },
};
