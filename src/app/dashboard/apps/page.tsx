import React from 'react'
import { RiApps2Fill } from 'react-icons/ri'

function Page() {
  return (
    <div className="flex flex-col gap-12 px-4 lg:w-[82%] md:w-[90%]">
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-3 py-4">
          <div className="flex items-center gap-3">
            <RiApps2Fill className="w-6 h-6" />
            <h1 className="text-4xl  font-normal">App Center</h1>
          </div>
          <div className="text-xs  font-light tracking-widest">Discover latest apps.</div>
        </div>
      </div>
      <div className="flex w-full h-full rounded-md">Coming soon...</div>
    </div>
  )
}

export default Page
