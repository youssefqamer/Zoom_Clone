'use client'
import { DeviceSettings, VideoPreview, useCall } from '@stream-io/video-react-sdk'
import React , {useState,useEffect} from 'react'
import { Button } from './ui/button'


const MeetingSetup = ({setISetupComplete}:{setISetupComplete:(value:boolean)=>void}) => {
  const [isMicCamToggledOn, setisMicCamToggledOn] =useState (true)
  const call=useCall()
  if (!call) {
    throw new Error ('useCall must be used within streamcall component')
  }
  useEffect(()=>{
    if (isMicCamToggledOn) {
      call?.camera.disable()
      call?.microphone.disable()
    }else{
      call?.camera.enable()
      call?.microphone.enable()
    }
  },[isMicCamToggledOn,call?.camera,call?.microphone])
  return (
    <div className='h-screen w-full flex flex-col items-center justify-center gap-3 text-white'>
      <h1 className='text-2xl font-bold'> Setup Meeting</h1>
      <VideoPreview/>
      {/* toggle mic and camera  */}
      <div className='flex h-16 items-center justify-center gap-3'>
    <label className='flex items-center justify-center gap-2 font-medium'>
    <input type='checkbox' checked={isMicCamToggledOn} onChange={(e)=>setisMicCamToggledOn(e.target.checked)}/>
    join with mic and camera off
    </label>
    <DeviceSettings/>
      </div>
      <Button className='rounded-md bg-green-500 hover:bg-green-500 px-4 py-2.5' onClick={()=>{
        call.join();
        setISetupComplete(true);
      }}>
        Join Meeting
      </Button>
      </div>
      
  )
}

export default MeetingSetup