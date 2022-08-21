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
      minWidth: {
        '6': '24px',
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
          '100':'400px',
          '10.5':'42px',
          '9.5':'38px',
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
          'full':'100%',
          '-1.25':'-5px',
          '0.25':'1px',
          '25.5':'102px'
        }, 
        lineClamp: {
          '8': '8',
          '10': '10',
        },
        keyframes:{
          fadeIn:{
            from:{
              'opacity':0
            },
            to:{
              'opacity':1
            }
          }
        },
        animation : {
          fade : 'fadeIn .7s easy-in-out'
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
            'opacity': '70%'
          }
        }),
        addComponents({
          '.btn-submit': {
            'position': 'relative',
            'width': '100%',
            'height': '100%',
            'border': '2px solid transparent',
            'padding': '0px 10px',
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
          // form components
          // '._page-form-container':{
          //   'border-bottom': '2px solid white',
          //   'background-color': '#2563eb'
          // },
          '.header-form':{
            'font-size': '30px',
            'line-height':' 36px',
            'font-weight': '800',
            'color':'#1e40af',
            'text-align': 'center'
          },
          '._image-logo-form':{
            'width': '176px',
            'height': '48px',
            'margin':'auto'
          },
          '._form-label': {
              'font-size': '14px',
              'line-height': '16px',
              'color': '#1e40af',
              'font-weight': 'bold'            
          },
          '._form-input': {
              'appearance': 'none',
              'position': 'relative',
              'width': '100%',
              'border-radius': '6px',
              'padding': '10px 12px',
              'margin': '8px 0',
              'border': '1px solid #111827',                    
              'color':'#111827',
              'font-size': '14px',
              'line-height': '16px',
              '&:focus':{
                'border': '1px solid #6366f1'              
              },
              '&:placeholder':{
                'color': '#6b7280'
              }
          },
          '._form-select': {
              'appearance': 'none',
              'position': 'relative',
              'width': '100%',
              'border-radius': '6px', 
              'padding': '10px 12px',
              'margin': '8px 0',                               
              'color':'#111827',
              'font-size': '14px',
              'line-height': '16px'
          },

          // messages
          '.warning-text': {
            'font-size': '14px',
            'line-height': '16px',
            'color':' #dc2626',
            'padding-left': '8px'
          },

          // icon container
          '.lock':{
            'position': 'absolute',
            'top':'auto',
            'bottom': 'auto',
            'right': '2px'
          },
          
          // link
          '._link':{
            'position': 'absolute',
            'top':'0',
            'right': '0',
            'width':'100%',
            'height':'100%',
          },
          
          // rigth up
          '._right':{
            'border-top': '5px solid transparent',
            'border-bottom': '5px solid transparent',
            'border-left': '5px solid #1e40af'
          },
          '._up':{
            'border-left': '5px solid transparent',
            'border-right': '5px solid transparent',
            'border-bottom': '5px solid #1e40af'
          }
        })
      }),    
     
    ]
};

