import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Teacher/Navbar";
import AssignmentMenu from "../../../components/Teacher/QuizAssignment/AssignmentMenu";
import QuizAssignmentRow from "../../../components/Teacher/QuizAssignment/QuizAssignmentRow";
import CreateQuizAssignmentModal from "../../../components/Teacher/QuizAssignment/CreateQuizAssignmentModal";

import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useBlur } from "../../../context/BlurContext";
import { getAllQuizes } from "../../../api/Teacher/Quiz";
import LargeLoader from "../../../utils/LargeLoader";
import { MdDelete, MdEdit } from "react-icons/md";
import EditQuizAssignmentModal from "../../../components/Teacher/QuizAssignment/EditQuizAssignmentModal";

const Quizzes = () => {
  const [isAssignmentMenuOpen, setIsAssignmentMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedAssignments, setSelectedAssignments] = useState(null);
  const navigate = useNavigate();
  const [quizdata, setQuizdata] = useState({});

  const toggleAssignmentMenuOpen = (data) => {
    console.log("toggle menu data is : ", data);
    setQuizdata(data);
    setIsAssignmentMenuOpen(!isAssignmentMenuOpen);
  }


  const onViewSubmission = () => {
    navigate(`/teacher/quizzes/submissions`, { state: quizdata })
  }

  const onGradingAssignment = () => {
    navigate(`/teacher/quizzes/GradingQuizzes`, { state: quizdata })
  }

 

  const [createModalOpen, setCreateModalOpen] = useState(false);

  const [changeDeadlineClick, setChangeDeadlineClick] = useState(false);

  const onChangeDeadline = () => {
    setChangeDeadlineClick(!changeDeadlineClick);
  }

  const { data, isPending, error, refetch, isRefetching } = useQuery({ queryKey: ["quizes"], queryFn: getAllQuizes });

  console.log("all quizes are : ", data);
  // if(error){
  //   navigate("/teacher/quizzes")
  // }


  return (
    isPending || isRefetching ? <div className="flex justify-center flex-1"> <LargeLoader />  </div> :
      <>
        <div className="flex flex-1 bg-[#F9F9F9] font-poppins">
          <div className="flex flex-1">
            <div
              className={`w-full h-screen lg:px-12 sm:px-10  flex-grow lg:ml-72`}
            >
              <div className="h-screen pt-1">
                <Navbar heading={"Quizes"} />
                <div className={`px-3 `}>
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
                      isQuiz={true}
                      index={"Sr. No"}
                      assignedOn={"Assigned On"}
                      title={"Title"}
                      deadline={"Deadline"}
                      bgColor={"#F9F9F9"}
                      header={true}
                      submissions={"Submissions"}
                      actions={"Actions"}
                    />

                    {data?.map((assignment, index) => (
                      <QuizAssignmentRow
                        key={index}
                        index={index + 1}
                        toggleAssignmentMenu={(e) => toggleAssignmentMenuOpen(e)}
                        isQuiz={true}
                        data={assignment}
                        assignedOn={assignment.createdAt}
                        title={assignment.title}
                        deadline={assignment.dueDate}
                        bgColor={"#FFFFFF"}
                        header={false}
                        submissions={assignment.submissions.length}
                        actions={
                          <div className="flex gap-3 justify-center items-center">
                            <span className="text-[blue] cursor-pointer" onClick={() => {
                              setSelectedAssignments(assignment);
                              setIsEdit(true)
                              toggleBlur();
                            }}><MdEdit className="w-6 h-6" /></span>
                            <span className="text-red cursor-pointer " onClick={() => {
                              quizDellMutate.mutate(assignment?._id);
                            }}><MdDelete className="w-6 h-6" /></span>
                          </div>
                        }
                      />
                    ))}

                    {data.length == 0 && <div className="text-center py-4 text-3xl font-medium">No quizes to display!</div>}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CreateQuizAssignmentModal
          isQuiz={true}
          refetch={refetch}
          open={createModalOpen}
          setopen={setCreateModalOpen}
        />
        <CreateQuizAssignmentModal
          isQuiz={true}
          data={quizdata}
          isEditTrue={true}
          refetch={refetch}
          open={changeDeadlineClick}
          setopen={setChangeDeadlineClick}
        />
        <AssignmentMenu isQuizz={true}
          onEditGradeClick={() => { }}
          isopen={isAssignmentMenuOpen}
          setIsOpen={setIsAssignmentMenuOpen}
          onViewSubmissionClick={onViewSubmission}
          onChangeDeadlineClick={onChangeDeadline}
          onGradeAssignemntClick={onGradingAssignment}
        />
        {isEdit && selectedAssignments && (
          <EditQuizAssignmentModal
            data={selectedAssignments}
            refetch={refetch}
            isEditTrue={true}
            isQuiz={true}
            setIsEdit={setIsEdit}
          />
        )}
      </>
  );
};

export default Quizzes