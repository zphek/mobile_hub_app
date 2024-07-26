/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(({matchUtilities, theme}) => {
      matchUtilities(
        {
          clamp(value) {
            // load font sizes from theme
            const sizes = theme('fontSize');

            // parse the value passed in from class name
            // split it by "-" and compare pieces to fontSize values
            const split = value
              .split('-')
              .map(v => sizes[v] ? sizes[v]['0'] : v);
            
            // return a clamped font-size
            return {
              fontSize: `clamp(${split[0]}, ${split[1]}, ${split[2]})`,
            }
          }
        }
      );
    }),
  ],
}