import React, { useState } from "react";
import ProfileMenu from "./ProfileMenu";
import Notifications from "./Notifications";
import ProfileDetails from "./ProfileDetails";
import profile from "../../assets/images/profilepic.png";

import RecentMessages from "./Dashboard/RecentMessages";

import { CiBellOn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { IoMailOutline } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa6";
import { userLogout } from "../../api/ForAllAPIs";
import { useBlur } from "../../context/BlurContext";
import { useUser } from "../../context/UserContext";

const Navbar = ({ heading }) => {

  const [mail, setmail] = useState(false);
  const [bell, setBell] = useState(false);
  const [isProfileMenu, setIsProfileMenu] = useState(false);
  const [isProfileDetails, setIsProfileDetails] = useState(false);

  const { isBlurred, toggleBlur } = useBlur();
  const { userData } = useUser();

  const toggleProfielMenu = () => {
    setIsProfileMenu(!isProfileMenu);
    setmail(false);
    setBell(false);
  };

  const toggleMail = () => {
    toggleBlur();
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
  const onSettingsClick = () => { };

  const onLogoutClick = async () => {
    localStorage.clear();
    navigate("/admin/login");
    await userLogout()
  };

  return (
    <>
      <div className="flex flex-1 h-20">
        <div className={`flex justify-end  md:justify-between flex-1 px-4 ${isBlurred ? "blur" : ""}`}>
          <div className="md:flex flex-col hidden items-center justify-center md:justify-center md:items-start  ">
            {heading ?
              <div className="ml-14">
                <p className="font-medium text-3xl">{heading}</p>
              </div> :
              <div className="hidden md:flex flex-col">
                <p className="text-xl font-semibold">Hello {userData.name} </p>
                <p className="">Welcome to your learning space!</p>
              </div>
            }
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-4">
              <div
                className={`p-2 border cursor-pointer rounded-md border-black/50 transition-all duration-500 ${mail ? "bg-maroon text-white" : ""
                  }`}
                onClick={toggleMail}
              >
                <IoMailOutline />
              </div>
              <div
                className={`p-2 border cursor-pointer rounded-md border-black/50 transition-all duration-500 ${bell ? "bg-maroon text-white" : ""
                  }`}
                onClick={togglebell}
              >
                <CiBellOn />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <p className="font-medium">M. {userData.name}</p>
              <img
                src={userData.profilePic || profile}
                alt="profile"
                className="w-12 h-12 cursor-pointer rounded-full"
                onClick={toggleProfielMenu}
              />
              <FaChevronDown
                className="cursor-pointer"
                onClick={toggleProfielMenu}
              />
            </div>
            {bell && <Notifications dashboard={true} onclose={togglebell} />}
            {isProfileMenu &&
              <ProfileMenu
                dashboard={true}
                onLogoutClick={onLogoutClick}
                onProfileClick={onProfileClick}
                onSettingsClick={onSettingsClick}
              />
            }
          </div>
        </div>
        {mail && <RecentMessages dashboard={true} onclose={toggleMail} />}
        {isProfileDetails && <ProfileDetails onclose={toggleProfileDetails} />}
      </div>
    </>
  );
};

export default Navbar;
