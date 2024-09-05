import { useEffect, useState } from "react";
import moment from "moment";
import {
  Header,
  SideTime,
  CustomEvent,
  CustomToolbar,
  SideTimeHeader,
} from "./calendarComponents";
import { useTeacher } from "../../../context/TeacherContext";
import { Calendar, momentLocalizer } from "react-big-calendar";

const localizer = momentLocalizer(moment);

const MyCalendar = ({data, isPending, refetch, isRefetching}) => {
  const [loading, setloading] = useState(false);
  const [addModalOpen, setaddModalOpen] = useState(false);
  const [activeFilteredField, setactiveFilteredField] = useState(null);
  
  const { allClasses, classesIsPending } = useTeacher();


  const dayRangeHeaderFormat = ({ start, end }, culture, local) =>
    local.format(start, "MMMM DD", culture) +
    " – " +
    local.format(
      end,
      local.eq(start, end, "month") ? "DD YYYY" : "MMMM DD YYYY",
      culture
    );

  const [events, setevents] = useState([]);

  const [eventsCopy, seteventsCopy] = useState([]);

  const [currentWeek, setCurrentWeek] = useState({
    start: moment().startOf("day").toDate(),
    end: moment().endOf("day").toDate(),
  });

  const [minTime, setminTime] = useState(
    moment.min(events.map((event) => moment(event.startTime))).startOf("hour")
  );
  const [maxTime, setmaxTime] = useState(
    moment.max(events.map((event) => moment(event.endTime))).endOf("hour")
  );

  const handleNavigate = (newDate) => {
    const startOfWeek = moment(newDate).startOf("day").toDate();
    const endOfWeek = moment(newDate).endOf("day").toDate();

    setCurrentWeek({
      start: startOfWeek,
      end: endOfWeek,
    });
  };

  const handleUpdateTime = () => {
    let filteredEvents = eventsCopy.filter((event) => {
      return event.start >= currentWeek.start && event.start <= currentWeek.end;
    });
    filteredEvents = filteredEvents.map((event) => {
      if (moment(event.start).hours() == 0) {
        event.start.setMinutes(1);
      }
      return event;
    });

    let times = filteredEvents.map((eve) => {
      return moment(eve.start).hours();
    });
    const startTime = Math.min(...times);

    const endTime = Math.max(...times);
    const mainStartDate = moment(filteredEvents[0]?.start);
    const mainEndDate = moment(filteredEvents[0]?.start);
    if (filteredEvents.length > 0) {
      mainStartDate.set("hours", startTime);
      mainStartDate.set("minutes", 0);
      mainEndDate.set("hours", endTime);
      mainEndDate.set("minutes", 59);

      if (endTime - startTime <= 6) {
        let gap = 6;
        let startTimeAdd = 0;
        let endTimeAdd = 0;
        for (let i = 0; i < gap; i++) {
          if (endTime + endTimeAdd >= 23) {
            startTimeAdd += 1;
          } else {
            endTimeAdd += 1;
          }
        }

        mainStartDate.set("hours", startTime - startTimeAdd);
        mainEndDate.set("hours", endTime + endTimeAdd);
      }
    } else {
      mainStartDate.set("hours", 7);
      mainEndDate.set("hours", 14);
    }
    setminTime(mainStartDate);
    setmaxTime(mainEndDate);
  };

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
  // }, [currentWeek, isPending, isRefetching]);
  }, [currentWeek, isPending]);

  if (!classesIsPending) {
    console.log("all classes array is : ", allClasses);
  }

  return (
    <>
      <div className="flex">
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
                activeFilteredField={activeFilteredField}
                setactiveFilteredField={setactiveFilteredField}
                setevents={setevents}
                addModalOpen={addModalOpen}
                setaddModalOpen={setaddModalOpen}
                toolbar={toolbar}
              />
            ),
            event: (e) => {
              console.log("event e is: ", e);
              return <CustomEvent setevents={setevents} event={e.event} />;
            },
            timeGutterHeader: SideTimeHeader,
            timeGutterWrapper: SideTime,
            header: Header,
          }}
          dayLayoutAlgorithm={"no-overlap"}
        />
        {/* <FilterClassesModal
            addModalOpen={addModalOpen}
            setaddModalOpen={setaddModalOpen}
          /> */}
      </div>
    </>
  );
};

export default MyCalendar;
