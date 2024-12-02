import React, { useEffect, useState } from "react";
import IMAGES from "../../../assets/images/index";
import { BsThreeDotsVertical } from "react-icons/bs";


const DataRow = (props) => {

  useEffect(() => { }, []);

  return (
    <div className="min-w-full">
      <div
        style={{ backgroundColor: props.bgColor }}
        className={`min-w-full border-b flex border-grey items-center`}
      >
        <div className="flex flex-row items-center flex-1 py-2 mt-2 md:py-5 md:pl-3 md:pr-5 ">
          <p
            className={`w-full md:flex-[1] flex-[1] md:text-[14px] text-[11px] text-center md:text-left ${props.header ? "font-semibold" : ""
              }`}
          >
            {props.index + "."}
          </p>
          <p
            className={`w-full md:flex-[3] my-1 md:my-0 text-center md:text-center md:text-[14px]  text-[11px] ${props.header ? "font-semibold" : ""
              }`}
          >
            {props.classname}
          </p>
          <p
            className={`w-full md:flex-[3] my-1 md:my-0 text-center md:text-center md:text-[14px]  text-[11px] ${props.header ? "font-semibold" : ""
              }`}
          >
            {props.classesSchedualled}
          </p>
          <p
            className={`w-full md:flex-[3] my-1 md:my-0 text-center md:text-center md:text-[14px]  text-[11px] ${props.header ? "font-semibold" : ""
              }`}
          >
            {props.students}
          </p>
          <p
            className={`w-full md:flex-[3] my-1 md:my-0 text-center md:text-center md:text-[14px]  text-[11px] ${props.header ? "font-semibold" : ""
              }`}
          >
            {props.teachers}
          </p>
          <p
            className={`w-full md:flex-[3] my-1 md:my-0 text-center md:text-center md:text-[14px]  text-[11px] ${props.header ? "font-semibold" : ""
              }`}
          >
            {props.createdBy}
          </p>
        </div>
        <div className="flex ml-3 mr-2 lg:mr-5 cursor-pointer">
          <p
            onClick={() => {
              props.toggleClassMenu(props);
            }}
            className={`w-full my-1 md:my-0 text-center md:text-center md:text-[20px] text-[14px] ${props.header ? "hidden" : ""
              }`}
          >
            <div>
              {props.threeDots ? <BsThreeDotsVertical /> : ""}
            </div>

          </p>
        </div>
      </div>
    </div>
  );
};

export default DataRow;
