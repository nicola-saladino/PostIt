import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import App from './App.vue'
import './style.css'

// 👇 Importa il router
import router from './router'

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})

// 👇 Usa il router
app.use(router)

app.mount('#app')
