import React, { useState } from 'react'
import IMAGES from '../../../assets/images'
import Card from '../../../components/Parent/ChildrenScreen/Card'
import logo from "../../../assets/logo.png";
import { useNavigate } from 'react-router-dom';

const ChildrenScreen = () => {
    const [child1, setChild1]  = useState(false);
    const [child2, setChild2]  = useState(false);
    const navigate = useNavigate();

    const child1Click = () =>{
        setChild1(true);
        setChild2(false);
        navigate("/parent/dashboard")
    }

    const child2Click = () =>{
        setChild1(false);
        setChild2(true);
        navigate("/parent/dashboard")
    }
    return (
        <div className='flex'>
            <div className='flex flex-1 flex-col h-full justify-center items-center min-h-screen'>
                <div className='flex'>
                    <img src={logo} alt="" className='w-32 h-32 object-contain' />
                </div>
                <div className='flex flex-col items-center gap-4 flex-1'>
                    <p className='font-semibold text-3xl text-maroon font-poppins'>Select a Child Profile</p>
                    <div className='flex gap-8 '>
                        <Card active={child1} onpress={child1Click} />
                        <Card  active={child2} onpress={child2Click}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChildrenScreen
