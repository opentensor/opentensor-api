import { Images, Palette, RefreshCcwDot, Users } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { FiUsers } from 'react-icons/fi'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const Sidebar = () => {
  const icons = [
    {
      icon: <Images size={22} className="font-light" />,
      label: 'Generate',
      to: '/dashboard/apps/image-studio/vision-text-to-image'
    },
    { icon: <RefreshCcwDot size={22} />, label: 'Reimagine', to: '/dashboard/apps/image-studio/vision-image-to-image' },
    { icon: <Palette size={22} />, label: 'Inpaint', to: '/dashboard/apps/image-studio/vision-inpaint' },
    { icon: <Users size={22} />, label: 'Avatar', to: '/dashboard/apps/image-studio/vision-avatar' }
  ]

  return (
    <div className="h-[70vh] flex flex-col gap-4  justify-center text-neutral-400 dark:invert bg-white  rounded-r-lg ">
      {icons.map((item, index) => (
        <div key={index}>
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <Link href={item.to} className="hover:text-black">
                <TooltipTrigger>{item.icon}</TooltipTrigger>
                <TooltipContent side="right">
                  <div>{item.label}</div>
                </TooltipContent>
              </Link>
            </Tooltip>
          </TooltipProvider>
        </div>
      ))}
    </div>
  )
}

export default Sidebar
