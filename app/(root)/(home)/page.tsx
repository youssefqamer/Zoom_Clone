import MainTitle from '@/components/MainTitle'
import MeetingTypeList from '@/components/MeetingTypeList'
import React from 'react'


const Home = () => {
  const time=new Date()
  const now=time.toLocaleTimeString('en-us',{hour:'2-digit',minute:'2-digit'})
  const date=(new Intl.DateTimeFormat('en-Us',{dateStyle:'full'})).format(time)
  return (
 <section>
      {/* <MainTitle title={'Home'}/> */}
      <div className='h-[303px] w-full rounded-[20px] bg-hero bg-cover text-white'>
    <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-10'>
    <h2 className='glassmorphism rounded-[4px] w-[273px] py-[10px] px-[14px] h-[42px]text-center text-base font-normal'>Upcoming Meeting at: 12.30 PM </h2>
    <div className='flex flex-col gap-2'>
    <h1 className='text-4xl font-extrabold lg:text-7xl'>
      {/* 11.30 AM */}
      {now}
      </h1>
    <p className='text-lg lg:text-2xl font-semibold text-sky-1'>
      {date}
    </p>
    </div>
    </div>
      </div>
      <MeetingTypeList/>
    </section>
  )
}

export default Home