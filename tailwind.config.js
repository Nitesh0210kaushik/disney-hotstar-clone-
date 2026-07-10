/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#E6F4FE",
          100: "#CDEAFD",
          200: "#9FD5FB",
          300: "#6ABDF6",
          400: "#3A9DEB",
          500: "#1677D2",
          600: "#0F5FA7",
          700: "#0D4B83",
          800: "#0B3A65",
          900: "#092B4A",
        },
      },
      boxShadow: {
        glow: "0 18px 40px rgba(22, 119, 210, 0.24)",
      },
    },
  },
  plugins: [],
};
