import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const links = [
  { name: 'Home', href: '/' },
  { name: 'Popular', href: '/popular' },
  { name: 'Top Rated', href: '/top_rated' },
  { name: 'Upcoming', href: '/upcoming' },
]

const NavLinks = () => {
  return (
    <div className='flex justify-center items-center *:w-[150px] *:text-center
    *:p-4 *:m-1 *:bg-gray-800 *:text-white *:rounded-lg'>
      {
        links.map(link => 
          <Link 
          title={link.name}
          key={link.name}
          href={link.href}>
            {link.name}
          </Link>
        )
      }
    </div>
  )
}

export default NavLinks