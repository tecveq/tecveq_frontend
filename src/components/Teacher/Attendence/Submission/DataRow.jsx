import React, { useEffect, useState } from "react";
import { IoMdRadioButtonOff, IoMdRadioButtonOn } from "react-icons/io";


const DataRow = (props) => {

  useEffect(() => { }, []);

  const [present, setPresent] = useState(true);
  const [absent, setAbsent] = useState(false);
  const [leave, setLeave] = useState(false);

  const onPresentClick = () => {
    let temparray = props.attendeceData;
    console.log(temparray);
    console.log(props.index);
    temparray[props.index - 1] = { studentID: props?.data?._id, isPresent: true };
    // temparray[props.index-1] = {studentID: props.classname, status: "present" } ;
    console.log("after : ", temparray)
    props.setAttendenceData(temparray);
    setPresent(true);
    setAbsent(false);
    setLeave(false);
  }

  const onAbsentClick = () => {
    let temparray = props.attendeceData;
    temparray[props.index - 1] = { studentID: props?.data?._id, isPresent: false };
    props.setAttendenceData(temparray);
    setPresent(false);
    setAbsent(true);
    setLeave(false);
  }

  // const onLeaveClick = () => {
  //   let temparray = props.attendeceData;
  //   temparray[props.index-1] = {studentID: props.classname, status: "leave" } ;
  //   props.setAttendenceData(temparray);
  //   setPresent(false);
  //   setAbsent(false);
  //   setLeave(true);
  // }

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
            className={`w-full flex items-center gap-4 md:flex-[3] my-1 md:my-0 text-center md:text-center md:text-[14px]  text-[11px] ${props.header ? "font-semibold" : ""
              }`}
          >
            {props.header ? " " :
              <img src={props.profile} alt="" className="w-10 h-10 object-cover rounded-full" />
            }
            {props.classname}
          </p>
          <p
            className={`w-full md:flex-[3] my-1 md:my-0 text-center md:text-center md:text-[14px]  text-[11px] ${props.header ? "font-semibold" : ""
              }`}
          >
            {props.classesSchedualled}
          </p>


          <div className={`w-full md:flex-[3] my-1 md:my-0 text-center md:text-center md:text-[14px]  text-[11px] ${props.header ? "font-semibold" : ""
            }`}>
            {!props.header ?
              <>
                <div className="flex items-center">
                  <p
                    className={`w-full flex gap-2 items-center md:flex-[3] my-1 md:my-0 text-center md:text-center md:text-[14px]  text-[11px] ${props.header ? "font-semibold" : ""
                      }`}
                  >
                    <div className="flex gap-2" onClick={onPresentClick}>
                      {present ? <IoMdRadioButtonOn className="text-maroon" /> : <IoMdRadioButtonOff className="text-maroon" />}
                    </div>
                    Present
                  </p>
                  <p
                    className={`w-full flex gap-2 items-center md:flex-[3] my-1 md:my-0 text-center md:text-center md:text-[14px]  text-[11px] ${props.header ? "font-semibold" : ""
                      }`}
                  >
                    <div className="flex gap-2" onClick={onAbsentClick}>
                      {absent ? <IoMdRadioButtonOn className="text-maroon" /> : <IoMdRadioButtonOff className="text-maroon" />}
                    </div>
                    Absent
                  </p>
                  {/* <p
                    className={`w-full flex gap-2 items-center md:flex-[3] my-1 md:my-0 text-center md:text-center md:text-[14px]  text-[11px] ${props.header ? "font-semibold" : ""
                      }`}
                  >
                    <div className="flex gap-2" onClick={onLeaveClick}>
                      {leave ? <IoMdRadioButtonOn  className="text-maroon"/> : <IoMdRadioButtonOff className="text-maroon" />}
                    </div>
                    Leave
                  </p> */}
                </div>
              </>
              : <>
                <p className={`w-full md:flex-[3] my-1 md:my-0 text-center md:text-center md:text-[14px]  text-[11px] ${props.header ? "font-semibold" : ""
                  }`} >
                  Attendnece
                </p>
              </>}
          </div>
        </div>

      </div>
    </div>
  );
};

export default DataRow;
