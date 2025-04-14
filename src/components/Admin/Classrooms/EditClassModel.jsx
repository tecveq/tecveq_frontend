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

// Multi-select field with checkbox
const MultiSelectField = ({ options, placeholder, onSelect, editData, type }) => {
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

  const toggleOption = (option) => {
    const updated = selectedOptions.some(o => o._id === option._id)
      ? selectedOptions.filter(o => o._id !== option._id)
      : [...selectedOptions, option];
    setSelectedOptions(updated);
    onSelect(updated);
  };

  const toggleSelectAll = () => {
    const updated = selectedOptions.length === options.length ? [] : [...options];
    setSelectedOptions(updated);
    onSelect(updated);
  };

  return (
    <div className="w-full">
      <p className="text-xs font-semibold text-grey_700">{placeholder}</p>
      <div className="mb-4 flex items-center p-2">
        <input
          type="checkbox"
          checked={selectedOptions.length === options.length}
          onChange={toggleSelectAll}
          className="form-checkbox"
        />
        <span className="ml-2 font-medium">Select All</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {options.map(option => (
          <label key={option._id} className="flex items-center gap-2 p-2 bg-[#00000005] rounded">
            <input
              type="checkbox"
              checked={selectedOptions.some(o => o._id === option._id)}
              onChange={() => toggleOption(option)}
              className="form-checkbox"
            />
            <img
              src={option.profilePic || IMAGES.ProfilePic}
              alt=""
              className="w-8 h-8 object-cover rounded-full"
            />
            <div>
              <p className="text-sm font-medium">{option.name}</p>
              {option.qualification && (
                <span className="text-xs text-[#00000080]">{option.qualification}</span>
              )}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

// Dropdown select
const Selectable = ({ label, options, setSelectedOption, selectedOption }) => {
  const handleChange = (e) => {
    const value = e.target.value;
    if (!value) {
      setSelectedOption(null);
      return;
    }

    const selected = JSON.parse(value);
    // Toggle logic: if selected again, unselect it
    if (selectedOption && selectedOption._id === selected._id) {
      setSelectedOption(null);
    } else {
      setSelectedOption(selected);
    }
  };

  return (
    <div className="flex flex-col text-start py-1">
      <div className="font-medium">{label}</div>
      <select
        value={selectedOption ? JSON.stringify(selectedOption) : ""}
        onChange={handleChange}
        className="border outline-none rounded-sm border-black/20 px-4 w-full py-[4px]"
      >
        <option value="">Select Option</option>
        {options.map(item => (
          <option key={item._id} value={JSON.stringify(item)}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

const EditClassModel = ({ open, setopen, isEditTrue, refetch, editData }) => {
  const ref = useRef(null);
  const { adminUsersData, allLevels } = useAdmin();
  const { isBlurred, toggleBlur } = useBlur();

  const [classroomName, setClassroomName] = useState(editData?.name || "");
  const [selectedLevel, setSelectedLevel] = useState(() =>
    allLevels.find(level => level.name === editData?.level?.name) || null
  );
  const [headTeacher, setHeadTeacher] = useState(() =>
    adminUsersData?.allTeachers?.find(t =>
      editData?.teachers?.some(et => et?.type === 'head' && et.teacher?._id === t?._id)
    ) || null
  );

  const { studentWithLevel, isLoading } = useGetAllStudentsWithLevel(selectedLevel?._id);
  const { subjectWithLevel } = useGetAllSubjectsWithLevel(selectedLevel?._id);

  const [newSelectedTeachers, setNewSelectedTeachers] = useState([]);
  const [newSelectedStudents, setNewSelectedStudents] = useState([]);
  const [teacherArr, setTeachersArr] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState({});

  // Initialize with edit data
  useEffect(() => {
    if (editData) {
      setClassroomName(editData.name || "");
      setNewSelectedStudents(editData.students || []);

      const initialSubjects = {};
      const initialTeachers = [];
      const initialTeacherArr = [];

      editData.teachers?.forEach(item => {
        const teacherId = item.teacher?._id;
        const subjectId = item.subject?._id;

        if (teacherId) {
          if (!initialTeachers.some(t => t._id === teacherId)) {
            initialTeachers.push(item.teacher);
          }

          if (subjectId) {
            initialSubjects[teacherId] = initialSubjects[teacherId] || [];
            if (!initialSubjects[teacherId].includes(subjectId)) {
              initialSubjects[teacherId].push(subjectId);
            }

            initialTeacherArr.push({
              teacher: teacherId,
              subject: subjectId,
              type: item.type,
            });
          }
        }
      });

      setSelectedSubjects(initialSubjects);
      setNewSelectedTeachers(initialTeachers);
      setTeachersArr(initialTeacherArr);
    }
  }, [editData]);

  const toggleSubject = useCallback((teacherId, subjectId) => {
    setSelectedSubjects(prev => {
      const currentSubjects = prev[teacherId] || [];
      const updatedSubjects = currentSubjects.includes(subjectId)
        ? currentSubjects.filter(s => s !== subjectId)
        : [...currentSubjects, subjectId];

      setTeachersArr(prevArr => {
        const filtered = prevArr.filter(item => item.teacher !== teacherId || item.type === "head");
        const newPairs = updatedSubjects.map(s => ({
          teacher: teacherId,
          subject: s,
          type: "teacher",
        }));
        return [...filtered, ...newPairs];
      });

      return { ...prev, [teacherId]: updatedSubjects };
    });
  }, []);

  const updateClassroomMutation = useMutation({
    mutationFn: updateClassroom,
    onSuccess: async () => {
      await refetch();
      setopen(false);
      toast.success("Classroom updated successfully!");
    },
    onError: () => toast.error("Failed to update classroom."),
  });

  const handleUpdateClass = useCallback(() => {
    if (!classroomName || !selectedLevel || !newSelectedStudents.length || !newSelectedTeachers.length) {
      toast.error("Please fill all required fields.");
      return;
    }

    const regex = /^[a-zA-Z0-9\s]+$/;
    if (!regex.test(classroomName)) {
      toast.error("Invalid classroom name (no special characters allowed).");
      return;
    }

    const data = {
      name: classroomName,
      levelID: selectedLevel._id,
      students: newSelectedStudents.map(s => s._id),
      teachers: teacherArr.map(t => ({
        teacher: t.teacher,
        subject: t.subject,
        type: t.type || "teacher",
      })),
    };

    if (headTeacher) {
      data.headTeacher = headTeacher._id;
    } else {
      // ✅ Remove any 'head' entries if no headTeacher selected
      data.teachers = data.teachers.filter(t => t.type !== "head");
    }

    updateClassroomMutation.mutate({ data, id: editData?._id });
  }, [classroomName, selectedLevel, newSelectedStudents, newSelectedTeachers, headTeacher, teacherArr, updateClassroomMutation, editData]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setopen(false);
    };
    if (open) {
      toggleBlur();
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      if (open) toggleBlur();
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, toggleBlur]);

  if (isLoading) return <Loader />;

  return (
    <div
      ref={ref}
      className={`fixed z-10 mt-10 bg-white p-4 md:p-8 w-[90%] md:w-[800px] lg:w-[900px] border border-black/20 shadow-md rounded-xl ${open ? "" : "hidden"}`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">{isEditTrue ? "Edit" : "Create"} Classroom</h2>
        <img
          src={IMAGES.CloseIcon}
          className="w-4 h-4 cursor-pointer"
          onClick={() => setopen(false)}
        />
      </div>

      <div className="flex flex-col gap-4 overflow-y-auto max-h-[80vh] custom-scrollbar">
        <input
          className="border py-2 px-4 rounded w-full"
          placeholder="Enter classroom name"
          value={classroomName}
          onChange={(e) => setClassroomName(e.target.value)}
        />

        <Selectable
          label="Select Level"
          options={allLevels}
          setSelectedOption={setSelectedLevel}
          selectedOption={selectedLevel}
        />

        {selectedLevel && (
          <>
            <Selectable
              label="Select Head Teacher (Optional)"
              options={adminUsersData?.allTeachers}
              setSelectedOption={setHeadTeacher}
              selectedOption={headTeacher}
            />

            <MultiSelectField
              placeholder="Select Teachers"
              onSelect={setNewSelectedTeachers}
              options={adminUsersData.allTeachers}
              editData={editData}
              type="teachers"
            />

            {newSelectedTeachers?.map(teacher => (
              <div key={teacher._id}>
                <p className="text-sm font-semibold text-grey_700 mb-1">
                  Subjects for {teacher.name} {teacher._id === headTeacher?._id ? "(Head Teacher)" : ""}
                </p>
                <div className="flex flex-wrap gap-3 mb-4">
                  {subjectWithLevel.map(subject => (
                    <label key={subject._id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedSubjects[teacher._id]?.includes(subject._id) || false}
                        onChange={() => toggleSubject(teacher._id, subject._id)}
                        className="form-checkbox"
                        disabled={teacher._id === headTeacher?._id && selectedSubjects[teacher._id]?.includes(subject._id)}
                      />
                      <span className="text-sm">{subject.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <MultiSelectField
              placeholder="Select Students"
              onSelect={setNewSelectedStudents}
              options={studentWithLevel}
              editData={editData}
              type="students"
            />
          </>
        )}

        <div className="flex flex-col gap-2 mt-4 w-full">
          <button
            className="px-6 py-2 rounded-lg bg-red text-white"
            onClick={() => setopen(false)}
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 rounded-lg bg-[blue] text-white"
            onClick={handleUpdateClass}
          >
            {isEditTrue ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditClassModel;
