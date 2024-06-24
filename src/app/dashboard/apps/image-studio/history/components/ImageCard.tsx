import { Trash2 } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface Props {
  imgStr?: string
  isLoading?: boolean
  handleDelete?: any
}
const ImageCard = ({ imgStr, isLoading, handleDelete }: Props) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-solid border-[#000] border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
      </div>
    )
  }
  return (
    <div className="relative">
      <img
        src={`data:image/jpeg;base64,${imgStr}`}
        alt="image-studio-assets"
        className="object-cover w-[350px] h-[400px]  "
      />

      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger className="absolute z-50 top-5 right-10">
            <div onClick={handleDelete} className="hover:bg-transparent hover:text-white text-slate-500 dark:invert">
              <Trash2 size={22} />
              <TooltipContent side="right">Delete</TooltipContent>
            </div>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export default ImageCard
