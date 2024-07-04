'use client'
import { useUser } from "@clerk/nextjs"
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"

export const useGetCalls=()=>{
    const {user}=useUser()
    const [loading,setLoading]=useState(false)
    const [calls,setCalls]=useState<Call[]>([])
    const client=useStreamVideoClient()
    useEffect(()=>{
        const loadCalls=async()=>{
            if(!client||!user?.id) return
            setLoading(true)
            // we set the setLaoding to true as this means we started to fetch the calls but we didn't get the client or the id yet 
            try{
                const {calls}=await client.queryCalls({
                    sort: [{ field: 'starts_at', direction: -1 }],
                    filter_conditions:{
                        starts_at:{$exists:true},
                        $or:[
                            //  $or Matches at least one of the values specified in an array.
                            {created_by_user_id:user?.id},
                            {members:{$in:[user?.id]}},
                            // we will show the call if we are the owner or if we are a member
                        ]
                    }
                })
                setCalls(calls)
            }catch(error){
            }finally{
                setLoading(false)
            }
        }
        loadCalls()
    },[client,user?.id])

    // differentiate between the upcoming calls and ended calls.
    const now =new Date();
    const endedCalls=calls?.filter(({state:{startsAt,endedAt}}:Call)=>{
        return (startsAt && new Date(startsAt)< now ||!!endedAt)
        // new Date(startsAt)< now  means that if it startsAt 6PM and it's now 7PM this means that the call ended
        // endedAt means that it already ended but it may return undefind so we use !! to get a boolean value
    })
    // const upComingCalls=calls?.filter(({state:{startsAt}}:Call)=>{
    //   return ( startsAt && new Date(startsAt) > now)
    // })
    const upComingCalls = calls?.filter(({ state: { startsAt } }: Call) => {
        return startsAt && new Date(startsAt) > now
      })
    return {endedCalls,upComingCalls,CallRecordings:calls,loading}
    

}