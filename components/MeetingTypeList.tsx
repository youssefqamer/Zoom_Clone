'use client';
import React,{useState} from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation';
import MeetingModal from './MeetingModal';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from './ui/textarea';
import DatePicker from "react-datepicker";
import { Input } from './ui/input';


const MeetingTypeList = () => {
    const [meetingState,setMeetingState]=useState<'isScheduleMeeting'|'isJoiningMeeting'|'isInstantMeeing'|'undefined'>()
    const [values,setValues]=useState({
      dateTime:new Date(),
      description:'',
      link:'',
    })
    const [callDetails, setCallDetails] = useState<Call>()
    const router=useRouter()
    const {user}=useUser()
    const { toast } = useToast()

    const client=useStreamVideoClient()
    const createMeeting=async()=>{
      if(!client||!user) return
      if(!values.dateTime){
        toast({
          title: "Please select a date and time",
        })
        return
      }
      try{
        // generate random id of 10 charachter
        const id=crypto.randomUUID()
        const call = client.call('default',id)
        if (!call) {
          throw new Error ('Failed to create a call')
        }
        const startsAt=values.dateTime.toISOString()||new Date(Date.now()).toISOString()
        const description=values.description||'Instant Meeting'
        await call.getOrCreate({
          data:{
            starts_at:startsAt,
            custom:{
              description
            }
          }
        })
        setCallDetails(call)
        if (!values.description) {
          router.push(`/meeting/${call.id}`)
        }
        toast({
          title: "Meeting Created Successfully",
        })
      }catch(err){
        toast({
          title: "Failed to Create  Meeting",
         
        })
      }
    }
    const meetingLink=`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`
  return (
    <section className='py-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 '>
    <HomeCard 
    className='bg-orange-1'
    title='New Meeting'
    description='Setup a new recording'
    img='/icons/add-meeting.svg'
    handleClick={()=>setMeetingState('isInstantMeeing')}
    />
    <HomeCard 
    className='bg-blue-1'
    title='Schedule Meeting'
    description='Plan Your Meeting'
    img='/icons/schedule.svg'
    handleClick={()=>setMeetingState('isScheduleMeeting')}
    />
    <HomeCard 
    className='bg-purple-1'
    title='View Recordings'
    description='Check Out Your Recordings'
    img='/icons/recordings.svg'
    handleClick={()=>router.push('/recordings')}
    />
    <HomeCard 
    className='bg-yellow-1'
    title='Join Meeting'
    description='Via Invitation Link'
    img='/icons/join-meeting.svg'
    handleClick={()=>setMeetingState('isJoiningMeeting')}
    />
    <MeetingModal
      isOpen={meetingState==='isInstantMeeing'}
      onClose={()=>setMeetingState('undefined')}
      title='Start an Instant Meeting'
      className='text-center'
      buttonText='Start Meeting'
      handleClick={createMeeting}
    />

<MeetingModal isOpen={meetingState==='isJoiningMeeting'}
  onClose={()=>setMeetingState('undefined')}
  title='Type the link here '
  className='text-center'
  buttonText='Join Meeting'
  handleClick={()=>router.push(`http://${values.link}`)}>
<Input placeholder='Meeting Link' className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0'
onChange={(e)=>{
  setValues({...values,link:e.target.value}),
  console.log(e.target.value)
}}/>
</MeetingModal>
    {!callDetails?<MeetingModal
      isOpen={meetingState==='isScheduleMeeting'}
      onClose={()=>setMeetingState('undefined')}
      title='Create Meeting'
      handleClick={createMeeting}
    >
      <div className='flex flex-col gap-2.5 '>
      <label htmlFor="description" className='font-[400px] text-lg text-sky-2'>Add a description</label>
      <Textarea  id='description' className='border-none focus-visible:ring-0 focus-visible:ring-offset-0  bg-dark-3' onChange={(e)=>setValues({...values,description:e.target.value})}/>
      </div>
      <div className='flex flex-col gap-2.5 '>
      <label htmlFor="date" className='font-[400px] text-lg'>Select Date & Time</label>
      <DatePicker
  selected={values.dateTime}
  onChange={(date)=>setValues({...values,dateTime:date!})}
  // By using date!, you're telling TypeScript: "I know that date might be null or undefined, but in this specific case, I'm sure it's not. Trust me, it's a Date object."
  showTimeSelect
  timeCaption="time"
  dateFormat="MMMM d, yyyy h:mm aa"
  timeFormat="HH:mm"
  timeIntervals={15}
  className='w-full rounded bg-dark-3 p-2 focus:outline-none'
/>
      </div>
      </MeetingModal>
      :<MeetingModal
    isOpen={meetingState==='isScheduleMeeting'}
    onClose={()=>setMeetingState('undefined')}
    title='Create Meeting'
    handleClick={()=>{
      navigator.clipboard.writeText(meetingLink)
      toast({title:'Link Copied'})
    }}
    className='text-center'
    img='/icons/checked.svg'
    buttonIcon='/icons/copy.svg'
    buttonText='Copy Meeting Link'
  />
  
}
    </section>
  )
}

export default MeetingTypeList