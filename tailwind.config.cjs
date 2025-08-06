/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [/*...*/],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        secondary: '#D946EF',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        xl: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // otros plugins si quieres
  ],
}

  