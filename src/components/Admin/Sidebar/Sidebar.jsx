import React, { useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import Custombutton from "./Custombutton";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { adminLogout } from "../../../api/Admin/AdminApi";
import Loader from "../../../utils/Loader";
import { useStudent } from "../../../context/StudentContext";
import { useAdmin } from "../../../context/AdminContext";

const Sidebar = () => {
  const navigate = useNavigate();

  const [isopen, setIsopen] = useState(false);
  const [levels, setLevels] = useState(false);
  const [quizes, setQuizes] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState(false);
  const [teachers, setTeachers] = useState(false);
  const [subjects, setSubjects] = useState(false);
  const [dashboard, setDashboard] = useState(true);
  const [classroom, setClassroom] = useState(false);
  const [timetable, setTimetable] = useState(false);
  const [assignments, setAssignments] = useState(false);
  const [manageUsers, setManageUsers] = useState(false);
  const [announcements, setAnnouncements] = useState(false);


  const toggleSidebar = () => {
    console.log("here");
    setIsopen(!isopen);
  };

  const handleDashboardClick = async () => {
    setDashboard(true);
    setManageUsers(false);
    setQuizes(false);
    setTeachers(false);
    setReports(false);
    setClassroom(false);
    setAssignments(false);
    setTimetable(false);
    setAnnouncements(false);
    setLevels(false);
    setSubjects(false);
    navigate("/admin/dashboard");
  };

  const handleReportsClick = async () => {
    setDashboard(false);
    setQuizes(false);
    setTeachers(false);
    setManageUsers(false);
    setAnnouncements(false);
    setReports(true);
    setClassroom(false);
    setAssignments(false);
    setTimetable(false);
    setLevels(false);
    setSubjects(false);
    navigate("/admin/reports");
  };

  const handleManageUsersClick = async () => {
    setDashboard(false);
    setReports(false);
    setClassroom(false);
    setTeachers(false);
    setManageUsers(true);
    setAnnouncements(false);
    setAssignments(false);
    setTimetable(false);
    setLevels(false);
    setSubjects(false);
    navigate("/admin/manageusers");
  };

  const handleAnnouncementClick = async () => {
    setDashboard(false);
    setQuizes(false);
    setReports(false);
    setAnnouncements(true);
    setTeachers(false);
    setManageUsers(false);
    setClassroom(false);
    setTimetable(false);
    setLevels(false);
    setSubjects(false);
    navigate("/admin/announcements");
  };

  const handleTeachersClick = async () => {
    setDashboard(false);
    setQuizes(false);
    setManageUsers(false);
    setReports(false);
    setAnnouncements(false);
    setClassroom(false);
    setTeachers(true);
    setAssignments(false);
    setTimetable(false);
    setLevels(false);
    setSubjects(false);
    navigate("/admin/teachers");
  };

  const handleTimeTableClick = async () => {
    setDashboard(false);
    setQuizes(false);
    setReports(false);
    setTeachers(false);
    setManageUsers(false);
    setClassroom(false);
    setAnnouncements(false);
    setAssignments(false);
    setTimetable(true);
    setLevels(false);
    setSubjects(false);
    navigate("/admin/timetable");
  };

  const handleClassroomClick = async () => {
    setDashboard(false);
    setTeachers(false);
    setManageUsers(false);
    setQuizes(false);
    setReports(false);
    setAnnouncements(false);
    setClassroom(true);
    setAssignments(false);
    setTimetable(false);
    setLevels(false);
    setSubjects(false);
    navigate("/admin/classrooms");
  };

  const handleLevelsClick = async () => {
    setDashboard(false);
    setTeachers(false);
    setManageUsers(false);
    setQuizes(false);
    setReports(false);
    setAnnouncements(false);
    setClassroom(false);
    setAssignments(false);
    setTimetable(false);
    setLevels(true);
    setSubjects(false);
    navigate("/admin/levels");
  };

  const handleSubjectsClick = async () => {
    setDashboard(false);
    setTeachers(false);
    setManageUsers(false);
    setQuizes(false);
    setReports(false);
    setAnnouncements(false);
    setClassroom(false);
    setAssignments(false);
    setTimetable(false);
    setLevels(false);
    setSubjects(true);
    navigate("/admin/subjects");
  };

  const {
    setAllClassrooms,
    setAdminLogedIn,
    setAdminUsersdata,
  } = useAdmin();

  const handleLogoutClick = async () => {
    setLoading(true)
    await adminLogout();
    localStorage.clear();
    setAdminLogedIn(false);
    // setAllClassrooms([]);
    // setAdminUsersdata([]);
    navigate("/admin/login");
    setLoading(false)
  };

  const Menubar = () => (
    <div
      className={`w-72  shadow-lg bg-white z-50 md:h-screen  px-8 py-5 `}
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
            icon={"time"}
            title={"Time Table"}
            active={timetable}
            onpress={handleTimeTableClick}
          />
          <Custombutton
            icon={"graph"}
            title={"Student"}
            active={reports}
            onpress={handleReportsClick}
          />
          <Custombutton
            icon={"book"}
            title={"Teachers"}
            active={teachers}
            onpress={handleTeachersClick}
          />
          <Custombutton
            icon={"quiz"}
            title={"Announcements"}
            active={announcements}
            onpress={handleAnnouncementClick}
          />
          <Custombutton
            icon={"quiz"}
            title={"Manage Users"}
            active={manageUsers}
            onpress={handleManageUsersClick}
          />
          <Custombutton
            icon={"quiz"}
            title={"Levels"}
            active={levels}
            onpress={handleLevelsClick}
          />
          <Custombutton
            icon={"quiz"}
            title={"Subjects"}
            active={subjects}
            onpress={handleSubjectsClick}
          />
          <Custombutton
            icon={"quiz"}
            title={"Classroom"}
            active={classroom}
            onpress={handleClassroomClick}
          />
        </div>
        {loading && <div className="flex flex-1"> <Loader /> </div>}
        {!loading &&
          <div
            onClick={handleLogoutClick}
            className={`flex items-center gap-4 px-5 py-3 text-lg rounded-md cursor-pointer text-maroon`}
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
        className="px-3 py-3 cursor-pointer lg:hidden h-20 flex items-center justify-center"
        onClick={toggleSidebar}
      >
        <div className="flex justify-center bg-maroon w-9 h-fit">
          <div className="flex flex-col gap-2 py-2">
            <p className="w-6 bg-white h-0.5"></p>
            <p className="w-6 bg-white h-0.5"></p>
            <p className="w-6 bg-white h-0.5"></p>
          </div>
        </div>
      </div>
      <div className={`lg:hidden ${isopen ? "block" : "hidden"} fixed top-16`}>
        <Menubar />
      </div>
      <div className="max-lg:hidden ">
        <Menubar />
      </div>
    </div>
  );
};

export default Sidebar;
