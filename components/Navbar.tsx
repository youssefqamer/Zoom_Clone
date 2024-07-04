import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Mobilenav from './Mobilenav'
import { SignedIn, UserButton} from '@clerk/nextjs'
const Navbar = () => {
  return (
    <nav className='flex-between z-50 fixed w-full px-6 py-4 lg:px-10 bg-dark-1'>
      <Link href={'/'} className='flex items-center gap-1'>
      <Image src='/icons/logo.svg' width={32} height={32} alt='Yoom Logo' className='max-sm:size-10'/>
      <p className='text-[26px] font-extrabold text-white max-sm:hidden'>Yoom</p>
      </Link>
      <div className='flex justify-between gap-5'>
      <SignedIn>
          <UserButton  />
        </SignedIn>
    <Mobilenav/>
      </div>
    </nav>
  )
}
export default Navbar