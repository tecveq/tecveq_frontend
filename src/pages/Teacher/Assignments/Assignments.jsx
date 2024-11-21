import React, { useState } from "react";
import Loader from "../../../utils/Loader";
import Navbar from "../../../components/Teacher/Navbar";
import AssignmentMenu from "../../../components/Teacher/QuizAssignment/AssignmentMenu";
import QuizAssignmentRow from "../../../components/Teacher/QuizAssignment/QuizAssignmentRow";
import CreateQuizAssignmentModal from "../../../components/Teacher/QuizAssignment/CreateQuizAssignmentModal";

import { useNavigate } from "react-router-dom";
import { useBlur } from "../../../context/BlurContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteAssignments, getAllAssignments } from "../../../api/Teacher/Assignments";

const Assignments = () => {
  const [isAssignmentMenuOpen, setIsAssignmentMenuOpen] = useState(false);

  const navigate = useNavigate();
  const [assignmentdata, setAssignmentData] = useState({});

  const toggleAssignmentMenuOpen = (data) => {
    setAssignmentData(data);
    console.log("data in menu is : ", data);
    setIsAssignmentMenuOpen(!isAssignmentMenuOpen);
  }

  const { isBlurred, toggleBlur } = useBlur();

  const onViewSubmission = () => {
    navigate(`/teacher/assignments/submissions`, { state: assignmentdata })
  }

  const onGradingAssignment = () => {
    navigate(`/teacher/assignments/GradingAssignments`, { state: assignmentdata })
  }

  const [createModalOpen, setCreateModalOpen] = useState(false);

  const [changeDeadlineClick, setChangeDeadlineClick] = useState(false);

  const onChangeDeadline = () => {
    setChangeDeadlineClick(!changeDeadlineClick);
    toggleBlur();
  }

  const assignmentDellMutate = useMutation({
    mutationFn: async (id) => await deleteAssignments(id),
    onSettled: async () => {
      await refetch();
      return toast.success("Assignment deleted successfully");
    }
  });

  const { data, isPending, isSuccess, isError, refetch, isRefetching } = useQuery({ queryKey: ["assignments"], queryFn: getAllAssignments });

  console.log("all assignemtns are : ", data);

  return (
    isPending || isRefetching ? <div className="flex justify-start flex-1"> <Loader /> </div> :
      <>
        <div className="flex flex-1 bg-[#F9F9F9] font-poppins">
          <div className="flex flex-1">
            <div
              className={`w-full h-screen lg:px-20 sm:px-10  flex-grow lg:ml-72`}
            >
              <div className="h-screen pt-1">
                <Navbar heading={"Assignment"} />
                <div className={`px-3 ${isBlurred ? "blur" : ""}`}>
                  <div className="flex justify-end my-2">
                    <div
                      className="flex cursor-pointer bg-maroon rounded-3xl"
                      onClick={() => {
                        setCreateModalOpen(true);
                        toggleBlur();
                      }}
                    >
                      <p className="px-4 py-2 text-white">Create new +</p>
                    </div>
                  </div>
                  <div className="mt-8 h-[80%] overflow-auto">

                    <QuizAssignmentRow
                      isQuiz={false}
                      index={"Sr. No"}
                      assignedOn={"Assigned On"}
                      title={"Title"}
                      deadline={"Deadline"}
                      bgColor={"#F9F9F9"}
                      header={true}
                      submissions={"Submissions"}
                      
                    />

                    {isSuccess && data.map((assignment, index) => (
                      <QuizAssignmentRow
                        key={assignment._id}
                        id={assignment._id}
                        alldata={assignment}
                        toggleAssignmentMenu={(e) => toggleAssignmentMenuOpen(e)}
                        data={assignment}
                        isQuiz={false}
                        index={index + 1}
                        assignedOn={assignment.createdAt}
                        title={assignment.title}
                        deadline={assignment.dueDate}
                        bgColor={"#FFFFFF"}
                        header={false}
                        submissions={assignment.submissions.length}
                      />
                    ))}

                    {data.length == 0 && <div className="text-center py-4 text-3xl font-medium">No assignemnts to display!</div>}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CreateQuizAssignmentModal
          isQuiz={false}
          refetch={refetch}
          open={createModalOpen}
          setopen={setCreateModalOpen}
        />
        <CreateQuizAssignmentModal
          isQuiz={false}
          isEditTrue={true}
          refetch={refetch}
          data={assignmentdata}
          open={changeDeadlineClick}
          setopen={setChangeDeadlineClick}
        />
        <AssignmentMenu isQuizz={false}
          onEditGradeClick={() => { }}
          isopen={isAssignmentMenuOpen}
          setIsOpen={setIsAssignmentMenuOpen}
          onViewSubmissionClick={onViewSubmission}
          onChangeDeadlineClick={onChangeDeadline}
          onGradeAssignemntClick={onGradingAssignment}
        />
      </>
  );
};

export default Assignments;
