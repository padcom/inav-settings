console.log('process.env.BASE_URL', process.env.BASE_URL)

export default defineNuxtConfig({
  modules: [
    '@sidebase/nuxt-auth',
    '@nuxt/content',
  ],
  auth: {
    origin: process.env.BASE_URL,
  },
  nitro: {
    storage: {
      memory: {
        driver: 'memory'
      }
    }
  },
  components: [
    { path: '~/components', pathPrefix: false },
  ]
})
