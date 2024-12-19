import React, { useEffect, useState } from "react";
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
import { useQuery } from "@tanstack/react-query";
import { getAllNotifications } from "../../../api/Admin/NotificationApi";
import moment from "moment";
import { Dot } from "recharts";


const Navbar = ({ heading }) => {

  const [mail, setmail] = useState(false);
  const [bell, setBell] = useState(false);
  const [isProfileMenu, setIsProfileMenu] = useState(false);
  const [isProfileDetails, setIsProfileDetails] = useState(false);
  const [hasNewNotifications, setHasNewNotifications] = useState(false);


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
