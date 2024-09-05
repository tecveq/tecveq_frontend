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
  const [loading, setloading] = useState(false);

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


  const handleNavigate = (newDate) => {
    const endOfWeek = moment(newDate).endOf("day").toDate();
    const startOfWeek = moment(newDate).startOf("day").toDate();

    setCurrentWeek({
      start: startOfWeek,
      end: endOfWeek,
    });
  };



  useEffect(() => {
    let allclassfilter = data?.map((item) => {
      let newdate = new Date(item?.startTime);
      let end = new Date(item?.endTime);
      let returnobj = { ...item, end: end, start: newdate }
      return returnobj
    })
    console.log("all class in admin are filter is : ", allclassfilter);
    setevents(allclassfilter);
  }, [currentWeek, isPending]);


  return (
    <>
      <div className="flex">
        {!isPending &&
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
            className="w-[100%] h-[80vh]"
            components={{
              toolbar: (toolbar) => (
                <CustomToolbar
                  loading={loading}
                  toolbar={toolbar}
                />
              ),
              event: (e) => {
                return <CustomEvent setevents={setevents} event={e.event} refetch={refetch} isRefetching={isRefetching} />;
              },
              timeGutterHeader: SideTimeHeader,
              timeGutterWrapper: SideTime,
              header: Header,
            }}
            dayLayoutAlgorithm={"no-overlap"}
          />
        }
      </div>
    </>
  );
};

export default MyCalendar;
