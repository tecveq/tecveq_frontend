import { useEffect, useState } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";

import {
  Header,
  SideTime,
  CustomEvent,
  CustomToolbar,
  SideTimeHeader,
} from "./calendarComponents";
import { useTeacher } from "../../../context/TeacherContext";

const localizer = momentLocalizer(moment);

const MyCalendar = ({ data, isPending, refetch }) => {
  console.log(data, "events data is:");

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [activeFilteredField, setActiveFilteredField] = useState(null);

  // Current date range state
  const dayRangeHeaderFormat = ({ start, end }, culture, local) =>
    local.format(start, "MMMM DD", culture) +
    " – " +
    local.format(
      end,
      local.eq(start, end, "month") ? "DD YYYY" : "MMMM DD YYYY",
      culture
    );
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

  useEffect(() => {
    if (!isPending) {

      let allclassfilter = data?.map((item) => {
        let newdate = new Date(item?.startTime);
        // newdate.setHours(newdate.getHours() - 5); // Subtract 5 hours
        let end = new Date(item.endTime);
        // end.setHours(end.getHours() - 5);
        let returnobj = { ...item, end: end, start: newdate }
        return returnobj
      })

      console.log("all class filter is : ", allclassfilter);
      setEvents(allclassfilter);
    }
  }, [currentWeek, isPending, data]);

  return (
    <div className="flex">
      <Calendar
        style={{}}
        formats={{ dayRangeHeaderFormat }}
        min={new Date(0, 0, 0, 0, 0, 0)}
        max={new Date(0, 0, 0, 23, 59, 59)}
        view="week"
        views={{ week: true }}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onNavigate={handleNavigate}
        className="w-[99%] h-[80vh]"
        dayLayoutAlgorithm="no-overlap"
        components={{
          toolbar: (toolbar) => (
            <CustomToolbar
              loading={loading}
              activeFilteredField={activeFilteredField}
              setActiveFilteredField={setActiveFilteredField}
              setEvents={setEvents}
              addModalOpen={addModalOpen}
              setAddModalOpen={setAddModalOpen}
              toolbar={toolbar}
            />
          ),
          event: (eventProps) => (
            <CustomEvent setEvents={setEvents} event={eventProps.event} refetch={refetch} />
          ),
          timeGutterHeader: SideTimeHeader,
          timeGutterWrapper: SideTime,
          header: Header,
        }}
      />
    </div>
  );
};

export default MyCalendar;
