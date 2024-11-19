import React, { useState } from 'react'
import Loader from '../../../utils/Loader'
import IMAGES from '../../../assets/images'

import { FaAsterisk } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useUser } from '../../../context/UserContext'
import { getAllLevels } from '../../../api/Admin/LevelsApi'
import { registerStudent } from '../../../api/Student/StudentApis'

const SignUp = () => {

  const CustomInput = ({ label, placeholder, type }) => {
    return (
      <div className='flex flex-col text-start py-1'>
        <div className='flex flex-col gap-2'>
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
              className={`border outline-none rounded-sm border-black/20 px-4 w-full py-[4px] ${type == "password" ? "font-bold text-xl" : ""} placeholder:text-base placeholder:font-normal `}
              required
              type={type}
              placeholder={placeholder}
            />
          </div>
        </div>
      </div>
    )
  }

  const CustomSelectable = ({ label, options}) => {
    return (
      <div className='flex flex-col text-start py-1'>
        <div className='flex flex-col gap-2'>
          <div className='font-medium '>
            {label}
          </div>
          <div>
            <select className='border outline-none rounded-sm border-black/20 px-4 w-full py-[4px]'>
              <option value="">Choose Class</option>
              {options?.map((item) => {
                return <option value={JSON.stringify(item)}>{item.name}</option>
              })}
            </select>
          </div>
        </div>
      </div>
    )
  }

  const Selectable = ({ label }) => {
    return (
      <div className='flex flex-col text-start py-1'>
        <div className='flex flex-col gap-2'>
          <div className='font-medium '>
            {label}
          </div>
          <div>
            <select value={role} onChange={(e) => { setRole(e.target.value) }} className='border outline-none rounded-sm border-black/20 px-4 w-full py-[4px]'>
              <option value="student">Studnet</option>
              <option value="parent">Parent</option>
            </select>
          </div>
        </div>
      </div>
    )
  }

  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("student")

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {

      let dataBody = {};

      // console.log("after form submit here : ", e);

      // PARENT will be automatically created based on fields in student data, not manually
      if (role == "parent") {
        dataBody = {
          role,
          sName: e.target[1].value,
          sID: e.target[2].value,
          password: e.target[3].value,
        }
      } else {
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
        }
      }

      console.log("now data body is : ", dataBody);

      const response = await registerStudent(dataBody);
      console.log("after register user is : ", response);
      setUserData(response);
      navigate("/login");

    } catch (error) {
      console.log("error in student login UI screen is : ", error);
    }

    setLoading(false);
  }

  const { setUserData } = useUser();


  const navigate = useNavigate();

  const handleGoToLogIn = () => {
    navigate("/login")
  }

  const { data, isPending } = useQuery({ queryKey: ["loginlevels"], queryFn: getAllLevels })
  console.log("level data in signup is : ", data);

  return (
    <div className='flex min-h-screen w-full flex-col md:flex-row flex-1 bg-hero-pattern' style={{ background: 'linear-gradient(140.21deg, rgba(243, 233, 233, 0.4) -6.93%, rgba(246, 246, 246, 0) 98.1%)' }}>
      <div className=' bg-cover bg-hero-pattern absolute w-60 h-60 lg:w-72 lg:h-72 2xl:h-96 2xl:w-96' ></div>
      <div className='flex flex-[4] lg:flex-1 px-4 py-10 md:py-0   md:px-10 items-center justify-center'>
        <div className='flex flex-col flex-1'>
          <div className='flex w-full items-center justify-center 2xl:items-center md:items-end md:justify-end 2xl:justify-center flex-[2] flex-col'>
            <img src={IMAGES.logo} alt="" className='w-60 h-44 2xl:w-96 2xl:h-64 bg-cover' />
          </div>
          <div className='flex items-end justify-center md:items-end md:justify-end flex-1 '>
            <img src={IMAGES.register_girl} alt="" className='w-72 h-52 2xl:w-4/5 2xl:h-96 bg-contain' />
          </div>
        </div>
      </div>
      <div className='flex flex-[6] lg:flex-1 '>
        <div className='flex flex-col flex-1 px-4 md:px-4 py-6 justify-center items-center text-center'>
          <div className='flex flex-col w-full bg-white h-full px-4 md:px-8 lg:px-10 xl:px-16 py-10 md:w-4/5'>
            <div className='py-2'>
              <p className='text-2xl font-medium'>Create an Account</p>
              <p className='text-sm text-black/60'>Welcome back please enter you details</p>
            </div>
            <div>
              <form onSubmit={handleSubmit}>
                <div className='overflow-auto h-80 register-scrollbar 2xl:h-full'>
                  <Selectable label={"Occupation"} />
                  {role == "student" ?
                    <>
                      <CustomInput label={"Name"} type="text" placeholder={"Enter your Name"} />
                      <CustomInput label={"Email"} type="email" placeholder={"Enter your Email"} />
                      <CustomInput label={"Phone no."} type="text" placeholder={"Enter your Phone Number"} />
                      {!isPending && <CustomSelectable label={"Enroll In"} options={data} />}
                      <CustomInput label={"Guardian Name"} type="text" placeholder={"Enter Guardian Name"} />
                      <CustomInput label={"Guardian Email"} type="email" placeholder={"Enter Guardian Email"} />
                      <CustomInput label={"Guardian Phone no."} type="text" placeholder={"Enter Guardian Phone no."} />
                      <CustomInput label={"Password"} type="password" placeholder={"Enter your Password"} />
                      <CustomInput label={"Confirm Password"} type="password" placeholder={"Confirm your Password"} />
                    </>
                    : <>
                      <CustomInput label={"Student Name"} type="text" placeholder={"Enter student Name"} />
                      <CustomInput label={"Student ID"} type="text" placeholder={"Enter student ID"} />
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
                      <button type='submit' className='flex bg-maroon text-white rounded-md py-2 px-4 justify-center items-center text-center cursor-pointer hover:bg-maroon/90'>Sign up</button>
                    )}
                  <p className='text-[#000000]/70 text-sm'>Don't have an account? <span onClick={handleGoToLogIn} className='text-[#000000]/50 cursor-pointer hover:text-[#00000090] font-medium underline'>Sign in</span> now</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
