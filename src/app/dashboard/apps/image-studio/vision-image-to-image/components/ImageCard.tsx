import { RotateCcw } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

interface Props {
  imgStr?: string
  isLoading?: boolean
  handleReset: any
}
const ImageCard = ({ imgStr, isLoading, handleReset }: Props) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-solid border-[#000] border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
      </div>
    )
  }
  return (
    <div className="border rounded-md border-slate-500 p-1  relative">
      <img
        src={`data:image/jpeg;base64,${imgStr}`}
        alt="generated-image"
        className="object-cover max-h-[47vh] w-[46vw]"
      />
      <RotateCcw
        size={22}
        className="text-black rounded-md absolute z-50 top-5 right-10 hover:cursor-pointer"
        onClick={handleReset}
      />
    </div>
  )
}

export default ImageCard
