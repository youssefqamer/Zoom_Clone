import CallList from '@/components/CallList'
import React from 'react'
import MainTitle from '@/components/MainTitle'

const Previous = () => {
  return (
    <section className='flex size-full flex-col gap-10 text-white'>
  <MainTitle title='Previous'/>
    <CallList type='ended'/>
    </section>
  )
}

export default Previous