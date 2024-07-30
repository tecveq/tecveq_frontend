import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import { FaAngleDown } from "react-icons/fa6";

const Attendance = () => {


    const chartData = [
        {
            label: "Present",
            value: 20,
        },
        {
            label: "Absent",
            value: 30,
        },
        {
            label: "Leave",
            value: 50,
        },
    ];


    return (
        <div className="flex flex-1">
            <div className="flex flex-col flex-1 gap-2">
                <div className="flex">
                    <p className="flex text-xl font-medium">Attendance</p>
                </div>
                <div className="flex flex-col gap-1 px-3 py-5 bg-white rounded-lg custom-shadow">
                    <div className="flex px-5 text-sm ">
                        <div className="flex justify-center flex-1">
                            <p></p>
                        </div>
                    </div>
                    <div className="flex flex-1 gap-2 p-2">
                        <div className="flex items-center flex-1">
                            <div className="flex gap-2 flex-1 justify-between">
                                <div className="flex w-[210px] h-[210px] flex-1">
                                    <Doughnut
                                    className='!flex'
                                        data={{
                                            labels: chartData.map((data) => data.label),
                                            datasets: [
                                                {
                                                    label: "Count",
                                                    data: chartData.map((data) => data.value),
                                                    backgroundColor: ["#11AF03", "#C53F3F", "#EAECF0"],
                                                    borderColor: ["#11AF03", "#C53F3F", "#EAECF0"],
                                                },
                                            ],
                                        }}
                                    />
                                </div>
                                <div className='flex flex-1 justify-end items-start'>
                                    <div className='flex justify-end items-center'>
                                        <p className='px-5 py-2 border border-[#00000020] rounded-md cursor-pointer text-[#101828]/60 flex items-center justify-between gap-4'>Overall <FaAngleDown className='text-[#101828]/60' /> </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Attendance
