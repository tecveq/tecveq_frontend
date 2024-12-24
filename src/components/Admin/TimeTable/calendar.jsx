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

const localizer = momentLocalizer(moment);

const MyCalendar = ({ data, isPending, refetch, isRefetching }) => {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [currentWeek, setCurrentWeek] = useState({
    start: moment().startOf("day").toDate(),
    end: moment().endOf("day").toDate(),
  });

  const dayRangeHeaderFormat = ({ start, end }, culture, local) =>
    `${local.format(start, "MMMM DD", culture)} – ${local.format(
      end,
      local.eq(start, end, "month") ? "DD YYYY" : "MMMM DD YYYY",
      culture
    )}`;

  // Handle calendar navigation
  const handleNavigate = (newDate) => {
    const startOfWeek = moment(newDate).startOf("day").toDate();
    const endOfWeek = moment(newDate).endOf("day").toDate();

    setCurrentWeek({ start: startOfWeek, end: endOfWeek });
  };

  // Update events based on data or loading state
  useEffect(() => {
    if (!isPending && data) {
      const formattedEvents = data.map(({ startTime, endTime, ...item }) => ({
        ...item,
        // Convert UTC times to Karachi time using moment-timezone and subtract 5 hours
        start: moment.tz(startTime, "Asia/Karachi").subtract(5, "hours").toDate(),
        end: moment.tz(endTime, "Asia/Karachi").subtract(5, "hours").toDate(),
      }));

      console.log(formattedEvents, "Formatted events");

      setEvents(formattedEvents);
    }
  }, [data, isPending, currentWeek]);

  // Custom event renderer
  const renderCustomEvent = (e) => (
    <CustomEvent
      setEvents={setEvents}
      event={e.event}
      refetch={refetch}
      isRefetching={isRefetching}
    />
  );

  // Custom toolbar renderer
  const renderCustomToolbar = (toolbar) => (
    <CustomToolbar loading={loading} toolbar={toolbar} />
  );

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
            toolbar: renderCustomToolbar,
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
