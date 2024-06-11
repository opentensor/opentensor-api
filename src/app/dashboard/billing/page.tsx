import React from 'react'

import Plans from './components/Plans'
import { Separator } from '@/components/ui/separator'
import { BsFillCreditCard2FrontFill } from 'react-icons/bs'
const Page: React.FC = async () => {
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
      <Plans />
    </div>
  )
}

export default Page
