import { PrismaAdapter } from '@auth/prisma-adapter'
import { Role } from '@prisma/client'
import NextAuth, { AuthOptions } from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

import { prisma } from '../database'
import { sendMagicLinkFromGmail } from '../email/node-mailer'
import { sendMagicLinkEmail } from '../email/resend-mailer'

export const authOptions = {
  debug: true,

  session: {
    strategy: 'database'
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: '/auth/login',
    verifyRequest: '/auth/magic-link-sent'
  },
  callbacks: {
    async session({ session, token, user }) {
      const db = await prisma.user.findFirst({ where: { id: user.id } })

      if (db) {
        session.user.id = db.id
        session.user.name = db.name ?? ''
        session.user.username = db.username ?? ''
        session.user.email = db.email
        session.user.image = db.image ?? ''
        session.user.role = db.role ?? Role.USER
        session.user.stripe_customer_id = db.stripe_customer_id ?? ''
      }
      return session
    }
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: profile.role
        }
      },
      allowDangerousEmailAccountLinking: true
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: profile.role
        }
      },
      allowDangerousEmailAccountLinking: true //TODO:change this is handle error if user has already an account with same email but different provider
    }),
    EmailProvider(
      //TO use Resend(https://www.resend.com)  uncomment the below
      //   {
      //   async sendVerificationRequest({ identifier: email, url, provider: { server, from } }) {
      //     await sendMagicLinkEmail(email, url)
      //   },
      //   async generateVerificationToken() {
      //     return 'magic_link_' + crypto.randomUUID()
      //   }
      // }
      {
        sendVerificationRequest: async ({ identifier: email, url, token, provider }) => {
          await sendMagicLinkFromGmail(email, url, provider)
        }
      }
    )
  ]
} as AuthOptions

export default NextAuth(authOptions)
