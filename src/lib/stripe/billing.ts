'use server'
import { headers } from 'next/headers'
import { getServerSession } from 'next-auth'
import { Stripe } from 'stripe'

import { Plan } from '@/app/dashboard/billing/components/Plans'

import { authOptions } from '../auth/options'
import { prisma } from '../database'
import { formatAmountForStripe, stripe } from './helper'

export async function createCheckoutSession(data: Plan) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return
  }

  const origin: string = headers().get('origin') as string
  //TODO:move the logic of creating customer_id when user logs in
  let customerId = ''

  if (!session.user.stripe_customer_id) {
    const customer = await stripe.customers.create({
      email: session.user.email ?? '',
      name: session.user.name ?? ''
    })

    await prisma.user.update({
      where: {
        id: session.user.id
      },
      data: {
        stripe_customer_id: customer.id
      }
    })
    customerId = customer.id
  } else {
    customerId = session.user.stripe_customer_id
  }

  const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create({
    customer: session.user.stripe_customer_id,
    mode: 'subscription',
    line_items: [
      {
        quantity: 1,
        price: data.priceId
      }
    ],

    success_url: `${origin}/dashboard/billing/?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/dashboard/billing`
  })

  // const portal = await stripe.billingPortal.sessions.create({
  //   customer: '' + session?.user.stripe_customer_id,
  //   return_url: process.env.NEXTAUTH_URL + '/dashboard/billing'
  // })
  return {
    client_secret: checkoutSession.client_secret,
    url: checkoutSession.url
    // portal_url: portal.url
  }

  // return { url: portal.url }
}

export async function getCustomerPortalLink(customer_id: string) {
  const portal = await stripe.billingPortal.sessions.create({
    customer: customer_id,
    return_url: process.env.NEXTAUTH_URL + '/dashboard/billing'
  })
  return portal.url
}

export async function createPaymentIntent(data: Plan): Promise<{ client_secret: string }> {
  const paymentIntent: Stripe.PaymentIntent = await stripe.paymentIntents.create({
    amount: formatAmountForStripe(Number(data.price), process.env.CURRENCY!),
    automatic_payment_methods: { enabled: true },
    currency: process.env.CURRENCY!
  })

  return { client_secret: paymentIntent.client_secret as string }
}

export async function getUserSubscriptions(customer_id: string) {
  const subs = (await stripe.subscriptions.list()).data
  let results: any = []

  for (var sub of subs) {
    if (sub.customer == customer_id) {
      for (var item of sub.items.data) {
        const plans: any = await stripe.plans.retrieve(item.plan.id)
        results.push({ plans })
      }
    }
  }

  return { subscriptionList: subs, results }
}
