import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import { definePreset } from '@primevue/themes'
import 'primeicons/primeicons.css'

import Aura from '@primevue/themes/aura'

const app = createApp(App)

const Violet = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{violet.50}',
      100: '{violet.100}',
      200: '{violet.200}',
      300: '{violet.300}',
      400: '{violet.400}',
      500: '{violet.500}',
      600: '{violet.600}',
      700: '{violet.700}',
      800: '{violet.800}',
      900: '{violet.900}',
      950: '{violet.950}',
    },
    colorScheme: {
      light: {
        primary: {
          color: '{violet.500}',
          inverseColor: '{violet.50}',
          hoverColor: '{violet.600}',
          activeColor: '{violet.400}',
          borderColor: '{violet.300}',
        },
        highlight: {
          background: '{violet.750}',
          focusBackground: '{violet.400}',
          color: '{violet.100}',
          focusColor: '{violet.200}',
          borderColor: '{violet.100}',
        },
      },
      dark: {
        primary: {
          color: '{violet.400}',
          inverseColor: '{violet.50}',
          hoverColor: '{violet.500}',
          activeColor: '{violet.300}',
        },
        highlight: {
          background: '{violet.460}',
          focusBackground: '{violet.640}',
          color: '{violet.870}',
          focusColor: '{violet.870}',
        },
      },
    },
  },
})

// PrimeVue'i uygulamaya entegre etme
app.use(PrimeVue, {
  theme: {
    preset: Violet, // Violet teması
    options: {
      darkModeSelector: 'system', // Sistemin karanlık mod seçeneğine göre tema
    },
  },
})

// PrimeVue Toolbar bileşenini kaydetme
import {
  Button,
  Slider,
  Toolbar,
  InputText,
  Listbox,
  MultiSelect,
  RadioButton,
  Rating,
  Checkbox,
} from 'primevue'

import Chart from 'primevue/chart'

app.component('Toolbar', Toolbar)
app.component('Button', Button)
app.component('Slider', Slider)
app.component('InputText', InputText)
app.component('ListBox', Listbox)
app.component('MultiSelect', MultiSelect)
app.component('RadioButton', RadioButton)
app.component('Rating', Rating)
app.component('Checkbox', Checkbox)
app.component('Chart', Chart)

// Uygulamayı mount etme
app.mount('#app')
