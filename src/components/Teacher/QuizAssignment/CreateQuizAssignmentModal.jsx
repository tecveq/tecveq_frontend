import React, { useRef, useState } from "react";
import Loader from "../../../utils/Loader";
import IMAGES from "../../../assets/images";

import { toast } from "react-toastify";
import { FiUploadCloud } from "react-icons/fi";
import { IoCloseCircle } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "../../../utils/FileUpload";
import { useBlur } from "../../../context/BlurContext";
import { useUser } from "../../../context/UserContext";
import { useTeacher } from "../../../context/TeacherContext";
import { createQuiz, editQuiz } from "../../../api/Teacher/Quiz";
import { createAssignment, editAssignment } from "../../../api/Teacher/Assignments";


const CreateQuizAssignmentModal = ({
  open,
  setopen,
  isQuiz,
  isEditTrue,
  refetch,
  data
}) => {
  const { toggleBlur } = useBlur();
  const { userData } = useUser();
  const { allClassrooms } = useTeacher();
  const ref = useRef(null);

  const [QADate, setQADate] = useState("");
  const [QATime, setQATime] = useState("");

  const [loading, setLoading] = useState(false);

  const [quizAssignmentDataObj, setQuizAssignmentDataObj] = useState({
    canSubmitAfterTime: false,
    title: isEditTrue ? data?.title : "",
    dueDate: isEditTrue ? data?.dueDate : "",
    subjectID: isEditTrue ? data?.subjectID : "",
    totalMarks: isEditTrue ? data?.totalMarks : 0,
    classroomID: isEditTrue ? data?.classroomID : "",
    files: "",
  })
  const [selectedFile, setSelectedFile] = useState("");

  const [selectedClassroom, setSelectedClassroom] = useState("");

  const handleCreateAssignment = async () => {
    setLoading(true);
    if (isEditTrue) {
      let sendingObjdata = {
        ...quizAssignmentDataObj,
        dueDate: QADate + "T" + QATime + ":00.000Z"
      }
      assignmentUpdateMutate.mutate(sendingObjdata)
    } else {

      let subjectId = "";

      JSON.parse(selectedClassroom).teachers.map((item) => {
        if (userData._id == item.teacher) {
          subjectId = item.subject;
        }
      })
      
      let fileUrl = await uploadFile(selectedFile, "deliverable");

      let fileObj = {
        name: selectedFile.name,
        url: fileUrl
      }

      let filesArr = [fileObj];


      let sendingObj = {
        ...quizAssignmentDataObj,
        classroomID: JSON.parse(selectedClassroom)._id,
        subjectID: subjectId,
        files:filesArr,
        dueDate: (QADate && QATime) ? QADate + "T" + QATime + ":00.000Z" : new Date(Date.now()).toISOString()
      }

      assignmentCreateMutate.mutate(sendingObj)
    }
    setLoading(false);
  }

  const handleCreateQuiz = async () => {
    setLoading(true);
    if (isEditTrue) {
      let sendingObjdata = {
        ...quizAssignmentDataObj,
        dueDate: QADate + "T" + QATime + ":00.000Z"
      }
      quizEditMutate.mutate(sendingObjdata)
    } else {


      let subjectId = "";

      JSON.parse(selectedClassroom).teachers.map((item) => {
        if (userData._id == item.teacher) {
          subjectId = item.subject;
        }
      })

      let fileUrl = await uploadFile(selectedFile, "deliverable");

      let fileObj = {
        name: selectedFile.name,
        url: fileUrl
      }

      let filesArr = [fileObj];

      let sendingObj = {
        ...quizAssignmentDataObj,
        classroomID: JSON.parse(selectedClassroom)._id,
        subjectID: subjectId,
        files: filesArr,
        dueDate: QADate + "T" + QATime + ":00.000Z"
      }
      console.log("sending data to server is : ", sendingObj);
      quizCreateMutate.mutate(sendingObj);
    }
    setLoading(false);
  }


  const assignmentUpdateMutate = useMutation({
    mutationFn: async (dataobj) => await editAssignment(dataobj, data?._id),
    onSettled: async (data, error) => {
      console.log("after updation data is : ", data);
      await refetch();
      toggleBlur();
      setopen(false);
      if(error){}{
        return toast.success("Assignment updated successfully");
      }
    }
  });


  const assignmentCreateMutate = useMutation({
    mutationFn: async (data) => await createAssignment(data),
    onSettled: async (data, error) => {
      console.log("after cration data is : ", data);
      await refetch();
      toggleBlur();
      setopen(false);
      if(error){
      }else{
        return toast.success("Assignment created successfully");
      }
    }
  });


  const quizEditMutate = useMutation({
    mutationFn: async (dataobj) => await editQuiz(dataobj, data._id),
    onSettled: async (data, error) => {
      console.log("after updation data is : ", data);
      await refetch();
      toggleBlur();
      setopen(false);
      if(error){}else{
        return toast.success("Quiz updated successfully");
      }
    }
  });

  const quizCreateMutate = useMutation({
    mutationFn: async (data) => await createQuiz(data),
    onSettled: async (data, error) => {
      console.log("after cration data is : ", data);
      await refetch();
      toggleBlur();
      setopen(false);
      if(error){}else{ 
        return toast.success("Quiz created successfully");
      }
    }
  });

  return (
    <div
      ref={ref}
      className={`fixed z-10 mt-10 bg-white p-8 w-[600px] px-16 text-black rounded-xl ml-5 md:ml-96 ${open ? "" : "hidden"
        }`}
    >
      <div className="flex gap-2">
        <div className="flex flex-col w-full gap-4">
          <div className="flex items-center justify-between">
            <div className="flex justify-center flex-1 w-[fit] gap-2 items-center">
              <p className="text-2xl font-semibold cursor-text">
                Create new {isQuiz ? "Quiz" : "Assignment"}
              </p>
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <img
                src={IMAGES.CloseIcon}
                className="w-[15px] h-[15px]"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleBlur();
                  setopen(false);
                }}
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-col flex-1 gap-1">
              <p className="text-xs font-semibold text-grey_700">Select Classroom</p>
              <div className="flex justify-between border-[1px] py-1 px-4 rounded-lg w-full items-center border-grey/50">
                <select value={selectedClassroom} onChange={e => setSelectedClassroom(e.target.value)} className="text-sm outline-none text-custom-gray-3 w-full">
                  <option className="">Select Classroom</option>
                  {allClassrooms.map((item) => {
                    return <option key={JSON.stringify(item)} className="" value={JSON.stringify(item)} >{item.name}</option>
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-col flex-1 gap-1">
              <p className="text-xs font-semibold text-grey_700">Title</p>
              <div className="flex justify-between border-[1px] py-1 px-4 rounded-lg w-full items-center border-grey/50">
                <input
                  className="text-sm outline-none text-custom-gray-3 w-full"
                  placeholder="Enter title"
                  value={quizAssignmentDataObj.title}
                  onChange={(e) => setQuizAssignmentDataObj({ ...quizAssignmentDataObj, title: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-col flex-1 gap-1">
              <p className="text-xs font-semibold text-grey_700">Total Makrs</p>
              <div className="flex justify-between border-[1px] py-1 px-4 rounded-lg w-full items-center border-grey/50">
                <input
                  className="text-sm outline-none text-custom-gray-3 w-full"
                  placeholder="Enter marks"
                  value={quizAssignmentDataObj.totalMarks}
                  onChange={(e) => setQuizAssignmentDataObj({ ...quizAssignmentDataObj, totalMarks: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1 gap-1">
            <p className="text-xs font-semibold text-grey_700">Deadline</p>
            <div className="flex items-center gap-3 ">
              <div className="flex flex-col flex-1 gap-1 ">
                <div className="flex items-center flex-1 justify-between gap-3 px-3 py-1 border-[1.5px] rounded-lg border-grey/30">
                  <input
                    id="date"
                    type="date"
                    className="text-sm outline-none text-custom-gray-3 w-full"
                    placeholder="Enter date"
                    value={QADate}
                    onChange={(e) => setQADate(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col flex-1 gap-1">
                <div className="flex flex-1 items-center justify-between gap-3 px-3 py-1 border-[1.5px] rounded-lg border-grey/30">
                  <input
                    type="time"
                    className="text-sm outline-none text-custom-gray-3 w-full"
                    placeholder="Enter time"
                    value={QATime}
                    onChange={(e) => setQATime(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          {isQuiz &&
            <div className="flex items-center gap-3">
              <div className="flex flex-col flex-1 gap-1">
                <p className="text-xs font-semibold text-grey_700">Can Submit after deadline</p>
                <div className="flex justify-between border-[1px] py-1 px-4 rounded-lg w-full items-center border-grey/50">
                  <select
                    value={quizAssignmentDataObj.canSubmitAfterTime}
                    className="text-sm outline-none text-custom-gray-3 w-full"
                    onChange={(e) => { setQuizAssignmentDataObj({ ...quizAssignmentDataObj, canSubmitAfterTime: e.target.value }) }} >
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </select>
                </div>
              </div>
            </div>
          }
          <div className="flex flex-1 border-2 rounded-lg border-[#00000010] py-6 px-16">
            <div className="flex flex-col items-center justify-center flex-1 gap-2">
              <label htmlFor="assignmentQuiz">
                <div className="flex p-4 rounded-lg shadow-sm border border-[#00000010] cursor-pointer">
                  <FiUploadCloud />
                </div>
              </label>
              <input type="file" onChange={(e) => { setSelectedFile(e.target.files[0]) }} className="hidden" id="assignmentQuiz" />
              <div className="flex">
                <p className="flex flex-wrap items-center justify-center text-sm text-center">
                  <span className={`text-maroon font-medium`}>
                    Click to upload
                  </span>
                  <span>or drag and drop Files</span>
                  <span>PNG, JPG, Word or PDF</span>
                </p>
              </div>
              {isEditTrue &&
                <div className="flex justify-between px-2 py-2 border rounded-lg w-60 border-black/20">
                  <div className="flex items-center gap-2">
                    <img src={IMAGES.pdf} alt="pdf image" className="w-8 h-8" />
                    <div className="text-xs">
                      <p>Assignment 1.pdf</p>
                      <p>200 KB</p>
                    </div>
                  </div>
                  <div className="">
                    <p onClick={() => { }} className="cursor-pointer">
                      <IoCloseCircle size={16} />
                    </p>
                  </div>
                </div>
              }
            </div>
          </div>
          {(loading || quizCreateMutate.isPending || quizEditMutate.isPending || assignmentCreateMutate.isPending || assignmentUpdateMutate.isPending) && <div><Loader /> </div>}
          {
            (!loading && !quizCreateMutate.isPending && !quizEditMutate.isPending && !assignmentCreateMutate.isPending && !assignmentUpdateMutate.isPending) &&
            <div className="flex items-center gap-3">
              <div
                onClick={() => { isQuiz ? handleCreateQuiz() : handleCreateAssignment() }}
                className="flex items-center justify-center w-full py-2 text-center rounded-md cursor-pointer bg-maroon"
              >
                <p className="text-sm text-white">{isEditTrue ? "Update" : "Create"}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default CreateQuizAssignmentModal;
