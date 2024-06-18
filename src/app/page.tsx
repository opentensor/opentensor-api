'use client'
import { DoubleArrowRightIcon } from '@radix-ui/react-icons'
import { useAnimate } from 'framer-motion'
import Link from 'next/link'
import { TypeAnimation } from 'react-type-animation'

import { Canvas } from '@/components/blocks/metagraph/Canvas'
import { Navbar } from '@/components/blocks/navbar'

export default function Home() {
  const [scope, animate] = useAnimate()
  return (
    <main>
      <div className="flex flex-col p-8">
        <Navbar />

        <div className="flex flex-col items-center h-[89vh]">
          <div className="w-full z-0 justify-center flex flex-col items-center h-full">
            <Canvas />
          </div>
          <div>
            <TypeAnimation
              sequence={[
                process.env.NEXT_PUBLIC_HOMEPAGE_TEXT!,
                () => {
                  if (scope.current) {
                    animate(scope.current, { opacity: 1 }, { duration: 0.6, delay: 0.1, ease: 'easeIn' })
                  }
                }
              ]}
              wrapper="span"
              cursor={true}
              style={{ whiteSpace: 'pre-line', display: 'inline-block', height: 60, fontSize: '12px' }}
              speed={85}
            />
          </div>
          <Link
            href={'/about'}
            className="flex gap-2 items-center justify-center text-xs tracking-wider hover:underline"
          >
            LEARN MORE
            <DoubleArrowRightIcon className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </main>
  )
}
