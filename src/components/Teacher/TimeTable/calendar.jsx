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
  const [currentWeek, setCurrentWeek] = useState({
    start: moment().startOf("day").toDate(),
    end: moment().endOf("day").toDate(),
  });

  // Custom header format for displaying date ranges
  const dayRangeHeaderFormat = ({ start, end }, culture, local) =>
    `${local.format(start, "MMMM DD", culture)} – ${local.format(
      end,
      local.eq(start, end, "month") ? "DD YYYY" : "MMMM DD YYYY",
      culture
    )}`;

  // Update current week when navigating the calendar
  const handleNavigate = (newDate) => {
    setCurrentWeek({
      start: moment(newDate).startOf("day").toDate(),
      end: moment(newDate).endOf("day").toDate(),
    });
  };

  // Update events when data changes or loading state changes
  useEffect(() => {
    if (!isPending && data) {
      const formattedEvents = data.map((item) => ({
        ...item,
        // Convert UTC times to Karachi time using moment-timezone
        start: moment.tz(item.startTime, 'Asia/Karachi').subtract(5, 'hours').toDate(),
        end: moment.tz(item.endTime, 'Asia/Karachi').subtract(5, 'hours').toDate(),
      }));

      console.log(formattedEvents, "event formated events");


      setEvents(formattedEvents);
    }
  }, [data, isPending, currentWeek]);

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
