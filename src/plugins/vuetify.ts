/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import {createVuetify, ThemeDefinition} from 'vuetify'

const myTheme : ThemeDefinition = {
    dark: false,
    colors: {
      // primary: '#1867C0',
      primary: 'white',
      secondary: '#D2AA45',
      background:  '#333333'
    },
  }

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides

export default createVuetify({
  theme: {
    
    defaultTheme: 'myTheme',
    themes: {
      myTheme
    },
  },
})
