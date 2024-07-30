import React, { useState } from 'react'
import Loader from '../../../utils/Loader';
import IMAGES from '../../../assets/images';

import { toast } from 'react-toastify';
import { FaAsterisk } from 'react-icons/fa6';
import { IoCloseSharp } from "react-icons/io5";
import { uploadFile } from '../../../utils/FileUpload';
import { default_profile } from '../../../constants/api';
import { useAdmin } from '../../../context/AdminContext';
import { registerStudent } from '../../../api/Student/StudentApis';
import { experience, qualification } from '../../../constants/teacher';


const AddUserModal = ({ closeModal, refetch }) => {

    const CustomInput = ({ label, placeholder, type }) => {
        return (
            <div className='flex flex-col text-start py-1'>
                <div className='flex flex-col gap-1'>
                    <div className='font-medium flex gap-1'>
                        <p>
                            {label}
                        </p>
                        <p className='font-normal'>
                            <FaAsterisk size={6} color='red' className='mt-1' />
                        </p>
                    </div>
                    <div>
                        <input
                            className={`border outline-none rounded-md border-black/20 px-4 w-full py-[8px] `}
                            required
                            type={type}
                            placeholder={placeholder}
                        />
                    </div>
                </div>
            </div>
        )
    }

    const Selectable = ({ label }) => {
        return (
            <div className='flex flex-col text-start py-1'>
                <div className='flex flex-col gap-1'>
                    <div className='font-medium '>
                        {label}
                    </div>
                    <div>
                        <select value={role} onChange={(e) => { setRole(e.target.value) }} className='border outline-none rounded-md border-black/20 px-4 w-full py-[8px]'>
                            <option value="student">Studnet</option>
                            {/* <option value="parent">Parent</option> */}
                            <option value="teacher">Teacher</option>
                        </select>
                    </div>
                </div>
            </div>
        )
    }

    const LevelSelectable = ({ label, alllevels }) => {
        return (
            <div className='flex flex-col text-start py-1'>
                <div className='flex flex-col gap-1'>
                    <div className='font-medium flex gap-1'>
                        <p>
                            {label}
                        </p>
                        <p className='font-normal'>
                            <FaAsterisk size={6} color='red' className='mt-1' />
                        </p>
                    </div>
                    <div>
                        <select className='border outline-none rounded-md border-black/20 px-4 w-full py-[8px]'>
                            <option value="">Enroll in</option>
                            {alllevels.map((item) => {
                                return <option value={JSON.stringify(item)}>{item.name}</option>
                            })}
                        </select>
                    </div>
                </div>
            </div>
        )
    }

    const CustomSelectable = ({ label, options }) => {
        return (
            <div className='flex flex-col text-start py-1'>
                <div className='flex flex-col gap-1'>
                    <div className='font-medium flex gap-1'>
                        <p>
                            {label}
                        </p>
                        <p className='font-normal'>
                            <FaAsterisk size={6} color='red' className='mt-1' />
                        </p>
                    </div>
                    <div>
                        <select className='border outline-none rounded-md border-black/20 px-4 w-full py-[8px]'>
                            <option value="">Select {label} </option>
                            {options.map((item) => {
                                return <option value={item}>{item}</option>
                            })}
                        </select>
                    </div>
                </div>
            </div>
        )
    }


    const CustomFileSelector = ({ label }) => {
        return <div className="flex flex-col gap-2">
            <p className="font-semibold">{label}</p>
            <div className="flex border border-black/20 rounded-lg px-6 py-4 flex-col text-xs justify-center items-center">
                <input
                    type="file"
                    className="hidden"
                    id="cv"
                />
                <label htmlFor="cv">
                    <img
                        src={IMAGES.upload}
                        className="w-8 h-8 cursor-pointer"
                    />
                </label>
                <p className="text-maroon font-medium text-[10px] text-center">Click to Upload <span className='text-black font-normal'>drag and drop you CV</span> </p>
                <p className='text-[10px]'>PNG, JPG, Word or PDF</p>
            </div>
        </div>
    }

    const { allLevels } = useAdmin();
    const [role, setRole] = useState("student");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let dataBody = {};
            console.log("after form submit here : ", e);

            if (role == "parent") {
                dataBody = {
                    role,
                    sName: e.target[1].value,
                    sID: e.target[2].value,
                    password: e.target[3].value,
                    profilePic: default_profile
                }
            } else if (role == "student") {
                dataBody = {
                    userType: role,
                    name: e.target[1].value,
                    email: e.target[2].value,
                    phoneNumber: e.target[3].value,
                    levelID: JSON.parse(e.target[4].value)._id,
                    guardianName: e.target[5].value,
                    guardianEmail: e.target[6].value,
                    guardianPhoneNumber: e.target[7].value,
                    password: e.target[8].value,
                    profilePic: default_profile
                }
                const response = await registerStudent(dataBody);
                console.log("after register user is : ", response);
            } else {
                console.log("teacher form is : ", e);
                let cvurl = "cv url here",
                dataBody = {
                    userType: role,
                    name: e.target[1].value,
                    email: e.target[2].value,
                    phoneNumber: e.target[3].value,
                    qualification: e.target[4].value,
                    cv: cvurl,
                    experience: e.target[6].value,
                    password: e.target[7].value,
                    profilePic: default_profile
                }
                cvurl = await uploadFile(e.target[5].files[0], "CV");
                dataBody.cv = cvurl;
                const response = await registerStudent(dataBody);
                console.log("after register user is : ", response);
            }

            toast.success("User added successfully");
            await refetch();
            closeModal();
        } catch (error) {
            console.log("error in student login UI screen is : ", error);
            toast.success("Cannot add the user!");
        }
        setLoading(false);
    }

    return (
        <div className='absolute w-96 border h-screen border-black/20 z-10 bg-white right-0 top-0'>
            <div className='flex flex-col gap-2 h-full'>
                <div className=' border-b border-b-black/20'>
                    <div className='flex justify-between py-4 px-8'>
                        <p>Add User</p>
                        <IoCloseSharp onClick={closeModal} size={20} className='cursor-pointer' />
                    </div>
                </div>

                <div className='overflow-y-auto register-scrollbar'>
                    <div className='flex flex-col bg-white h-full px-10 py-4'>
                        <form onSubmit={handleSubmit}>
                            <div className=''>
                                <Selectable label={"Occupation"} />
                                {role == "student" ?
                                    <>
                                        <CustomInput label={"Name"} type="text" placeholder={"Enter your Name"} />
                                        <CustomInput label={"Email"} type="email" placeholder={"Enter your Email"} />
                                        <CustomInput label={"Phone no."} type="text" placeholder={"Enter your Phone Number"} />
                                        <LevelSelectable label={"Enroll in"} alllevels={allLevels} />
                                        <CustomInput label={"Guardian Name"} type="text" placeholder={"Enter Guardian Name"} />
                                        <CustomInput label={"Guardian Email"} type="email" placeholder={"Enter Guardian Email"} />
                                        <CustomInput label={"Guardian Phone no."} type="text" placeholder={"Enter Guardian Phone no."} />
                                        <CustomInput label={"Password"} type="password" placeholder={"Enter your Password"} />
                                        <CustomInput label={"Confirm Password"} type="password" placeholder={"Confirm your Password"} />
                                    </>
                                    : role == "parent" ? <>
                                        <CustomInput label={"Student Name"} type="text" placeholder={"Enter student Name"} />
                                        <CustomInput label={"Student ID"} type="text" placeholder={"Enter student ID"} />
                                        <CustomInput label={"Password"} type="password" placeholder={"Enter your Password"} />
                                        <CustomInput label={"Confirm Password"} type="password" placeholder={"Confirm your Password"} />
                                    </> :
                                        <>
                                            <CustomInput label={"Name"} type="text" placeholder={"Enter your Name"} />
                                            <CustomInput label={"Email"} type="email" placeholder={"Enter your email"} />
                                            <CustomInput label={"Phone"} type="text" placeholder={"Enter your phone no."} />
                                            <CustomSelectable label={"Qualification"} options={qualification} />
                                            <CustomFileSelector label={"CV"} />
                                            <CustomSelectable label={"Experience"} options={experience} />
                                            <CustomInput label={"Password"} type="password" placeholder={"Enter your Password"} />
                                            <CustomInput label={"Confirm Password"} type="password" placeholder={"Confirm your Password"} />
                                        </>}
                            </div>
                            <div className='py-4 flex flex-col gap-2'>
                                {loading ?
                                    <>
                                        <Loader />
                                    </>
                                    : (
                                        <button type='submit' className='flex self-center bg-maroon text-white rounded-3xl py-2 px-4 justify-center items-center w-3/5 text-center cursor-pointer hover:bg-maroon/90'>Add User</button>
                                    )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddUserModal
