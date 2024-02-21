module.exports = {
  reactStrictMode: true,
  transpilePackages: ['ui'],
  experimental: {
    taint: true,
    optimizePackageImports: ['config', 'ui', 'utils'],
  },
};
