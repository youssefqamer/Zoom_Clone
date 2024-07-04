'use client'
import React,{useState} from 'react'
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import MeetingSetup from '@/components/MeetingSetup';
import MeetingRoom from '@/components/MeetingRoom';
import { useGetCallById } from '@/hooks/useGetCallById';
import { Loader } from 'lucide-react';

const Meeting = ({ params:{id} }: { params: { id: string } }) => {
  const {user , isLoaded}=useUser()
  const [isSetupComplete,setISetupComplete]=useState(false)
  const {call,isCallLoaading}=useGetCallById(id)
  if(!isLoaded || isCallLoaading) return <Loader/>
  return (
    <main>
      {/* streamCall tells us in which call we are  */}
        <StreamCall call={call}>
          <StreamTheme>
      {!isSetupComplete?<MeetingSetup setISetupComplete={setISetupComplete}/>:<MeetingRoom/>}
          </StreamTheme>
        </StreamCall>
    </main>
  )
}

export default Meeting