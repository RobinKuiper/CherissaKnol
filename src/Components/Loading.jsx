import React from 'react'
import { BarLoader } from 'react-spinners'

export const Loading = () => {
  return (
    <>
    <div className='flex justify-center'>
      <BarLoader width={100} height={10} color={'#292929'} />
      
    </div>

    <div className='text-center text-white text-xs'>Loading neemt later minder tijd :)</div>
    </>
  )
}
