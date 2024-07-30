import React, { useContext, useState } from "react";
import { IoMailOutline } from "react-icons/io5";
import { CiBellOn } from "react-icons/ci";
import profile from "../../../assets/profile.png";
import { FaChevronDown } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import ProfileDetails from "./ProfileDetails";
import Notifications from "./Notifications";
import { useBlur } from "../../../context/BlurContext";

const Navbar = () => {
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
  const onSettingsClick = () => {};
  const onLogoutClick = () => {};

  return (
    <div className="flex flex-1 h-20">
      <div className={`flex justify-between flex-1 py-5 ${isBlurred?"blur":""}`}>
        <div className="flex flex-col">
          <p className="text-xl font-semibold">Hello Muneeb</p>
          <p className="">Welcome to your learning space!</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-4">
            <div
              className={`p-2 border cursor-pointer rounded-md border-black/50 transition-all duration-500 ${
                mail ? "bg-maroon text-white" : ""
              }`}
              onClick={toggleMail}
            >
              <IoMailOutline />
            </div>
            <div
              className={`p-2 border cursor-pointer rounded-md border-black/50 transition-all duration-500 ${
                bell ? "bg-maroon text-white" : ""
              }`}
              onClick={togglebell}
            >
              <CiBellOn />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-medium">M. Haseeb</p>
            <img
              src={profile}
              alt=""
              className="w-12 h-12 cursor-pointer"
              onClick={toggleProfielMenu}
            />
            <FaChevronDown
              className="cursor-pointer"
              onClick={toggleProfielMenu}
            />
          </div>
          {mail ? <Notifications dashboard={true} onclose={toggleMail} /> : ""}
          {isProfileMenu ? (
            <ProfileMenu
              onProfileClick={onProfileClick}
              onSettingsClick={onSettingsClick}
              onLogoutClick={onLogoutClick}
              dashboard={true}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      {isProfileDetails ? (
        <ProfileDetails onclose={toggleProfileDetails} />
      ) : (
        ""
      )}
    </div>
  );
};

export default Navbar;
