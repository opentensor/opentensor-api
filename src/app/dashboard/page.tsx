'use client'
import { useSession } from 'next-auth/react'
import React from 'react'

function Page() {
  const { data: session } = useSession()
  
  return (
    <div>
      <h1 className="text-2xl">{`Welcome back, ${session?.user?.name || session?.user?.email || ''}`}</h1>
    </div>
  )
}

export default Page
