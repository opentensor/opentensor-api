'use client'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'
import React from 'react'

import { Toggle } from '@/components/ui/toggle'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])
  return (
    <Toggle onClick={() => (theme == 'dark' ? setTheme('light') : setTheme('dark'))}>
      {mounted && theme == 'light' ? <MoonIcon height={15} width={15} /> : <SunIcon height={15} width={15} />}
    </Toggle>
  )
}
