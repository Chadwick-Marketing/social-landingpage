module.exports = {
  content: [
    './pages/**/*.js',
    './components/**/*.js',
    './utils/**/*.js',
    './slices/**/*.js',
  ],
  theme: {
    fontFamily: {
      sans: ["'Inter'", 'sans-serif'],
    },
    extend: {
      fontFamily: {
        serif: ["'New York Large'", 'serif'],
        inter: ["'Inter'", 'sans-serif'],
      },
      colors: {
        tech: '#4648FF',
        'tech-hover': '#4547FB',
        'tech-dark': '#111111',
      },
    },
  },
  plugins: [],
};
