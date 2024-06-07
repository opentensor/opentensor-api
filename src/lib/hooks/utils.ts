'use server'

import { getSignedInUser } from '../auth/helper'
import { getSubscriptions } from '../billing'

export async function fetchSubscriptions() {
  const session = await getSignedInUser()
  if (session.user.stripe_customer_id) {
    return await getSubscriptions(session.user.stripe_customer_id)
  }
}
