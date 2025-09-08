import React from 'react'
import IMAGES from '../../../assets/images';
import { useNavigate, useParams } from 'react-router-dom';

const QuizAssignmentsTable = ({ data, type }) => {
    const params = useParams()
    const navigate = useNavigate()
    //console.log(data, "data is detailed");

    return (
        <div className="flex flex-1">
            <div className="flex flex-col flex-1 gap-2">
                <div className="flex flex-1">
                    <table className="flex flex-col flex-1 bg-white rounded-lg table-fixed">
                        <thead className="flex gap-5 px-2 py-3 rounded-tl-lg rounded-tr-lg border-t-maroon bg-maroon_10">
                            <tr className="flex flex-1">
                                <td className="flex-[1] flex justify-center md:text-[15px] text-[13px]">Sr No.</td>
                                <td className="flex-[3] flex justify-center md:text-[15px] text-[13px]">Title</td>
                                <td className="flex-[3] flex justify-center md:text-[15px] text-[13px]">Obtained Marks</td>
                                <td className="flex-[3] flex justify-center md:text-[15px] text-[13px]">Total Marks</td>
                                <td className="flex-[3] flex justify-center md:text-[15px] text-[13px]">Grade</td>
                                <td className="flex-[3] flex justify-center md:text-[15px] text-[13px]">Feedback</td>

                            </tr>
                        </thead>

                        <tbody className="flex flex-col">
                            {data?.[type]?.map((item, index) => {
                                return (
                                    <tr style={{ cursor: "pointer" }} onClick={() => navigate(`/parent/${type}/${item.title}`, { state: data })} className="flex flex-1 text-xs border-t border-t-black/10">
                                        <td className="flex-[1] py-2 lg:py-3 flex justify-center">{index + 1}</td>
                                        <td className="flex-[3] py-2 lg:py-3 border-l border-l-black/10 flex justify-center">
                                            {item.title}
                                        </td>
                                        <td className="flex-[3] py-2 lg:py-3 border-l border-l-black/10 flex justify-center">
                                            {item.marksObtained}
                                        </td>
                                        <td className="flex-[3] py-2 lg:py-3 border-l border-l-black/10 flex justify-center">
                                            {item.totalMarks}
                                        </td>
                                        <td className="flex-[3] py-2 lg:py-3 border-l border-l-black/10 flex justify-center">
                                            {
                                                (item.marksObtained / item.totalMarks) * 100 > 90
                                                    ? "A"
                                                    : (item.marksObtained / item.totalMarks) * 100 > 80
                                                        ? "B"
                                                        : (item.marksObtained / item.totalMarks) * 100 > 70
                                                            ? "C"
                                                            : (item.marksObtained / item.totalMarks) * 100 > 60
                                                                ? "D"
                                                                : "F"
                                            }
                                        </td>
                                        <td className="flex-[3] py-2 lg:py-3 border-l border-l-black/10 flex justify-center">
                                            {
                                                item.feedback ? (
                                                    <img src={IMAGES.Feedback} alt='' className='md:w-[22px] md:h-[22px] w-[20px] h-[20px]' />

                                                ) : (
                                                    <img src={IMAGES.NoFeedback} alt='' className='md:w-[22px] md:h-[22px] w-[20px] h-[20px]' />

                                                )
                                            }

                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    )
}

export default QuizAssignmentsTable
