import React from 'react'
import CallList from '@/components/CallList'
import MainTitle from '@/components/MainTitle'

const Recordings = () => {
  return (
    <section className='flex size-full flex-col gap-10 text-white'>
    <MainTitle title='Recordings'/>
    <CallList type='recording'/>
    </section>
  )
}

export default Recordings