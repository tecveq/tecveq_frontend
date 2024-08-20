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

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
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

  const [events, setevents] = useState([]);

  const [currentWeek, setCurrentWeek] = useState({
    start: moment().startOf("day").toDate(),
    end: moment().endOf("day").toDate(),
  });

  console.log("data is : ", new Date(0, 0, 0, 8, 0, 0))

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
        let newdate = new Date(item?.startTime);
        let end = new Date(item?.endTime);
        let returnobj = { ...item, end: end, start: newdate }
        return returnobj
      })

      console.log("all class filter is : ", allclassfilter);
      setevents(allclassfilter);
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
          max={new Date(0, 0, 0, 23, 0, 0)}
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
                setevents={setevents}
                addModalOpen={addModalOpen}
                setaddModalOpen={setaddModalOpen}
                toolbar={toolbar}
              />
            ),
            event: (e) => {
              console.log("event is : ", e);
              return <CustomEvent setevents={setevents} event={e.event} />;
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
