import React, { useEffect, useState } from 'react';
import Loader from '../../../utils/Loader';
import IMAGES from '../../../assets/images/index';

import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { submitQiuz } from '../../../api/Student/Quiz';
import { uploadFile } from '../../../utils/FileUpload';
import { formatDate } from '../../../constants/formattedDate';
import { submitAssignment } from '../../../api/Student/Assignments';
import { useUser } from '../../../context/UserContext';

const QuizAssignmentRow = (props) => {

    const [timePassed, setTimePassed] = useState(false);
    const [timeLeft, setTimeLeft] = useState('');
    const [isUploaded, setIsUploadded] = useState(false);

    const { userData } = useUser();

    const quizAssignmentMutation = useMutation({
        mutationKey: ["quizAssignment"], mutationFn: async (event) => {
            let results;
            let fileUrl = await uploadFile(event.target.files[0], "submissions");
            if (props.isQuiz) {
                results = await submitQiuz({ file: fileUrl }, props.alldata._id)
            } else {
                results = await submitAssignment({ file: fileUrl }, props.alldata._id)
            }
            return results;
        }, onSettled: (data, error) => {
            !error && toast.success("Uploaded successfully!");
        }
    })

    const handleFileChange = async (event) => {
        quizAssignmentMutation.mutate(event);
    };

    const compareDateAndTime = (dateTimeString) => {
        const eventDateTime = new Date(dateTimeString);
        const currentDateTime = new Date();

        if (eventDateTime < currentDateTime) {
            setTimePassed(true);
        } else {
            setTimePassed(false);
            // Calculate the difference in milliseconds
            const difference = eventDateTime - currentDateTime;
            // Convert the difference to days, hours, minutes, and seconds
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / (1000 * 60)) % 60);
            const seconds = Math.floor((difference / 1000) % 60);
            // Update the timeLeft state with days included
            setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        }
    };

    useEffect(() => {

        props?.alldata?.submissions?.map((item) => {
            if (item?.studentID === userData?._id) {
                setIsUploadded(true);
            }
        })

        const formattedDateTimeString = props.deadline
            .replace(/(\d+)(st|nd|rd|th)/, '$1')
            .replace(',', '')
            .replace(/(\d+)([ap]m)$/i, (match, p1, p2) => `${p1} ${p2.toUpperCase()}`);

        compareDateAndTime(formattedDateTimeString);


        const intervalId = setInterval(() => {
            compareDateAndTime(formattedDateTimeString);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [props.deadline]);

    return (
        <div className='min-w-full'>
            <div style={{ backgroundColor: props.bgColor, }} className={`md:py-5 py-2 md:pl-3 md:pr-5 flex flex-row items-center border-b border-grey mt-2`}>
                <p className={`w-full md:flex-[1] flex-[1] md:text-[14px] text-[11px] text-center md:text-left ${props.header ? 'font-semibold' : ''}`}>{props.index + "."}</p>
                <p className={`w-full md:flex-[3] my-1 md:my-0  md:text-[14px] text-[11px] md:text-center ${props.header ? 'font-semibold' : ''}`}>{props.subject}</p>
                <p className={`w-full md:flex-[3] my-1 md:my-0 text-center md:text-center md:text-[14px]  text-[11px] ${props.header ? 'font-semibold' : ''}`}>{props.title}</p>
                <p className={`w-full md:flex-[3] my-1 md:my-0 text-center md:text-center md:text-[14px]  text-[11px] ${props.header ? 'font-semibold' : ''}`}>{props.header ? props.deadline : formatDate(props.deadline)}</p>
                <p className={`w-full md:flex-[3] my-1 md:my-0 text-center md:text-center md:text-[14px]  text-[11px] ${props.header ? 'font-semibold' : ''}`}>{props.total_marks}</p>
                <p className={`w-full md:flex-[3] my-1 md:my-0 text-center md:text-center md:text-[14px]  text-[11px] ${props.header ? 'font-semibold' : ''}`}>
                    {props.header ? (
                        "Download"
                    ) : (
                        <>
                            <a href={props.download} id='download' target='_blank'>
                                <img src={IMAGES.Download} alt='' className='md:w-[18px] cursor-pointer md:h-[18px] mx-auto block w-[16px] h-[16px]' />
                            </a>
                        </>
                    )}
                </p>
                {
                    props.header ? (
                        <>
                            <p className={`w-full md:flex-[2] my-1 md:my-0 text-center md:text-center md:text-[14px] text-[11px] ${props.header ? 'font-semibold' : ''}`}>
                                Upload
                            </p>
                        </>
                    ) : (
                        !isUploaded ? (
                            <div className={`w-full md:flex-[2] my-1 md:my-0 text-center md:text-center`}>
                                {quizAssignmentMutation.isPending && <div><Loader /></div>}
                                {!quizAssignmentMutation.isPending &&
                                    <label htmlFor={`upload-${props.id}`} className='bg-[#A41D30] cursor-pointer rounded-xl flex items-center justify-center py-1 text-white md:text-[14px] text-[11px]'>
                                        Upload
                                        <input id={`upload-${props.id}`} onChange={handleFileChange} type="file" className='hidden' />
                                    </label>
                                }
                            </div>
                        ) : (
                            <div className={`w-full md:flex-[2] my-1 md:my-0 text-center md:text-center`}>
                                <div className='bg-[#91919133] rounded-3xl flex items-center justify-center py-2 px-3 text-black md:text-[14px]  text-[11px]'>
                                    Uploaded
                                </div>
                            </div>
                        )
                    )
                }
            </div>
            {
                props.isQuiz && !props.header && (
                    !isUploaded ? (
                        <div className='flex flex-row items-center justify-end'>
                            {timePassed ? (
                                <div className='bg-[#A41D30]/10 rounded-xl flex items-center justify-center py-1 px-2 text-[#A41D30] md:text-[10px] text-[8px]'>
                                    Time Up!
                                </div>
                            ) : (
                                <div className='flex flex-row items-center justify-end'>
                                    <div className='bg-[#A41D30]/10 rounded-xl flex items-center justify-center py-1 px-2 text-[#A41D30] md:text-[10px] text-[8px]'>
                                        {timeLeft}
                                    </div>
                                </div>
                            )}

                        </div>
                    ) : (
                        <div className='flex flex-row items-center justify-end'>
                            <div className='bg-[#108206]/10 rounded-xl flex items-center justify-center py-1 px-2 text-[#108206] md:text-[10px] text-[8px]'>
                                Submitted On Time!
                            </div>
                        </div>
                    )
                )
            }
        </div>
    )
}

export default QuizAssignmentRow