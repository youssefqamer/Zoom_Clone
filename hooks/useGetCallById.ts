'use client'
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useState,useEffect } from "react"

export const useGetCallById=(id:string|string[])=>{
const [call, setCall] = useState<Call>()
const [isCallLoaading, setIsCallLoaading] = useState(true)
const client=useStreamVideoClient()
useEffect(() => {
  if(!client) return;
  const loadCall=async()=>{
    const {calls}=await client.queryCalls({
      filter_conditions:{
        id
      }
    })
    if(calls.length>0) setCall(calls[0])
      setIsCallLoaading(false)
  }
  loadCall()
}, [client,id])
return {call,isCallLoaading}
}