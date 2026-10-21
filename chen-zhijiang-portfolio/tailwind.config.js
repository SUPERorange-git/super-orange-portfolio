/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: { canvas: "#0c0c0c", silver: "#d7e2ea" },
      fontFamily: { sans: ["Kanit", "Microsoft YaHei", "sans-serif"] },
    },
  },
  plugins: [],
};
