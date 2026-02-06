import React, { useState } from 'react'
import Loader from '../../../utils/Loader';
import logo from "../../../assets/logo.png";
import Card from '../../../components/Parent/ChildrenScreen/Card'

import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '../../../context/UserContext';
import { useParent } from '../../../context/ParentContext';
import { getAllChildren } from '../../../api/Parent/ParentApi';


const ChildrenScreen = () => {
    const [child1, setChild1] = useState(false);
    const [child2, setChild2] = useState(false);
    const navigate = useNavigate();

    const { parentLogedIn, setSelectedChild } = useParent();
    const { userData } = useUser();

    const child1Click = (child) => {
        //console.log(child,"child1Click");
        
        setSelectedChild(child);
        localStorage.setItem("selectedChild", JSON.stringify(child));
        setChild1(true);
        setChild2(false);
        navigate("/parent/dashboard")
    }
    
    const child2Click = (child) => {
        localStorage.setItem("selectedChild", JSON.stringify(child));
        setChild1(false);
        setChild2(true);
        navigate("/parent/dashboard")
    }

    const {data, isPending, error, refetch} = useQuery({
        queryKey: ["childquery"], queryFn: async () => {
            const result = await getAllChildren(userData.email);
            //console.log(" parent children are : ",  result);
            return result
        }, staleTime: 30000, enabled: parentLogedIn
    });

    return (
        isPending ? <Loader /> :
        <>
        <div className='flex'>
            <div className='flex flex-1 flex-col h-full justify-center items-center min-h-screen'>
                <div className='flex'>
                    <img src={logo} alt="" className='w-32 h-32 object-contain' />
                </div>
                <div className='flex flex-col items-center gap-4 flex-1'>
                    <p className='font-semibold text-3xl text-[#0B1053] font-poppins'>Select a Child Profile</p>
                    <div className='flex gap-8 '>
                        {data.map((item) =>(
                            <Card active={child1} data={item} onpress={() => child1Click(item)} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default ChildrenScreen
