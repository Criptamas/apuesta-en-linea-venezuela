/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        dark:  "#0F3D91",
        light: "#55A2F2",
        grey:  "#EFF5F8",
        cta:   "#F26B32",
      },
    },
  },
  plugins: [],
}