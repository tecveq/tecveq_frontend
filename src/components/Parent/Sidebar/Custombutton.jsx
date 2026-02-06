import React from "react";
import { BiBookContent } from "react-icons/bi";
import { CiCalendarDate } from "react-icons/ci";
import { GoHome } from "react-icons/go";
import { LuCalendar } from "react-icons/lu";
import { VscGraph } from "react-icons/vsc";

const Custombutton = ({ title, active, onpress, icon }) => {
  return (
    <div>
      <div
        onClick={() => {
          onpress();
        }}
        className={`flex items-center justify-start gap-4 text-lg px-3 w-56 py-2  rounded-md cursor-pointer ${
          active ? "bg-[#0B1053] text-white" : "transparent"
        }`}
      >
        {icon == "home" ? (
          <GoHome color={`${active ? "white" : "#919191"}`} />
        ) : icon == "time" ? (
          <CiCalendarDate color={`${active ? "white" : "#919191"}`} />
        ) : icon == "graph" ? (
          <VscGraph color={`${active ? "white" : "#919191"}`} />
        ) : icon == "book" ? (
          <BiBookContent color={`${active ? "white" : "#919191"}`} />
        ) : (
          (icon = "quiz" ? <LuCalendar color={`${active ? "white" : "#919191"}`} /> : "")
        )}
        <p className={`${active ? "text-white" : "text-grey"}`}>{title}</p>
      </div>
    </div>
  );
};

export default Custombutton;
