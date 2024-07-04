import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {ClerkProvider} from '@clerk/nextjs'
import { Toaster } from "@/components/ui/toaster"
import '@stream-io/video-react-sdk/dist/css/styles.css';
import "react-datepicker/dist/react-datepicker.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zoom Clone",
  description: "Video calling app",
  icons:{
    icon:'/icons/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{
      layout:{
        logoImageUrl:'/icons/yoom-logo.svg',
        socialButtonsVariant:'iconButton',
      },
      variables:{
        colorText:'#fff',
        colorPrimary:'#0E78F9',
        colorBackground:'#1c1f2e',
        colorInputText:'#fff',
        colorInputBackground:'#252a41',
      }
    }}>
    <html lang="en">
      <body className={`${inter.className} bg-dark-2 `}>
        {children}
        <Toaster />

        </body>
    </html>
    </ClerkProvider>
  );
}
