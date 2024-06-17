import React from 'react'
import { BsGear } from 'react-icons/bs'

import { AccountForm } from './components/form'

function Page() {
  return (
    <div className="flex flex-col gap-4 px-4 lg:w-[85%] md:w-[90%]">
      <div className="flex flex-col justify-between">
        <div className="flex flex-col md:w-[50%] gap-3">
          <div className="flex items-center gap-3">
            <BsGear className="w-6 h-6" />
            <h1 className="text-4xl font-[Haffer]">Account</h1>
          </div>
          <div className="text-xs  font-light tracking-widest">
            Update your account settings. Set your preferred profile image.
          </div>
        </div>
      </div>
      <AccountForm />
    </div>
  )
}

export default Page
