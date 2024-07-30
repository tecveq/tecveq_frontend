import React, { useState } from 'react'
import profile from "../../../assets/profile.png"
import { IoSend } from "react-icons/io5";

const TeacherMessageDialog = ({ handleFeedback, item }) => {

    const [feedback, setFeedback] = useState("");
    const [msgText, setMsgText] = useState("");

    const handleSendMessage = () => {
        
    }
    const handleSendFeedback = () => {

    }


    return (
        <div className='fixed z-10 flex py-4 bg-white rounded-lg shadow-lg top-40 w-72'>
            <div className='flex flex-col w-full'>
                <div className='flex items-center gap-4 px-5 py-4 border-b border-b-black/30'>
                    <img src={profile} alt="" className='w-16 h-16' />
                    <div className='flex flex-col'>
                        <p className='font-medium text-black'>{item?.teacher}</p>
                        <p className='text-sm text-black/70'>Instructor</p>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center gap-3 py-2'>
                    <div className='flex w-full items-center justify-center gap-2'>
                        <input
                            type="text"
                            value={msgText}
                            placeholder='Send Quick Message'
                            onChange={(e) => setMsgText(e.target.value)}
                            className='w-4/5 px-2 py-1 rounded-md outline-none bg-[#919191]/10 text-[#919191] text-[12px]'
                        />
                        <IoSend size={18} onClick={handleSendMessage} className='cursor-pointer' color='maroon' />
                    </div>
                    <div className='flex w-full items-center justify-center flex-row px-4 gap-2'>
                        <input
                            type="text"
                            value={feedback}
                            placeholder='Enter Feedback'
                            onChange={(e) => setFeedback(e.target.value)}
                            className='px-2 py-1 w-full rounded-md outline-none bg-[#919191]/10 text-[#919191] text-[12px]'
                        />
                        <IoSend size={20} onClick={handleSendFeedback} className='cursor-pointer' color='maroon' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherMessageDialog