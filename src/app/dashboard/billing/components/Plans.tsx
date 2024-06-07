'use client'
import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

interface Plan {
  name: string
  price: string
  description: string
  link?: string
}

const plans: Plan[] = [
  { name: 'FREE', price: '$0/month', description: 'Basic features', link: '#' },
  {
    name: 'Monthly',
    price: `$${process.env.NEXT_PUBLIC_MONTHLY_SUB_AMOUNT}/month`,
    description: 'Standard features',
    link: `${process.env.NEXT_PUBLIC_MONTHLY_SUB_LINK}`
  },
  {
    name: 'Yearly',
    price: `$${process.env.NEXT_PUBLIC_YEARLY_SUB_AMOUNT}/year`,
    description: 'Standard features with yearly discount',
    link: `${process.env.NEXT_PUBLIC_YEARLY_SUB_LINK}`
  }
]

function Plans() {
  const [selectedPlan, setSelectedPlan] = React.useState<Plan>(plans[0])

  return (
    <div>
      <h2 className="text-xl font-semibold">Selected Plan</h2>
      {plans.map((plan) => (
        <div key={plan.name} className="mb-4">
          <Card className="mb-8 pt-4 w-96 items-center justify-between gap-3 flex">
            <CardContent>
              <RadioGroup
                value={selectedPlan.name}
                onValueChange={() => setSelectedPlan(plan)}
                name="plans"
                className="flex items-center"
              >
                <RadioGroupItem value={plan.name} />
                <div className="ml-4">
                  {/* <CardHeader></CardHeader> */}
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <p>{plan.price}</p>
                  <p className="text-sm text-gray-500">{plan.description}</p>
                </div>
                <div className={`${plan.name === 'FREE' ? 'hidden' : 'block'}`}>
                  <Button disabled={selectedPlan.name != plan.name ? true : false}>
                    <Link href={plan.link!} target="_blank">
                      Subscribe
                    </Link>
                  </Button>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  )
}

export default Plans
