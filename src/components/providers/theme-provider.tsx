'use client'

import { ThemeProvider } from 'next-themes'

export function Themeprovider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider enableSystem={false} attribute="class" themes={['light', 'dark']} defaultTheme="dark">
      {children}
    </ThemeProvider>
  )
}
