module.exports = {
  'apps/esp/**/*': () => ['turbo run lint --filter esp', 'turbo run type-check --filter esp'],
  'apps/web/**/*': () => ['turbo run lint --filter web', 'turbo run type-check --filter web'],
  'packages/config/**/*': () => [
    'turbo run lint --filter config',
    'turbo run type-check --filter config',
  ],
  'packages/devices/**/*': () => [
    'turbo run lint --filter devices',
    'turbo run type-check --filter devices',
  ],
  'packages/ui/**/*': () => ['turbo run lint --filter ui', 'turbo run type-check --filter ui'],
  'packages/utils/**/*': () => [
    'turbo run lint --filter utils',
    'turbo run type-check --filter utils',
  ],
};
