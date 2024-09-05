import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const DataRow = (props) => {

  useEffect(() => {}, []);
  const navigate = useNavigate();

  return (
    <div className="min-w-full cursor-pointer" onClick={() =>{!props.header && navigate("/teacher/attendence/submission", {state: props?.allData})}}>
      <div
        style={{ backgroundColor: props.bgColor }}
        className={`min-w-full border-b flex border-grey items-center`}
      >
        <div className="flex flex-row items-center flex-1 py-2 mt-2 md:py-5 md:pl-3 md:pr-5 ">
          <p
            className={`w-full md:flex-[1] flex-[1] md:text-[14px] text-[11px] text-center md:text-left ${
              props.header ? "font-semibold" : ""
            }`}
          >
            {props.index + "."}
          </p>
          <p
            className={`w-full md:flex-[3] my-1 md:my-0 text-center md:text-center md:text-[14px]  text-[11px] ${
              props.header ? "font-semibold" : ""
            }`}
          >
            {props.classname}
          </p>
          <p
            className={`w-full md:flex-[3] my-1 md:my-0 text-center md:text-center md:text-[14px]  text-[11px] ${
              props.header ? "font-semibold" : ""
            }`}
          >
            {props.subject}
          </p>
          <p
            className={`w-full md:flex-[3] my-1 md:my-0 text-center md:text-center md:text-[14px]  text-[11px] ${
              props.header ? "font-semibold" : ""
            }`}
          >
            {props.classesSchedualled}
          </p>
          <p
            className={`w-full md:flex-[3] my-1 md:my-0 text-center md:text-center md:text-[14px]  text-[11px] ${
              props.header ? "font-semibold" : ""
            }`}
          >
            {props.students}
          </p>
          <p
            className={`w-full md:flex-[3] my-1 md:my-0 text-center md:text-center md:text-[14px]  text-[11px] ${
              props.header ? "font-semibold" : ""
            }`}
          >
            {props.teachers}
          </p>
          <p
            className={`w-full md:flex-[3] my-1 md:my-0 text-center md:text-center md:text-[14px]  text-[11px] ${
              props.header ? "font-semibold" : ""
            }`}
          >
            {props.header? "Status" : props?.allData?.attendance?.length !== 0 ? "Already Submitted": "Not submitted yet"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataRow;
