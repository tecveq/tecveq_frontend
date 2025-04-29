import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import FilterClassesModal from "./components/FilterClassesModal";
import { useEffect, useState } from "react";
import {
  Header,
  SideTime,
  CustomEvent,
  CustomToolbar,
  SideTimeHeader,
} from "./components/calendarComponents";
import { useQuery } from "@tanstack/react-query";
import { getAllClasses } from "../../../../../api/Student/Classes";
import { useUser } from "../../../../../context/UserContext";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const { userData } = useUser()


  console.log(userData, "userData");

  const [loading, setloading] = useState(false);
  const [addModalOpen, setaddModalOpen] = useState(false);
  const [activeFilteredField, setactiveFilteredField] = useState(null);

  const dayRangeHeaderFormat = ({ start, end }, culture, local) =>
    local.format(start, "MMMM DD", culture) +
    " – " +
    local.format(
      end,
      local.eq(start, end, "month") ? "DD YYYY" : "MMMM DD YYYY",
      culture
    );

  const [events, setEvents] = useState([]);

  const [currentWeek, setCurrentWeek] = useState({
    start: moment().startOf("day").toDate(),
    end: moment().endOf("day").toDate(),
  });

  const handleNavigate = (newDate) => {
    const startOfWeek = moment(newDate).startOf("day").toDate();
    const endOfWeek = moment(newDate).endOf("day").toDate();

    setCurrentWeek({
      start: startOfWeek,
      end: endOfWeek,
    });
  };

  const { data, isPending, isSuccess } = useQuery({ queryKey: ["timetable"], queryFn: getAllClasses });
  if (!isPending) {
    console.log("classea in studnets are : ", data)
  }
  useEffect(() => {
    if (!isPending) {

      let allclassfilter = data?.map((item) => {
        // let newdate = moment.utc(item.startTime);
        let newdate = new Date(item?.startTime);
        console.log(moment.utc(item.startTime).toString());
        console.log("ne date is : ", newdate);
        // let end = moment.utc(item.endTime);
        let end = new Date(item.endTime);
        let returnobj = { ...item, end: end, start: newdate }
        return returnobj
      }).filter((item) => {
        console.log(item, "new item");

        if (!item?.subjectID?._id) return false;

        return userData?.subjects?.some(
          (id) => id.toString() === item.subjectID._id.toString()
        );
      });




      console.log("all class filter is : ", allclassfilter);
      setEvents(allclassfilter);
    }
  }, [currentWeek, isSuccess, isPending, data]);






  return (
    <>
      {addModalOpen &&
        <FilterClassesModal
          addModalOpen={addModalOpen}
          setaddModalOpen={setaddModalOpen}
        />}
      <Calendar
        style={{}}
        formats={{
          dayRangeHeaderFormat,
        }}
        min={new Date(0, 0, 0, 0, 0, 0)}
        max={new Date(0, 0, 0, 23, 59, 59)}
        onNavigate={handleNavigate}
        view="week"
        views={{ week: true }}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        className="w-[100%] h-[350vh]"
        components={{
          toolbar: (toolbar) => (
            <CustomToolbar
              loading={loading}
              activeFilteredField={activeFilteredField}
              setactiveFilteredField={setactiveFilteredField}
              events={data}
              setevents={setEvents}
              addModalOpen={addModalOpen}
              setaddModalOpen={setaddModalOpen}
              toolbar={toolbar}
            />
          ),
          event: (e) => {
            console.log("event is : ", e);
            return <CustomEvent setevents={setEvents} event={e.event} />;
          },
          timeGutterHeader: SideTimeHeader,
          timeGutterWrapper: SideTime,
          header: Header,
        }}
        dayLayoutAlgorithm={"no-overlap"}
      />
    </>
  );
};

export default MyCalendar;
