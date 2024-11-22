import React from "react";

const DataRows = ({
  index,
  subject,
  studentName,
  studentProfile,
  studentClass,
  attendance,
  bgColor,
  header,
  onClickFunction,
}) => {
  return (
    <div className="min-w-full">
      <div
        style={{ backgroundColor: bgColor, cursor: "pointer" }}
        onClick={onClickFunction}
        className={` md:py-5 py-2 md:pl-5 md:pr-10 flex flex-row items-center justify-around border-b border-grey mt-2`}
      >
        <p
          className={`w-full md:flex-[1] flex-[1] md:text-[16px] text-[14px] text-center md:text-left ${
            header ? "font-semibold" : ""
          }`}
        >
          {index + "."}
        </p>
        <p
          className={`w-full md:flex-[1] flex-[1] md:text-[16px] text-[14px] text-center md:text-left ${
            header ? "hidden" : "flex"
          }`}
        >
          <img
            className=" rounded-full h-9 w-9 object-cover"
            src={studentProfile}
            alt="Student Profile"
          />{" "}
        </p>
        <p
          className={`w-full md:flex-[3] my-1 md:my-0 text-center md:text-[16px] text-[14px] md:text-left ${
            header ? "font-semibold md:ml-14 text-center" : ""
          }`}
        >
          {studentName}
        </p>
        <p
          className={`w-full md:flex-[3] my-1 md:my-0 text-center md:text-left md:text-[16px]  text-[14px] ${
            header ? "font-semibold" : ""
          }`}
        >
          {studentClass}
        </p>
        <p
          className={`w-full md:flex-[3] my-1 md:my-0 text-center md:text-[16px] text-[14px] md:text-left ${
            header ? "font-semibold" : ""
          }`}
        >
          {subject}
        </p>
        {header ? (
          <p
            className={`w-full md:flex-[3] my-1 md:my-0 text-center md:text-left md:text-[16px] text-[14px] ${
              header ? "font-semibold" : ""
            }`}
          >
            {attendance}
          </p>
        ) : (
          <div className="md:flex-[3] w-full bg-grey/50 rounded-3xl overflow-hidden">
            <div className="w-[70%] text-xs h-4 bg-gradient-to-r from-green to-yellow_green_light rounded-3xl flex justify-center text-white md:text-[16px] text-[14px]">
              {attendance}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataRows;
