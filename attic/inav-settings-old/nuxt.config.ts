console.log(process.env.GOOGLE_CLIENT_ID)
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@nuxt-alt/auth',
    '@nuxtjs/axios',
    // '@nuxtjs/auth-next',
  ],
  auth: {
    globalMiddleware: true,
    // redirect: {
    //   login: '/',
    //   logout: '/',
    //   callback: '/',
    //   home: '/'
    // },

    strategies: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        // clientSecret: process.env.CLIENT_SECRET,
        codeChallengeMethod: '',
        responseType: 'code',
        redirectUri: process.env.GOOGLE_REDIRECT_URI_LOCAL,
        // authorization: {
        //   params: {
        //     prompt: 'consent',
        //     response_type: 'code',
        //     scope: 'openid profile email',
        //     redirect_uri: process.env.GOOGLE_REDIRECT_URI_LOCAL,
        //     include_grant_scopes: true,
        //   }
        // }
      }
    }
  }
})
