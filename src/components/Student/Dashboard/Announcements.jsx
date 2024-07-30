import React from "react";
import { RxDotFilled } from "react-icons/rx";
import { useStudent } from "../../../context/StudentContext";

const Announcements = () => {
  
  const { allAnnouncements } = useStudent();

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
      <div className="flex flex-col flex-1 px-6 py-4 bg-white border-t-4 rounded-lg border-t-maroon">
        {allAnnouncements.map((item, index) => {
          return (
            <Announcement key={index} item={item} />
          )
        })}
      </div>
    </div>
  );
};

export default Announcements;
