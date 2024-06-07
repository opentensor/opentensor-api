// import { Plan } from '@prisma/client'
import { getServerSession } from 'next-auth'
import Stripe from 'stripe'

import { authOptions } from './auth/options'
import { prisma } from './database'

export const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  apiVersion: '2024-04-10'
})

export type CompletedPlan = {
  plan: Plan
  stripe_price_monthly: Stripe.Price
  stripe_price_yearly: Stripe.Price
}

export async function isUserSubscribed(user_id: string) {
  const session = await getServerSession(authOptions)

  //   const subscriptions = await getSubscriptions(String(user?.stripe_customer_id))
  if (session) {
    const user = await prisma.user.findFirst({ where: { email: session.user?.email } })

    const subscriptions = await stripe.subscriptions.list({
      customer: String(user?.stripe_customer_id)
    })

    return {
      subscribed: subscriptions.data.length > 0,
      subscriptions: subscriptions
    }
  }
}

export async function getCustomerPortalLink(customer_id: string) {
  const portal = await stripe.billingPortal.sessions.create({
    customer: customer_id,
    return_url: process.env.NEXTAUTH_URL + '/dashboard/billing'
  })
  return portal.url
}

// export async function getSubscriptions(customer_id: string): Promise<CompletedPlan[]> {
//   const subs = (await stripe.subscriptions.list()).data
//   const plans = await prisma.plan.findMany()

//   let results: CompletedPlan[] = []

//   for (var sub of subs) {
//     if (sub.customer == customer_id) {
//       for (var item of sub.items.data) {
//         for (var plan of plans) {
//           if (item.price.id == plan.stripe_price_monthly_id || item.price.id == plan.stripe_price_yearly_id) {
//             const monthPrice = await stripe.prices.retrieve(plan.stripe_price_monthly_id)
//             const yearPrice = await stripe.prices.retrieve(plan.stripe_price_yearly_id)

//             results.push({
//               plan: plan,
//               stripe_price_monthly: monthPrice,
//               stripe_price_yearly: yearPrice
//             })
//           }
//         }
//       }
//     }
//   }

//   return results
// }

// export async function getCompletedPlans() {
//   const plans = await prisma.plan.findMany()
//   let result: CompletedPlan[] = []

//   for (var plan of plans) {
//     const month = await stripe.prices.retrieve(plan.stripe_price_monthly_id)
//     const year = await stripe.prices.retrieve(plan.stripe_price_yearly_id)

//     result.push({
//       plan: plan,
//       stripe_price_monthly: month,
//       stripe_price_yearly: year
//     })
//   }

//   result.sort((a, b) => ((a.stripe_price_monthly.unit_amount ?? 0) > (b.stripe_price_monthly.unit_amount ?? 0) ? 1 : 0))
//   return result
// }

export async function createCustomerIfNull() {
  const session = await getServerSession(authOptions)

  if (session) {
    const user = await prisma.user.findFirst({ where: { email: session.user?.email } })

    if (!user?.stripe_customer_id) {
      const customer = await stripe.customers.create({
        email: String(user?.email)
      })

      await prisma.user.update({
        where: {
          id: user?.id
        },
        data: {
          stripe_customer_id: customer.id
        }
      })
    }
    const user2 = await prisma.user.findFirst({ where: { email: session.user?.email } })
    return user2?.stripe_customer_id
  }
}
