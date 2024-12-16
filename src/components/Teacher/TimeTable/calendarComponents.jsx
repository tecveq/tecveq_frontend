import moment from "moment";
import IMAGES from "../../../assets/images";
import ViewEventDetailsModal from "./viewEventDetailsModal";

import { useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export const CustomEvent = ({ event, setevents }) => {
  const [detailsModalOpen, setdetailsModalOpen] = useState(false);

  console.log("current event is : ", event);

  const formatDate = (date) => {
    const latestDate = moment(new Date(date));
    if (latestDate.get("hours") == 0 && latestDate.get("minutes") == 1) {
      latestDate.set("minutes", 0);
    }

    return moment(latestDate).format("hh:mm a");
  };

  return (
    <div className="relative flex flex-1 w-full overflow-visible ">
      <ViewEventDetailsModal
        event={event}
        setevents={setevents}
        open={detailsModalOpen}
        setopen={setdetailsModalOpen}
      />
      <div
        className={`text-xs flex gap-1 justify-center text-center items-center px-1 py-1 rounded-md h-9 w-full !overflow-hidden ${event.teacher
          ? "bg-maroon/10 text-black"
          : "bg-green_dark/10 text-black"
          }`}
        onClick={() => {
          return event.teacher.teacherID.name ? setdetailsModalOpen(true) : null;
        }}
      >
        <div>
          <img
            src={IMAGES.MathIcon}
            className="object-contain w-7 h-7"
            alt="subject img"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-xs text-wrap">
            {event.teacher ? event.teacher.teacherID.name : ""}
          </p>
          <p className="text-xs text-wrap text-black/70">
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
    <>
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
    </>
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
  // console.log("current date is : ", currentDate);
  // console.log("current month is : ", currentMonth);

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
      <p className="text-sm text-start">{day}</p>
    </div>
  );
};

export const CustomToolbar = ({
  toolbar,
  setaddModalOpen,
  events,
  setevents,
  activeFilteredField,
  setactiveFilteredField,
  addModalOpen,
  loading,
}) => {
  //   const { currentUser } = useContext(AuthContext);

  const [fields, setfields] = useState([]);

  const goToBack = () => {
    toolbar.onNavigate("PREV");
  };
  const goToNext = () => {
    toolbar.onNavigate("NEXT");
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

  useEffect(() => {
    // handleGetFields();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center w-full gap-2 mt-4">
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
            <p className="mx-4 text-xl font-semibold text-maroon">
              {moment(Date.now()).format("MMMM DD YYYY")}
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
        <div className="flex items-center gap-6">
          {/* <FilterButton
            className={"px-8 py-1"}
            text={"Scedula Classes"}
            clickHandler={() => setaddModalOpen(!addModalOpen)}
          /> */}
          <div>
            <div className="flex justify-between py-2 px-4 w-full border-2 border-[#00000020] rounded-xl ">
              My Time Table
              {/* <FaChevronDown size={20} color="black" /> */}
            </div>
            <div className="py-1 text-xs text-black/70">
              <p>See all your scheduled classes below!</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
