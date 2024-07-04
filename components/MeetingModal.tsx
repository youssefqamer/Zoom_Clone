'use client'
import React, { ReactNode } from 'react'
import {Dialog,DialogContent,} from "@/components/ui/dialog"
  import Image from 'next/image'
  import { cn } from '@/lib/utils'
import { Button } from './ui/button'

interface IMeetingModalProps{
isOpen:boolean
onClose:()=>void
buttonText?:string
img?:string
buttonIcon?:string
className?:string
children?:ReactNode
title:string
handleClick:()=>void
}
const MeetingModal = ({isOpen,onClose,img,buttonText,handleClick,className,title,children,buttonIcon}:IMeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className='flex flex-col gap-6 w-full  max-w-[520px] rounded-[14px] py-9 px-6 bg-dark-1 text-white border-none'>
        <div className='flex flex-col gap-6'>
    {img&&(
        <div className='flex justify-center'>
            <Image src={img} alt='image' width={72} height={72}/>
        </div>
    )}
    <h1 className={cn('text-3xl font-bold leading-[42px]',className)}>{title}</h1>
        </div>
        {children}
        <Button className='bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0 hover:bg-blue-1' onClick={handleClick}>
        {buttonIcon&&(
            <Image src={buttonIcon} alt='buttonIcon' width={13} height={13}/>
        )} &nbsp;
            {buttonText||'Schedule Meeting'}
        </Button>
    </DialogContent>
  </Dialog>
  
  )
}

export default MeetingModal