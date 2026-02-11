import React from 'react';
import IMAGES from '../../assets/images';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="flex min-h-screen bg-[#0B1053] justify-center items-center px-4 py-10 md:px-10">
            <div className="flex flex-col gap-12 items-center w-full max-w-5xl">

                {/* Logo */}
                <div className="flex justify-center">
                    <img src={IMAGES.logo} alt="Logo" className="w-3/5 md:w-1/3 object-contain" />
                </div>

                {/* Role Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">

                    {/* Row 1: Admin & Teacher */}
                    <div className="flex gap-8">
                        <Link to="/admin/login" className="flex-1">
                            <div className="bg-white h-32 flex items-center justify-center rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer">
                                <p className="text-[#0B1053] text-2xl font-semibold">Admin</p>
                            </div>
                        </Link>
                        <Link to="/admin/login" className="flex-1">
                            <div className="bg-white h-32 flex items-center justify-center rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer">
                                <p className="text-[#0B1053] text-2xl font-semibold">Teacher</p>
                            </div>
                        </Link>
                    </div>

                    {/* Row 2: Student & Parent */}
                    <div className="flex gap-8">
                        <Link to="/login" className="flex-1">
                            <div className="bg-white h-32 flex items-center justify-center rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer">
                                <p className="text-[#0B1053] text-2xl font-semibold">Student</p>
                            </div>
                        </Link>
                        <Link to="/login" className="flex-1">
                            <div className="bg-white h-32 flex items-center justify-center rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer">
                                <p className="text-[#0B1053] text-2xl font-semibold">Parent</p>
                            </div>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default LandingPage;
