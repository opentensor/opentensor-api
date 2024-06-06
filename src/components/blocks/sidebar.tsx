'use client'

import { motion, useAnimationControls } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { useEffect, useMemo, useState } from 'react'
import { BsBarChartFill, BsFillCreditCard2FrontFill, BsGear } from 'react-icons/bs'
import { FaBug, FaKey } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import { IoDocumentTextSharp } from 'react-icons/io5'
import { MdOutlineDashboard } from 'react-icons/md'

import SidebarNavigation from '../ui/sidebar-navgation'
import { ThemeToggle } from '../ui/theme-toggle'

const containerVariants = {
  close: {
    width: '5rem',
    transition: {
      type: 'spring',
      damping: 15,
      duration: 0.5
    }
  },
  open: {
    width: '16rem',
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
        href: 'https://opentensor.apidog.io/',
        icon: IoDocumentTextSharp,
        target: '_blank'
      },
      /*{
        name: 'Billing',
        href: '#',
        icon: BsFillCreditCard2FrontFill,
        active: pathname === '/dashboard/billing'
      },
      {
        name: 'Settings',
        href: '#',
        icon: BsGear,
        active: pathname === '/dashboard/settings'
      },*/
      {
        name: 'Report Bugs',
        href: '/dashboard/bugs',
        icon: FaBug,
        active: pathname === '/dashboard/bugs'
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
        className="flex flex-col z-10 gap-20 p-5 absolute top-0 left-0 h-full shadow shadow-neutral-600"
      >
        <div className="flex  flex-row w-full justify-between place-items-center ">
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
        <div>
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

          <div className="absolute bottom-10">
            <ThemeToggle />
          </div>
        </div>
        <button
          className=" text-neutral-400 hover:text-white  px-3 ease-linear absolute bottom-24"
          onClick={handleSignOut}
        >
          <FiLogOut size={20} />
        </button>
      </motion.aside>
    </>
  )
}

export default Navigation
