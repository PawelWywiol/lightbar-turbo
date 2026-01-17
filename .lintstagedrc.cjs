module.exports = {
  'apps/esp/**/*': () => [
    'turbo run lint --filter esp',
    'turbo run tsc --filter esp',
    'turbo run test --filter esp',
  ],
  'apps/web/**/*': () => [
    'turbo run lint --filter web',
    'turbo run tsc --filter web',
    'turbo run test --filter web',
  ],
  'packages/config/**/*': () => [
    'turbo run lint --filter config',
    'turbo run tsc --filter config',
  ],
  'packages/devices/**/*': () => [
    'turbo run lint --filter devices',
    'turbo run tsc --filter devices',
  ],
  'packages/ui/**/*': () => ['turbo run lint --filter ui', 'turbo run tsc --filter ui'],
  'packages/utils/**/*': () => [
    'turbo run lint --filter utils',
    'turbo run tsc --filter utils',
  ],
};
