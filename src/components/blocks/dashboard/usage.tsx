'use client'

import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { useGlobalStore } from '@/_store/globalStore'

interface TransformedData {
  keyName: string
  count: number
}

export function UsageOverview() {
  const [loading, setLoading] = React.useState(false)
  const [apiLogs, fetchAndSetApiLogsToState] = useGlobalStore((state) => [
    state.apiState.apiLogs,
    state.apiActions.fetchAndSetApiLogsToState
  ])

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        await fetchAndSetApiLogsToState()
      } catch (error) {
        console.log(error)
        toast.error('Failed to fetch logs. Please try again.', { position: 'top-right' })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [fetchAndSetApiLogsToState])

  const transformedData: TransformedData[] = Object.values(
    apiLogs.reduce<Record<string, TransformedData>>((acc, log) => {
      const keyName = log.key_name
      const status = +log.status
      if (!acc[keyName]) {
        acc[keyName] = { keyName, count: 0 }
      }
      if (status === 200) {
        acc[keyName].count += 1
      }
      return acc
    }, {})
  )

  return (
    <ResponsiveContainer width="100%" height={420}>
      <BarChart data={transformedData}>
        <XAxis dataKey="keyName" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value: number) => value.toFixed(0)} />
        {/* <CartesianGrid strokeDasharray="1 1" /> */}
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  )
}
