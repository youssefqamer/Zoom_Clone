'use client'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import React from 'react'
import { useToast } from "@/components/ui/use-toast"
import { useGetCallById } from '@/hooks/useGetCallById'
import {  useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation'
import MainTitle from '@/components/MainTitle'

// this page is like an instant meeting
interface ITable{
  title:string,
  description:string
}
const Table=({title,description}:ITable)=>{
 return( <div className='flex flex-col items-start gap-2 xl:flex-row'>
    <h1 className='text-base font-medium text-sky-1 lg:text-xl xl:min-w-40'>{title}:</h1>
    <h4 className='truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl'>{description}:</h4>
  </div>)
}
const Personal = () => {
  const router=useRouter()
  const {toast}=useToast()
  const {user}=useUser()
  const meetingId=user?.id
  const meetingLink=`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`
  const {call} =useGetCallById(meetingId!)
  const client=useStreamVideoClient()
  const startRoom=async()=>{
    if(!user || !client) return
   if(!call){
    const newCall=client.call('default',meetingId!)
    await newCall.getOrCreate({
      data:{
        starts_at:new Date().toISOString(),
      }
    })
   }
   router.push(`/meeting/${meetingId}?personal=true`)
  }
  return (
    <section className='flex size-full flex-col gap-10 text-white'>
    <MainTitle title='Personal Meeting'/>
    <div className='flex flex-col w-full gap-8 xl:max-w-[900px]'>
    <Table title='Topic' description={`${user?.username}'s meeting room`}/>
    <Table title='Meeting ID' description={meetingId!}/>
    <Table title='Meeting Link' description={meetingLink}/>
    </div>
    <div className='flex gap-5'>
    <Button className='bg-blue-1 hover:bg-blue-1' onClick={startRoom}>
    Start Meeting
      </Button>
    <Button className='bg-dark-3 hover:bg-dark-3' onClick={()=>{
      navigator.clipboard.writeText(meetingLink)
      toast({title:'Link Copied'})
    }}>
    Copy Invitation
      </Button>
    </div>
    </section>
  )
}

export default Personal