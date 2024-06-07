import { DefaultSession, JWT } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      image: string
      role?: string
      stripe_customer_id?: string | undefined
    } & DefaultSession['user']
  }

  interface JWT {
    id: string
    name: string
    email: string
    image: string
    role: string
  }
}

// declare module 'next-auth/jwt' {
//   /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
//   interface JWT {
//     role?: string
//     token: {
//       role: string
//     }
//   }
// }
