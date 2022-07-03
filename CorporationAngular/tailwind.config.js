const { transition } = require('@angular/animations');
const { transitionDuration } = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin')

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
          'header':'64px', // height nav menu md screen
          'short-header':'48px', // height nav menu 
          '160':'640px',
          '120':'480px',
          '10.5':'42px',
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
          'header':'64px',
          'short-header':'48px',
          'service-title':'176px',
          'service-title-short':'160px',
          'menu-products':'224px',
          '-2/5':'-40%',
          '-1/2':'-50%',
          '1/12':'8.33333333333%',
          '1/5':'20%',
          'full':'100%'
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
      require('@tailwindcss/line-clamp'),
      plugin(function({ addUtilities, addComponents, e, prefix, config }) {
        
        addUtilities({
          '.no-hover': {
            'pointer-events': 'none',
          }
        }),
        addComponents({
          '.btn-submit': {
            'position': 'relative',
            'width': '100%',
            'border': '2px solid transparent',
            'padding': '5px 0',
            'font-weight': 'bold',
            'background': '#2563eb',
            'color': 'white',
            'border-radius': '5px',
            '&:hover':{
              'color': '#2563eb',
              'background': 'white',
              'border': '2px solid #2563eb'
            }
          },
          '.warning-text': {
            'color':' #dc2626',
            'padding-left': '8px'
          },
          '.lock':{
            'position': 'absolute',
            'top':'auto',
            'bottom': 'auto',
            'right': '2px'
          },
          '.header-form':{
            'font-size': '30px',
            'line-height':' 36px',
            'font-weight': '800',
            'color':'#1e40af',
            'text-align': 'center'
          }
        })
      }),    
     
    ]
};

