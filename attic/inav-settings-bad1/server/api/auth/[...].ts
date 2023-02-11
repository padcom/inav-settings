import { NuxtAuthHandler } from '#auth'
import Google from 'next-auth/providers/google'

export default NuxtAuthHandler({
  secret: 'abcdefghijklmnopqrstuvwxyz',
  providers: [
    // @ts-expect-error
    Google.default({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
})
