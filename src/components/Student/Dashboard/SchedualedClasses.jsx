import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import meet from "../../../assets/meet.png";

import { FiClock } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useStudent } from "../../../context/StudentContext";
import moment from "moment/moment";


const ScheduledClasses = () => {

  const { allClasses, classesRefetch, classeIsPending } = useStudent();

  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredclasses, setFilteredClasses] = useState([]);

  const handleJoinClass = () => { };

  const filterClasses = () => {
    console.log("selected Date is : ", selectedDate);
    let arr = []
    // if(!classeIsPending){
      arr = allClasses.filter((item) => new Date(item.startTime).toDateString() == selectedDate);
      console.log(arr);
      setFilteredClasses(arr);
    // }
  }

  useEffect(() => {
    if(allClasses.length == 0){
      // classesRefetch();
    }else{
      filterClasses();
    }
  }, [selectedDate, allClasses])

  const EventComponet = ({ item }) => {

    const [isStarted, setIsStarted] = useState(false);

    useEffect(() => {

      let nowTime = new Date();
      let eventTime = new Date(item.startTime);
      let eventEndTime = new Date(item.endTime);

      if (eventTime.getMonth() == nowTime.getMonth()) {
        if (eventTime.getDate() == nowTime.getDate()) {
          if (eventTime.getTime() < nowTime.getTime() && nowTime.getTime() < eventEndTime.getTime()) {
            setIsStarted(true);
          }
        }
      }

    }, [])


    return (
      <div
        className={`flex flex-col  w-full px-6  text-xs border-l-2 gap-1 ${item.subjectID.name == "PF"
          ? "border-l-maroon bg-maroon_100"
          : item.subjectID.name == "ICT"
            ? "border-l-orange bg-orange_light"
            : item.subjectID.name == "Biology"
              ? "border-l-green bg-green/10"
              : "border-l-green bg-green/10"
          }  px-2 py-2 rounded-lg w-60`}
      >
        <div className="flex justify-between">
          <p>{item.subjectID.name}</p>
          <p>{item.teacher.teacherID.name}</p>
        </div>
        <div className="text-sm font-medium">
          <p>{item.title} </p>
        </div>

        {isStarted ? (
          <div className="flex items-center justify-between">
            <p className={`${item.subjectID.name == "PF"
              ? "border-l-maroon text-maroon"
              : item.subjectID.name == "ICT"
                ? "border-l-orange text-orange"
                : item.subjectID.name == "Biology"
                  ? " text-green"
                  : " text-green"
              }`}>class has started...</p>
            <div>
              <a href={item.meetLink} target="_blank">
                <div
                  className={`flex items-center justify-center px-2 py-1 text-center cursor-pointer ${item.subjectID.name == "PF"
                    ? "border-l-maroon bg-maroon"
                    : item.subjectID.name == "ICT"
                      ? "border-l-orange bg-orange"
                      : item.subjectID.name == "Biology"
                        ? "border-l-green bg-green"
                        : "border-l-green bg-green"
                    }  rounded-3xl`}
                >
                  <img src={meet} alt="" className="w-8 h-3" />
                  <p className="text-white " style={{ fontSize: 8 }}>
                    Join class
                  </p>
                </div>
              </a>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <FiClock />
            <p>{moment.utc(item.startTime).format("hh:mm a")} </p>
            <p>-</p>
            <p>{moment.utc(item.endTime).format("hh:mm a")} </p>
          </div>
        )}
      </div>
    );
  };

  const CustomCalender = ({ setSelectedDateFromChild, classesArray }) => {

    const [selectedDate, setSelectedDate] = useState(dayjs());

    const [dateForEvent, setDateForEvent] = useState("");


    const renderDays = () => {
      const startOfMonth = selectedDate.startOf("month");
      const endOfMonth = selectedDate.endOf("month");

      const days = [];
      let currentDay = startOfMonth;
      if (currentDay.format("d") > 3) {
        let iter = currentDay.format("d");
        let prevmonth = currentDay.subtract(iter, "day");
        for (let i = 0; i < iter; i++) {
          prevmonth = prevmonth.add(1, "day");
          days.push(prevmonth);
        }
      }
      currentDay = currentDay.add(1, "day");

      while (currentDay.isBefore(endOfMonth, "day")) {
        days.push(currentDay);
        currentDay = currentDay.add(1, "day");
      }

      return days.map((day) => {

        const formattedDate = day.toDate().toDateString();

        const eventsForDay = classesArray
          ? classesArray.filter((event) => new Date(event.startTime).toDateString() === formattedDate)
          : [];

        return (
          <div
            key={formattedDate}
            className={`text-center text-[12px] text-black cursor-pointer hover:bg-gray-200 relative`}
            onClick={() => {
              setSelectedDate(day);
              setDateForEvent(formattedDate);
              setSelectedDateFromChild(formattedDate);
            }}
          >
            <div className={`flex flex-col w-10 h-10 items-center px-5 py-1 ${selectedDate.toDate() == formattedDate ? "bg-maroon text-white" : ""} text-xs group text-maroon hover:bg-maroon hover:text-white rounded-3xl`}>
              <div className="text-sm text-black group-hover:text-white">{day.format("D")}</div>

              {eventsForDay && eventsForDay?.length > 0 ?
                <GoDotFill size={10} className="group-hover:text-white" />
                : ""}
            </div>
          </div>
        );
      });
    };

    return (
      <div className="text-black">
        <div className="flex items-center justify-between mb-4">
          <p
            className=""
            onClick={() => setSelectedDate(selectedDate.subtract(1, "month"))}
          >
            <MdKeyboardArrowLeft className="" size={20} />
          </p>
          <h2 className="text-sm">{selectedDate.format("MMMM YYYY")}</h2>
          <p
            className=""
            onClick={() => setSelectedDate(selectedDate.add(1, "month"))}
          >
            <MdKeyboardArrowRight className="" size={20} />
          </p>
        </div>

        <div className="relative grid grid-cols-7 gap-2 ">
          <div className="text-center font-semibold text-[10px] ">Mon</div>
          <div className="text-center font-semibold text-[10px] ">Tue</div>
          <div className="text-center font-semibold text-[10px] ">Wed</div>
          <div className="text-center font-semibold text-[10px] ">Thu</div>
          <div className="text-center font-semibold text-[10px] ">Fri</div>
          <div className="text-center font-semibold text-[10px] ">Sat</div>
          <div className="text-center font-semibold text-[10px] ">Sun</div>
          {renderDays()}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 gap-2">
        <div className="flex">
          <p className="flex text-lg font-medium">Scheduled Classes</p>
        </div>
        <div className="flex flex-col gap-1 p-3 bg-white rounded-lg -z-50 lg:flex-row">
          <div className="flex-1 p-2 ">
            <CustomCalender setSelectedDateFromChild={setSelectedDate} classesArray={allClasses} />
          </div>

          <div className="flex flex-col flex-1 gap-1">
            {filteredclasses.length > 0 ? "" : "No Scheduled classes right now"}
            {filteredclasses.map((item) => (
              <EventComponet item={item} key={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduledClasses;
