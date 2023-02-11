import type { App } from 'vue'

import PageHeader from './PageHeader.vue'

export function registerGlobalComponents(app: App<Element>) {
  app.component('PageHeader', PageHeader)
}
