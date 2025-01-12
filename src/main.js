import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onNeedRefresh() {
    // You can show a prompt to the user when an update is available
    console.log('New content available, click on reload button to update.')
  },
  onOfflineReady() {
    // You can show a prompt to the user when offline mode is ready
    console.log('App ready to work offline')
  },
})

const app = createApp(App)
app.mount('#app')
