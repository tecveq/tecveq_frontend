import React, { useState } from "react";
import profile from "../../../assets/profile.png";

import { IoClose } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { getAllChatrooms } from "../../../api/Admin/ChatroomApi";


const RecentMessages = ({ onclose, dashboard }) => {
  const [groupActive, setGroupActive] = useState(false);
  const [individualActive, setIndividualActive] = useState(true);

  const {data:chats} = useQuery({queryKey: ["chat"], queryFn: getAllChatrooms})
  console.log("chats are : ", chats);

  const toggleGroupActive = () => {
    setGroupActive(!groupActive);
    setIndividualActive(false);
  };

  const toggleIndividualActive = () => {
    setIndividualActive(!individualActive);
    setGroupActive(false);
  };

  const data = [
    {
      id: 1,
      name: "Amelia. A",
      message: "my recent message",
      time: "00:21",
      img: "profile",
    },
    {
      id: 2,
      name: "John Smith",
      message: "my recent message",
      time: "00:21",
      img: "profile",
    },
    {
      id: 3,
      name: "Phonix baker",
      message: "my recent message",
      time: "00:21",
      img: "profile",
    },
    {
      id: 4,
      name: "John claw",
      message: "my recent message",
      time: "00:21",
      img: "profile",
    },
  ];

  const groupData = [
    {
      id: 1,
      name: "Physics Class",
      message: "my recent message",
      time: "00:21",
      img: "profile",
    },
    {
      id: 2,
      name: "Our Class",
      message: "my recent message",
      time: "00:21",
      img: "profile",
    },
    {
      id: 3,
      name: "Grirls Class",
      message: "my recent message",
      time: "00:21",
      img: "profile",
    },
    {
      id: 4,
      name: "Chemistry Class",
      message: "my recent message",
      time: "00:21",
      img: "profile",
    },
    {
      id: 5,
      name: "Announcements",
      message: "my recent message",
      time: "00:21",
      img: "profile",
    },
  ];

  const Message = ({ data }) => {
    const [moredetails, setMoredetails] = useState(false);
    return (
      <div className={`flex flex-col gap-2 py-2 `}>
        <div className="flex gap-2">
          <img src={profile} alt="" className="h-10 w-11" />
          <div
            className="flex flex-col flex-1 cursor-pointer"
            onClick={() => setMoredetails(!moredetails)}
          >
            <div className="flex justify-between gap-2 text-grey_700">
              <div className="flex gap-2">
                <p className="text-sm font-medium">{data.name}</p>
              </div>
            </div>
            <div className="flex justify-between flex-1 text-xs">
              <p>{data.message}</p>
              <p className="text-xs">{data.time}</p>
            </div>
          </div>
        </div>
        {/* {moredetails ? (
          <div className="flex items-center gap-2 ml-10">
          </div>
        ) : (
          ""
        )} */}
      </div>
    );
  };

  return (
    <div
      className={` ${
        !dashboard ? "mt-10" : "mt-0"
      } fixed z-10 flex h-screen px-5 overflow-auto bg-white shadow-xl top-20 right-0 md:right-10 w-96`}
    >
      <div className="flex flex-col flex-1 font-poppins">
        <div className="flex justify-between py-5 ">
          <p className="text-lg font-semibold">Recent Messages</p>
          <IoClose onClick={onclose} className="cursor-pointer" />
        </div>
        <div className="pb-2 border-b rounded-sm border-black/10">
          <div className="flex justify-between gap-2 p-1 rounded-md bg-[#EAECF0] border-2 border-[#00000010]">
            <div
              onClick={toggleIndividualActive}
              className={`cursor-pointer flex items-center justify-center flex-1 gap-2 ${
                individualActive ? "bg-white" : "transparent"
              } rounded-md`}
            >
              <p className="">Recent</p>
              <div className="p-1 text-xs badge bg-yellow_green_light rounded-xl">
                <p className="">2</p>
              </div>
            </div>
            <div
              onClick={toggleGroupActive}
              className={`cursor-pointer flex items-center justify-center flex-1 ${
                groupActive ? "bg-white" : "transparent"
              } rounded-md py-1`}
            >
              <p className="">Group</p>
            </div>
          </div>
        </div>
        <div className="py-2">
          {individualActive &&
            data.map((item) => {
              return <Message data={item} />;
            })}
          {groupActive &&
            groupData.map((item) => {
              return <Message data={item} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default RecentMessages;
