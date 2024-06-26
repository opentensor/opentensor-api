import Sidebar from '@/components/blocks/sidebar'
import { Separator } from '@/components/ui/separator'
import { getSignedInUser } from '@/lib/auth/helper'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSignedInUser()

  return (
    <div className="flex h-screen p-8">
      <Sidebar />
      <Separator orientation="vertical" className="h-[current]" />
      <div className="px-24 py-12 w-full flex justify-center">{children}</div>
    </div>
  )
}
