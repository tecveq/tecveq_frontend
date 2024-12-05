import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import profile from "../../assets/profile.png";
import pdf from "../../assets/pdf.png";
import { GoDotFill } from "react-icons/go";
import { useQuery } from "@tanstack/react-query";
import { getAllNotifications } from "../../api/Admin/NotificationApi";

const Notifications = ({ onclose, dashboard }) => {


  const { data } = useQuery({ queryKey: ["chat"], queryFn: getAllNotifications });
  console.log("notificationas in admin are : ", data);

  const Notification = ({item}) => {
    
    const [moredetails, setMoredetails] = useState(false)
    return (
      <div className={`flex flex-col gap-2 py-2 w-full `}>
        <div className="flex w-full gap-2">
          <img src={profile} alt="" className="h-10 w-11" />
          <div className="flex flex-col w-full cursor-pointer" onClick={() => setMoredetails(!moredetails)}>
            <div className="flex justify-between gap-2 text-grey_700">
              <div className="flex gap-2">
                <p className="text-sm font-medium">Phonix Baker</p>
                <p className="text-xs">Just Now</p>
              </div>
              <GoDotFill color={true ? "green" : "grey"} />
            </div>
            <div className="flex text-xs">
              <p>
                Added an Assignment{" "}
                <span className="text-maroon"> Physics class </span>{" "}
              </p>
            </div>
          </div>
        </div>
        {moredetails ? (
          <div className="flex items-center gap-2 ml-10">
            <img src={pdf} alt="" className="w-12 h-12" />
            <div className="text-grey_700">
              <p className="text-sm font-medium">Assignment 1.pdf</p>
              <p className="text-xs">720 KB</p>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  };

  return (
    <div className={` ${!dashboard ? "mt-10" : "mt-0"} z-10 fixed flex h-screen px-5 md:overflow-auto bg-white shadow-xl top-20 right-0 md:right-2 w-80 md:w-96`}>
      <div className="flex flex-col w-full font-poppins">
        <div className="flex justify-between py-5 ">
          <p className="text-lg font-semibold">Announcements</p>
          <IoClose onClick={onclose} className="cursor-pointer" />
        </div>
        <div className="w-full">
          {data.map((item) => {
            return <Notification item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
