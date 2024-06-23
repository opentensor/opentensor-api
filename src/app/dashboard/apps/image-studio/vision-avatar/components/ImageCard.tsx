import Image from 'next/image'
import React, { useState } from 'react'

interface Props {
  imgStr?: string
  isLoading?: boolean
}
const ImageCard = ({ imgStr, isLoading }: Props) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-solid border-[#000] border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
      </div>
    )
  }
  return (
    <div className="border border-slate-500 p-1">
      <img src={`data:image/jpeg;base64,${imgStr}`} alt="generated-avatar" className="object-cover" />
    </div>
  )
}

export default ImageCard
