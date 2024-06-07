import Link from 'next/link'
import { getServerSession } from 'next-auth'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { authOptions } from '@/lib/auth/options'
import { createCustomerIfNull, getCustomerPortalLink } from '@/lib/billing'
import { prisma } from '@/lib/database'

import Plans from './components/Plans'

const Page: React.FC = async () => {
  const session = await getServerSession(authOptions)

  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email
    }
  })

  return (
    <div className="p-8">
      <Plans />
    </div>
  )
}

export default Page
