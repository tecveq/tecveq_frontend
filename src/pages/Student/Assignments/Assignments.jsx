import React from "react";
import Navbar from "../../../components/Student/Dashboard/Navbar";
import QuizAssignmentRow from "../../../components/Student/QuizAssignment/QuizAssignmentRow";

import { useBlur } from "../../../context/BlurContext";
import { useStudent } from "../../../context/StudentContext";

const Assignments = () => {

  const { isBlurred } = useBlur();
  const { allAssignments } = useStudent();

  console.log("all assignments instudent are : ", allAssignments);

  return (
    <div className="flex flex-1 bg-[#F9F9F9] font-poppins">
      <div className="flex flex-1">
        <div
          className={`w-full h-screen lg:px-20 sm:px-10  flex-grow lg:ml-72`}
        >
          <div className="h-screen pt-1">
            <Navbar heading={"Assignments"} />
            <div className={`px-3 ${isBlurred ? "blur" : ""}`}>
              <div className="mt-8 h-[80%] overflow-auto">
                <QuizAssignmentRow
                  isQuiz={false}
                  index={"Sr. No"}
                  subject={"Subject"}
                  title={"Title"}
                  deadline={"Deadline"}
                  bgColor={"#F9F9F9"}
                  header={true}
                  total_marks={"Total Marks"}
                  download={"Download"}
                  upload={"Upload"}
                />
                {allAssignments.map((assignment, index) => (
                  <QuizAssignmentRow
                    alldata={assignment}
                    isQuiz={false}
                    index={index + 1}
                    id={assignment._id}
                    key={assignment._id}
                    subject={assignment?.subjectID.name}
                    title={assignment?.title}
                    deadline={assignment?.dueDate}
                    bgColor={"#FFFFFF"}
                    header={false}
                    total_marks={assignment?.totalMarks}
                    download={assignment?.files[0]?.url}
                    upload={true}
                    text={assignment?.text}
                  />
                ))}

                {allAssignments.length == 0 &&
                  <div className='flex w-full justify-center'>
                    <p className='font-medium text-2xl py-4'>No assignments to display</p>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assignments;
