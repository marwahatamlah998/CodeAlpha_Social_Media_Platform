import type { NextAuthOptions, User } from 'next-auth'
import type { Adapter } from 'next-auth/adapters'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import "dotenv/config";



export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, _) {
        const { email, password } = credentials as { email: string; password: string }

        return (await Login({ email, password })) as User
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
    error: '/error',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    signIn: ({ user }) => {
      if ('error' in user) {
        return `/sign-in?error=${user.error}`
      }
      return true
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
