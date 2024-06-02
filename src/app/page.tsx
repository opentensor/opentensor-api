'use client'
import { Navbar } from '@/components/blocks/navbar'
import SocialsFooter from '@/components/blocks/socialsfooter'

export default function Home() {
  return (
    <main>
      <div className="flex flex-col">
        <Navbar />
        <div className="min-h-[89vh]">Homepage</div>
        <SocialsFooter />
      </div>
    </main>
  )
}
