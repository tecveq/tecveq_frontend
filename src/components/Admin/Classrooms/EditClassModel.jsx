import React, { useState, useRef, useEffect, useCallback } from 'react';
import IMAGES from "../../../assets/images";
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useBlur } from "../../../context/BlurContext";
import { useAdmin } from "../../../context/AdminContext";
import { updateClassroom } from '../../../api/Admin/classroomApi';
import { useGetAllStudentsWithLevel } from '../../../api/Admin/AdminApi';
import { useGetAllSubjectsWithLevel } from '../../../api/Admin/SubjectsApi';
import Loader from '../../../utils/Loader';

const MultiSelectField = ({
  options,
  placeholder,
  onChange = () => { }, // Default to a no-op function
  onSelect,
  editData,
  type,
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    if (editData && options) {
      const key = type === "teachers" ? "teachers" : "students";
      const selectedData = options.filter(option =>
        editData[key]?.some(item => (key === "teachers" ? item?.teacher?._id : item?._id) === option?._id)
      );
      setSelectedOptions(selectedData);
      onSelect(selectedData);
    }
  }, [editData, options, type, onSelect]);

  const handleCheckboxChange = (option) => {
    setSelectedOptions(prevSelected => {
      const isSelected = prevSelected.some(item => item._id === option._id);
      const updatedSelection = isSelected
        ? prevSelected.filter(item => item._id !== option._id)
        : [...prevSelected, option];
      onSelect(updatedSelection);
      return updatedSelection;
    });
  };

  const handleSelectAllChange = () => {
    if (selectedOptions.length === options.length) {
      setSelectedOptions([]);
      onSelect([]);
    } else {
      setSelectedOptions(options);
      onSelect(options);
    }
  };

  useEffect(() => {
    onChange(selectedOptions); // This will now be safe even if onChange is not provided
  }, [selectedOptions, onChange]);

  return (
    <div className="w-full">
      <p className="text-xs font-semibold text-grey_700">{placeholder}</p>
      <div className="mb-4 flex items-center p-2">
        <input
          type="checkbox"
          checked={selectedOptions.length === options.length}
          onChange={handleSelectAllChange}
          className="form-checkbox"
        />
        <span className="ml-2 font-medium">Select All</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start justify-items-start">
        {options.map(option => (
          <div key={option._id} className="flex items-center p-2">
            <input
              type="checkbox"
              checked={selectedOptions.some(item => item._id === option._id)}
              onChange={() => handleCheckboxChange(option)}
              className="form-checkbox"
            />
            <p className="bg-[#00000005] px-2 py-1 rounded-sm flex items-center gap-1 font-medium ml-2">
              <img
                src={option.profilePic || IMAGES.ProfilePic}
                alt=""
                className="w-8 h-8 object-cover rounded-full"
              />
              {option.name}
              <span className="font-normal text-[#00000040]">
                {option?.qualification}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};


const Selectable = ({ label, options, setSelectedOption, selectedOption }) => (
  <div className='flex flex-col text-start py-1'>
    <div className='font-medium'>{label}</div>
    <select
      value={selectedOption ? JSON.stringify(selectedOption) : ""}
      onChange={(e) => setSelectedOption(JSON.parse(e.target.value))}
      className='border outline-none rounded-sm border-black/20 px-4 w-full py-[4px]'>
      <option value="">Select Option</option>
      {options.map(item => (
        <option key={item._id} value={JSON.stringify(item)}>{item.name}</option>
      ))}
    </select>
  </div>
);

const EditClassModel = ({ open, setopen, isEditTrue, refetch, editData }) => {
  const ref = useRef(null);
  const { toggleBlur } = useBlur();
  const { adminUsersData, allLevels } = useAdmin();

  const [classroomName, setClassroomName] = useState(editData?.name || "");
  const [selectedLevel, setSelectedLevel] = useState(() =>
    allLevels.find(level => level.name === editData?.level?.name) || null
  );
  const [headTeacher, setHeadTeacher] = useState(() =>
    adminUsersData?.allTeachers?.find(teacher =>
      editData?.teachers?.some(t => t?.type === 'head' && t.teacher?._id === teacher?._id)
    ) || null
  );

  const { studentWithLevel, isLoading } = useGetAllStudentsWithLevel(selectedLevel?._id);
  const { subjectWithLevel } = useGetAllSubjectsWithLevel(selectedLevel?._id);

  const [newSelectedTeachers, setNewSelectedTeachers] = useState([]);
  const [newSelectedStudents, setNewSelectedStudents] = useState([]);
  const [teacherArr, setTeachersArr] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState({});

  const updateClassroomMutation = useMutation({
    mutationFn: updateClassroom,
    onSuccess: async () => {
      await refetch();
      setopen(false);
      // toggleBlur();
      toast.success("Classroom updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update classroom. Please try again.");
    },
  });

  const handleCreateClass = useCallback(() => {
    if (classroomName && selectedLevel && newSelectedStudents.length && newSelectedTeachers.length && headTeacher) {
      const classroomnameregex = /^[a-zA-Z0-9\s]+$/;

      if (!classroomnameregex.test(classroomName)) {
        toast.error("Invalid Classroom name! It should not contain special characters.");
        return;
      }

      const data = {
        name: classroomName,
        levelID: selectedLevel._id,
        students: newSelectedStudents.map(item => item._id),
        teachers: teacherArr,
        headTeacher: headTeacher._id,
      };

      updateClassroomMutation.mutate({ data, id: editData?._id });
    } else {
      toast.error("Fill all fields first");
    }
  }, [classroomName, selectedLevel, newSelectedStudents, newSelectedTeachers, headTeacher, teacherArr, updateClassroomMutation, editData]);

  useEffect(() => {
    if (editData) {
      const updatedTeachersArr = [];
      const initialSelectedSubjects = {};

      newSelectedTeachers.forEach(teacher => {
        const matchingData = editData.teachers?.find(item => item.teacher._id === teacher._id);
        if (matchingData) {
          initialSelectedSubjects[teacher._id] = matchingData.subject;
          updatedTeachersArr.push({ teacher: teacher._id, subject: matchingData.subject._id });
        }
      });

      setSelectedSubjects(initialSelectedSubjects);
      setTeachersArr(updatedTeachersArr);
    }
  }, [newSelectedTeachers, editData]);

  if (isLoading) return <Loader />;

  return (
    <div
      ref={ref}
      className={`fixed z-10 mt-10 bg-white p-3 md:p-8 w-[90%] md:w-[800px] right-0 lg:w-[900px] px-4 md:px-10 border border-black/20 shadow-md text-black rounded-xl ${open ? "" : "hidden"}`}
    >
      <div className="flex justify-between">
        <p className="text-2xl font-semibold">{isEditTrue ? "Edit" : "Create"} Classroom</p>
        <img
          src={IMAGES.CloseIcon}
          className="w-[15px] h-[15px] cursor-pointer"
          onClick={() => {
            // toggleBlur();
            setopen(false);
          }}
        />
      </div>

      <div className="flex flex-col gap-4 overflow-y-auto max-h-[80vh] custom-scrollbar">
        <div>
          <p className="text-xs font-semibold text-grey_700">Classroom Name</p>
          <input
            className="border-[1px] py-1 px-4 rounded-lg w-full"
            placeholder="Enter classroom name"
            value={classroomName}
            onChange={(e) => setClassroomName(e.target.value)}
          />
        </div>

        <div>
          <p className="text-xs font-semibold text-grey_700 mt-2">Select Level</p>
          <Selectable
            options={allLevels}
            setSelectedOption={setSelectedLevel}
            selectedOption={selectedLevel}
          />
        </div>

        {selectedLevel && (
          <div>
            <p className="text-xs font-semibold text-grey_700">Select Head Teacher</p>
            <Selectable
              options={adminUsersData?.allTeachers}
              setSelectedOption={setHeadTeacher}
              selectedOption={headTeacher}
            />
          </div>
        )}

        {selectedLevel && (
          <MultiSelectField
            placeholder="Select Teachers"
            onSelect={setNewSelectedTeachers}
            options={adminUsersData.allTeachers}
            editData={editData}
            type="teachers"
          />
        )}

        {newSelectedTeachers.map(teacher => (
          <div key={teacher._id} className="flex items-center gap-3">
            <p className="text-xs font-semibold text-grey_700">Select subject for {teacher.name}</p>
            <Selectable
              options={subjectWithLevel}
              setSelectedOption={(val) => {
                setSelectedSubjects(prev => ({ ...prev, [teacher._id]: val }));
                setTeachersArr(prev => {
                  const updated = [...prev];
                  const index = updated.findIndex(item => item.teacher === teacher._id);
                  if (index !== -1) {
                    updated[index].subject = val._id;
                  } else {
                    updated.push({ teacher: teacher._id, subject: val._id });
                  }
                  return updated;
                });
              }}
              selectedOption={selectedSubjects[teacher._id]}
            />
          </div>
        ))}

        {selectedLevel && (
          <MultiSelectField
            placeholder="Select Students"
            onSelect={setNewSelectedStudents}
            options={studentWithLevel}
            editData={editData}
            type="students"
          />
        )}

        <div className="flex flex-col gap-2 mt-4 w-full">
          <button
            className="px-6 py-2 rounded-lg bg-red text-white"
            onClick={() => {
              toggleBlur();
              setopen(false);
            }}
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 rounded-lg bg-[blue] text-white"
            onClick={handleCreateClass}
          >
            {isEditTrue ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditClassModel;






































