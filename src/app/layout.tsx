import './globals.css'

import type { Metadata } from 'next'
import { DM_Mono } from 'next/font/google'

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-mono'
})

export const metadata: Metadata = {
  title: 'Api platform',
  description: 'Created by Opentensor'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={dmMono.className}>
      <body className="flex flex-col min-h-screen w-screen dark:bg-black p-8 ">{children}</body>
    </html>
  )
}
