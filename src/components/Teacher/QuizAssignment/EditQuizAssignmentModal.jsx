import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { FiUploadCloud } from "react-icons/fi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { uploadFile } from "../../../utils/FileUpload";
import { useBlur } from "../../../context/BlurContext";
import { useUser } from "../../../context/UserContext";
import { useTeacher } from "../../../context/TeacherContext";
import { editAssignment } from "../../../api/Teacher/Assignments";
import { editQuiz } from "../../../api/Teacher/Quiz";
import useClickOutside from "../../../hooks/useClickOutlise";
import { getTeacherSubjectsOfClassroom } from "../../../api/Teacher/TeacherSubjectApi";

const EditQuizAssignmentModal = ({ isEditTrue, refetch, data, setIsEdit, isQuiz }) => {
  const { toggleBlur } = useBlur();
  const { userData } = useUser();
  const { allClassrooms } = useTeacher();

  // State Management
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    totalMarks: 0,
    dueDate: "",
    files: "",
    canSubmitAfterTime: false,
  });
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const modalRef = useRef(null);

  // Initialize form with existing data
  useEffect(() => {
    if (isEditTrue && data) {
      const { title, text, totalMarks, dueDate, files, canSubmitAfterTime, classroomID, subjectID } = data;
      const formattedDueDate = new Date(dueDate);

      setFormData({
        title,
        text,
        totalMarks,
        dueDate,
        files: files?.[0] || "",
        canSubmitAfterTime,
      });

      setDueDate(formattedDueDate.toISOString().split("T")[0]);
      setDueTime(formattedDueDate.toISOString().split("T")[1].slice(0, 5));
      setSelectedClassroom(classroomID);
      setSelectedSubject(subjectID?._id || "");
    }
  }, [isEditTrue, data]);

  // Fetch teacher subjects for the selected classroom
  const { data: teacherSubjects, isPending: isSubjectsPending } = useQuery({
    queryKey: ["teacherSubjectsOfClassrooms", selectedClassroom?._id],
    queryFn: async () => {
      if (!selectedClassroom?._id) return null;
      return await getTeacherSubjectsOfClassroom({ classroomIDs: [selectedClassroom._id] });
    },
    enabled: !!selectedClassroom?._id,
  });

  // Close modal on outside click
  useClickOutside(modalRef, () => {
    setIsEdit(false);
    toggleBlur();
  });

  // Format due date for submission
  const formatDueDate = () => `${dueDate}T${dueTime}:00.000Z`;

  // Handle file upload
  const handleFileUpload = async (file) => {
    try {
      return await uploadFile(file, "deliverable");
    } catch (error) {
      toast.error("File upload failed.");
      return null;
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const files = selectedFile
        ? [await handleFileUpload(selectedFile)]
        : (formData.files ? [formData.files] : []);

      const payload = {
        ...formData,
        subjectID: selectedSubject,
        classroomID: selectedClassroom?._id,
        files,
        dueDate: formatDueDate(),
      };

      const response = isQuiz
        ? await editQuiz(payload, data?._id)
        : await editAssignment(payload, data?._id);

      toast.success(`${isQuiz ? "Quiz" : "Assignment"} updated successfully!`);
      refetch();
      setIsEdit(false);
      toggleBlur();
    } catch (error) {
      toast.error("Failed to update. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div
      ref={modalRef}
      className="fixed z-10 mt-10 bg-white max-h-[85vh] overflow-y-auto p-8 w-full md:w-[600px] rounded-xl ml-5 md:ml-96 custom-scrollbar"
    >
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">{isQuiz ? "Edit Quiz" : "Edit Assignment"}</h2>
          <button
            className="text-red-500 text-xl"
            onClick={() => {
              setIsEdit(false);
              toggleBlur();
            }}
          >
            ✕
          </button>
        </div>

        {/* Classroom Selection */}
        <FieldWithLabel label="Select Classroom">
          <div className="relative">
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="border border-gray-300 rounded-lg p-2 cursor-pointer"
            >
              {selectedClassroom?.name || "Select Classroom"}
            </div>
            {isDropdownOpen && (
              <div className="absolute z-10 w-full max-h-40 overflow-y-auto border border-gray-300 rounded-lg bg-white mt-1">
                {allClassrooms?.map((classroom) => (
                  <div
                    key={classroom._id}
                    onClick={() => {
                      setSelectedClassroom(classroom);
                      setIsDropdownOpen(false);
                    }}
                    className="p-2 hover:bg-blue-50 cursor-pointer"
                  >
                    {classroom.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </FieldWithLabel>

        {/* Subject Selection */}
        <FieldWithLabel label="Select Subject">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            disabled={isSubjectsPending}
          >
            <option value="">Select Subject</option>
            {teacherSubjects?.subjects?.map((subject) => (
              <option key={subject.subjectId} value={subject.subjectId}>
                {subject.subjectName}
              </option>
            ))}
          </select>
        </FieldWithLabel>

        {/* Form Fields */}
        <FieldWithLabel label="Title">
          <input
            type="text"
            placeholder="Enter title"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </FieldWithLabel>

        <FieldWithLabel label="Text">
          <textarea
            placeholder="Enter text"
            value={formData.text}
            onChange={(e) => handleInputChange("text", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </FieldWithLabel>

        <FieldWithLabel label="Total Marks">
          <input
            type="number"
            placeholder="Enter marks"
            value={formData.totalMarks}
            onChange={(e) => handleInputChange("totalMarks", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </FieldWithLabel>

        <FieldWithLabel label="Deadline">
          <div className="flex gap-3">
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-1/2 p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="time"
              value={dueTime}
              onChange={(e) => setDueTime(e.target.value)}
              className="w-1/2 p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </FieldWithLabel>

        {isQuiz && (
          <FieldWithLabel label="Can Submit After Deadline">
            <select
              value={formData.canSubmitAfterTime}
              onChange={(e) => handleInputChange("canSubmitAfterTime", e.target.value === "true")}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
          </FieldWithLabel>
        )}

        <FieldWithLabel label="Upload File">
          <label htmlFor="assignmentFile" className="cursor-pointer">
            <div className="flex items-center gap-2 border p-2 rounded-lg">
              <FiUploadCloud size={24} /> <span>Click to upload</span>
            </div>
            <span className="text-sm text-gray-500">PNG, JPG, Word, or PDF</span>
          </label>
          <input
            id="assignmentFile"
            type="file"
            className="hidden"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
        </FieldWithLabel>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full py-2 text-white bg-maroon rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isLoading ? "Processing..." : "Update"}
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