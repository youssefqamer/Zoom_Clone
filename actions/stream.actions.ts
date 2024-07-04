'use server'

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_Api_KEY;
const secretKey=process.env.STREAM_SECRET_KEY
export const tokenProvider=async()=>{
  const user=await currentUser()
    if(!user) throw new Error ('User is not logged in')
    if(!apiKey) throw new Error ('No Api Key')
    if(!secretKey) throw new Error ('No Secret Key')
        const client=new StreamClient(apiKey,secretKey)
    const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
    // make the token valid for 1 hour
    const issued =Math.floor(Date.now() / 1000) -60
    // tell us when the token had been generated (1 minute ago)
    // we divide by 1000 to conert from millisecond to seconds
    const token =client.createToken(user.id,exp,issued)
    return token
}