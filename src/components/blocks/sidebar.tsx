'use client'

import { motion, useAnimationControls } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { useEffect, useMemo, useState } from 'react'
import { BsBarChartFill, BsFillCreditCard2FrontFill, BsGear } from 'react-icons/bs'
import { FaKey } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import { IoDocumentTextSharp } from 'react-icons/io5'
import { MdOutlineDashboard } from 'react-icons/md'
import { RiFeedbackLine } from 'react-icons/ri'

import SidebarNavigation from '../ui/sidebar-navgation'
import { ThemeToggle } from '../ui/theme-toggle'

const containerVariants = {
  close: {
    width: '2.5rem',
    transition: {
      type: 'spring',
      damping: 15,
      duration: 0.5
    }
  },
  open: {
    width: '15rem',
    transition: {
      type: 'spring',
      damping: 15,
      duration: 0.5
    }
  }
}

const svgVariants = {
  close: {
    rotate: 360
  },
  open: {
    rotate: 180
  }
}

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)

  const containerControls = useAnimationControls()
  const svgControls = useAnimationControls()

  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (isOpen) {
      containerControls.start('open')
      svgControls.start('open')
    } else {
      containerControls.start('close')
      svgControls.start('close')
    }
  }, [isOpen])

  const handleOpenClose = () => {
    setIsOpen(!isOpen)
  }

  async function handleSignOut() {
    const data = await signOut({ redirect: false, callbackUrl: '/' })
    router.push(data.url)
  }

  const sideBarLinks = useMemo(
    () => [
      {
        name: 'Dashboard',
        href: '/dashboard',
        icon: MdOutlineDashboard,
        active: pathname === '/dashboard'
      },
      {
        name: 'API Keys',
        href: '/dashboard/keys',
        icon: FaKey,
        active: pathname === '/dashboard/keys'
      },
      {
        name: 'Logs and Stats',
        href: '/dashboard/logs',
        icon: BsBarChartFill,
        active: pathname === '/dashboard/logs'
      },
      {
        name: 'Docs',
        href: process.env.NEXT_PUBLIC_DOCS_LINK,
        icon: IoDocumentTextSharp,
        target: '_blank'
      },
      {
        name: 'Billing',
        href: '/dashboard/billing',
        icon: BsFillCreditCard2FrontFill,
        active: pathname === '/dashboard/billing'
      },
      {
        name: 'Settings',
        href: '/dashboard/settings',
        icon: BsGear,
        active: pathname === '/dashboard/settings'
      }
    ],
    [pathname]
  )

  return (
    <>
      <motion.aside
        variants={containerVariants}
        animate={containerControls}
        initial="close"
        className="flex flex-col justify-between gap-20 h-full overflow-hidden"
      >
        <div className="flex flex-row max-h-[40px] justify-between place-items-center ">
          <div className="dark:invert">
            <Link href={'/'}>
              <Image src="/logo.svg" alt="brand-logo" width={50} height={40} />
            </Link>
          </div>
          <button className="p-1 rounded-full flex dark:text-neutral-400" onClick={handleOpenClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={svgVariants}
                animate={svgControls}
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                transition={{
                  duration: 0.5,
                  ease: 'easeInOut'
                }}
              />
            </svg>
          </button>
        </div>
        <div className="flex-1">
          {sideBarLinks.map((item: any, idx: number) => (
            <SidebarNavigation
              key={idx + 1}
              name={item.name}
              link={item.href}
              Icon={item.icon}
              active={item.active}
              target={item.target}
            />
          ))}
        </div>

        <div className="flex flex-col max-w-[2.5rem] justify-center items-center">
          <button className=" text-neutral-400 hover:text-neutral-900 px-3 ease-linear" onClick={handleSignOut}>
            <FiLogOut size={18} />
          </button>
          <button>
            <Link
              className={`text-neutral-400 hover:text-neutral-900 px-3 ease-linear  `}
              href={process.env.NEXT_PUBLIC_FEEDBACK_LINK!}
              target="_blank"
            >
              <RiFeedbackLine size={18} />
            </Link>
          </button>
          <div className="">
            <ThemeToggle />
          </div>
        </div>
      </motion.aside>
    </>
  )
}

export default Navigation
