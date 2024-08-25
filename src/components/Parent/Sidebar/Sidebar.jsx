import React, { useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import Custombutton from "./Custombutton";
import logo from "../../../assets/logo.png";
import webinar from "../../../assets/webinar.png";
import meet from "../../../assets/meet.png";
import { useNavigate } from "react-router-dom";
import Loader from "../../../utils/Loader";
import { logout } from "../../../api/User/UserApi";

const Sidebar = () => {
  const navigate = useNavigate();
  const [quizes, setQuizes] = useState(false);
  const [timetable, setTimetable] = useState(false);
  const [reports, setReports] = useState(false);
  const [assignments, setAssignments] = useState(false);
  const [dashboard, setDashboard] = useState(true);
  const [loading, setLoading] = useState(false);

  const [isopen, setIsopen] = useState(false);

  const toggleSidebar = () => {
    console.log("here");
    setIsopen(!isopen);
  };

  const handleDashboardClick = async () => {
    setDashboard(true);
    setQuizes(false);
    setReports(false);
    setAssignments(false);
    setTimetable(false);
    navigate("/parent/dashboard");
  };

  const handleReportsClick = async () => {
    setDashboard(false);
    setQuizes(false);
    setReports(true);
    setAssignments(false);
    setTimetable(false);
    navigate("/parent/reports");
  };

  const handleQuizzesClick = async () => {
    setDashboard(false);
    setQuizes(true);
    setReports(false);
    setAssignments(false);
    setTimetable(false);
    navigate("/parent/quizzes");
  };

  const handleAssignmentsClick = async () => {
    setDashboard(false);
    setQuizes(false);
    setReports(false);
    setAssignments(true);
    setTimetable(false);
    navigate("/parent/assignments");
  };


  const handleLogoutClick = async () => {
    setLoading(true);
    localStorage.clear();
    const response = await logout();
    if (response == "error") {
      console.log("error loggin out")
      navigate("/login")
    } else {
      localStorage.clear()
      navigate("/login")
    }
    setLoading(false);
  };

  const Menubar = () => (
    <div
      className={`w-72 h-lvh shadow-lg bg-white px-8 py-5 flex flex-col justify-between`}
    >
      <div className="">
        <div className="flex justify-center">
          <img className="w-5/12 h-5/12" src={logo} alt="logo-TCA" />
        </div>
        <div className="flex flex-col gap-1 py-2 border-b border-b-black">
          <Custombutton
            icon={"home"}
            title={"Dashboard"}
            active={dashboard}
            onpress={handleDashboardClick}
          />
          <Custombutton
            icon={"graph"}
            title={"Reports"}
            active={reports}
            onpress={handleReportsClick}
          />
          <Custombutton
            icon={"book"}
            title={"Assignments"}
            active={assignments}
            onpress={handleAssignmentsClick}
          />
          <Custombutton
            icon={"quiz"}
            title={"Quizzes"}
            active={quizes}
            onpress={handleQuizzesClick}
          />
        </div>
        {loading && <div className="flex flex-1"> <Loader /> </div>}
        {!loading &&
          <div
            onClick={handleLogoutClick}
            className={`flex items-center  gap-4 px-5 py-3 text-lg rounded-md cursor-pointer text-maroon`}
          >
            <IoIosLogOut />
            <p>Logout</p>
          </div>
        }
      </div>
    </div>
  );

  return (
    <div className="flex flex-col">
      <div
        className="px-3 py-3 cursor-pointer lg:hidden h-14"
        onClick={toggleSidebar}
      >
        <div className="flex justify-center bg-maroon w-14">
          <div className="flex flex-col gap-2 py-3">
            <p className="w-9 bg-white h-0.5"></p>
            <p className="w-9 bg-white h-0.5"></p>
            <p className="w-9 bg-white h-0.5"></p>
          </div>
        </div>
      </div>
      <div className={`lg:hidden ${isopen ? "block" : "hidden"} fixed top-16`}>
        <Menubar />
      </div>
      <div className="max-lg:hidden">
        <Menubar />
      </div>
    </div>
  );
};

export default Sidebar;
