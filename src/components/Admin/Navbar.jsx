import React, { useEffect, useState } from "react";
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
import { useQuery } from "@tanstack/react-query";
import { getAllNotifications } from "../../api/Admin/NotificationApi";
import moment from "moment";
import { Dot } from "recharts";


const Navbar = ({ heading }) => {

  const [mail, setmail] = useState(false);
  const [bell, setBell] = useState(false);
  const [isProfileMenu, setIsProfileMenu] = useState(false);
  const [isProfileDetails, setIsProfileDetails] = useState(false);
  const [hasNewNotifications, setHasNewNotifications] = useState(false);
  const navigate = useNavigate();
  const { userData } = useUser();
  const { isBlurred, toggleBlur } = useBlur();

  const { data } = useQuery({ queryKey: ["chat"], queryFn: getAllNotifications });

  useEffect(() => {
    if (data) {
      // Check if there's a new notification (received within the last 5 minutes)
      const isNewNotification = data.some((item) => moment().diff(moment(item.createdAt), 'minutes') < 2);
      setHasNewNotifications(isNewNotification);
    }
  }, [data]);

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
    setHasNewNotifications(false);
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
          <div className="flex flex-col justify-center">
            <p className="text-sm  ml-10 md:ml-0 md:text-2xl font-medium">{heading} </p>
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
              <div className="relative">
                <div
                  className={`p-2 border cursor-pointer rounded-md border-black/50 transition-all duration-500 `}
                  onClick={togglebell}
                >
                  <div className={`${hasNewNotifications ? "animate-bellShake text-green_dark" : ""}`}>
                    <CiBellOn />
                  </div>

                </div>
                {hasNewNotifications && (
                  <div className="absolute top-1 right-1 w-[9px] h-[9px] rounded-full bg-green"><Dot /></div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <p className="font-medium hidden md:block">{userData.name}</p>
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
            {bell && <Notifications dashboard={true} onclose={togglebell} />}
            {isProfileMenu &&
              <ProfileMenu
                onProfileClick={onProfileClick}
                onSettingsClick={onSettingsClick}
                onLogoutClick={onLogoutClick}
                dashboard={true}
                userData={userData}
              />}
          </div>
        </div>
      </div>
      {mail && <RecentMessages dashboard={true} onclose={toggleMail} />}
      {isProfileDetails && <ProfileDetails onclose={toggleProfileDetails} />}
    </>

  );
};

export default Navbar;
