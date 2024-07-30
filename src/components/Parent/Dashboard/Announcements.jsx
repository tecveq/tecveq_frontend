import React from "react";
import { RxDotFilled } from "react-icons/rx";

const Announcements = () => {
  const data = [
    {
      id: 1,
      message:
        "Dear Students Marks of Assignment 2 has been uploaded of Physics.",
    },
    {
      id: 2,
      message:
        "Dear Students one Class of physics is scheduled on [date] from 8:30 - 9:30",
    },
    {
      id: 3,
      message:
        "Hello Students, we are excited to announce an update to the LMS platform. New features and improvements have been added to enhance your teaching experience. Explore and let us know your feedback!",
    },
  ];

  const Announcement = ({ item }) => {
    return (
      <div className="flex px-2 py-1 text-xs">
        <div className="flex gap-2">
          <RxDotFilled />
          <p>{item.message}</p>
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
        {data.map((item) =>{
            return(
                <Announcement item={item} />
            )
        })}
      </div>
    </div>
  );
};

export default Announcements;
