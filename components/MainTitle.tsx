import React from 'react'

const MainTitle = ({title}:{title:string}) => {
  return (
    <h1 className='text-3xl font-bold overflow-hidden'>
      {title}
    </h1>
  )
}

export default MainTitle