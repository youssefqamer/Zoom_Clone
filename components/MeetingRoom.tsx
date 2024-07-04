'use client'
import React,{useState} from 'react'
import { PaginatedGridLayout, SpeakerLayout ,CallParticipantsList ,CallControls, CallStatsButton, useCallStateHooks, CallingState} from '@stream-io/video-react-sdk'
import { cn } from '@/lib/utils'
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuSeparator,DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import { LayoutList, Users } from 'lucide-react';
import { useSearchParams } from 'next/navigation'
import EndCallButton from './EndCallButton'
import Loader from './Loader'
import { useRouter } from 'next/navigation'

type CallLayOutType='grid'|'speaker-left'|'speaker-right'
const MeetingRoom = () => {
  const searchparams=useSearchParams()
  // we need a boolean value ,if we didn't use !! it will return personal or null or undefined , so we add !! to convert it to true or false , if we add ! when it is undefined it will return true ,but when we use !! it will convert undefined to !true the false 
  const isPersonalRoom=!!searchparams.get('personal')
  const [layOut,setLayOut]=useState<CallLayOutType>('speaker-left')
  const [showParticipant,setShowParticipant]=useState(false)
  const CallLayout=()=>{
    switch(layOut){
      case 'grid':
        return <PaginatedGridLayout/>
        case 'speaker-right':
          return <SpeakerLayout participantsBarPosition='left'/>
          default:
          return <SpeakerLayout participantsBarPosition='right'/>

    } 
  }
  const {useCallCallingState}=useCallStateHooks()
  const callingState=useCallCallingState()
  const router=useRouter()
  if(callingState!==CallingState.JOINED)return <Loader/>
  return (
    <section className='relative w-full h-screen overflow-hidden pt-4 text-white'>
      <div className='relative flex size-full items-center justify-center'>
      <div className=' flex size-full items-center max-w-[1000px]'>
    <CallLayout/>
      </div>
      <div className={cn('h-[calc(100vh-86px)] hidden ml-2',{'show-block':showParticipant})}>
    <CallParticipantsList onClose={()=>setShowParticipant(false)}/>
      </div>
      </div>
    <div className='fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap mb-8'>
    <CallControls onLeave={()=>{
      router.push('/')
    }}/>
    <DropdownMenu>
      <div className='flex items-center'>
      <DropdownMenuTrigger className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
        <LayoutList size={20} className='text-white'/>
      </DropdownMenuTrigger>

      </div>
      <DropdownMenuContent className='border-dark-1 text-white bg-dark-1'>
     {['Grid','Speaker-Left','Speaker-Right'].map((item,index)=>{
      return <div key={index}>
            <DropdownMenuItem className='cursor-pointer 'onClick={()=>setLayOut(item.toLowerCase() as CallLayOutType)} >{item}</DropdownMenuItem>
            <DropdownMenuSeparator className='border-white'/>
      </div>
     })}
      </DropdownMenuContent>
</DropdownMenu>
<CallStatsButton/>
<button onClick={()=>setShowParticipant((prev)=>!prev)}>
<div className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
<Users size={20} className='text-white'/>
</div>
</button>
{!isPersonalRoom&&<EndCallButton/>}
    </div>
    </section>
  )
}

export default MeetingRoom