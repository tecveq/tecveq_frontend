import React from 'react'
import IMAGES from '../../../assets/images'

const ActivityCard = () => {
  return (
    <div className='px-2 py-2 bg-white rounded-md border border-black/10 flex-1'>
      <div className='px-2 py-2'>
        <div className='flex gap-2 items-center'>
            <img src={IMAGES.history} alt=""  className='w-10 h-10'/>
            <div className=''>
                <div className='flex flex-col gap-1'>
                    <p className='font-medium'>Activity</p>
                    <div className='flex gap-2'>
                    <p className='text-black/50 text-xs'><span className='text-black font-medium'>Login Date:</span> 28 th Feb, 2022 </p>
                    <p className='text-black/50 text-xs'><span className='text-black font-medium'>Login Time:</span> 8:30 AM </p>
                    <p className='text-black/50 text-xs'><span className='text-black font-medium'>Device:</span> Desktop-1xp </p>
                    <p className='text-black/50 text-xs'><span className='text-black font-medium'>Browser:</span> Google Chrome </p>
                    <p className='text-black/50 text-xs'><span className='text-black font-medium'>Usage:</span> 2hr 26mins </p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ActivityCard
