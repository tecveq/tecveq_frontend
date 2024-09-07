import React, { useEffect, useState } from "react";
import pdf from "../../../assets/pdf.png";
import profile from "../../../assets/profile.png";

import { IoClose } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { useUser } from "../../../context/UserContext";
import { useQuery } from "@tanstack/react-query";
import { getMyChats } from "../../../api/UserApis";


const Notifications = ({ onclose, dashboard, data }) => {

  // console.log("data in notificatio component is : ", data);
  // TODO: ---^^
  const { socketContext } = useUser();

  useEffect(() => {
    console.log("now rendering navbar")
    // socketContext.emit("")
    // socketContext.join("")
  }, [])

  const chatquery = useQuery({queryKey: ["chat"], queryFn: getMyChats})
  console.log("chat query data is : ", chatquery.data);

  const Notification = () => {

    const [moredetails, setMoredetails] = useState(false);

    return (
      <div className={`flex flex-col gap-2 py-2 `}>
        <div className="flex gap-2">
          <img src={profile} alt="" className="h-10 w-11" />
          <div className="flex flex-col cursor-pointer" onClick={() => setMoredetails(!moredetails)}>
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
                <span className="text-maroon"> Physics class </span>
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
    <div className={` ${!dashboard ? "mt-10" : "mt-0"} fixed flex h-screen px-5 overflow-auto bg-white shadow-xl top-20 right-10 w-80`}>
      <div className="flex flex-col font-poppins">
        <div className="flex justify-between py-5 ">
          <p className="text-lg font-semibold">Announcements</p>
          <IoClose onClick={onclose} className="cursor-pointer" />
        </div>
        <div className="">

          {[...new Array(3)].map((item) => <Notification />)}

        </div>
      </div>
    </div>
  );
};

export default Notifications;
