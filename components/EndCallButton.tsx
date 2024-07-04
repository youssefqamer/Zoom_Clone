'use client'
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
// this button will end the  meeting if you are the owner
const EndCallButton = () => {
    const router=useRouter()
    const call=useCall()
    const {useLocalParticipant}=useCallStateHooks()
    const localParticipant=useLocalParticipant()
    // check if the userId is the same as the id of the person who created the meeting
    const isMeetingOwner=localParticipant&&call?.state.createdBy&&localParticipant.userId===call.state.createdBy.id
    if(!isMeetingOwner) return null ;//will not show the the EndCllbutton
  return (
    <Button onClick={async()=>{
        await call.endCall();
        router.push('/')
    }} className='bg-red-500 hover:bg-red-500'>
        End meeting
    </Button>
  )
}

export default EndCallButton