import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";


const DataRows = ({
  data,
  index,
  bgColor,
  header,
  userName,
  role,
  userId,
  userclass,
  contact,
  onClickFunction,
  toggleClassMenu
}) => {
  return (
    <div className="min-w-full">
      <div
        style={{ backgroundColor: bgColor, cursor: "pointer" }}
        className={`flex flex-row items-center justify-around border-b border-grey custom-shadow my-1`}
      >
        <div className={`flex flex-row items-center flex-1 ${header? "py-1 md:py-1 md:pl-3 md:pr-5": "py-3 md:py-6 md:pl-3 md:pr-5"} mt-2 `}>
          <p
            className={`w-full md:flex-[1] flex-[1] text-sm text-center md:text-left ${header ? "font-semibold" : ""
              }`}
          >
            {index + "."}
          </p>
          <p
            className={`w-full ml-2 md:flex-[3] my-1 md:my-0 text-center text-sm md:text-left ${header ? "font-semibold ml-14 text-center" : ""
              }`}
          >
            {userName}
          </p>
          <p
            className={`w-full md:flex-[3] my-1 md:my-0 text-center md:text-left text-sm   text-[14px] ${header ? "font-semibold" : ""
              }`}
          >
            {role}
          </p>
          <p
            className={`w-full md:flex-[3] my-1 md:my-0 text-center md:text-left text-sm ${header ? "font-semibold" : ""
              }`}
          >
            {userId}
          </p>
          {/* <p
            className={`w-full md:flex-[3] my-1 md:my-0 text-center md:text-left text-sm ${header ? "font-semibold" : ""
              }`}
          >
            {userclass}
          </p> */}
          <p
            className={`w-full md:flex-[3] my-1 md:my-0 text-center md:text-left text-sm ${header ? "font-semibold" : ""
              }`}
          >
            {contact}
          </p>
        </div>
        <div className="flex mr-5 cursor-pointer">
          <p
            onClick={() => {
              toggleClassMenu(data);
            }}
            className={`w-full my-1 md:my-0 text-center md:text-center md:text-[20px] text-[14px] ${header ? "hidden" : ""
              }`}
          >
            <BsThreeDotsVertical />
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataRows;
