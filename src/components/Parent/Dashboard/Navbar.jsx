import React, { useState } from "react";
import ProfileMenu from "./ProfileMenu";
import Notifications from "./Notifications";
import ProfileDetails from "./ProfileDetails";
import profile from "../../../assets/profile.png";

import { CiBellOn } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa6";
import { IoMailOutline } from "react-icons/io5";
import { useBlur } from "../../../context/BlurContext";
import { useUser } from "../../../context/UserContext";
import RecentMessages from "./RecentMessages";


const Navbar = ({heading}) => {
  
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

  const { userData } = useUser();

  return (
    <div className="flex flex-1 h-20">
      <div className={`flex justify-between flex-1 py-5 ${isBlurred ? "blur" : ""}`}>
        {heading ? 
        <div className="flex text-3xl font-semibold">{heading}</div>
      :
        <div className=" flex-col hidden md:flex">
          <p className="text-xl font-semibold">Hello {userData.name} </p>
          <p className="">Welcome to your learning space!</p>
        </div>
        }
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
            <p className="font-medium">M. {userData.name} </p>
            <img
              alt=""
              src={profile}
              onClick={toggleProfielMenu}
              className="w-12 h-12 cursor-pointer"
            />
            <FaChevronDown
              className="cursor-pointer"
              onClick={toggleProfielMenu}
            />
          </div>
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
      {bell && <Notifications dashboard={true} onclose={togglebell} />}
      {mail && <RecentMessages dashboard={true} onclose={toggleMail} />}
      {isProfileDetails && <ProfileDetails onclose={toggleProfileDetails} />}
    </div>
  );
};

export default Navbar;
