import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: string
      username: string
      email: string
      image: string
      role?: string
      stripe_customer_id?: string | undefined
    } & DefaultSession['user']
  }
}
