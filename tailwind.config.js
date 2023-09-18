/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        sidebar: "2px 5px 28px 0px rgba(21, 72, 134, 0.09)",
      },
    },
  },
  plugins: [],
};
