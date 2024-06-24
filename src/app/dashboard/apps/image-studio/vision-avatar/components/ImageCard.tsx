import { CloudUpload, RotateCcw } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface Props {
  imgStr?: string
  isLoading?: boolean
  handleReset: any
  handleUpload: any
}
const ImageCard = ({ imgStr, isLoading, handleReset, handleUpload }: Props) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-solid border-[#000] border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
      </div>
    )
  }
  return (
    <div className="border border-slate-500 p-1  relative">
      <img src={`data:image/jpeg;base64,${imgStr}`} alt="generated-avatar" className="object-cover max-h-[68vh]" />

      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger className="absolute z-50 top-5 right-10">
            <div onClick={handleReset} className="hover:bg-transparent hover:text-white text-slate-500 dark:invert">
              <RotateCcw size={22} />
              <TooltipContent side="right">Reset</TooltipContent>
            </div>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger className="absolute z-50 top-5 right-24 ">
            <div onClick={handleUpload} className="hover:bg-transparent hover:text-white text-slate-500 dark:invert">
              <CloudUpload size={22} />
              <TooltipContent side="right">Save to cloud</TooltipContent>
            </div>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export default ImageCard
