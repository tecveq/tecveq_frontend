import React, { useState, useEffect } from "react";
import { IoIosLogOut } from "react-icons/io";
import Custombutton from "./Custombutton";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { adminLogout } from "../../../api/Admin/AdminApi";
import Loader from "../../../utils/Loader";
import { useAdmin } from "../../../context/AdminContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { setAdminLogedIn } = useAdmin();

  const [isopen, setIsopen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  // Load active tab from localStorage on mount
  useEffect(() => {
    const storedTab = localStorage.getItem("activeTab");
    if (storedTab) setActiveTab(storedTab);
  }, []);

  const handleMenuClick = (tab, route) => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);
    setIsopen(false);
    navigate(route);
  };

  const handleLogoutClick = async () => {
    setLoading(true);
    await adminLogout();
    localStorage.clear();
    setAdminLogedIn(false);
    navigate("/admin/login");
    setLoading(false);
  };

  const menuItems = [
    { key: "dashboard", title: "Dashboard", icon: "home", route: "/admin/dashboard" },
    { key: "timetable", title: "Time Table", icon: "time", route: "/admin/timetable" },
    { key: "reports", title: "Student", icon: "graph", route: "/admin/reports" },
    { key: "teachers", title: "Teachers", icon: "book", route: "/admin/teachers" },
    { key: "announcements", title: "Announcements", icon: "quiz", route: "/admin/announcements" },
    { key: "manageUsers", title: "Manage Users", icon: "quiz", route: "/admin/manageusers" },
    { key: "levels", title: "Levels", icon: "quiz", route: "/admin/levels" },
    { key: "subjects", title: "Subjects", icon: "quiz", route: "/admin/subjects" },
    { key: "classroom", title: "Classroom", icon: "quiz", route: "/admin/classrooms" },
    { key: "settings", title: "Settings", icon: "setting", route: "/admin/settings" }
  ];

  const Menubar = () => (
    <div className="w-72 shadow-lg bg-white z-50 md:h-screen px-8 py-5 overflow-y-auto custom-scrollbar">
      <div className="flex justify-center">
        <img className="w-5/12 h-5/12" src={logo} alt="logo-TCA" />
      </div>
      <div className="flex flex-col gap-1 py-2 border-b border-b-black">
        {menuItems.map(({ key, title, icon, route }) => (
          <Custombutton
            key={key}
            icon={icon}
            title={title}
            active={activeTab === key}
            onpress={() => handleMenuClick(key, route)}
          />
        ))}
      </div>
      {loading ? (
        <div className="flex flex-1"><Loader /></div>
      ) : (
        <div
          onClick={handleLogoutClick}
          className="flex items-center gap-4 px-5 py-3 text-lg rounded-md cursor-pointer text-maroon"
        >
          <IoIosLogOut />
          <p>Logout</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col">
      <div className="px-3 py-3 cursor-pointer lg:hidden h-20 flex items-center justify-center" onClick={() => setIsopen(!isopen)}>
        <div className="flex justify-center bg-maroon w-9 h-fit">
          <div className="flex flex-col gap-2 py-2">
            <p className="w-6 bg-white h-0.5"></p>
            <p className="w-6 bg-white h-0.5"></p>
            <p className="w-6 bg-white h-0.5"></p>
          </div>
        </div>
      </div>
      <div className={`lg:hidden ${isopen ? "block" : "hidden"} z-50 bg-white fixed top-16`}>
        <Menubar />
      </div>
      <div className="max-lg:hidden">
        <Menubar />
      </div>
    </div>
  );
};

export default Sidebar;