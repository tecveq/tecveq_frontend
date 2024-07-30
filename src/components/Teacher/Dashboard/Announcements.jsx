import React from "react";
import { RxDotFilled } from "react-icons/rx";

const Announcement = ({ item }) => {
  return (
    <div className="flex px-2 py-1 text-xs">
      <div className="flex gap-2">
        <RxDotFilled />
        <p><span className="font-bold">{item.title} : </span>{item.description}</p>
      </div>
    </div>
  );
};

const Announcements = ({ data }) => {

  return (
    <div className="flex flex-col flex-1 gap-2">
      <div className="flex w-full">
        <p className="flex text-lg font-medium">Announcemnets</p>
      </div>
      <div className="flex flex-col w-full px-6 bg-white h-80 overflow-y-auto register-scrollbar border-t-4 rounded-lg md:py-4 border-t-maroon">

        {data?.map((item) => <Announcement item={item} />)}
        {data?.length == 0 && <div>No Announcements to display</div>}

      </div>
    </div>
  );
};

export default Announcements;
