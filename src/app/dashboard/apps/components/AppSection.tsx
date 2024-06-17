'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { FaGooglePlay } from 'react-icons/fa'

import { Card, CardContent, CardFooter } from '@/components/ui/card'

import { AppList } from '../page'

interface AppSectionProps {
  items: AppList[]
  title: string
}

const AppSection: React.FC<AppSectionProps> = ({ items, title }) => {
  const [showAll, setShowAll] = useState(false)
  const displayItems = showAll ? items : items.slice(0, 4)

  return (
    <div className="py-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-light">{title}</h2>
        <button onClick={() => setShowAll(!showAll)} className="hover:underline text-xs font-light">
          {showAll ? 'Show Less' : 'Show All'}
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayItems.map((item) => (
          <Card key={item.name} className="relative hover:shadow-lg transition-shadow duration-300">
            <img src={item.imgSrc} alt={item.name} className="w-full h-56 object-cover rounded-t" />
            <CardContent className="p-4">
              <h3 className="text-lg font-normal">{item.name}</h3>
              <p className="text-xs  text-gray-500">{item.description}</p>
            </CardContent>
            <Link href={item.href}>
              <CardFooter className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black bg-opacity-50 transition-opacity duration-300">
                <FaGooglePlay className="text-neutral-50 w-8 h-8" />
              </CardFooter>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default AppSection
