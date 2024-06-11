'use client'
import { DoubleArrowRightIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

import Metagraph from '@/components/blocks/metagraph/Metagraph'
import { Navbar } from '@/components/blocks/navbar'

export default function Home() {
  return (
    <main>
      <div className="flex flex-col p-8">
        <Navbar />
        <div className="h-[89vh]">
          <div className="flex items-center justify-center h-full">
            <Metagraph />
          </div>
        </div>
        <Link href={'/about'} className="flex gap-2 items-center justify-center text-xs tracking-wider hover:underline">
          LEARN MORE
          <DoubleArrowRightIcon className="h-3 w-3" />
        </Link>
      </div>
    </main>
  )
}
