import React from 'react'

import { Separator } from '@/components/ui/separator'

import { AccountForm } from './components/form'

function Page() {
  return (
    <div className="flex flex-col gap-4 px-4 lg:w-[82%] md:w-[90%]">
      <div className="space-y-6 flex flex-col md:w-[50%]">
        <h3 className="text-4xl font-normal">Account</h3>
        <p className="text-sm text-muted-foreground">Update your account settings. Set your preferred profile image.</p>
      </div>
      <Separator />
      <AccountForm />
    </div>
  )
}

export default Page
