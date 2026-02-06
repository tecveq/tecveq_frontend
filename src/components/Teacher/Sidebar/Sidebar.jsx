import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Custombutton from "./Custombutton";
import logo from "../../../assets/logo.png";
import { IoIosLogOut } from "react-icons/io";
import { userLogout } from "../../../api/ForAllAPIs";
import Loader from "../../../utils/Loader";
import { useTeacher } from "../../../context/TeacherContext";
import { useSidebar } from "../../../context/SidebarContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { setTeacherLogedIn } = useTeacher();
  const { isSidebarOpen, setIsSidebarOpen, isopen, setIsopen } = useSidebar();
  const [loading, setLoading] = useState(false);
  const [activeButton, setActiveButton] = useState("home"); // Default active button

  // Load active button from localStorage on mount
  useEffect(() => {
    const storedActiveButton = localStorage.getItem("activeButton");
    if (storedActiveButton) {
      setActiveButton(storedActiveButton);
    }
  }, []);

  const handleButtonClick = (buttonKey, route) => {
    setActiveButton(buttonKey);
    localStorage.setItem("activeButton", buttonKey);
    setIsopen(false); // Close sidebar on mobile view
    navigate(route);
  };

  const handleLogoutClick = async () => {
    setLoading(true);
    localStorage.clear();
    setTeacherLogedIn(false);
    await userLogout();
    navigate("/admin/login");
    setLoading(false);
  };

  const menuItems = [
    { key: "home", title: "Dashboard", icon: "home", route: "/teacher/dashboard" },
    { key: "time", title: "Time Table", icon: "time", route: "/teacher/timetable" },
    { key: "graph", title: "Student Reports", icon: "graph", route: "/teacher/reports" },
    { key: "book", title: "Assignments", icon: "book", route: "/teacher/assignments" },
    { key: "quiz", title: "Quizzes", icon: "quiz", route: "/teacher/quizzes" },
    { key: "attendence", title: "Attendance", icon: "quiz", route: "/teacher/attendence" },
    { key: "classroom", title: "Classroom", icon: "quiz", route: "/teacher/classroom" },
  ];

  const Menubar = () => (
    <div className="w-72 shadow-lg z-index px-8 py-5 mt-4 bg-white md:h-screen">
      <div className="h-full z-50">
        <div className="flex justify-center">
          <img className="w-5/12 h-5/12" src={logo} alt="logo-TCA" />
        </div>
        <div className="flex flex-col h-full gap-1 py-2 border-b border-b-black">
          {menuItems.map(({ key, title, icon, route }) => (
            <Custombutton
              key={key}
              icon={icon}
              title={title}
              active={activeButton === key}
              onpress={() => handleButtonClick(key, route)}
            />
          ))}
        </div>
        {loading ? (
          <div className="flex"><Loader /></div>
        ) : (
          <div onClick={handleLogoutClick} className="flex items-center gap-4 px-5 py-3 text-lg rounded-md cursor-pointer text-[#0B1053]">
            <IoIosLogOut />
            <p>Logout</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col">
      <div className="px-3 py-3 cursor-pointer lg:hidden h-20 flex justify-center items-center" onClick={() => {
        setIsopen(!isopen)
        setIsSidebarOpen(!isSidebarOpen)
      }
      }>
        <div className="flex justify-center bg-[#0B1053] w-9 h-fit">
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
    </div >
  );
};

export default Sidebar;
