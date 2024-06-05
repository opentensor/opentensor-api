'use client'

import { useTheme } from 'next-themes'
import React from 'react'

import WebGLCanvas from './WebGLCanvas'

function Metagraph() {
  const { theme } = useTheme()
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [theme])

  return <div className="">{isMounted && <WebGLCanvas />}</div>
}
export default Metagraph
