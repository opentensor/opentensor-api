'use client'

import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'

import { cn } from '@/_utils/cn'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export function Navbar() {
  return (
    <header className="flex items-center justify-between">
      <div>
        <Image src={'/logo.svg'} width={36} height={24} alt="brand-logo" className="dark:invert" />
      </div>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>EXPLORE</NavigationMenuTrigger>
            <NavigationMenuContent className="left-[0.5rem]">
              <ul className="flex flex-col w-[80px] gap-3 p-4 font-normal text-xs">
                <Link href={'/about'} className="hover:cursor-pointer hover:underline">
                  ABOUT
                </Link>
                <Link
                  href={process.env.NEXT_PUBLIC_BLOG_LINK!}
                  target="_blank"
                  className="hover:cursor-pointer hover:underline"
                >
                  BLOG
                </Link>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href={process.env.NEXT_PUBLIC_DOCS_LINK!} target="_blank">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>DOCS</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>CONNECT</NavigationMenuTrigger>
            <NavigationMenuContent className="left-[10.5rem]">
              <ul className="flex flex-col w-[270px] gap-3 p-4 font-normal text-xs">
                <Link
                  href={process.env.NEXT_PUBLIC_GITHUB_LINK!}
                  target="_blank"
                  className="hover:cursor-pointer hover:underline"
                >
                  GITHUB
                </Link>
                <Link
                  href={process.env.NEXT_PUBLIC_DISCORD_LINK!}
                  target="_blank"
                  className="hover:cursor-pointer hover:underline"
                >
                  DISCORD
                </Link>
                <Link
                  href={process.env.NEXT_PUBLIC_TWITTER_LINK!}
                  target="_blank"
                  className="hover:cursor-pointer hover:underline"
                >
                  X(Twitter)
                </Link>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <NavigationMenu>
        <div>
          <Link href="/auth/login" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Login</NavigationMenuLink>
          </Link>
        </div>

        <div>
          <ThemeToggle />
        </div>
      </NavigationMenu>
    </header>
  )
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  }
)
ListItem.displayName = 'ListItem'
