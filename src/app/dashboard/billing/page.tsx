import { getServerSession } from 'next-auth'
import React from 'react'
import { BsFillCreditCard2FrontFill } from 'react-icons/bs'

import { findActivePlan } from '@/_utils/helpers'
import { Separator } from '@/components/ui/separator'
import { authOptions } from '@/lib/auth/options'
import { getUserSubscriptions } from '@/lib/stripe/billing'

import Plans from './components/Plans'
const Page: React.FC = async () => {
  const session = await getServerSession(authOptions)
  const activePlans = await getUserSubscriptions(session?.user.stripe_customer_id!)

  const highestActivePlan = findActivePlan(activePlans.results)

  return (
    <div className="h-full flex flex-col gap-4  px-4 lg:w-[82%] md:w-[90%]">
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-3 py-4">
          <div className="flex items-center gap-3">
            <BsFillCreditCard2FrontFill className="w-6 h-6" />
            <h1 className="text-4xl font-[Haffer]">Billing</h1>
          </div>
          <div className="text-xs  font-light tracking-widest">
            Update or subscribe settings. Set your preferred subscription plan.
          </div>
        </div>
      </div>
      <Separator />
      <Plans planType={highestActivePlan} />
    </div>
  )
}

export default Page
