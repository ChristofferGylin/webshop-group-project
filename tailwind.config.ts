import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        '128': '32rem',
        '192': '48rem',
        '256': '64rem',
      },
      fontFamily: {
        'poppins': ['"Poppins"', 'cursive'],
      },
    },
  },
  plugins: [],
} satisfies Config;
