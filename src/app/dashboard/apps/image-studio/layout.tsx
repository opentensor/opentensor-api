import React from 'react'

import Sidebar from './components/sidebar'

function ImageStudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2 h-full">
      <Sidebar />
      <div className="h-full w-full dark:bg-[url(/assets/bgtexturedark.png)] bg-[url(/assets/bgtexturelight.png)] bg-cover p-4">
        {children}
      </div>
    </div>
  )
}

export default ImageStudioLayout
