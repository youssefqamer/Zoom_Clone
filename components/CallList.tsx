'use client'
import { useGetCalls } from '@/hooks/useGetCalls'
import { Call, CallRecording } from '@stream-io/video-react-sdk'
import React,{useEffect,useState} from 'react'
import MeetingCard from './MeetingCard'
import Loader from './Loader'
import { useRouter } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast"
const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recording' }) => {
  const {toast}=useToast()
  const router=useRouter()
    const {endedCalls,upComingCalls,CallRecordings,loading}=useGetCalls()
    const [recordings,setRecordings]=useState<CallRecording[]>([])
    const getCalls=()=>{
        switch (type){
            case 'ended':
             return endedCalls;
            case 'upcoming':
             return upComingCalls;
            case 'recording':
             return recordings;
            default :
             return []
        }
    }
    const getNoCallsMsg=()=>{
        switch (type){
            case 'ended':
             return 'No Previous Calls ';
            case 'upcoming':
             return 'No Upcoming Calls ';
            case 'recording':
             return 'No Recordings';
            default :
             return ''
        }
    }
    const call=getCalls()
    const msg=getNoCallsMsg()
    useEffect(()=>{
      const fetchRecordings=async()=>{
  try{
      const callData=await Promise.all(CallRecordings.map((meeting)=>meeting.queryRecordings()))
      const recordings=callData.filter(call=>call.recordings.length>0).flatMap(call=>call.recordings)
      setRecordings(recordings)
      console.log(recordings)
    }catch(err){
    toast({title:'try again later'})
  }
  } 
      if(type==='recording') fetchRecordings()
        console.log(recordings)
    },[type,CallRecordings])
    if(loading) return <Loader/>
  return (
   <div className='grid grid-cols-1 xl:grid-cols-2 gap-12'>
      {call&&call?.length>0? call.map((meeting: Call | CallRecording,index)=>(
        <div   key={index}>
          <MeetingCard 
          icon={
            type==='ended'?'/icons/previous.svg':type==='upcoming'?'/icons/upcoming.svg':'/icons/recordings.svg'
          }
          title={(meeting as Call).state?.custom?.description?.substring(0,20) ||(meeting as CallRecording)?.filename?.substring(0,20)||'Personal Meeting'}
          date={(meeting as Call).state?.startsAt?.toLocaleString()||(meeting as CallRecording).start_time?.toLocaleString()}
          isPreviousMeeting={type==='ended'}
          buttonIcon1={type==='recording'?'/icons/play.svg':undefined}
          buttonText={type==='recording'?'Play':'Start'}
          handleClick={type==='recording'?()=>{
            router.push(`${(meeting as CallRecording).url}`)
          }:()=>{
            router.push(`/meeting/${(meeting as Call).id}`)
          }}
          link={type==='recording'?(meeting as CallRecording).url:`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`}
          />
        </div>
      )):(
       
        <div className='h-[calc(100vh-200px)] flex justify-center items-center  text-white text-2xl'>{msg}</div>
      )}
      </div>
  )
}

export default CallList