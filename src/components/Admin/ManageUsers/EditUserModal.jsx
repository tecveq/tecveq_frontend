import React, { useEffect, useState } from 'react'

import { toast } from 'react-toastify';
import { LuAsterisk } from "react-icons/lu";
import { IoCloseSharp } from "react-icons/io5";
import { useMutation } from '@tanstack/react-query';
import { updateUser } from '../../../api/Admin/UsersApi';


const InputFiled = ({ label, req, val, name, dataObj, setDataObj }) => {
    return (
        <div className='flex flex-1'>
            <div className='flex flex-col gap-2 flex-1'>
                <div className='flex'>
                    <p>{label}</p>
                    {req ? <LuAsterisk className='text-maroon' size={16} /> : <></>}
                </div>
                <div className='w-full flex-1'>
                    <input type="text" onChange={(e) => { setDataObj({ ...dataObj, [name]: e.target.value }) }} value={val} placeholder={label} className='rounded-md w-full outline-none border border-black/20 py-2 px-4' />
                </div>
            </div>
        </div>
    )
}

const EditUserModal = ({ closeModal, refetch, data }) => {
    const CustomButton = ({ label, btnClick }) => {
        return (
            <div className='flex justify-center mt-2'>
                <div onClick={btnClick} className='w-40 cursor-pointer bg-maroon rounded-3xl py-2 px-4 text-white justify-center flex items-center '>
                    <p>{label}</p>
                </div>
            </div>
        )
    }


    const [userObj, setUsrObj] = useState({
        name: data.name,
        email: data.email,
        phone: data.phoneNumber,
        gPhone: data.guardianPhoneNumber,
        gEmail: data.guardianEmail,
        gName: data.guardianName,
    });

    const handleUpdateUser = async () => {
        console.log("mutation ")
        mutation.mutate(userObj);
    }

    const mutation = useMutation({
        mutationFn: async (updateData) => {
            let result = await updateUser(updateData, data._id);
            console.log("user updatd ", result);
            await refetch();
            toast.success(`User updated successfully!`);
            return result;
        }, onSettled: async () => {
            closeModal();
        }
    });

    if (mutation.error) return <div className='ml-72 px-10 py-10 text-3xl'>Error Occured</div>

    return (
        <div className='absolute w-96 border overflow-y-auto h-screen border-black/20 z-10 bg-white right-0 top-0'>
            <div className='flex flex-col gap-2'>
                <div className=' border-b border-b-black/20'>
                    <div className='flex justify-between py-4 px-8 '>
                        <p>Edit User Profile</p>
                        <IoCloseSharp onClick={closeModal} size={20} className='cursor-pointer' />
                    </div>
                </div>
                <div className='flex flex-col gap-2 px-10 flex-1 py-4'>
                    <InputFiled label={"Occupation"} req={false} val={data.userType} dataObj={userObj} name={"occupation"} />
                    <InputFiled label={"Name"} req={true} val={userObj.name} dataObj={userObj} name={"name"} setDataObj={setUsrObj} />
                    <InputFiled label={"Email"} req={true} val={userObj.email} name={"email"} setDataObj={setUsrObj} />
                    <InputFiled label={"Phone No."} req={true} val={userObj.phone} name={"phoneNumber"} setDataObj={setUsrObj} />
                    <InputFiled label={"Enroll In."} req={true} />
                    <InputFiled label={"Guardian Name"} req={true} />
                    <InputFiled label={"Guardian Email"} req={true} />
                    <InputFiled label={"Password"} req={true} />
                    <InputFiled label={"Confirm Password"} req={true} />
                    <CustomButton label={"Update User"} btnClick={handleUpdateUser} />
                </div>
            </div>
        </div>
    )
}

export default EditUserModal
