import React from "react";
import { formatDate } from "../../../constants/formattedDate";
import moment from "moment";

const SubmissionRow = (props) => {

  const handleDownload = () => {
    alert("file downloading...");
  }

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
            className={`w-full md:flex-[3] my-1 md:my-0 items-center flex gap-4 text-center md:text-center md:text-[14px]  text-[11px] ${props.header ? "font-semibold" : ""
              }`}
          >
            {!props.header ? (
              <img src={props?.profileLink} className="w-12 h-12 rounded-full object-cover" alt="profile link" />
            ) : (
              <></>
            )}
            {props?.name}
          </p>
          <p
            className={`w-full md:flex-[3] my-1 md:my-0  md:text-[14px]  text-[11px] ${props.header ? "font-semibold" : ""
              }`}
          >
            {props.header ? props?.submission :
              `${moment(props?.submission).format("Do MM YYYY hh:mm a")}`
            }
          </p>
        </div>
        <div className="flex ml-3 mr-2 lg:mr-5 cursor-pointer">
          <p
            onClick={() => {
              console.log("download the resource");
            }}
            className={`w-full my-1 md:my-0 text-center md:text-center md:text-[14px] text-[14px] ${props.header ? "text-start mr-10 font-semibold" : ""
              }`}
          >
            {!props.header ?
              props?.submissionData?.file ? 
              <p onClick={() => { }} className="px-4 py-2 text-sm text-white bg-maroon rounded-3xl">
                <a href={props?.submissionData?.file} download={`${props?.name}.pdf`} target="_blank" > Download</a>
              </p>
              : 
              <p onClick={() => { }} className="px-4 py-2 text-sm text-white bg-maroon rounded-3xl">
                Pending
              </p>
              : "Files"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubmissionRow;
