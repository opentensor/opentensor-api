'use client'

import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { useGlobalStore } from '@/_store/globalStore'

interface TransformedData {
  endpoint: string
  status200: number
  status500: number
}

export function StatusOverview() {
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

  //TODO:move this to global state
  const transformedData: TransformedData[] = Object.values(
    apiLogs.reduce<Record<string, TransformedData>>((acc, log) => {
      const endpoint = log.endpoint
      const status = +log.status
      if (!acc[endpoint]) {
        acc[endpoint] = { endpoint, status200: 0, status500: 0 }
      }
      if (status === 200) {
        acc[endpoint].status200 += 1
      } else if (status === 500) {
        acc[endpoint].status500 += 1
      }
      return acc
    }, {})
  )

  return (
    <ResponsiveContainer width="100%" height={420}>
      <BarChart data={transformedData}>
        <XAxis dataKey="endpoint" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value: number) => value.toFixed(0)}
        />
        {/* <CartesianGrid strokeDasharray="1 1" /> */}
        <Tooltip />
        <Legend />
        <Bar dataKey="status200" fill="#82ca9d" />
        <Bar dataKey="status500" fill="#FF474C" />
      </BarChart>
    </ResponsiveContainer>
  )
}
