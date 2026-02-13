import React from "react";

import { GoHome } from "react-icons/go";
import { VscGraph } from "react-icons/vsc";
import { LuCalendar } from "react-icons/lu";
import { BiBookContent } from "react-icons/bi";
import { CiCalendarDate } from "react-icons/ci";


const Custombutton = ({ title, active, onpress, icon }) => {
  return (
    <div>
      <div
        onClick={() => {
          onpress();
        }}
        className={`flex items-center justify-start gap-4 text-lg px-3 w-56 py-2  rounded-md cursor-pointer ${active ? "bg-[#e8e9f5] text-white" : "transparent"
          }`}
      >
        {icon == "home" ? (
          <GoHome color={`${active ? "#0B1053" : "white"}`} />
        ) : icon == "time" ? (
          <CiCalendarDate color={`${active ? "#0B1053" : "white"}`} />
        ) : icon == "graph" ? (
          <VscGraph color={`${active ? "#0B1053" : "white"}`} />
        ) : icon == "book" ? (
          <BiBookContent color={`${active ? "#0B1053" : "white"}`} />
        ) : (
          (icon = "quiz" ? <LuCalendar color={`${active ? "#0B1053" : "white"}`} /> : "")
        )}
        <p className={`${active ? "text-[#0B1053]" : "text-white"}`}>{title}</p>
      </div>
    </div>
  );
};

export default Custombutton;
