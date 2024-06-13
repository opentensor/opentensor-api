'use client'

import React from 'react'
import toast, { Toaster } from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { createCheckoutSession } from '@/lib/stripe/billing'
import { Separator } from '@/components/ui/separator'

export interface Plan {
  name: string
  price: string
  description: string
  link?: string
  features: any
  priceId?: string
  interval?: string
  planType?: string
}

const plans: Plan[] = [
  {
    name: 'FREE',
    price: '0',
    description: 'Basic features',
    features: ['2 API Keys', '1,000 requests per key'],
    interval: 'free'
  },
  {
    name: 'Monthly',
    price: process.env.NEXT_PUBLIC_MONTHLY_SUB_AMOUNT!,
    description: 'Standard features',
    priceId: process.env.NEXT_PUBLIC_MONTHLY!,
    features: ['10 API Keys', '10,000 requests per key'],
    interval: 'month'
  },
  {
    name: 'Yearly',
    price: process.env.NEXT_PUBLIC_YEARLY_SUB_AMOUNT!,
    description: 'Standard features with yearly discount',
    priceId: process.env.NEXT_PUBLIC_YEARLY!,
    features: ['Unlimited Keys', '100,000 requests per key'],
    interval: 'year'
  }
]

function Plans({ planType = '' }) {
  const [selectedPlan, setSelectedPlan] = React.useState<any>()

  async function handleSubscribe() {
    try {
      const { url }: any = await createCheckoutSession(selectedPlan)
      window.location.assign(url as string)
    } catch (error) {
      console.log(error)
      toast.error('Subscription failed. Please try again.')
    }
  }

  return (
    <div className="py-6 space-y-8 w-2/3">
      {plans.map((plan) => (
        <div key={plan.name}>
          <Card
            className={`overflow-hidden relative mb-8 pt-4 items-center justify-between gap-3 flex ${selectedPlan?.name === plan.name ? 'border-slate-500' : ''}`}
          >
            <CardContent className="flex justify-between w-full gap-3">
              <RadioGroup
                value={selectedPlan?.name}
                onValueChange={() => setSelectedPlan(plan)}
                name="plans"
                className="flex items-center flex-1"
              >
                <RadioGroupItem value={plan.name} />
                <div className="ml-4">
                  <h3 className="text-lg">{plan.name}</h3>
                  <p>{`$${plan.price}`}</p>
                  <p className="text-sm text-gray-500">{plan.description}</p>
                </div>
              </RadioGroup>
              <Separator orientation="vertical" className="h-[current]" />
              <div className="flex-1 font-light text-sm tracking-wide ml-3">
                {plan.features.map((feature: string, idx: number) => (
                  <li className="list-item" key={idx + 1}>
                    {feature}
                  </li>
                ))}
              </div>
            </CardContent>
            <div
              className={`absolute top-6 right-[-56px] bg-black text-white text-xs font-bold py-1 px-20 transform rotate-[30deg] ${planType !== plan.interval ? 'hidden' : 'block'}`}
            >
              Active
            </div>
          </Card>
        </div>
      ))}
      <Button disabled={!selectedPlan || selectedPlan?.name === 'FREE'} onClick={handleSubscribe}>
        Manage
      </Button>
      <Toaster position="top-right" />
    </div>
  )
}

export default Plans
