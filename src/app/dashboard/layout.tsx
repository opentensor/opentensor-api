import Sidebar from '@/components/blocks/sidebar'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full">
      <div className="">
        <Sidebar />
      </div>
      <div className="flex w-full flex-col gap-8 md:pl-[22vw] pl-12 pt-12  justify-center ">{children}</div>
    </div>
  )
}
