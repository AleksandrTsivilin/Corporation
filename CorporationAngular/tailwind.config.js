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
        'sm':'640px',
        'md':'768px',
        'lg':'1024px'
      },     
      extend: {
        
        colors:{
          'regal-blue': '#243c5a',
          'cyan-800' : '#155e75',
          'cyan-600' : '#0891b2',
          'cyan-500' : '#06b6d4'
        },
        
        height:{
          '160':'640px',
          '120':'480px',
          '1/10':'10%',
          '1/12':'8.33333333333%',
          '3/5vh':'60vh'
        },
        width:{
          '160':'640px',
          '0.75':'3px'
        },
        rotate:{
          '35': '35deg',
          '-35': '-35deg',
          '135': '135'
        },
        translate:{
          '1.25':'5px',
          '-1.25':'-5px'
        },
        margin:{
          '-2.5': '-10px',
          '-0.25': '-1px',
          '-0.75': '-3px'
        },
        spacing:{
          '-2/5':'-40%',
          '-1/2':'-50%',
          '1/12':'8.33333333333%',
          '1/5':'20%',
        }, 
        lineClamp: {
          '8': '8',
          '10': '10',
        }      
        
      },
    },
    variants: {
      extend: {},
    },
    plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),   
      require('@tailwindcss/line-clamp') 
    ]
};

