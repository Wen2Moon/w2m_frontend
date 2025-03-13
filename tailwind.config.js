/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        orangeStart: "rgba(255, 183, 120, 1)", // Mã màu bắt đầu
        orangeEnd: "rgba(241, 118, 11, 1)", // Mã màu kết thúc
        blacklight: "rgba(0, 0, 0, 0.3)",
        bgTd: "rgba(255, 255, 255, 0.1)",
        bgBtn: "rgba(37, 37, 37, 0.7)",
      },
      backgroundImage: {
        "gradient-orange": "linear-gradient(90deg, #AF46FF 0%, #2E0BF1 100%)",
      },
    },
  },
  plugins: [],
};
