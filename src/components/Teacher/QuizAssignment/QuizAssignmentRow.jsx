import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { formatDate } from "../../../constants/formattedDate";
import moment from "moment";

const QuizAssignmentRow = (props) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-w-full overflow-auto">
      <div
        style={{ backgroundColor: props.bgColor }}
        className={`min-w-full border-b flex border-grey items-center`}
      >
        <div className="flex flex-row items-center flex-1 py-[4px] mt-1 md:pl-3 md:pr-5 md:gap-3 ">
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
            {props.title}
          </p>
          <p
            className={`w-full md:flex-[3] my-1 md:my-0 text-center md:text-center md:text-[14px]  text-[11px] ${props.header ? "font-semibold" : ""
              }`}
          >
            {props.header ? props.assignedOn :
              moment(props.assignedOn).format("Do MMM YYYY hh:mm a")
            }
          </p>
          <p
            className={`w-full md:flex-[3] my-1 md:my-0 text-center md:text-center md:text-[14px]  text-[11px] ${props.header ? "font-semibold" : ""
              }`}
          >
            {props.header ? props.deadline :
              moment.utc(props.deadline).format("Do MMM YYYY hh:mm a")
            }
          </p>
          <p
            className={`w-full md:flex-[3] my-1 md:my-0 text-center md:text-center md:text-[14px]  text-[11px] ${props.header
              ? "font-semibold"
              : "justify-center items-center flex"
              }`}
          >
            <p
              className={`${props.header ? "" : "bg-green/20 w-2/5 py-2 flex justify-center"
                }`}
            >
              {props.submissions}
            </p>
          </p>
        </div>
        <div className="flex ml-3 mr-2 lg:mr-5 cursor-pointer">
          <p
            onClick={() => { setModalOpen(!modalOpen); props.toggleAssignmentMenu(props.data) }}
            className={`w-full my-1 md:my-0 text-center md:text-center md:text-[20px] text-[14px] ${props.header ? "hidden" : ""
              }`}
          >
            <BsThreeDotsVertical />
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizAssignmentRow;
