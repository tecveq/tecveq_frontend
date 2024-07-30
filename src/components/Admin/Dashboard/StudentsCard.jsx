import React from 'react'
import IMAGES from '../../../assets/images'

const StudentsCard = ({value, title}) => {
  return (
    <div className='py-2 px-2 bg-white rounded-md border-[1.5px] border-black/10'>
        <div className='py-2 px-2 flex gap-2 items-center'>
            <img src={IMAGES.multiusers} alt="" className='w-16 h-16' />
            <div className='flex flex-col gap-0 justify-center'>
                <p className='text-sm text-[#00000060] font-medium'>{title} </p>
                <p className='text-xl font-semibold'>{value}</p>
            </div>
        </div>
    </div>
  )
}

export default StudentsCard
