const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

module.exports = {
    content: [
        './src/**/*.js',
        './src/**/*.vue',
    ],

    theme: {
        extend: {
            keyframes: {
                'pulse-scale': {
                    '0%, 100%': { transform: 'scale(0.95)' },
                    '50%': { transform: 'scale(1.20)' }
                }
            },
            animation: {
                'pulse-scale': 'pulse-scale 2.5s ease-in-out infinite',
            },
            boxShadow: {
                xs: '0 3px 0 rgba(39, 39, 39, .08)',
                sm: '0 3px 1px rgba(39, 39, 39, .2)',
                md: '0 3px 6px rgba(39, 39, 39, .16)',
                'md-alt': '0 1px 6px rgba(39, 39, 39, .16)'
            },
            fontFamily: {
                sans: ['Poppins', ...defaultTheme.fontFamily.sans],
                paralucent: ['paralucent','sans-serif'],
                "paralucent-text": ["paralucent-text",'sans-serif']
            },
            spacing: {
                23 : '5.75rem'
            },
            colors: {
                'wz-turquoise': '#62CFED',
                'wz-light-blue': '#f0f6ff',
                'wz-blue': '#94B6FF',
                'wz-brown': '#d68b33',
                'wz-dark-blue': '#3772F2',
                'wz-bright-yellow': '#FFE46A',
                'wz-light-yellow': '#FFE880',
                'wz-yellow': '#FFC56A',
                'wz-medim-dark-yellow': '#E29720',
                'wz-dark-yellow': '#FFAD2D',
                'wz-light-green': '#E6F5F3',
                'wz-medium-green': '#9FD8CB',
                'wz-green': '#2BD1B1',
                'wz-dark-green': '#517664',
                'wz-black': '#272727',
                'wz-black-secondary': '#2B2E34',
                'wz-orange': '#FF8A76',
                'wz-dark-orange': '#FF8267',
                'wz-thin-grey': '#f2f2f2',
                'wz-light-grey': '#f8f8f8',
                'wz-medium-grey': '#7d7d7d',
                'wz-grey': '#D3D3D3',
                'wz-semi-dark-grey': '#EDEDED',
                'wz-dark-grey': '#A8A8A8',
            },
            minHeight: {
                8: '2rem',
                48: '12rem', // Product tile
            },
            minWidth: {
                8: '2rem',
                12: '3rem'
            },
            transitionProperty: {
                'height': 'max-height, height',
                'margin': 'margin'
            },
            fill: theme => ({
                'wz-blue': theme('colors.wz-blue'),
            }),
            backgroundImage: theme => ({
                'winzum-bg-pattern': "url('/assets/bg-pattern.svg')",
                'winzum-wave': "url('/assets/winzum-wave.svg')",
                'winzum-wave-green': "url('/assets/winzum-wave-green.svg')",
            })
        },
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                xl: '4rem'
            }
        },
    },

    plugins : [
        require('@tailwindcss/line-clamp')
    ]
};
