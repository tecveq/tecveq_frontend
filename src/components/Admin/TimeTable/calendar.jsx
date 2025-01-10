import moment from "moment";
import {
  Header,
  SideTime,
  CustomEvent,
  CustomToolbar,
  SideTimeHeader,
} from "./calendarComponents";
import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { useTeacher } from "../../../utils/TeacherProvider";

const localizer = momentLocalizer(moment);

const MyCalendar = ({ data, isPending, refetch, isRefetching}) => {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);

  const { teacherID, updateTeacherID } = useTeacher();


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

  // Custom event renderer
  const renderCustomEvent = (e) => (
    <CustomEvent
      setEvents={setEvents}
      event={e.event}
      refetch={refetch}
      isRefetching={isRefetching}
    />
  );

  const handleTeacherID = (id) => {
    updateTeacherID(id); // Update teacherID globally
  };

  // Custom toolbar renderer
  // const renderCustomToolbar = (toolbar) => (
  //   <CustomToolbar loading={loading} toolbar={toolbar} onTeacherSelect={handleTeacherID} />
  // );

  return (
    <div className="flex">
      {!isPending && (
        <Calendar
          style={{}}
          formats={{ dayRangeHeaderFormat }}
          min={new Date(0, 0, 0, 0, 0, 0)}
          max={new Date(0, 0, 0, 23, 59, 59)}
          onNavigate={handleNavigate}
          view="week"
          views={{ week: true }}
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          className="w-[100%] h-[80vh]"
          components={{
            toolbar: (props) => (
              <CustomToolbar {...props} onTeacherSelect={handleTeacherID} />
            ),
            event: renderCustomEvent,
            timeGutterHeader: SideTimeHeader,
            timeGutterWrapper: SideTime,
            header: Header,
          }}
          dayLayoutAlgorithm="no-overlap"
        />
      )}
    </div>
  );
};

export default MyCalendar;
