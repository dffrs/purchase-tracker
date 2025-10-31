/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "hsl(0, 0%, 20%)",
        secondary: "hsl(0, 0%, 50%)",
        contrast: "hsl(0, 0%, 80%)",
      },
    },
    transitionDuration: { DEFAULT: "150ms" },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
