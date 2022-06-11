const { transition } = require('@angular/animations');
const { transitionDuration } = require('tailwindcss/defaultTheme');

module.exports = {
  

    
    prefix: '',
    purge: {
      content: [
        './src/**/*.{html,ts}',
      ]
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
      screen: {
        'md':'768px'
      },
      extend: {
        
        height:{
          '160':'40rem',
          '1/10':'10%'
        },
        width:{
          '160':'40rem'
        },
        rotate:{
          '35': '35deg',
          '-35': '-35deg'
        },
        translate:{
          '1.25':'5px',
          '-1.25':'-5px'
        },
        margin:{
          '-2.5': '-10px',
          '-0.25': '-1px'
        },
        spacing:{
          '-2/5':'-40%'
        }
      },
    },
    variants: {
      extend: {},
    },
    plugins: [require('@tailwindcss/forms'),require('@tailwindcss/typography')],
};

