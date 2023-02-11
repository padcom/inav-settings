import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { router, registerCustomRouterComponents } from './router'
import { registerGlobalComponents } from './components'
import App from '@/App.vue'

import './assets/main.css'

const app = createApp(App)
registerGlobalComponents(app)
registerCustomRouterComponents(app)

app.use(router)
app.use(createPinia())

app.mount('#app')
