module.exports = {
  root: true,
  extends: ['custom-remix'],
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
    ecmaVersion: 'latest',
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  ignorePatterns: [
    '!**/.server',
    '!**/.client',
    'vite.config.mjs',
    'vite-env.d.ts',
    'tailwind.config.ts',
    'dist',
    'build',
    '.turbo',
    'node_modules',
  ],
  overrides: [
    {
      files: ['.eslintrc.cjs'],
      env: {
        node: true,
      },
    },
  ],
};
