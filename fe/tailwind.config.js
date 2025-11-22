/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F2F2F2",
        secondary: "#ffffff",
        contrast: "#E48F8F",
        pop: "#8C3D0F",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        backdropFadeIn: {
          "0%": { "backdrop-filter": "blur(0)" },
          "100%": { "backdrop-filter": "blur(1em)" },
        },
        backdropFadeOut: {
          "0%": { "backdrop-filter": "blur(1em)" },
          "100%": { "backdrop-filter": "blur(0)" },
        },
        moveIn: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0%)" },
        },
        moveOut: {
          "0%": { transform: "translateY(0%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.25s forwards",
        fadeOut: "fadeOut 0.25s forwards",
        backdropFadeIn: "backdropFadeIn 0.25s forwards",
        backdropFadeOut: "backdropFadeOut 0.25s forwards",
        moveIn: "moveIn 0.25s forwards",
        moveOut: "moveOut 0.25s forwards",
        fadeAndMoveIn: "moveIn 0.25s forwards, fadeIn 0.5s forwards",
      },
    },
    transitionDuration: { DEFAULT: "150ms" },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
