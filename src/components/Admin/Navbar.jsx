import React, { useState } from "react";
import ProfileMenu from "./ProfileMenu";
import Notifications from "./Notifications";
import ProfileDetails from "./ProfileDetails";
import profile from "../../assets/profile.png";
import RecentMessages from "./Dashboard/RecentMessages";

import { CiBellOn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { IoMailOutline } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa6";
import { userLogout } from "../../api/ForAllAPIs";
import { useUser } from "../../context/UserContext";
import { useBlur } from "../../context/BlurContext";


const Navbar = ({ heading }) => {

  const [mail, setmail] = useState(false);
  const [bell, setBell] = useState(false);
  const [isProfileMenu, setIsProfileMenu] = useState(false);
  const [isProfileDetails, setIsProfileDetails] = useState(false);
  const navigate = useNavigate();
  const { userData } = useUser();
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

  const onLogoutClick = async () => {
    localStorage.clear();
    await userLogout();
    navigate("/admin/login");
  };

  return (
    <>
      <div className="flex flex-1 h-20">
        <div className={`flex justify-between flex-1 py-5 ${isBlurred ? "blur" : ""}`}>
          <div className="flex flex-col">
            <p className="text-2xl font-medium">{heading} </p>
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
              <p className="font-medium">{userData.name}</p>
              <img
                src={userData.profilePic || profile}
                alt=""
                className="w-12 h-12 cursor-pointer rounded-full"
                onClick={toggleProfielMenu}
              />
              <FaChevronDown
                className="cursor-pointer"
                onClick={toggleProfielMenu}
              />
            </div>
            {bell && <Notifications dashboard={true} onclose={togglebell} /> }
            {mail && <RecentMessages dashboard={true} onclose={toggleMail} /> }
            {isProfileMenu &&
              <ProfileMenu
                onProfileClick={onProfileClick}
                onSettingsClick={onSettingsClick}
                onLogoutClick={onLogoutClick}
                dashboard={true}
              />}
          </div>
        </div>
      </div>
      {isProfileDetails && <ProfileDetails onclose={toggleProfileDetails} />}
    </>

  );
};

export default Navbar;
