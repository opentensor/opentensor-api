import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { authOptions } from './options'

export async function getSignedInUser() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/login')
  }

  return session
}
