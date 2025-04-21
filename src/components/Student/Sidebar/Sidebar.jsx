import React, { useEffect, useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import Custombutton from "./Custombutton";
import logo from "../../../assets/logo.png";
import webinar from "../../../assets/webinar.png";
import meet from "../../../assets/meet.png";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../api/User/UserApi";
import { useStudent } from "../../../context/StudentContext";
import Loader from "../../../utils/Loader";
import { useSidebar } from "../../../context/SidebarContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { isSidebarOpen, setIsSidebarOpen, isopen, setIsopen } = useSidebar();
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem("activeTab") || "dashboard");

  const menuItems = [
    { key: "dashboard", icon: "home", title: "Dashboard", path: "/" },
    { key: "assignments", icon: "book", title: "Assignments", path: "/assignments" },
    { key: "quizzes", icon: "quiz", title: "Quizzes", path: "/quizzes" },
    { key: "reports", icon: "graph", title: "Reports", path: "/reports" },
    { key: "timetable", icon: "time", title: "Time Table", path: "/timetable" },
  ];

  const handleMenuClick = (key, path) => {
    setActiveTab(key);
    localStorage.setItem("activeTab", key);
    navigate(path);
  };

  const { meetingStart, setStudentLogedIn, setAllAnnouncements, setAllQuizes, setAllClasses, setAllAssignments } = useStudent();

  const handleLogoutClick = async () => {
    setLoading(true);
    localStorage.clear();

    setAllQuizes([]);
    setAllClasses([]);
    setAllAssignments([]);
    setStudentLogedIn(false);
    setAllAnnouncements([]);

    const response = await logout();
    navigate("/login");
    setLoading(false);
  };

  const toggleSidebar = () => setIsopen(!isopen);

  const Menubar = () => (
    <div className="w-72 h-lvh shadow-lg mt-3 bg-white px-4 py-5 flex flex-col justify-between">
      <div>
        <div className="flex justify-center">
          <img className="w-5/12 h-5/12" src={logo} alt="logo-TCA" />
        </div>
        <div className="flex flex-col gap-1 py-2 border-b border-b-black">
          {menuItems.map(({ key, icon, title, path }) => (
            <Custombutton key={key} icon={icon} title={title} active={activeTab === key} onpress={() => handleMenuClick(key, path)} />
          ))}
        </div>
        {loading ? <Loader /> : (
          <div onClick={handleLogoutClick} className="flex items-center gap-4 px-5 py-3 text-lg rounded-md cursor-pointer text-maroon">
            <IoIosLogOut />
            <p>Logout</p>
          </div>
        )}
      </div>
      {meetingStart?.start && (
        <div className="flex flex-col gap-1 h-1/3">
          <div className="flex justify-center">
            <img src={webinar} alt="sidebar images" className="w-2/3" />
          </div>
          <div className="flex flex-col gap-3 text-xs text-center text-maroon">
            <p>Your <span className="font-bold">{meetingStart?.event?.subjectID?.name}</span> class is in progress.</p>
            <p>You can instantly join from here.</p>
            <div className="flex justify-center">
              <a href={meetingStart?.event.meetLink} target="_blank" rel="noopener noreferrer">
                <div className="flex items-center justify-center w-40 py-2 text-center rounded-md cursor-pointer bg-maroon">
                  <img src={meet} alt="meet png" className="w-1/6" />
                  <p className="text-sm text-white">Join Meeting</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col">
      <div className="px-3 cursor-pointer flex items-center lg:hidden h-20" onClick={() => {
        toggleSidebar()
        setIsSidebarOpen(!isSidebarOpen)
      }}>
        <div className="flex justify-center bg-maroon w-9">
          <div className="flex flex-col gap-2 py-2">
            <p className="w-6 bg-white h-0.5"></p>
            <p className="w-6 bg-white h-0.5"></p>
            <p className="w-6 bg-white h-0.5"></p>
          </div>
        </div>
      </div>
      <div className={`lg:hidden ${isSidebarOpen ? "block" : "hidden"} fixed top-16`}>
        <Menubar />
      </div>
      <div className="max-lg:hidden">
        <Menubar />
      </div>
    </div>
  );
};

export default Sidebar;