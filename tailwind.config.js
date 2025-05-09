/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      darkMode: 'class', 
      colors: {
        lightGreen: "#E3ECE0", // Add your custom color
       
          naturalGreenStart: '#76C893',
          naturalGreenEnd: '#348AA7',

      },
    },
  
  },
  plugins: [],
}