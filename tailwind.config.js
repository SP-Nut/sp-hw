/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'oxford-blue': '#192338',
        'space-cadet': '#1e2e4f', 
        'yinmn-blue': '#31487a',
        'jordy-blue': '#8fb3e2',
        'lavender': '#d9e1f1',
      },
      fontFamily: {
        'prompt': ['var(--font-prompt)', 'Prompt', 'system-ui', 'sans-serif'],
        'sans': ['var(--font-prompt)', 'Prompt', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;