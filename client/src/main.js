import { createApp } from 'vue'
import './style.css'
import router from "./router.js";
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.mount('#app')
