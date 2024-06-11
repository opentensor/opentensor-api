import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { hashApiKey } from '@/_utils/apiKey'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/database'
import { stripe } from '@/lib/stripe/helper'

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const { username, name } = (await request.json()) as {
    username: string
    name: string
  }

  if (!name || !username) {
    return NextResponse.json({ success: false, error: 'Missing field' }, { status: 401 })
  }

  let customer_id = session?.user?.stripe_customer_id

  if (!customer_id) {
    const customer = await stripe.customers.create({
      email: session?.user.email,
      name: name
    })
    customer_id = customer.id
  }

  const user = await prisma.user.update({
    where: {
      email: session?.user.email
    },
    data: {
      username,
      name,
      onboarded: true,
      stripe_customer_id: customer_id
    }
  })

  return NextResponse.json({ success: true, data: user }, { status: 200 })
}
