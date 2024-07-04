'use client';
import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
interface IHomeProps{
    className:string,
    title:string,
    description:string,
    img:string
    handleClick:()=>void,
}
const HomeCard = ({className,title,description,img,handleClick}:IHomeProps) => {
  return (
    <div className={cn('px-4 py-6 flex flex-col justify-between rounded-[14px] w-full xl-max:w-[270px] h-[260px] cursor-pointer',className)} onClick={handleClick}>
    <div className='flex-center glassmorphism size-12 rounded-[10px]'>
    <Image src={img} alt='add-meeting' width={24} height={24}/>
    </div>
    <div className='flex flex-col gap-2'>
    <h5 className='text-lg lg:text-2xl font-bold text-white'>
        {title}
    </h5>
    <p className='text-offWhite-1'>
        {description}
    </p>
    </div>  
    </div>
  )
}

export default HomeCard