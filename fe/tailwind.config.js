/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F2F2F2",
        secondary: "#ffffff",
        contrast: "rgb(228 143 143)",
        pop: "#8C3D0F",
      },
    },
    transitionDuration: { DEFAULT: "150ms" },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
