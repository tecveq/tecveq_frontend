import React, { useEffect, useState } from "react";
import ProfileMenu from "./ProfileMenu";
import Notifications from "./Notifications";
import ProfileDetails from "./ProfileDetails";

import { CiBellOn } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa6";
import { IoMailOutline } from "react-icons/io5";
import { useBlur } from "../../../context/BlurContext";
import { useUser } from "../../../context/UserContext";
import { useQuery } from "@tanstack/react-query";
import { getAllNotifications } from "../../../api/ForAllAPIs";
import { toast } from "react-toastify";
import { logout } from "../../../api/User/UserApi";
import { useNavigate } from "react-router-dom";
import IMAGES from "../../../assets/images";


const Navbar = ({ heading }) => {

  const [mail, setmail] = useState(false);
  const [bell, setBell] = useState(false);
  const [isProfileMenu, setIsProfileMenu] = useState(false);
  const [isProfileDetails, setIsProfileDetails] = useState(false);

  const navigate = useNavigate();

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

  const onLogoutClick = async () => {

    const response = await logout();
    if (response == "error") {
      navigate("/login")
    } else {
      localStorage.clear()
      toast.success("Logged out successfully!");
      navigate("/login")
    }
    console.log(response)
  };

  const notifyQuery = useQuery({
    queryKey: ["notifications"],
    queryFn: getAllNotifications,
    staleTime: 300000,enabled: false
  })

  const [allNotfications, setAllNotifications] = useState([]);

  useEffect(() => {
    if (notifyQuery.isSuccess) {
      setAllNotifications(notifyQuery.data);
    }
  }, [notifyQuery.isSuccess, notifyQuery.data])

  return (
    <div className="flex flex-1 h-20">
      <div className={`flex justify-between flex-1 py-5 ${isBlurred ? "blur" : ""}`}>
        <div className="flex flex-col">
          {heading ? <div className="font-medium text-3xl">{heading} </div> :
            <div className="flex flex-col">
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
            <p className="font-medium">{userData.name}</p>
            <img
              src={userData?.profilePic || IMAGES.Profile}
              alt=""
              className="w-12 h-12 cursor-pointer rounded-full"
              onClick={toggleProfielMenu}
            />
            <FaChevronDown
              className="cursor-pointer"
              onClick={toggleProfielMenu}
            />
          </div>

          {mail && <Notifications data={allNotfications} dashboard={true} onclose={toggleMail} />}
          {isProfileMenu && <ProfileMenu
            dashboard={true}
            onLogoutClick={onLogoutClick}
            onProfileClick={onProfileClick}
            onSettingsClick={onSettingsClick}
          />}
        </div>
      </div>
      {isProfileDetails && <ProfileDetails onclose={toggleProfileDetails} />}
    </div>
  );
};

export default Navbar;
