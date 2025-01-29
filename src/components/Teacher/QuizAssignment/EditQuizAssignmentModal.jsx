import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { FiUploadCloud } from "react-icons/fi";
import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "../../../utils/FileUpload";
import { useBlur } from "../../../context/BlurContext";
import { useUser } from "../../../context/UserContext";
import { editAssignment } from "../../../api/Teacher/Assignments";
import { useTeacher } from "../../../context/TeacherContext";
import { editQuiz } from "../../../api/Teacher/Quiz";

const EditQuizAssignmentModal = ({ isEditTrue, refetch, data, setIsEdit, isQuiz, }) => {
  const { toggleBlur } = useBlur();
  const { userData } = useUser();
  const { allClassrooms } = useTeacher();

  const ref = useRef(null);
  console.log(data, "quiz data is blaw blaw");

  // State Management
  const [QADate, setQADate] = useState("");
  const [QATime, setQATime] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [quizAssignmentDataObj, setQuizAssignmentDataObj] = useState({
    canSubmitAfterTime: false,
    title: "",
    totalMarks: 0,
    dueDate: "",
    files: "",
  });
  const [selectedClassroom, setSelectedClassroom] = useState(data?.classroomID);


  console.log(data, "data is available");

  // Effect to load data into form when modal is opened for editing
  useEffect(() => {
    if (isEditTrue && data) {
      const { title, totalMarks, dueDate, files, canSubmitAfterTime } = data;
      const formattedDueDate = new Date(dueDate);
      setQuizAssignmentDataObj({
        canSubmitAfterTime,
        title,
        totalMarks,
        dueDate,
        files: data?.files ? data?.files[0] : "", // Assume single file upload
      });
      setQADate(formattedDueDate.toISOString().split("T")[0]); // Date part
      setQATime(formattedDueDate.toISOString().split("T")[1].slice(0, 5)); // Time part
    }
  }, [isEditTrue, data]);

  const formatDueDate = () => `${QADate}T${QATime}:00.000Z`;

  // File Upload Handler
  const handleFileUpload = async (file) => {
    try {
      const fileUrl = await uploadFile(file, "deliverable");
      return { name: file.name, url: fileUrl };
    } catch (error) {
      toast.error("File upload failed.");
      return null;
    }
  };

  let subjectId = "";

  selectedClassroom?.teachers?.map((item) => {
    if (userData._id == item.teacher) {
      subjectId = item.subject;
    }
  })




  const handleSubmit = async () => {
    setLoading(true);
    const files = selectedFile
      ? [await handleFileUpload(selectedFile)]
      : (quizAssignmentDataObj.files ? [quizAssignmentDataObj.files] : []);

    const payload = {
      ...quizAssignmentDataObj,
      subjectId,
      classroomID: selectedClassroom?._id,
      files,
      dueDate: formatDueDate(),
    };

    console.log(payload, "payload");

    try {
      // Call API for creating or editing the assignment
      // Call the API to update the assignment
      if (!isQuiz) {
        const response = await editAssignment(payload, data?._id);

        console.log(response, "response");
        refetch();
        toast.success("Assignment updated successfully!"); // Success toast
        setIsEdit(false)
        toggleBlur()
      } else {
        const response = await editQuiz(payload, data?._id);

        console.log(response, "response");
        refetch();

        toast.success("Quiz updated successfully!"); // Success toast
        setIsEdit(false)
        toggleBlur()
      }

    } catch (error) {
      console.log("error", error);
      ; // Error toast
    } finally {
      setLoading(false);

    }
  };

  return (
    <div
      ref={ref}
      className=" fixed z-10 mt-10 bg-white max-h-[85vh] overflow-y-auto p-8 w-full md:w-[600px]  px-16 text-black rounded-xl ml-5 md:ml-96 custom-scrollbar"
    >
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            {isQuiz ? "Edit Quiz" : "Edit Assignment"}
          </h2>
          <button
            className="text-red-500 text-xl"
            onClick={() => {
              toggleBlur();
              setIsEdit(false)
            }}
          >
            ✕
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex flex-col flex-1 gap-1">
            <p className="text-xs font-semibold text-grey_700">Select Classroom</p>
            <div className="flex justify-between border-[1px] py-1 px-4 rounded-lg w-full items-center border-grey/50">
              <select value={selectedClassroom.name} onChange={e => setSelectedClassroom(e.target.value)} className="text-sm outline-none text-custom-gray-3 w-full">
                <option value="">Select Classroom</option>
                {allClassrooms.map((item) => (
                  <option key={item._id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {/* Form Fields */}
        <div className="flex flex-col gap-3">
          <FieldWithLabel label="Title">
            <input
              type="text"
              placeholder="Enter title"
              value={quizAssignmentDataObj.title}
              onChange={(e) =>
                setQuizAssignmentDataObj({ ...quizAssignmentDataObj, title: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </FieldWithLabel>

          <FieldWithLabel label="Total Marks">
            <input
              type="number"
              placeholder="Enter marks"
              value={quizAssignmentDataObj.totalMarks}
              onChange={(e) =>
                setQuizAssignmentDataObj({ ...quizAssignmentDataObj, totalMarks: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </FieldWithLabel>

          <FieldWithLabel label="Deadline">
            <div className="flex gap-3">
              <input
                type="date"
                value={QADate}
                onChange={(e) => setQADate(e.target.value)}
                className="w-1/2 p-2 border rounded"
              />
              <input
                type="time"
                value={QATime}
                onChange={(e) => setQATime(e.target.value)}
                className="w-1/2 p-2 border rounded"
              />
            </div>
          </FieldWithLabel>

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

          <FieldWithLabel label="Upload File">
            <div className="flex flex-col justify-center items-start">
              <label htmlFor="assignmentFile" className="cursor-pointer">
                <div className="flex items-center gap-2 border p-2 rounded">
                  <FiUploadCloud size={24} /> <span>Click to upload</span>
                </div>
                <span>or drag and drop Files</span>
                <span>PNG, JPG, Word or PDF</span>

              </label>
              <input
                id="assignmentFile"
                type="file"
                className="hidden"
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />
            </div>
          </FieldWithLabel>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-2 text-white bg-[blue] rounded hover:bg-blue-600"
        >
          {loading ? "Processing..." : isEditTrue ? "Update Assignment" : "Create Assignment"}
        </button>
      </div>
    </div>
  );
};

const FieldWithLabel = ({ label, children }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-semibold text-gray-700">{label}</label>
    {children}
  </div>
);

export default EditQuizAssignmentModal;
