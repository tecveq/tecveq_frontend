import React, { useState, useRef, useEffect } from 'react';
import IMAGES from "../../../assets/images";

import { IoIosArrowDown } from "react-icons/io";
import { useMutation } from '@tanstack/react-query';
import { useBlur } from "../../../context/BlurContext";
import { useAdmin } from "../../../context/AdminContext";
import { createClassroom } from '../../../api/Admin/classroomApi';
import Loader from '../../../utils/Loader';
import { toast } from 'react-toastify';
import { useGetAllStudentsWithLevel } from '../../../api/Admin/AdminApi';
import { useGetAllSubjectsWithLevel } from '../../../api/Admin/SubjectsApi';
import MultiSelectField from '../../../commonComponents/MultiSelectField';
import useClickOutside from '../../../hooks/useClickOutlise';



const Selectable = ({ label, options, setSelectedOption, selectedOption }) => {
  return (
    <div className="flex flex-col text-start py-3">
      <label className="font-medium text-gray-800 mb-2">{label}</label>
      <div className="relative">
        <select
          value={selectedOption ? JSON.stringify(selectedOption) : ""}
          onChange={(e) => {
            const selectedItem = JSON.parse(e.target.value);
            setSelectedOption(selectedItem);
          }}
          className="block w-full px-4 py-2 text-sm text-grey_700 border border-grey_700 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition-all duration-200 ease-in-out"
        >
          <option value="">Select Option</option>
          {options.map((item) => (
            <option key={item._id} value={JSON.stringify(item)}>
              {item.name}
            </option>
          ))}
        </select>
        <div className="absolute top-0 right-0 mt-2 mr-3 text-gray-500 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>

  )
}





const ClassModal = ({ open, setopen, isEditTrue, refetch, editData }) => {

  const ref = useRef(null);
  const [headTeacher, setHeadTeacher] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedSubjects, setSelectedSubjects] = useState({});
  const { adminUsersData, allLevels, allSubjects } = useAdmin();
  const { studentWithLevel, isLoading } = useGetAllStudentsWithLevel(selectedLevel?._id)
  const { subjectWithLevel } = useGetAllSubjectsWithLevel(selectedLevel?._id)

  const [classroomName, setClassroomName] = useState("");
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [teacherArr, setTeachersArr] = useState([]);
  const [newSelectedTeachers, setNewSelectedTeachers] = useState([]);
  const [newSelectedStudents, setNewSelectedStudents] = useState([]);



  const { toggleBlur } = useBlur(); // Using toggleBlur for blur control



  useClickOutside(ref, () => {
    setopen(false)
    toggleBlur();
  });




  const handleMultiSelectTeachersChange = (options) => {
    console.log('Selected options:', options);
  };

  const handleMultiSelectStudentsChange = (options) => {
    console.log('Selected options:', options);
  };

  useEffect(() => {
    console.log("user selected teachers is : ", selectedTeachers);
    console.log("user selected students is : ", selectedStudents);
    if (selectedStudents.length > 0) {
      setNewSelectedStudents(selectedStudents);
    }
    if (selectedTeachers.length > 0) {
      setNewSelectedTeachers(selectedTeachers);
    }
  }, [selectedTeachers, selectedStudents])



  const handleCreateClass = async () => {
    if (classroomName && selectedLevel && newSelectedStudents.length > 0 && newSelectedTeachers.length > 0) {

      let tempstudents = newSelectedStudents.map((item) => item?._id);

      const classroomnameregex = /^[a-zA-Z0-9\s]+$/;

      if (classroomnameregex.test(classroomName)) {
        let data = {
          name: classroomName,
          levelID: selectedLevel._id,
          students: tempstudents,
          teachers: teacherArr,
          headTeacher: headTeacher?._id || "",  // Pass the head teacher ID
        };

        console.log("data sending to backend is : ", data);

        createClassroomMutation.mutate(data);
      } else {
        toast.error("Invalid Classroom name!. Should not have any special characters.");
      }
    } else {
      toast.error("Fill all fields first");
    }
  }


  const createClassroomMutation = useMutation({
    mutationKey: ["addclassroom"],
    mutationFn: async (data) => {
      const result = await createClassroom(data);
      return result;
    },
    onSuccess: async (result) => {

      await refetch();
      await setopen(false);
      await toggleBlur();

      // Show success message
      toast.success("Classroom created successfully!");
      console.log("Result of classroom creation is: ", result);
    },
    onError: (error) => {
      // Handle error scenario
      toast.error("Failed to create classroom. Please try again.");
      console.error("Error creating classroom: ", error);
    }
  });

  if (isLoading) {
    return <div>Loading...</div>
  }



  const handleSubjectCheckboxChange = (teacherId, subject, isChecked) => {
    setSelectedSubjects(prev => {
      const currentSubjects = prev[teacherId] || [];
      let updatedSubjects;

      if (isChecked) {
        updatedSubjects = [...currentSubjects, subject];
      } else {
        updatedSubjects = currentSubjects.filter(s => s._id !== subject._id);
      }

      return { ...prev, [teacherId]: updatedSubjects };
    });

    console.log(headTeacher, "head teacher ");

    setTeachersArr(prev => {
      const filtered = prev.filter(item => item.teacher !== teacherId);
      const subjectEntries = (isChecked
        ? [...(selectedSubjects[teacherId] || []), subject]
        : (selectedSubjects[teacherId] || []).filter(s => s._id !== subject._id)
      ).map(subj => ({
        teacher: teacherId,
        subject: subj._id,
        type: headTeacher?._id && teacherId === headTeacher._id ? "head" : "teacher"

      }));

      return [...filtered, ...subjectEntries];
    });
  };




  return (
    <div
      ref={ref}
      className={`fixed z-10 mt-10 bg-white p-6 md:p-8 w-[90%] md:w-[800px] lg:w-[900px] px-4 md:px-10 border border-gray-300 shadow-lg text-gray-800 rounded-xl ml-5 md:ml-80 place-self-center ${open ? "" : "hidden"}`}
    >
      <div className="flex flex-1">
        <div className="flex flex-col w-full gap-6 overflow-y-auto max-h-[80vh] custom-scrollbar">
          <div className='pr-2'>
            <div className="flex items-center justify-between">
              <div className="flex justify-center flex-1 w-fit gap-2 items-center">
                <p className="text-2xl font-semibold text-blue-600 cursor-text">
                  {isEditTrue ? "✏️ Edit" : "🎓 Create"} Classroom
                </p>
              </div>
              <div className="flex items-center gap-2 cursor-pointer">
                <img
                  src={IMAGES.CloseIcon}
                  className="w-[18px] h-[18px]"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBlur();
                    setopen(false);
                  }}
                />
              </div>
            </div>

            <div className="flex items-center gap-4 mt-6">
              <div className="flex flex-col flex-1 gap-2">
                <p className="text-xs font-semibold text-gray-700 mb-3">📚 Classroom Name</p>
                <div className="flex flex-col border-[1px] py-2 px-4 rounded-lg w-full items-center border-gray-300 hover:border-blue-500 focus:ring-2 focus:ring-blue-500">
                  <input
                    className="w-full text-sm outline-none text-gray-700 placeholder-gray-500 "
                    placeholder="Enter classroom name"
                    value={classroomName}
                    onChange={(e) => setClassroomName(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <div className="flex flex-col flex-1 gap-2">
                <p className="text-xs font-semibold text-gray-700">🎓 Select Level</p>
                <Selectable
                  options={allLevels}
                  setSelectedOption={setSelectedLevel}
                  selectedOption={selectedLevel}
                />
              </div>
            </div>

            {selectedLevel && (
              <div className="flex flex-col mt-4">
                <div className="flex flex-col flex-1 gap-2">
                  <p className="text-xs font-semibold text-gray-700">👨‍🏫 Select Head Teacher <span className="text-gray-500">(Optional)</span></p>
                  <Selectable
                    options={adminUsersData.allTeachers}
                    setSelectedOption={setHeadTeacher}
                    selectedOption={headTeacher}
                  />
                </div>
              </div>
            )}

            {selectedLevel && (
              <div className="flex flex-col mt-4">
                <div className="flex flex-col flex-1 gap-2">
                  <MultiSelectField
                    placeholder="👩‍🏫 Select Teachers"
                    onSelect={setSelectedTeachers}
                    options={adminUsersData.allTeachers}
                    onChange={handleMultiSelectTeachersChange}
                  />
                  {newSelectedTeachers.length > 0 && (
                    <div className="flex justify-end py-2 text-xs text-[#6A00FF]">
                      <p>Teachers Selected: {newSelectedTeachers.length}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {newSelectedTeachers && newSelectedTeachers?.map((teacher) => (
              <div key={teacher._id} className="mb-4 border-b pb-2">
                <p className="font-semibold text-sm mb-2">{teacher.name} 📚</p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {subjectWithLevel.map((subject) => {
                    const isChecked = selectedSubjects[teacher._id]?.some(s => s._id === subject._id);
                    return (
                      <label key={subject._id} className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => handleSubjectCheckboxChange(teacher._id, subject, e.target.checked)}
                          className="text-blue-500 focus:ring-2 focus:ring-blue-500"
                        />
                        {subject.name}
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}

            {selectedLevel && (
              <div className="flex flex-col mt-4">
                <div className="flex flex-col flex-1 gap-2">
                  <MultiSelectField
                    placeholder="👩‍🎓 Select Students"
                    onSelect={setSelectedStudents}
                    options={studentWithLevel}
                    onChange={handleMultiSelectStudentsChange}
                  />
                  {newSelectedStudents.length > 0 && (
                    <div className="flex justify-end py-2 text-xs text-[#6A00FF]">
                      <p>Students Selected: {newSelectedStudents.length}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {createClassroomMutation.isPending && <div><Loader /></div>}

            {!createClassroomMutation.isPending && (
              <div className="flex items-center gap-3 mt-6">
                <div
                  onClick={() => {
                    handleCreateClass();
                  }}
                  className="flex items-center justify-center w-full py-3 text-center rounded-md cursor-pointer bg-gradient-to-r from-[#6A00FF] to-[#6A00FF]/70 hover:from-[#6A00FF]/60 hover:to-[#6A00FF]/50 transition duration-200"
                >
                  <p className="text-sm text-white font-semibold">{isEditTrue ? "🔄 Update" : "✨ Create"}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

  );
};

export default ClassModal;
