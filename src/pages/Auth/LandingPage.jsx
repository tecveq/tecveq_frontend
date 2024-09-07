import React from 'react'
import IMAGES from '../../assets/images'
import { Link } from 'react-router-dom'

const LandingPage = () => {
    return (
        <div className='flex justify-center py-10 px-10'>
            <div className='flex flex-col gap-8'>
                <div className='flex'>
                    <img src={IMAGES.logo} alt="" className='w-4/5 h-4/5 object-cover' />
                </div>
                <div className='flex flex-col gap-8'>

                    <div className='flex gap-8'>
                        <Link to={"/admin/login"} className='w-full h-full'>
                            <div className='bg-maroon flex-1 h-32 flex items-center justify-center w-full py-2 px-4 rounded-md hover:bg-maroon/90 cursor-pointer'>
                                <p className='text-white text-2xl'>Admin</p>
                            </div>
                        </Link>
                        <Link to={"/admin/login"} className='w-full h-full'>
                            <div className='bg-maroon flex-1 h-32 flex items-center justify-center w-full py-2 px-4 rounded-md hover:bg-maroon/90 cursor-pointer'>
                                <p className='text-white text-2xl'>Teacher</p>
                            </div>
                        </Link>
                    </div>
                    <div className='flex gap-8'>
                        <Link to={"/login"} className='w-full h-full'>
                            <div className='bg-maroon flex-1 h-32 flex items-center justify-center w-full py-2 px-4 rounded-md hover:bg-maroon/90 cursor-pointer'>
                                <p className='text-white text-2xl'>Student</p>
                            </div>
                        </Link>
                        <Link to={"/login"} className='h-full w-full'>
                            <div className='bg-maroon flex-1 h-32 flex items-center justify-center w-full py-2 px-4 rounded-md hover:bg-maroon/90 cursor-pointer'>
                                <p className='text-white text-2xl'>Parent</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage
