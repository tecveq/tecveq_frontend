import React from 'react'
import IMAGES from '../assets/images'

const LargeLoader = () => {
  return (
    <div className='ml-72 h-screen flex justify-center flex-1 items-center '>
        <img src={IMAGES.logo} alt="loading image..." className='w-52 h-40 bg-contain' />
    </div>
  )
}

export default LargeLoader
