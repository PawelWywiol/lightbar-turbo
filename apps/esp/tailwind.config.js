module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      default: {
        text: 'rgb(var(--color-default-text) / <alpha-value>)',
        bg: 'rgb(var(--color-default-bg) / <alpha-value>)',
      },
      secondary: 'rgb(var(--color-secondary), <alpha-value>)',
    },
    extend: {},
  },
  plugins: [],
};
