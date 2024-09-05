import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import IMAGES from "../../../../../../assets/images";

import { FiClock } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useStudent } from "../../../../../../context/StudentContext";
import moment from "moment";


const FilterClassesModal = ({ addModalOpen, setaddModalOpen }) => {

  const { allClasses } = useStudent();
  const [filterEndDate, setFilterEndDate] = useState();
  const [selectedDate, setSelectedDate] = useState(null);
  const [filterActive, setFilterActive] = useState(false);
  const [filterStartDate, setFilterSatrtDate] = useState();
  const [filteredclasses, setFilteredClasses] = useState([]);

  const handleJoinClass = () => { };

  const filterClasses = () => {
    let arr = [];
    arr = allClasses && allClasses.filter((item) => new Date(item.startTime).getDate() == new Date(selectedDate).getDate());
    if (filterActive) {
      arr = allClasses && allClasses.filter((item) => new Date(item.startTime).getDate() >= new Date(filterStartDate).getDate() && new Date(item.startTime).getDate() <= new Date(filterEndDate).getDate());
    }
    setFilteredClasses(arr);
  };

  useEffect(() => {
    filterClasses();
  }, [selectedDate, filterActive]);


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
      <div className={`flex flex-col text-xs gap-1px-2 py-2 rounded-lg w-full`}>
        <div className="flex gap-2">
          <div className="">
            <img src={IMAGES.MathIcon} alt="" className="w-10 h-10 rounded-md" />
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex justify-between">
              <p className="text-sm font-semibold">{item.subjectID.name}</p>
              <p className="text-maroon">{item.classroom.name}</p>
            </div>
            <div className="flex gap-2 text-xs font-light">
              <p className="flex items-center gap-1">
                <FiClock />
                {moment.utc(item.startTime).format("DD-MM-YYYY")}
              </p>
              <p className="flex items-center gap-1">
                <FiClock />
                {moment.utc(item.startTime).format("hh:mm a")} - {moment.utc(item.endTime).format("hh:mm a")}
              </p>
            </div>
          </div>
        </div>


        {isStarted &&
          <div className="flex items-center justify-between">
            <p className="text-maroon">class has started...</p>
            <div>
              <a href={item.meetLink} target="_blank">
                <div
                  className="flex items-center justify-center px-2 py-1 text-center cursor-pointer bg-maroon rounded-3xl"
                >
                  <img src={IMAGES.meet} alt="" className="w-8 h-3" />
                  <p className="text-white " style={{ fontSize: 8 }}>
                    Join class
                  </p>
                </div>
              </a>
            </div>
          </div>
        }
      </div>
    );
  };

  const CustomCalender = ({ setSelectedDateFromChild, selectedDateFromChild, classesArray }) => {
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
        const formattedDate = day.format("YYYY MMMM DD");

        const eventsForDay = classesArray
          ? classesArray.filter((event) => new Date(event.startTime).toDateString() === new Date(formattedDate).toDateString())
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
            <div
              className={`flex flex-col w-10 h-10 items-center px-5 py-1 ${!filterActive && selectedDateFromChild == formattedDate ? "bg-maroon text-white" : ""
                } ${filterActive && new Date(formattedDate).toDateString() == new Date(filterStartDate).toDateString() ? "bg-maroon text-white" : ""}
                ${filterActive && new Date(formattedDate).toDateString() == new Date(filterEndDate).toDateString() ? "bg-maroon text-white" : ""}
                 text-xs group text-maroon hover:bg-maroon hover:text-white rounded-3xl`}
            >
              <div className="text-sm text-black group-focus:text-white group-hover:text-white">
                {day.format("D")}
              </div>

              {eventsForDay?.length > 0 &&
                <GoDotFill size={10} className="group-hover:text-white" />
              }
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
        <div className="flex w-full gap-2 my-3 text-xs">
          <div className="flex justify-around gap-2 flex-1 w-full">
            <div className="flex px-4 py-2 border rounded-lg border-grey/50">
              <input type="date" value={filterStartDate} onChange={(e) => setFilterSatrtDate(e.target.value)} placeholder="Jan 19, 2024" className={"w-24 outline-none"} />
            </div>
            <p className="flex items-center">-</p>
            <div className="flex px-4 py-2 border rounded-lg border-grey/50">
              <input type="date" value={filterEndDate} onChange={(e) => setFilterEndDate(e.target.value)} placeholder="Jan 19, 2024" className={"w-24 outline-none"} />
            </div>
          </div>
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

  const ButtonComponent = ({ title, color, bgcolor, clickHandler }) => {
    return (
      <div className="flex-1 mx-1 my-1">
        <div
          onClick={clickHandler}
          className={`px-6 w-[19/20] justify-center flex py-1 border rounded-lg cursor-pointer border-grey/50 ${bgcolor == "ghost" ? "bg-maroon" : "bg-white"
            }`}
        >
          <p className={`${color == "white" ? "text-white" : "text-black"}`}>
            {title}
          </p>
        </div>
      </div>
    );
  };

  const handleApplyFilters = () => {
    console.log("start date is : ", filterStartDate);
    console.log("end date is : ", filterEndDate);
    setFilterActive(true);
  }

  return (
    <div className="absolute z-10 flex flex-1 bg-white rounded-md shadow-lg w-72 mt-14 right-14">
      <div className="flex flex-col flex-1 gap-2">
        <div className="flex flex-col gap-1 p-3 bg-white rounded-lg">
          <div className="flex-1 p-2 ">
            <CustomCalender
              classesArray={allClasses}
              selectedDateFromChild={selectedDate}
              setSelectedDateFromChild={setSelectedDate}
            />
          </div>
          <div className="flex flex-1 gap-4 py-4 border-t border-b border-t-grey/50 border-b-grey/50">
            <ButtonComponent
              color={""}
              bgcolor={""}
              title={"Cancel"}
              clickHandler={() => {
                setFilterActive(false);
                setaddModalOpen(false);
              }}
            />
            <ButtonComponent
              color={"white"}
              title={"Apply"}
              bgcolor={"ghost"}
              clickHandler={handleApplyFilters}
            />
          </div>

          <div className="flex flex-col flex-1 gap-1">
            <div className="flex flex-col items-center">
              <p className="flex justify-center text-xl font-semibold">
                Classes
              </p>
              {filteredclasses && filteredclasses.length > 0
                ? ""
                : "No Shcedualed classes at this date"}
            </div>
            {filteredclasses && filteredclasses.map((item) => (
              <EventComponet item={item} key={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterClassesModal;
