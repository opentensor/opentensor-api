import Sidebar from '@/components/blocks/sidebar'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full">
      <div className="mr-[22vh]">
        <Sidebar />
      </div>
      <div className="flex  flex-col gap-8 px-12 pt-12 h-full justify-center w-[82%] pl-[22vw] py-10">{children}</div>
    </div>
  )
}
