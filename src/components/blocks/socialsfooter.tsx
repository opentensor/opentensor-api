import Link from 'next/link'
import React from 'react'

function SocialsFooter() {
  return (
    <div className="flex w-full h-[3vh] items-center justify-center text-xs gap-4">
      <Link href={process.env.NEXT_PUBLIC_GITHUB_LINK!} target="_blank" className="hover:underline">
        GITHUB
      </Link>
      <Link href={process.env.NEXT_PUBLIC_DISCORD_LINK!} target="_blank" className="hover:underline">
        DISCORD
      </Link>
      <Link href={process.env.NEXT_PUBLIC_TWITTER_LINK!} target="_blank" className="hover:underline">
        X(TWITTER)
      </Link>
    </div>
  )
}

export default SocialsFooter
