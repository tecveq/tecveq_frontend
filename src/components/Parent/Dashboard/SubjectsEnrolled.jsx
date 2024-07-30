import React, { useState } from "react";
import TeacherMessageDialog from "./TeacherMessageDialog";

const SubjectsEnrolled = () => {

  const [popup, setPopup] = useState(false);
  const [clickedItem, setClickedItem] = useState(false)
  const toggleClickTeacher = (item) => {
    setPopup(!popup);
    setClickedItem(item)
  }

  const handleFeedback = () => {
    toggleClickTeacher();
    // backend call
  }

  const handleTeacherClick = (item) => {
    setClickedItem(item);
  }

  const data = [
    {
      subject: "Physics",
      instructor: "John Smith",
      sr: 1,
      attendence: "70",
      assignment: "B",
      quiz: "B",
    },
    {
      subject: "Mathematics",
      instructor: "Oliver Queen",
      sr: 2,
      attendence: "70",
      assignment: "B",
      quiz: "B",
    },
    {
      subject: "Statistics",
      instructor: "Thomas Shelby",
      sr: 3,
      attendence: "70",
      assignment: "B",
      quiz: "B",
    },
    {
      subject: "Urdu",
      instructor: "Mark Snow",
      sr: 4,
      attendence: "70",
      assignment: "B",
      quiz: "B",
    },
    {
      subject: "Chemistry",
      instructor: "John Doe",
      sr: 5,
      attendence: "70",
      assignment: "B",
      quiz: "B",
    },
    {
      subject: "English",
      instructor: "John Constantine",
      sr: 6,
      attendence: "70",
      assignment: "B",
      quiz: "B",
    },
  ]



  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 gap-2">
        <div>
          <p className="text-lg font-medium">Subjects Enrolled</p>
        </div>
        <div className="flex flex-1">
          <table className="flex flex-col flex-1 bg-white rounded-lg table-fixed">
            <thead className="flex gap-5 px-2 py-3 border-t-4 rounded-tl-lg rounded-tr-lg border-t-maroon bg-maroon_10">
              <tr className="flex flex-1 font-medium">
                <td className="flex-[1] flex justify-center">Sr No.</td>
                <td className="flex-[3] flex justify-center">Subject Name</td>
                <td className="flex-[3] flex justify-center">Instructor</td>
                <td className="flex-[3] flex justify-center">Assignment</td>
                <td className="flex-[3] flex justify-center">Quiz</td>
                <td className="flex-[3] flex justify-center">Attendence</td>
              </tr>
            </thead>
            <tbody className="flex flex-col">
              {data.map((item) => {
                return (
                  <tr className="flex flex-1 text-xs border-t border-t-black/10">
                    <td className="flex-[1] py-2 lg:py-3 flex justify-center">{item.sr}</td>
                    <td className="flex-[3] py-2 lg:py-3 border-l border-l-black/10 flex justify-center">
                      {item.subject}
                    </td>
                    <td onClick={() => toggleClickTeacher(item)} style={{ cursor: "pointer" }} className="flex-[3] py-2 lg:py-3 border-l border-l-black/10 flex justify-center">
                      {item.instructor}
                    </td>
                    <td className="flex-[3] py-2 lg:py-3 border-l border-l-black/10 flex justify-center">
                      {item.assignment}
                    </td>
                    <td className="flex-[3] py-2 lg:py-3 border-l border-l-black/10 flex justify-center">
                      {item.quiz}
                    </td>
                    <td className="flex-[3] py-2 lg:py-3 border-l border-l-black/10 flex w-full justify-center">
                      <div className="flex w-[90%] h-4 bg-grey/50 rounded-3xl">
                        <div className="w-[70%] text-xs h-4 bg-gradient-to-r from-green to-yellow_green_light rounded-3xl flex justify-center text-white">
                          70%
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {popup ? <TeacherMessageDialog handleFeedback={handleFeedback} item={clickedItem} /> : ""}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubjectsEnrolled;
