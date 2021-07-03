import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  providers: [
    Providers.Spotify({
      clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
    }),
    Providers.Auth0({
      clientId:process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
      clientSecret:process.env.NEXT_PUBLIC_AUTH0_CLIENT_SECRET,
      domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
      redirectUri: "http://localhost:3000/callback"
    })
  ],
})