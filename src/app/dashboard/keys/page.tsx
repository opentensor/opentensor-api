'use client'

import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { FaKey } from 'react-icons/fa'
import { MdContentCopy, MdDelete } from 'react-icons/md'

import { ApiKey } from '@/_store/api/types'
import { useGlobalStore } from '@/_store/globalStore'
import { Button } from '@/components/ui/button'

function Page() {
  const [showModal, setShowModal] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const [apiKeys, fetchAndSetApiKeysToState, deleteApiKey] = useGlobalStore((state) => [
    state.apiState.apiKeys,
    state.apiActions.fetchAndSetApiKeysToState,
    state.apiActions.deleteApiKey
  ])

  function created(date: string) {
    const createdAt = new Date(date)
    return createdAt.toLocaleString()
  }

  React.useEffect(() => {
    try {
      setLoading(true)
      fetchAndSetApiKeysToState()
    } catch (error) {
      console.log(error)

      toast.error('Failed to fetch keys. Please try again.', { position: 'top-right' })
    }
    setLoading(false)
  }, [])

  async function deleteKey(key: ApiKey) {
    await deleteApiKey(key)
  }

  return (
    <div className="flex flex-col gap-12 px-4 lg:w-[82%] md:w-[90%]">
      <Toaster />
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-3 py-4">
          <div className="flex items-center gap-3">
            <FaKey className="w-6 h-6" />
            <h1 className="text-4xl font-[Haffer]">API Keys</h1>
          </div>
          <div className="text-xs  font-light tracking-widest">
            Calls made using Trial keys are free of charge. Trial keys are rate-limited,
            <br /> and cannot be user for commercial purposes.
          </div>
        </div>
        <div className="flex items-start py-4">
          <Button
          // className="dark:invert bg-gradient-to-b border  hover:bg-gradient-to-b from-neutral-700   text-neutral-400  border-slate-500 hover:text-white py-3 px-6 rounded-md transition duration-300"
          // onClick={() => setShowModal(true)}
          >
            Generate Key
          </Button>
        </div>
      </div>
      <div className="flex w-full border border-slate-500 rounded-md">
        <table className="table-fixed w-full">
          <thead className="">
            <tr className="tracking-wider">
              <th className="py-2 px-8 text-left font-medium w-[20%]">Name</th>
              <th className="py-2 px-8 text-left font-medium">Key</th>
              <th className="py-2 px-8 text-left font-medium w-[15%]">Credits</th>
              <th className="py-2 px-8 text-left font-medium w-[20%]">Created</th>
              <th className="py-2 px-8 text-left font-medium w-[10%]"></th>
            </tr>
          </thead>
          {loading ? (
            <tbody>
              <tr>
                {/* TODO:replace with skeleton loader*/}
                <td colSpan={4} className="py-6 px-8">
                  Please wait ....
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="tracking-wider">
              {apiKeys.length === 0 && (
                <tr className="border-t border-slate-500">
                  <td colSpan={4} className="py-6 px-8 text-center">
                    Generate API Key to get started
                  </td>
                </tr>
              )}
              {apiKeys.map((key, idx) => (
                <tr key={idx + 1} className="border-t border-slate-500">
                  <td className="py-2 px-8">{key.name}</td>
                  <td className="py-2 px-8">{key.key}</td>
                  <td className="py-2 px-8">{key.max_usage_limit - key.usage}</td>
                  <td className="py-2 px-8">{created(key.createdAt)}</td>
                  <td className="flex gap-3 p-5 items-center justify-between ">
                    <MdContentCopy size={20} className="cursor-pointer " />
                    <MdDelete size={20} className="cursor-pointer " onClick={() => deleteKey(key)} />
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      {/* <Modal isOpen={showModal} setIsOpen={setShowModal} /> */}
    </div>
  )
}

export default Page
