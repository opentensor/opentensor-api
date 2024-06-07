import React from 'react'

import { Separator } from '@/components/ui/separator'

import { AccountForm } from './components/form'

function Page() {
  return (
    <div className="space-y-6 flex flex-col md:w-[50%]">
      <div>
        <h3 className="text-4xl font-normal">Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings. Set your preferred language and timezone.
        </p>
      </div>
      <Separator />
      <AccountForm />
    </div>
  )
}

export default Page
