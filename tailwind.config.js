/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "neutral-100": "#FFFFFF",
      "neutral-200": "#f5f5f5",
      "neutral-300": "#e4e4e4",
      "neutral-400": "#c1c4cb",
      "neutral-500": "#7c8187",
      "neutral-600": "#5a6069",
      "neutral-700": "#35393f",
      "neutral-800": "#2b2d31",
      "neutral-900": "#1d1f22",
      "neutral-1000": "#151619",
      orange: "#e46643",
      "orange-hover": "#f39765",
      transparent: "rgb(0 , 0, 0, 0)",
    },
    fontSize: {
      "body-m": ".8125rem",
      "heading-s": [".875rem", { letterSpacing: ".125rem" }],
      "heading-m": ".9375rem",
      "preview-h1": "2rem",
      "preview-h2": "1.75rem",
      "preview-h3": "1.5rem",
      "preview-h4": "1.25rem",
      "preview-h5": "1rem",
      "preview-h6": ".875",
      "preview-paragraph": [".875rem", { lineHeight: "1.5rem" }],
    },
    extend: {
      fontFamily: {
        sans: ["Roboto", ...defaultTheme.fontFamily.sans],
        serif: ['"Roboto Slab"', ...defaultTheme.fontFamily.serif],
        mono: ['"Roboto Mono"', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
