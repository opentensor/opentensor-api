'use client'

import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { BsBarChartFill } from 'react-icons/bs'

import { useGlobalStore } from '@/_store/globalStore'

function Page() {
  const [loading, setLoading] = React.useState(false)

  const [apiLogs, fetchAndSetApiLogsToState] = useGlobalStore((state) => [
    state.apiState.apiLogs,
    state.apiActions.fetchAndSetApiLogsToState
  ])

  function created(date: string) {
    const createdAt = new Date(date)

    return createdAt.toLocaleString()
  }

  React.useEffect(() => {
    try {
      setLoading(true)
      fetchAndSetApiLogsToState()
    } catch (error) {
      console.log(error)

      toast.error('Failed to fetch logs. Please try again.', { position: 'top-right' })
    }
    setLoading(false)
  }, [])

  return (
    <div className="flex flex-col gap-12 px-4 lg:w-[82%] md:w-[90%]">
      <Toaster />
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-3 py-4">
          <div className="flex items-center gap-3">
            <BsBarChartFill className="w-6 h-6" />
            <h1 className="text-4xl  font-normal">API Logs</h1>
          </div>
          <div className="text-xs  font-light tracking-widest">Most recent calls made using your API keys.</div>
        </div>
      </div>
      <div className="flex w-full border border-slate-500 rounded-md">
        <table className="table-fixed w-full">
          <thead className="">
            <tr className=" tracking-wider">
              <th className="py-2 px-8 text-left font-normal">Key</th>
              <th className="py-2 px-8 text-left font-normal w-[45%]">Endpoint</th>
              <th className="py-2 px-8 text-left font-normal w-[15%]">Status</th>
              <th className="py-2 px-8 text-left font-normal w-[20%]">Created</th>
            </tr>
          </thead>
          {loading ? (
            <tbody>
              <tr>
                {/* TODO:replace with skeleton loader*/}
                <td colSpan={4} className="py-6 px-8">
                  Loading...
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className=" tracking-wider">
              {apiLogs.length === 0 && (
                <tr className="border-t border-slate-500">
                  <td colSpan={4} className="py-6 px-8 text-center">
                    No API Logs to show
                  </td>
                </tr>
              )}
              {apiLogs.map((log, idx) => (
                <tr key={idx + 1} className="border-t border-slate-500">
                  <td className="py-2 px-8">{log.key_name}</td>
                  <td className="py-2 px-8">{log.endpoint}</td>
                  <td className="py-2 px-8">{log.status}</td>
                  <td className="py-2 px-8">{created(log.created_at)}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  )
}

export default Page
