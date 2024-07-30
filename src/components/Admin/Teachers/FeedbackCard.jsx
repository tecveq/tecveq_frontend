import React from 'react'
import { PiDotsThreeOutlineVerticalLight } from "react-icons/pi";
import { IoCalendarOutline } from "react-icons/io5";
import { MdOutlinePerson2 } from "react-icons/md";
import { LuClock } from "react-icons/lu";

const FeedbackCard = () => {
    return (
        <div className='bg-white border border-black/20 py-2 px-2 rounded-md '>
            <div className='py-2 px-2'>
                <div className=''>
                    <div className='flex justify-between px-2 py-2 text-sm'>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, consequatur consectetur ipsa maxime dolorum minus beatae omnis, reprehenderit ad assumenda rerum quasi earum ratione quia odio eum odit sint porro dolores. Dolorum, enim temporibus.</p>
                        <PiDotsThreeOutlineVerticalLight size={50} />
                    </div>
                    <div className='flex justify-between items-center text-xs'>
                        <div className='flex items-center gap-4'>
                            <div className='flex gap-2 items-center'>
                                <p> <IoCalendarOutline size={16} /> </p>
                                <p>Muhammad Haseeb</p>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <p><MdOutlinePerson2 size={16} /> </p>
                                <p>22nd jan, 2022</p>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <p><LuClock size={16} /> </p>
                                <p>8.30 PM</p>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <p className='flex py-1 px-6 rounded-3xl cursor-pointer bg-[#2C9B2214] text-[#2C9B22] '>Accept</p>
                            <p className='flex py-1 px-6 rounded-3xl cursor-pointer bg-[#A41D3010] text-[#A41D30] '>Reject</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeedbackCard
