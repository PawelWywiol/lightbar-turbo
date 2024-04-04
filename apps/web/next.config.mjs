/** @type {import('next').NextConfig} */
const config = {
  swcMinify: true,
  productionBrowserSourceMaps: true,
  transpilePackages: ['config', 'ui', 'utils'],
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  experimental: {
    taint: true,
    optimizePackageImports: ['config', 'ui', 'utils'],
  },
};

export default config;
