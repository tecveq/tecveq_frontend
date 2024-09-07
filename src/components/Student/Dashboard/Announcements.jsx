import React from "react";
import { RxDotFilled } from "react-icons/rx";
import { useStudent } from "../../../context/StudentContext";
import { getAllAnnouncements } from "../../../api/ForAllAPIs";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../utils/Loader";

const Announcements = () => {

  const { setAllAnnouncements, studentLogedIn } = useStudent();

  const announcementQuery = useQuery({
    queryKey: ["announcements"], queryFn: async () => {
      const results = await getAllAnnouncements();
      setAllAnnouncements(results.filter((item) => item.visibility == "student" || item.visibility == "all"));
      return results
    }, staleTime: 300000, enabled: studentLogedIn
  });

  const Announcement = ({ item }) => {
    return (
      <div className="flex px-2 py-1 text-xs">
        <div className="flex gap-2">
          <RxDotFilled />
          <p> <span className="font-bold">{item.title} : </span> {item.description}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col flex-1 gap-2">
      <div className="flex">
        <p className="flex text-lg font-medium">Announcemnets</p>
      </div>
      {announcementQuery.isPending && <div className="flex flex-1"> <Loader /> </div>}
      {!announcementQuery.isPending &&
        <div className="flex flex-col flex-1 px-6 py-4 bg-white border-t-4 rounded-lg border-t-maroon">
          {announcementQuery?.data?.map((item, index) => {
            return (
              <Announcement key={index} item={item} />
            )
          })}
        </div>
      }
    </div>
  );
};

export default Announcements;
