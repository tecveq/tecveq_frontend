import React, { useState } from 'react'
import IMAGES from '../../../assets/images';
import { studentLogin } from '../../../api/Student/StudentApis';
import Loader from '../../../utils/Loader';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';
import { toast } from 'react-toastify';
import { useStudent } from '../../../context/StudentContext';
import { useParent } from '../../../context/ParentContext';

const Login = () => {

    const CustomInput = ({ label, placeholder, type }) => {
        return (
            <div className='flex flex-col text-start py-1'>
                <div className='flex flex-col gap-1'>
                    <div className='font-medium'>
                        {label}
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

    const Selectable = ({ label }) => {
        return (
            <div className='flex flex-col text-start py-1'>
                <div className='flex flex-col gap-1'>
                    <div className='font-medium'>
                        {label}
                    </div>
                    <div>
                        <select className='border outline-none rounded-sm border-black/20 px-4 w-full py-[4px]'>
                            <option value="student">Studnet</option>
                            <option value="parent">Parent</option>
                        </select>
                    </div>
                </div>
            </div>
        )
    }

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setUserData, socketContex, setSocketContext } = useUser();
    const { setParentLogedIn } = useParent();
    const { setStudentLogedIn } = useStudent();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("object is : ",{role: e.target[0].value, email: e.target[1].value, password: e.target[2].value} )
        setLoading(true);
        try {
            const dataBody = {
                role: e.target[0].value, email: e.target[1].value, password: e.target[2].value
            }
            const response = await studentLogin(dataBody);
            if (response !== "error") {
                setUserData(response);
                if (response.userType == "student") {
                    if(response.isBlocked == true){
                        toast.error("Access Denied! Please contact Admin support.");
                    }else{
                        
                        localStorage.setItem("tcauser", JSON.stringify(response));
                        toast.success("Login successful");
                        navigate("/");
                        setStudentLogedIn(true);
                    }
                } else if (response.userType == "parent") {
                    localStorage.setItem("tcauser", JSON.stringify(response));
                    toast.success("Login successful");
                    navigate("/parent/children");
                    // navigate("/parent/dashboard");
                    setParentLogedIn(true);
                } else {
                    navigate("/login")
                }
            }
        } catch (error) {
            console.log("error in student login UI screen is : ", error);
            toast.error(error.message);
        }
        setLoading(false);
    }


    const handleGoToSignUp = () => {
        navigate("/signup");
    }

    return (
        <div className='flex min-h-screen flex-col md:flex-row w-full flex-1 bg-hero-pattern' style={{ background: 'linear-gradient(140.21deg, rgba(243, 233, 233, 0.4) -6.93%, rgba(246, 246, 246, 0) 98.1%)' }}>
            <div className=' bg-cover bg-hero-pattern absolute w-72 h-72' ></div>
            <div className='flex flex-1 sm:flex-[4] px-10 py-10 justify-center'>
                <div className='flex items-center justify-center'>
                    <img src={IMAGES.logo} alt="" className='w-52 h-32 md:w-60 md:h-40 lg:w-72 lg:h-52 bg-cover' />
                </div>
            </div>
            <div className='flex flex-1 sm:flex-[6] '>
                <div className='relative bottom-10 items-end lg:items-end sm:left-10 md:left-10 xl:left-11 2xl:left-14 flex justify-center '>
                    <div className='bg-cover bg-center-img 2xl:w-80 2xl:h-72 xl:w-72 xl:h-64 h-44 w-52 absolute'></div>
                </div>
                <div className='flex flex-col flex-1 px-10 py-8 justify-center items-center text-center'>
                    <div className='flex flex-col bg-white h-full px-4 md:px-14 lg:px-12 xl:px-16 py-10 w-full md:w-4/5'>
                        <div className='py-3'>
                            <p className='text-2xl font-medium'>Welcome Back</p>
                            <p className='text-sm text-black/60'>Welcome back please enter your details</p>
                        </div>
                        <div>
                            <form onSubmit={handleSubmit}>
                                <div className=''>
                                    <Selectable label={"Parent/Student"} />
                                    <CustomInput label={"Email"} type="email" placeholder={"Enter your email..."} />
                                    <CustomInput label={"Password"} type="password" placeholder={"Enter your password..."} />
                                </div>
                                <div className='flex justify-between items-center'>
                                    <div className='flex gap-2 items-center ml-2'>
                                        <p>
                                            <input type="checkbox" />
                                        </p>
                                        <p className='text-sm'>Remember me</p>
                                    </div>
                                    <div>
                                        <p className='text-sm cursor-pointer hover:underline'>Forgot Password</p>
                                    </div>
                                </div>
                                <div className='py-4 flex flex-col gap-2'>
                                    {loading ?
                                        <>
                                            <Loader />
                                        </>
                                        : (
                                            <button type='submit' className='flex bg-maroon text-white rounded-md py-2 px-4 justify-center items-center text-center cursor-pointer hover:bg-maroon/90'>Sign In</button>
                                        )}
                                    <p className='text-[#000000]/70 text-sm'>Don't have an account? <span onClick={handleGoToSignUp} className='text-[#000000]/50 cursor-pointer hover:text-[#00000090] font-medium underline'>Sign up</span> now</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
