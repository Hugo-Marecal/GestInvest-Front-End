module.exports = {
  content: ['./index.html', './src/**/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      roboto: ['Roboto', 'sans-serif'],
    },
    extend: {
      backgroundColor: {
        'custom-purple': '#9747ff',
      },
      colors: {
        buttonColor: '#9747ff',
        backgroundColorModal: '#371b4b',
        customGradient: {
          start: '#141314',
          end: '#371b4b',
        },
      },
      backgroundImage: (theme) => ({
        gradient:
          'linear-gradient(70deg, ' +
          theme('colors.customGradient.start') +
          ' 1%, ' +
          theme('colors.customGradient.end') +
          ' 100%)',
      }),
      animation: {
        // Ajout des deux animations
        bounce: 'bounceVariant 2s infinite',
        spin: 'spin 6s linear infinite',
      },
      keyframes: {
        bounceVariant: {
          '0%, 100%': {
            transform: 'translateY(0%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(-2%)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        spin: {
          from: {
            transform: 'rotate(0deg)',
          },
          to: {
            transform: 'rotate(360deg)',
          },
        },
      },
      gridTemplateColumns: {
        15: 'repeat(15, minmax(0, 1fr))',
      },
    },
  },
};
