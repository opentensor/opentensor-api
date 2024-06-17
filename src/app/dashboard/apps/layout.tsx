'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { RiApps2Fill, RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'

function AppsLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  const handleForward = () => {
    router.forward()
  }
  return (
    <section className="flex flex-col gap-4 px-4 lg:w-[85%] md:w-[90%]">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <RiApps2Fill className="w-6 h-6" />
            <h1 className="text-4xl  font-[Haffer]">App Center</h1>
          </div>
          <div className="text-xs  font-light tracking-widest">Discover latest apps</div>
        </div>
        <div className="flex gap-3">
          <button onClick={handleBack} className="text-xl rounded-full bg-neutral-50 ">
            <RiArrowLeftSLine className="w-8 h-8 dark:invert" />
          </button>
          <button onClick={handleForward} className="text-xl bg-neutral-50 rounded-full">
            <RiArrowRightSLine className="w-8 h-8 dark:invert" />
          </button>
        </div>
      </div>
      <div className="overflow-y-scroll">{children}</div>
    </section>
  )
}

export default AppsLayout
