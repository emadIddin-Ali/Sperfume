import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#CBA135', // Gold accent
          hover: '#B6892D',   // Darker gold for hover
        },
        text: {
          primary: '#111827', // Very dark gray
        },
        error: '#DC2626',     // Red-600
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
      },
      maxWidth: {
        'container': '1280px',
      },
    },
  },
  plugins: [],
};

export default config; 