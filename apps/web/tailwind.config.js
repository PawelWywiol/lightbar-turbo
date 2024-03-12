/** @type {import('tailwindcss').Config} */
const defaultTheme = require('ui/tailwind.config.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...defaultTheme,
  content: ['./app/**/*.{js,ts,jsx,tsx}', '../../packages/ui/src/**/*.{js,ts,jsx,tsx}'],
};
