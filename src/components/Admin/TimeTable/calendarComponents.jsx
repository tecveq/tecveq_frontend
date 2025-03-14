import IMAGES from "../../../assets/images";
import ViewEventDetailsModal from "./viewEventDetailsModal";
import moment from 'moment-timezone';
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { useAdmin } from "../../../context/AdminContext";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import FilterButton from "./FilterButton";
export const CustomEvent = ({ event, setevents, refetch, isRefetching }) => {
  const [detailsModalOpen, setdetailsModalOpen] = useState(false);
  return (
    <div className="relative flex flex-1 w-full overflow-visible">
      <ViewEventDetailsModal
        refetch={refetch}
        isRefetching={isRefetching}
        event={event}
        setevents={setevents}
        open={detailsModalOpen}
        setopen={setdetailsModalOpen}
      />
      <div
        className={`text-xs flex  justify-center text-center items-center rounded-md h-full w-[100px] !overflow-hidden ${event.teacher.teacherID.name
          ? "bg-maroon/10  text-black flex flex-col p-1"
          : "bg-green_dark/10  text-black"
          }`}
        onClick={() => {
          return event.teacher.teacherID.name ? setdetailsModalOpen(true) : null;
        }}
      >
        {/* <img
          src={IMAGES.MathIcon}
          className="object-contain hidden md:block w-7 h-7 md:h-4 md:w-4"
          alt="subject img"
        /> */}
        <div className="flex flex-row justify-between gap-2">
          <p className="text-[8px] text-wrap ml-1">
            {event.teacher ? event.teacher.teacherID.name : ""}
          </p>
          <p className="text-[8px] text-wrap text-black/70">
            {event.subjectID.name ? event.subjectID.name : ""}
          </p>
        </div>
      </div>
    </div>
  );
};



export const SideTime = (props) => {
  const times = props.slotMetrics.groups;

  return (
    <div className="flex flex-col w-[130px]">
      {times.map((time) => (
        <div
          key={`${time}2`}
          className="flex w-[110px] h-10 justify-center items-center"
        >
          <p className="text-[10px] text-grey">
            {moment.utc(time[0]).tz("Asia/Karachi").format("h:mm a")} {/* Convert to PKT */}
          </p>
          <p className="text-[10px] text-grey">-</p>
          <p className="text-[10px] text-grey">
            {moment.utc(time[0])
              .add(1, "hour")
              .tz("Asia/Karachi") // Convert to PKT
              .format("h:mm a")}
          </p>
        </div>
      ))}
    </div>
  );
};


export const SideTimeHeader = (props) => {
  const times = props;
  return (
    <>
      <div className="flex items-center justify-center w-full h-full">
        <p className="text-sm text-black/70 ">GTM +5</p>
      </div>
    </>
  );
};

export const Header = (props) => {
  const day = moment(props.date).format("dddd");
  const currentDate = moment(Date.now()).date();
  const currentMonth = moment(Date.now()).month();

  const date = moment(props.date).date();
  const month = moment(props.date).month();

  return (
    <div
      className={`flex flex-col items-center justify-between flex-1 w-full font-normal h-fit ${currentDate === date && currentMonth === month
        ? "text-maroon"
        : "text-grey"
        } `}
    >
      <p className="text-lg text-center">{date}</p>
      <p className="text-xs text-start">{day}</p>
    </div>
  );
};

export const CustomToolbar = (props) => {

  const {
    onTeacherSelect,
    setAddModalOpen,
    addModalOpen,
    addScheduleModalOpen,
    setAddScheduleModalOpen
  } = props;
  //   const { currentUser } = useContext(AuthContext);

  const [fields, setfields] = useState([]);
  const [teacherID, setTeacherID] = useState("")




  const goToBack = () => {
    props.onNavigate("PREV");
  };
  const goToNext = () => {
    props.onNavigate("NEXT");
  };
  const goToCurrent = () => {
    toolbar.onNavigate("TODAY");
  };

  //   const handleGetFields = () => {
  //     getFields({ id: currentUser?.id })
  //       .then((res) => {
  //         setfields(
  //           res.map((r) => {
  //             return {
  //               name: r.fieldName,
  //               value: r.id,
  //             };
  //           })
  //         );
  //       })
  //       .catch((err) => {});
  //   };
  const { adminUsersData } = useAdmin();

  const handleTeacherChange = (e) => {
    const id = e.target.value;
    setTeacherID(id);
    onTeacherSelect(id); // Send to parent component
  };


  return (
    <>
      <div className="flex flex-col lg:flex-row flex-wrap w-full items-center justify-between gap-6 lg:gap-3 mb-4">
        <div className="w-full flex flex-1 justify-center">
          <div className="flex items-center justify-center w-full gap-2 mt-4">
            {/* <button
              className="px-3 py-1 rounded-md bg-custom-light-1"
              onClick={goToCurrent}
            >
              Today
            </button> */}
            <button
              className="w-8 h-8 p-2 bg-white border border-grey/50 rounded-2xl"
              onClick={goToBack}
            >
              <MdKeyboardArrowLeft />
            </button>

            <p className="mx-2 text-2xl lg:text-[16px] font-semibold text-maroon">
              {moment.utc(Date.now()).format("DD MMMM, YYYY")}
              <span className="ml-2 text-xs font-normal text-grey/70">Today</span>
            </p>

            <button
              className="w-8 h-8 p-2 bg-white border rounded-2xl border-grey/50"
              onClick={goToNext}
            >
              <MdKeyboardArrowRight />
            </button>
          </div>
        </div>
        <div className="flex flex-1 items-start gap-2 w-full justify-center">
          {/* <div className="flex justify-between text-sm py-2 cursor-pointer px-2 w-36 border-[1.5px] border-[#00000020] rounded-xl ">
            Teacher <FaChevronDown size={16} color="black" />
          </div> */}
          <div className="">
            <div className="flex items-center gap-1 justify-between cursor-pointer py-2 text-sm px-3 w-48 border-[1.5px] border-[#00000020] rounded-xl ">
              <select className="outline-none w-full h-full cursor-pointer"
                onChange={handleTeacherChange}
              >
                <option value={""}>
                  Search Teacher
                </option>

                {adminUsersData?.allTeachers?.map((item) => (
                  <option key={JSON.stringify(item)} className="p-2" value={item._id}>{item?.name}</option>
                ))}
              </select>
            </div>
            <div className="py-1 mt-3 text-xs text-black/70 flex-wrap w-[75%]">
              <p>Selcet the time table you want to view</p>
            </div>
          </div>

        </div>
        <div className="flex flex-2 flex-row flex-wrap items-center justify-center gap-6 lg:gap-2 mb-6 lg:mb-0">
          <div>
            <FilterButton
              className={"px-4 py-1"}
              icon={true}
              text={"Filter Classes"}
              clickHandler={() => {
                setAddModalOpen(!addModalOpen);
              }}
            />

          </div>
          <div>
            <FilterButton
              className={"px-4 py-1"}
              text={"Schedule Classes"}
              clickHandler={() => {
                setAddScheduleModalOpen(!addScheduleModalOpen);
              }}
            />

          </div>
        </div>
      </div>
    </>
  );
};
