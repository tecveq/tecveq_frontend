import React from 'react'
import Navbar from '../../../components/Student/Dashboard/Navbar'
import QuizAssignmentRow from '../../../components/Student/QuizAssignment/QuizAssignmentRow'

import { useBlur } from '../../../context/BlurContext'
import { useStudent } from '../../../context/StudentContext'

const Quizzes = () => {

    const { allQuizes } = useStudent();
    console.log("all quizes in quiz are : ", allQuizes);
    const { isBlurred } = useBlur();

    const handleUpload = (data, datad) => {
        console.log("select file is :", data, datad);
    }

    return (
        <div className="flex flex-1 bg-[#F9F9F9] font-poppins">
            <div className="flex flex-1">
                <div className={`w-full h-screen lg:px-20 sm:px-10  flex-grow lg:ml-72`}
                >
                    <div className='h-screen pt-1'>
                        <Navbar heading={"Quizes"} />
                        <div className={` px-3 ${isBlurred ? "blur" : ""}`}>
                            <div className='mt-8 h-[80%] overflow-auto'>
                                <QuizAssignmentRow
                                    index={"Sr. No"}
                                    subject={"Subject"}
                                    title={"Title"}
                                    deadline={"Deadline"}
                                    bgColor={"#F9F9F9"}
                                    header={true}
                                    total_marks={"Total Marks"}
                                    download={"Download"}
                                    upload={"Upload"}
                                />
                                {allQuizes?.map((quiz, index) => {
                                    return <QuizAssignmentRow
                                        id={quiz._id}
                                        isQuiz={true}
                                        upload={true}
                                        header={false}
                                        key={quiz._id}
                                        alldata={quiz}
                                        index={index + 1}
                                        title={quiz.title}
                                        bgColor={"#FFFFFF"}
                                        download={quiz?.files[0]?.url}
                                        deadline={quiz.dueDate}
                                        total_marks={quiz.totalMarks}
                                        subject={quiz?.subjectID.name}
                                        text={quiz?.text}
                                    />
                                })}
                                {allQuizes.length == 0 && <div className='flex w-full justify-center'><p className='font-medium text-2xl py-4'>No quizes to display</p> </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Quizzes;
