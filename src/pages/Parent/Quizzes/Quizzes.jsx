
import React, { useState } from 'react'
import Sidebar from '../../../components/Student/Sidebar/Sidebar'
import QuizAssignmentRow from '../../../components/Parent/QuizAssignment/QuizAssignmentRow'
import DataRows from '../../../components/Parent/Reports/DataRows'
import IMAGES from '../../../assets/images'
import { useBlur } from '../../../context/BlurContext'
import ProfileMenu from '../../../components/Parent/Dashboard/ProfileMenu'
import ProfileDetails from '../../../components/Parent/Dashboard/ProfileDetails'
import Notifications from '../../../components/Parent/Dashboard/Notifications'
import { useNavigate } from 'react-router-dom'

const Quizzes = () => {
    const [mail, setmail] = useState(false);
    const [bell, setBell] = useState(false);
    const [isProfileMenu, setIsProfileMenu] = useState(false);
    const [isProfileDetails, setIsProfileDetails] = useState(false);

    const { isBlurred, toggleBlur } = useBlur();

    const toggleProfielMenu = () => {
        setIsProfileMenu(!isProfileMenu);
        setmail(false);
        setBell(false);
    };

    const toggleMail = () => {
        setmail(!mail);
        setIsProfileMenu(false);
        setBell(false);
    };

    const togglebell = () => {
        setBell(!bell);
        setmail(false);
        setIsProfileMenu(false);
    };

    const toggleProfileDetails = () => {
        toggleBlur();
        setIsProfileDetails(!isProfileDetails);
    };

    const onProfileClick = () => {
        toggleProfielMenu();
        toggleProfileDetails();
    };

    const navigate = useNavigate();
    const onLineClick = () => {
        navigate(`/parent/quizzes/reports`)
    }

    const onSettingsClick = () => { };
    const onLogoutClick = () => { };


    const reports = [
        {
          subject: "Mathematics",
          instructor: "John Smith",
          attendance: "70%",
        },
        {
          subject: "English",
          instructor: "John Smith",
          attendance: "70%",
        },
        {
          subject: "Urdu",
          instructor: "John Smith",
          attendance: "70%",
        },
        {
          subject: "Chemistry",
          instructor: "John Smith",
          attendance: "70%",
        },
        {
          subject: "Biology",
          instructor: "John Smith",
          attendance: "70%",
        },
        {
          subject: "Islamiyat",
          instructor: "John Smith",
          attendance: "70%",
        },
        {
          subject: "History",
          instructor: "John Smith",
          attendance: "70%",
        },
      ];

      const handleFunctionClick = (report) => {
        return () => {
          navigate(`/parent/quizzes/reports`);
        };
      };

    const quizzes = [
        {
            subject: "Mathematics",
            title: "Quiz 1",
            deadline: "22nd Jan, 2025 8:30PM",
            total_marks: 20,
            download: "Download",
            upload: true
        },
        {
            subject: "Science",
            title: "Quiz 2",
            deadline: "22nd Jan, 2023 12:30PM",
            total_marks: 10,
            download: "Download",
            upload: false
        },
        {
            subject: "Mathematics",
            title: "Quiz Test",
            deadline: "22nd Jan, 2022 8:30PM",
            total_marks: 20,
            download: "Download",
            upload: true
        },
        {
            subject: "Mathematics",
            title: "Quiz",
            deadline: "22nd Jan, 2022 8:30PM",
            total_marks: 20,
            download: "Download",
            upload: true
        },


    ]
    return (
        <div className="flex flex-1 bg-[#F9F9F9] font-poppins">
            <div className="flex flex-1">
                <div className={`w-full ${isBlurred ? "blur" : ""} h-screen lg:px-20 sm:px-10 px-3 flex-grow lg:ml-72`}>
                    <div className='h-screen pt-16'>
                        <div className='flex flex-row items-center justify-between flex-grow'>
                            <p className='font-semibold text-[20px] md:text-[30px]'>Quizzes</p>
                            <div className='flex flex-row items-center gap-2 md:gap-4'>
                                <div className='p-1 bg-white rounded-sm cursor-pointer border-1 border-grey'>
                                    <img onClick={togglebell} src={IMAGES.Notification} alt='' className='md:w-[22px] md:h-[22px] w-[13px] h-[13px]' />
                                </div>
                                <div className='p-1 bg-white rounded-sm cursor-pointer border-1 border-grey'>
                                    <img onClick={toggleMail} src={IMAGES.SMS} alt='' className='md:w-[22px] md:h-[22px] w-[13px] h-[13px]' />
                                </div>
                                <p className='text-justify md:text-[16px] text-[12px]'>M. Haseeb</p>
                                <div>
                                    <img onClick={toggleProfielMenu} src={IMAGES.ProfilePic} alt='' className='w-[29px] h-[30px] cursor-pointer' />
                                </div>
                                <div>
                                    <img onClick={toggleProfielMenu} src={IMAGES.ArrowLeft} alt='' className='w-[22px] h-[30px] cursor-pointer' />
                                </div>
                            </div>
                            {mail ? <Notifications dashboard={false} onclose={toggleMail} /> : ""}
                            {isProfileMenu ? (
                                <ProfileMenu
                                    onProfileClick={onProfileClick}
                                    onSettingsClick={onSettingsClick}
                                    onLogoutClick={onLogoutClick}
                                    dashboard={false}
                                />
                            ) : (
                                ""
                            )}

                        </div>
                        {/* <div className='mt-8 h-[80%] overflow-auto'>
                            <QuizAssignmentRow index={"Sr. No"} subject={"Subject"} title={"Title"} deadline={"Deadline"} bgColor={"#F9F9F9"} header={true} total_marks={"Total Marks"} download={"Download"} upload={"Upload"} />
                            {
                                quizzes.map((quiz, index) => (
                                    <QuizAssignmentRow onlineclick={onLineClick} isQuiz={true} index={index + 1} subject={quiz.subject} title={quiz.title} deadline={quiz.deadline} bgColor={"#FFFFFF"} header={false} total_marks={quiz.total_marks} download={quiz.download} upload={quiz.upload} />

                                ))
                            }

                        </div> */}

                        <div className='mt-8 h-[80%] overflow-auto'>
                            <DataRows index={"Sr. No"} subject={"Subject"} instructor={"Instructor"} attendance={"Attendance"} bgColor={"#F9F9F9"} header={true} />
                            {
                                reports.map((report, index) => (
                                    <DataRows index={index + 1} subject={report.subject} instructor={report.instructor} attendance={report.attendance} bgColor={"#FFFFFF"} header={false} onClickFunction={handleFunctionClick(report)} />

                                ))
                            }
                        </div>
                    </div>
                </div>

                {isProfileDetails ? (
                    <ProfileDetails onclose={toggleProfileDetails} />
                ) : (
                    ""
                )}
            </div>
        </div>
    )
}

export default Quizzes;
