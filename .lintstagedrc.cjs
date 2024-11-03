module.exports = {
  'apps/esp/**/*': () => [
    'turbo run lint --filter esp',
    'turbo run type-check --filter esp',
    'turbo run test:changed --filter esp',
  ],
  'apps/web/**/*.ts': () => [
    'turbo run lint --filter web',
    'turbo run type-check --filter web',
    'turbo run test:changed --filter web',
  ],
  'packages/config/**/*.tsx': () => [
    'turbo run lint --filter config',
    'turbo run type-check --filter config',
    'turbo run test:changed --filter config',
  ],
  'packages/devices/**/*.tsx': () => [
    'turbo run lint --filter devices',
    'turbo run type-check --filter devices',
    'turbo run test:changed --filter devices',
  ],
  'packages/ui/**/*.tsx': () => [
    'turbo run lint --filter ui',
    'turbo run type-check --filter ui',
    'turbo run test:changed --filter ui',
  ],
  'packages/utils/**/*.tsx': () => [
    'turbo run lint --filter utils',
    'turbo run type-check --filter utils',
    'turbo run test:changed --filter utils',
  ],
};
