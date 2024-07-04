import type { Metadata } from "next";
import Stream from '@/providers/StreamClientprovider'
import React, { ReactNode } from 'react'
export const metadata: Metadata = {
  title: "Zoom Clone",
  description: "Video calling app",
  icons:{
    icon:'/icons/logo.svg'
  }
};
const RootLayout = ({children}:{children:ReactNode}) => {
  
  return (
    <main>
      <Stream>
        {children}
      </Stream>
    </main>
  )
}

export default RootLayout