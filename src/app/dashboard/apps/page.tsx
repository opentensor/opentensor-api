import React from 'react'

import AppSection from './components/AppSection'

export interface AppList {
  name: string
  description: string
  imgSrc: string
  href: string
}

const appList: AppList[] = [
  {
    name: 'Avatar',
    description: 'Generate your Avatar with AI.',
    imgSrc: 'https://corcel.b-cdn.net/082efbdd-8fac-4f99-9b1a-8232713319db.webp',
    href: '/dashboard/apps/avatar'
  },
  {
    name: 'Chat',
    description: 'Generate your Avatar with AI.',
    imgSrc: 'https://corcel.b-cdn.net/082efbdd-8fac-4f99-9b1a-8232713319db.webp',
    href: '/dashboard/apps/chat'
  },
  {
    name: 'Image-to-Image',
    description: 'Generate your Avatar with AI.',
    imgSrc: 'https://corcel.b-cdn.net/082efbdd-8fac-4f99-9b1a-8232713319db.webp',
    href: '/dashboard/apps/'
  },
  {
    name: 'Text-to-Image',
    description: 'Generate your Avatar with AI.',
    imgSrc: 'https://corcel.b-cdn.net/082efbdd-8fac-4f99-9b1a-8232713319db.webp',
    href: '/dashboard/apps/'
  },
  {
    name: 'Avatar',
    description: 'Generate your Avatar with AI.',
    imgSrc: 'https://corcel.b-cdn.net/082efbdd-8fac-4f99-9b1a-8232713319db.webp',
    href: '/dashboard/apps/'
  },
  {
    name: 'Avatar',
    description: 'Generate your Avatar with AI.',
    imgSrc: 'https://corcel.b-cdn.net/082efbdd-8fac-4f99-9b1a-8232713319db.webp',
    href: '/dashboard/apps/'
  }
]

function Page() {
  return (
    <section>
      <div className="">
        <AppSection items={appList} title="Popular Apps" />
        <AppSection items={appList} title="Latest Apps" />
      </div>
    </section>
  )
}

export default Page
