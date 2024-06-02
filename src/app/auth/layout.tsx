import { Navbar } from '@/components/blocks/navbar'
import TermsFooter from '@/components/blocks/termsfooter'

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-between min-h-[93vh]">
      {/* <Navbar /> */}
      {children}
      <TermsFooter />
    </div>
  )
}
