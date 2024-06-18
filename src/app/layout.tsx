import './globals.css'

import type { Metadata } from 'next'
import { DM_Mono } from 'next/font/google'
import { Suspense } from 'react'

import { AuthProvider } from '@/components/providers/auth-provider'
import { Themeprovider } from '@/components/providers/theme-provider'

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-mono'
})

export const metadata: Metadata = {
  title: 'OTF PaaS Template',
  description: 'Created by Opentensor Foundation',
  icons: '/favicon.ico'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={dmMono.className}>
      <body className="min-h-screen w-screen dark:bg-black">
        <AuthProvider>
          <Suspense>
            <Themeprovider>{children}</Themeprovider>
          </Suspense>
        </AuthProvider>
      </body>
    </html>
  )
}
