import CallList from '@/components/CallList'
import React from 'react'
import MainTitle from '@/components/MainTitle'

const Upcoming = () => {
  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <MainTitle title='Upcoming Meetings'/>
      <CallList type='upcoming'/>
    </section>
  )
}

export default Upcoming