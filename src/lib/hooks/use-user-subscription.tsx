'use client'

import { Plan } from '@prisma/client'
import { useEffect, useState } from 'react'

import { fetchSubscriptions } from './utils'

const useUserSubscription = () => {
  const [loading, setLoading] = useState(false)
  const [subscriptions, setSubscriptions] = useState<Plan[]>([])

  useEffect(() => {
    setLoading(true)
    fetchSubscriptions().then((data) => {
      let t: Plan[] = []
      data?.map((item) => t.push(item.plan))
      setSubscriptions(t)
      setLoading(false)
    })
  }, [])

  return { loading, subscriptions }
}

export default useUserSubscription
