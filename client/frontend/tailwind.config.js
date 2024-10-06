/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {},
  },

  // Enable dark mode and use the 'class' strategy for toggling
  darkMode: "class", // or 'media' if you want to toggle based on system settings

  plugins: [require("daisyui")],

  // daisyUI configuration for themes
  daisyui: {
    themes: ["dark", "light"], // set "dark" as the first theme (default)
    darkTheme: "dark", // explicitly set the default dark theme
  },
};
