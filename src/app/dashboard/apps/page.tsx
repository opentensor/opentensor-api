'use client'
import React, { useState } from 'react'

import AppSection from './components/AppSection'
import { SkeletonLoader } from './components/SkeletonLoader'

export interface AppList {
  name: string
  description: string
  imgSrc: string
  href: string
}

const appList: AppList[] = [
  {
    name: 'TAO Image-Studio',
    description: 'Image generation',
    imgSrc: 'https://corcel.b-cdn.net/082efbdd-8fac-4f99-9b1a-8232713319db.webp',
    href: '/dashboard/apps/image-studio/vision-text-to-image'
  },
  {
    name: 'BitAI Chat',
    description: 'Intelligent chatbot',
    imgSrc: 'https://aunoa.ai/wp-content/uploads/2024/05/tipos-de-chatbots.webp',
    href: '/dashboard/apps/bitAI-chat'
  },
  {
    name: 'Tensor Generate',
    description: 'AI powered Text to Image generator',
    imgSrc: 'https://assets.monica.im/tools-web/_next/static/media/imageGeneratorFeatureIntro1.9f5e7e23.webp',
    href: '/dashboard/apps/image-studio/vision-text-to-image'
  },
  {
    name: 'Reimagine',
    description: 'AI powered Image to Image generator',
    imgSrc: 'https://corcel.b-cdn.net/60ec0cbc-d5b5-4a1d-830e-898d4dbdeb6b.webp',
    href: '/dashboard/apps/image-studio/vision-image-to-image'
  },
  {
    name: 'Avatar',
    description: 'Generate your Avatar with AI',
    imgSrc: 'https://perpet.io/blog/content/images/2023/01/image-3.png',
    href: '/dashboard/apps/image-studio/vision-avatar'
  }
]

function Page() {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <section>
      <div className="">
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <>
            <AppSection items={appList} title="Latest Apps" />
            {/* <AppSection items={appList} title="Popular Apps" /> */}
          </>
        )}
      </div>
    </section>
  )
}

export default Page
