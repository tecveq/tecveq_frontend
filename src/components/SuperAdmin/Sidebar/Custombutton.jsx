import React from "react";
import { BiBookContent } from "react-icons/bi";
import { CiCalendarDate } from "react-icons/ci";
import { GoHome } from "react-icons/go";
import { LuCalendar } from "react-icons/lu";
import { VscGraph } from "react-icons/vsc";
import { IoIosSettings } from "react-icons/io";
import { SiGoogleclassroom } from "react-icons/si";
import { GiTeacher } from "react-icons/gi";
import { MdAnnouncement } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { SiLevelsdotfyi } from "react-icons/si";
import { TbReport } from "react-icons/tb";
import { MdOutlineSubject } from "react-icons/md";


const Custombutton = ({ title, active, onpress, icon }) => {
  return (
    <div>
      <div
        onClick={() => {
          onpress();
        }}
        className={`flex items-center justify-start gap-4 text-lg px-3 w-56 py-2  rounded-md cursor-pointer ${active ? "bg-white opacity-90" : "transparent"
          }`}
      >
        {icon == "home" ? (
          <GoHome color={`${active ? "#6A00FF" : "white"}`} />
        ) : ""}
        <p className={`${active ? "text-[#6A00FF]" : "text-white"}`}>{title}</p>
      </div>
    </div>
  );
};

export default Custombutton;
