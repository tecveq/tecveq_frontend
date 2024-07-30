import React from "react";
import { SlArrowRight } from "react-icons/sl";

const DataRows = ({
  index,
  subject,
  studentName,
  studentProfile,
  studentRollno,
  studentClass,
  contact,
  bgColor,
  header,
  onClickFunction,
}) => {
  return (
    <div className="min-w-full">
      <div
        style={{ backgroundColor: bgColor, cursor: "pointer" }}
        onClick={onClickFunction}
        className={`md:py-5 py-2 md:pl-5 md:pr-10 flex flex-row items-center justify-around border-b border-grey mt-2`}
      >
        <p
          className={`w-full md:flex-[1] flex-[1] text-sm text-center md:text-left ${
            header ? "font-semibold" : ""
          }`}
        >
          {index + "."}
        </p>
        <p
          className={`w-full md:flex-[1] flex-[1] text-sm text-center md:text-left ${
            header ? "hidden" : "flex"
          }`}
        >
          <img
            className=" rounded-full h-14 w-14"
            src={studentProfile}
            alt="Student Profile"
          />{" "}
        </p>
        <p
          className={`w-full md:flex-[3] my-1 md:my-0 text-center text-sm md:text-left ${
            header ? "font-semibold ml-14 text-center" : ""
          }`}
        >
          {studentName}
        </p>
        <p
          className={`w-full md:flex-[3] text-sm my-1 md:my-0 text-center md:text-left ${
            header ? "font-semibold" : ""
          }`}
        >
          {studentRollno}
        </p>
        <p
          className={`w-full md:flex-[3] text-sm my-1 md:my-0 text-center md:text-left ${
            header ? "font-semibold" : ""
          }`}
        >
          {studentClass}
        </p>
        <p
          className={`w-full flex md:flex-[3] justify-between items-center my-1 md:my-0 text-center text-sm md:text-left ${
            header ? "font-semibold" : ""
          }`}
        >
          {contact}  {header ? <></> :  <SlArrowRight size={20} /> }
        </p>
      </div>
    </div>
  );
};

export default DataRows;
