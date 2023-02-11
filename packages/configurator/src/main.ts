import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { router, registerCustomRouterComponents } from './router'
import { registerGlobalComponents } from './components'

import { VueFire } from 'vuefire'
import { firebaseConfig } from './firebase'

import App from '@/App.vue'

const app = createApp(App)
registerGlobalComponents(app)
registerCustomRouterComponents(app)

app.use(router)
app.use(createPinia())
app.use(VueFire, firebaseConfig)

app.mount('#app')
