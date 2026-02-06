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
        className={`flex items-center justify-start gap-4 text-lg px-3 w-56 py-2  rounded-md cursor-pointer ${
          active ? "bg-[#0B1053]" : "transparent"
        }`}
      >
        {icon == "home" ? (
          <GoHome color={`${active ? "white" : "#0B1053"}`} />
        ) : icon == "time" ? (
          <CiCalendarDate color={`${active ? "white" : "#0B1053"}`} />
        ) : icon == "graph" ? (
          <VscGraph color={`${active ? "white" : "#0B1053"}`} />
        ) : icon == "book" ? (
          <BiBookContent color={`${active ? "white" : "#0B1053"}`} />
        ) : (
          (icon = "quiz" ? <LuCalendar color={`${active ? "white" : "#0B1053"}`} /> : "")
        )}
        <p className={`${active ? "text-white" : "[#0B1053]"}`}>{title}</p>
      </div>
    </div>
  );
};

export default Custombutton;
