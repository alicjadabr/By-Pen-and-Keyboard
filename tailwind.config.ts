import { type Config } from "tailwindcss";

const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Open: ["Open Sans"],
      }
    }
  },
  plugins: [],
} satisfies Config;
