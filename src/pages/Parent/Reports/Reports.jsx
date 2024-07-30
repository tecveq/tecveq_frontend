import React, { useState } from 'react'
import IMAGES from '../../../assets/images'
import DataRows from '../../../components/Parent/Reports/DataRows'
import { useNavigate } from 'react-router-dom'
import { useBlur } from '../../../context/BlurContext'
import ProfileMenu from '../../../components/Parent/Dashboard/ProfileMenu'
import ProfileDetails from '../../../components/Parent/Dashboard/ProfileDetails'
import Notifications from '../../../components/Parent/Dashboard/Notifications'

const Reports = () => {
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

    const onSettingsClick = () => { };
    const onLogoutClick = () => { };

    const navigate = useNavigate()
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
      navigate(`/parent/reports/${report.subject}`);
    };
  };
  return (
    <div className="flex flex-1 bg-[#F9F9F9] font-poppins">
      <div className="flex flex-1">
        {/* <div className="flex-grow w-full h-screen px-3 lg:px-20 sm:px-10 lg:ml-72"> */}

                <div className={`w-full h-screen lg:px-20 sm:px-10 px-3 flex-grow lg:ml-72 ${isBlurred ? "blur" : ""}`}>
                    <div className='h-screen pt-16'>
                        <div className='flex flex-row items-center justify-between flex-grow'>
                            <p className='font-semibold text-[20px] md:text-[30px]'>Reports</p>
                            <div className='flex flex-row items-center gap-2 md:gap-4'>
                                <div className={`p-1 bg-white rounded-md border-1 cursor-pointer`}>
                                    <img onClick={togglebell} src={IMAGES.Notification} alt='' className='md:w-[22px] md:h-[22px] w-[13px] h-[13px]' />
                                </div>
                                <div className='p-1 bg-white rounded-md cursor-pointer border-1'>
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
    //     </div>
    //   </div>
    // </div>
  );
};

export default Reports;
