import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import './style.css'
import './styles/showcase-variables.css'
import App from './App.vue'
import { registerSW } from 'virtual:pwa-register'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Initialize stores before mounting the app
const initializeApp = async () => {
  app.mount('#app')
}

initializeApp()

// Register service worker
const updateSW = registerSW({
  onNeedRefresh() {
    console.log('New content available, click on reload button to update.')
  },
  onOfflineReady() {
    console.log('App ready to work offline')
  },
})
