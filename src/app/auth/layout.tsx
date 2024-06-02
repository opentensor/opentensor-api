import { Navbar } from '@/components/blocks/navbar'

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}
