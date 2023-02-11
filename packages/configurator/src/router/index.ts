import type { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

// Router-specific components registration

import Link from './Link.vue'

export function registerCustomRouterComponents(app: App<Element>) {
  app.component('Link', Link)
}

// Router configuration

const Home = () => import('@/pages/Home.vue')
const About = () => import('@/pages/About.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
