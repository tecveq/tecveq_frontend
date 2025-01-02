import React, { useState } from "react";
import Loader from "../../../utils/Loader";
import IMAGES from "../../../assets/images";
import ProfileMenu from "../../../components/Student/Dashboard/ProfileMenu";
import Notifications from "../../../components/Student/Dashboard/Notifications";
import SubmissionRow from "../../../components/Teacher/QuizAssignment/SubmissionRow";

import { BiSearch } from "react-icons/bi";
import { IoBookOutline } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "../../../context/UserContext";
import { useBlur } from "../../../context/BlurContext";
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { getMultipleAssignmentsForGrading } from "../../../api/Teacher/Assignments";


const Submissions = () => {
  const [mail, setmail] = useState(false);
  const [bell, setBell] = useState(false);
  const [isProfileMenu, setIsProfileMenu] = useState(false);
  const [isProfileDetails, setIsProfileDetails] = useState(false);

  const [searchText, setSearchText] = useState("");

  const { isBlurred, toggleBlur } = useBlur();

  const { userData } = useUser();

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

  const navigate = useNavigate();

  const onAssignmentClick = () => {
    navigate("/teacher/assignments");
  };

  const location = useLocation();

  const { data, isPending, isSuccess, isError, refetch, isRefetching } = useQuery({
    queryKey: ["submissions"],
    queryFn: async () => {
      let result = await getMultipleAssignmentsForGrading(location.state._id);
      return result;
    }
  });

  console.log("all submissions are are : ", data);

  return (
    isPending || isRefetching ? <div className="flex flex-1"> <Loader /> </div> :
      <div className="flex flex-1 bg-[#F9F9F9] font-poppins">
        <div className="flex flex-1">
          <div
            className={`w-full ${isBlurred ? "blur" : ""
              } h-screen lg:px-20 sm:px-10 px-3 flex-grow lg:ml-72`}
          >
            <div className="h-screen pt-8 lg:pt-0">
              <div className="flex flex-row items-center justify-between flex-grow">
                <div className="flex items-center gap-4">
                  <p className="font-semibold text-[20px] md:text-[30px]">
                    Submissions
                  </p>
                  <div className="flex items-center gap-1 text-xs">
                    <IoBookOutline />
                    <MdOutlineKeyboardArrowRight />
                    <p className="cursor-pointer" onClick={onAssignmentClick}>
                      Assignment
                    </p>
                    <MdOutlineKeyboardArrowRight />
                    <p className="px-2 font-medium rounded-sm bg-tea">
                      Submissions
                    </p>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-2 md:gap-4">
                  <div className="p-1 bg-white rounded-sm cursor-pointer border-1 border-grey">
                    <img
                      onClick={togglebell}
                      src={IMAGES.Notification}
                      alt=""
                      className="md:w-[22px] md:h-[22px] w-[13px] h-[13px]"
                    />
                  </div>
                  <div className="p-1 bg-white rounded-sm cursor-pointer border-1 border-grey">
                    <img
                      onClick={toggleMail}
                      src={IMAGES.SMS}
                      alt=""
                      className="md:w-[22px] md:h-[22px] w-[13px] h-[13px]"
                    />
                  </div>
                  <p className="text-justify md:text-[16px] text-[12px]">
                    {userData.name}
                  </p>
                  <div>
                    <img
                      onClick={toggleProfielMenu}
                      src={userData?.profilePic || IMAGES.ProfilePic}
                      alt=""
                      className="w-[29px] h-[30px] rounded-full cursor-pointer"
                    />
                  </div>
                  <div>
                    <img
                      onClick={toggleProfielMenu}
                      src={IMAGES.ArrowLeft}
                      alt=""
                      className="w-[22px] h-[30px] cursor-pointer"
                    />
                  </div>
                </div>
                {mail ? (
                  <Notifications dashboard={false} onclose={toggleMail} />
                ) : (
                  ""
                )}
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
              <div className="py-4">
                <div className="flex items-center justify-between">
                  <div className="">
                    <p className="text-black/60">Total Submissions: {data?.submissions.length}</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white border border-black/10 rounded-3xl">
                      <BiSearch />
                      <input
                        value={searchText}
                        onChange={(e) => { setSearchText(e.target.value) }}
                        className="outline-none b"
                        type="text"
                        placeholder="Search"
                      />
                    </div>
                    <p className="flex cursor pointer items-center justify-center px-4 py-2 text-sm text-white bg-maroon rounded-3xl">
                      Download All
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-0 h-[80%] overflow-auto">
                <SubmissionRow
                  header={true}
                  name={"Name"}
                  isQuiz={false}
                  index={"Sr. No"}
                  bgColor={"#F9F9F9"}
                  submission={"Submission"}
                  downloads={"Downloads"}
                />
                {isSuccess && searchText == "" && data?.submissions.map((submission, index) => {
                  return <SubmissionRow
                    isQuiz={false}
                    header={false}
                    index={index + 1}
                    bgColor={"#FFFFFF"}
                    key={JSON.stringify(submission)}
                    name={submission?.studentID?.name}
                    submissionData={submission?.submission}
                    submission={submission?.submission?.submittedAt}
                    profileLink={submission?.studentID?.profilePic || IMAGES.ProfilePic}
                  />
                })}

                {isSuccess && searchText !== "" && data?.submissions.map((submission, index) => {
                  if (submission.studentID.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())) {
                    return <SubmissionRow
                      isQuiz={false}
                      header={false}
                      index={index + 1}
                      bgColor={"#FFFFFF"}
                      key={JSON.stringify(submission)}
                      profileLink={submission?.studentID?.profilePic || IMAGES.ProfilePic}
                      submission={submission?.submission?.submittedAt}
                      name={submission?.studentID?.name}
                      submissionData={submission?.submission}
                    />
                  }
                })}

                {data?.submissions?.length == 0 && <div className="text-center py-4 text-3xl font-medium">No submissions right now!</div>}

              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Submissions;
