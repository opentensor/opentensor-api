'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { RiApps2Fill, RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'

import { useGlobalStore } from '@/_store/globalStore'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

function AppsLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [apiKeys, status, selectedKey, fetchAndSetApiKeysToState, setSelectedKey] = useGlobalStore((state) => [
    state.apiState.apiKeys,
    state.apiState.status,
    state.apiState.selectedKey,
    state.apiActions.fetchAndSetApiKeysToState,
    state.apiActions.setSelectedKey
  ])

  const handleBack = () => {
    router.back()
  }

  const handleForward = () => {
    router.forward()
  }

  React.useEffect(() => {
    fetchAndSetApiKeysToState()
  }, [])

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

        <div className="flex items-center gap-6">
          <div>
            <Select onValueChange={(value: string) => setSelectedKey(value)}>
              <SelectTrigger className="w-56">
                <SelectValue placeholder="Select an API key" />
              </SelectTrigger>
              <SelectContent>
                {apiKeys.map((key) => (
                  <SelectItem key={key.id} value={key.key}>
                    <div>
                      {key.key}
                      <div className="text-xs font-light flex gap-6">
                        <p>Name: {key.name}</p>
                        <p>Credits: {key.max_usage_limit - key.usage}</p>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={handleBack} className="text-xl rounded-full bg-neutral-50 ">
              <RiArrowLeftSLine className="w-8 h-8 dark:invert" />
            </button>
            <button onClick={handleForward} className="text-xl bg-neutral-50 rounded-full">
              <RiArrowRightSLine className="w-8 h-8 dark:invert" />
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-y-scroll">{children}</div>
    </section>
  )
}

export default AppsLayout
