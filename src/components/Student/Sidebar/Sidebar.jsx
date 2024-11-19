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

const Sidebar = () => {

  const navigate = useNavigate();
  const [quizes, setQuizes] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState(false);
  const [dashboard, setDashboard] = useState(true);
  const [timetable, setTimetable] = useState(false);
  const [assignments, setAssignments] = useState(false);

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
    navigate("/");
  };

  const handleReportsClick = async () => {
    setDashboard(false);
    setQuizes(false);
    setReports(true);
    setAssignments(false);
    setTimetable(false);
    navigate("/reports");
  };

  const handleQuizzesClick = async () => {
    setDashboard(false);
    setQuizes(true);
    setReports(false);
    setAssignments(false);
    setTimetable(false);
    navigate("/quizzes");
  };

  const handleAssignmentsClick = async () => {
    setDashboard(false);
    setQuizes(false);
    setReports(false);
    setAssignments(true);
    setTimetable(false);
    navigate("/assignments");
  };

  const handleTimeTableClick = async () => {
    setDashboard(false);
    setQuizes(false);
    setReports(false);
    setAssignments(false);
    setTimetable(true);
    navigate("/timetable");
  };

  const {
    meetingStart,
    setStudentLogedIn,
    setAllAnnouncements,
    setAllQuizes,
    setAllClasses,
    setAllAssignments
  } = useStudent();

  const handleLogoutClick = async () => {
    setLoading(true);
    localStorage.clear();

    setAllQuizes([]);
    setAllClasses([]);
    setAllAssignments([]);
    setStudentLogedIn(false);
    setAllAnnouncements([]);

    const response = await logout();
    if (response == "error") {
      console.log("error loggin out")
      navigate("/login")
    } else {
      localStorage.clear()
      navigate("/login")
    }
    console.log(response)
    setLoading(false);
  };

  useEffect(() => {
    // console.log(window.location.pathname);
  }, [])

  const Menubar = () => (
    <div
      className={`w-72 h-lvh shadow-lg mt-3 bg-white px-4 py-5 flex flex-col justify-between`}
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
          <Custombutton
            icon={"graph"}
            title={"Reports"}
            active={reports}
            onpress={handleReportsClick}
          />
          <Custombutton
            icon={"time"}
            title={"Time Table"}
            active={timetable}
            onpress={handleTimeTableClick}
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
      {meetingStart?.start &&
        <div className="flex flex-col gap-1 h-1/3">
          <div className="flex justify-center">
            <img src={webinar} alt="sidebar images" className="w-2/3" />
          </div>
          <div className="flex flex-col gap-3 text-xs text-center text-maroon">
            <div className="">
              <p>
                Your <span className="font-bold">{meetingStart?.event?.subjectID?.name} </span> calss is in
                progress.
              </p>
              <p>You can instantly join from here.</p>
            </div>
            <div className="flex justify-center">
              <a href={meetingStart?.event.meetLink} target="_blank">
                <div className="flex items-center justify-center w-40 py-2 text-center rounded-md cursor-pointer bg-maroon">
                  <img src={meet} alt="meet png" className="w-1/6" />
                  <p className="text-sm text-white">Join Meeting</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      }
    </div>
  );

  return (
    <div className="flex flex-col">
      <div
        className="px-3 cursor-pointer flex items-center lg:hidden h-20"
        onClick={toggleSidebar}
      >
        <div className="flex justify-center bg-maroon w-9">
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
      <div className="max-lg:hidden">
        <Menubar />
      </div>
    </div>
  );
};

export default Sidebar;
