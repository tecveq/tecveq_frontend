import React from 'react'
import { Doughnut } from 'react-chartjs-2';

const AttendanceTable = ({ data }) => {

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
                <div className="flex flex-1 flex-col border-t-maroon bg-maroon_10">
                    <div className='flex py-3'>
                        <td className="flex-[1] flex justify-center md:text-[15px] text-[13px]">Sr No.</td>
                        <td className="flex-[3] flex justify-center md:text-[15px] text-[13px]">Status</td>
                        <td className="flex-[3] flex justify-center md:text-[15px] text-[13px]">Date</td>
                        <td className="flex-[3] flex justify-center md:text-[15px] text-[13px]">Time</td>
                        <td className="flex-[3] flex justify-center md:text-[15px] text-[13px]">Class</td>
                    </div>
                    <div className='flex flex-1'>

                        <table className="flex flex-col flex-1 bg-white rounded-lg table-fixed">
                            <tbody className="flex flex-col">
                                {data.map((item, index) => {
                                    return (
                                        <tr className="flex flex-1 text-xs border-t border-t-black/10">
                                            <td className="flex-[1] py-2 lg:py-3 flex justify-center">{index + 1}</td>
                                            <td className="flex-[3] py-2 lg:py-3 border-l border-l-black/10 flex justify-center">
                                                {item.status}
                                            </td>
                                            <td className="flex-[3] py-2 lg:py-3 border-l border-l-black/10 flex justify-center">
                                                {item.date}
                                            </td>
                                            <td className="flex-[3] py-2 lg:py-3 border-l border-l-black/10 flex justify-center">
                                                {item.time}
                                            </td>
                                        </tr>
                                    );
                                })}

                            </tbody>

                        </table>

                        <div className="flex items-center justify-center  bg-white ">

                            <div className="flex flex-col gap-2">
                                <div className="flex w-[200px] h-[200px]">
                                    <Doughnut
                                        data={{
                                            datasets: [
                                                {
                                                    label: "Count",
                                                    data: chartData.map((data) => data.value),
                                                    backgroundColor: ["#11AF03", "#C53F3F", "#EAECF0"],
                                                    borderColor: ["#11AF03", "#C53F3F", "#EAECF0"],
                                                },
                                            ],
                                            labels: chartData.map((data) => data.label),
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AttendanceTable