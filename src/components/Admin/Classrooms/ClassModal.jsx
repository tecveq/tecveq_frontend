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


const MultiSelect = ({ options, placeholder, onChange, onSelect }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const allSelected = selectedOptions.length === options.length;
  const someSelected = selectedOptions.length > 0 && !allSelected;

  const handleCheckboxChange = (option) => {
    setSelectedOptions((prevSelected) => {
      const updatedSelection = prevSelected.includes(option)
        ? prevSelected.filter((item) => item !== option)
        : [...prevSelected, option];

      // Trigger the parent onSelect immediately
      onSelect(updatedSelection);
      return updatedSelection;
    });
  };

  const handleSelectAllChange = () => {
    if (allSelected) {
      setSelectedOptions([]);
      onSelect([]);
    } else {
      setSelectedOptions(options);
      onSelect(options);
    }
  };

  useEffect(() => {
    onChange(selectedOptions);
  }, [selectedOptions]);

  return (
    <div className="w-full">
      <p className="text-xs font-semibold text-grey_700">{placeholder}</p>
      <div className="mb-4 flex items-center p-2">
        <input
          type="checkbox"
          checked={allSelected}
          onChange={handleSelectAllChange}
          className="form-checkbox"
          indeterminate={someSelected.toString()} // Optional: For visual indication of partial selection
        />
        <span className="ml-2 font-medium">Select All</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start justify-items-start">
        {options.map((option) => (
          <div key={option._id} className="flex items-center p-2">
            <input
              type="checkbox"
              checked={selectedOptions.includes(option)}
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
const Selectable = ({ label, options, setSelectedOption, selectedOption }) => {
  return (
    <div className='flex flex-col text-start py-1'>
      <div className='flex flex-col gap-1'>
        <div className='font-medium'>
          {label}
        </div>
        <div>
          <select

            value={selectedOption ? JSON.stringify(selectedOption) : ""} // Set default value for the select
            onChange={(e) => {
              const selectedItem = JSON.parse(e.target.value); // Parse the selected option back to an object
              setSelectedOption(selectedItem);  // Update the state
            }}
            className='border outline-none rounded-sm border-black/20 px-4 w-full py-[4px]'>
            <option value="">Select Option</option>
            {options.map((item) => {
              return <option key={item._id} value={JSON.stringify(item)}>{item.name}</option>
            })}
          </select>
        </div>
      </div>
    </div>
  )
}

const CustomInput = ({ label, val, setVal, errormsg }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-col flex-1 gap-1">
        <p className="text-xs font-semibold text-grey_700">{label} </p>
        <div className="flex flex-col border-[1px] py-1 px-4 rounded-lg w-full items-center border-grey/50">
          <input
            className="w-full text-sm outline-none text-custom-gray-3"
            placeholder="Enter subject name"
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
        </div>
        {errormsg && <p className="text-maroon text-sm self-center">Classroom Name is required!</p>}
      </div>
    </div>
  )
}


const ClassModal = ({ open, setopen, isEditTrue, refetch, editData }) => {

  const ref = useRef(null);
  const { toggleBlur } = useBlur();
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






  const handleMultiSelectTeachersChange = (options) => {
    console.log('Selected options:', options);
  };

  const handleMultiSelectStudentsChange = (options) => {
    console.log('Selected options:', options);
  };

  useEffect(() => {
    console.log("user selected theachers is : ", selectedTeachers);
    console.log("user selected students is : ", selectedStudents);
    if (selectedStudents.length > 0) {
      setNewSelectedStudents(selectedStudents);
    }
    if (selectedTeachers.length > 0) {
      setNewSelectedTeachers(selectedTeachers);
    }
  }, [selectedTeachers, selectedStudents])



  const handleCreateClass = async () => {
    if (classroomName && selectedLevel && newSelectedStudents.length > 0 && newSelectedTeachers.length > 0 && headTeacher) {

      let tempstudents = newSelectedStudents.map((item) => item?._id);

      const classroomnameregex = /^[a-zA-Z0-9\s]+$/;

      if (classroomnameregex.test(classroomName)) {
        let data = {
          name: classroomName,
          levelID: selectedLevel._id,
          students: tempstudents,
          teachers: teacherArr,
          headTeacher: headTeacher._id,  // Pass the head teacher ID
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
    mutationKey: ["addclassroom"], mutationFn: async (data) => {
      const result = await createClassroom(data);
      await refetch()
      await setopen(false);
      await toggleBlur();
      console.log("result of classroom creation is : ", result);
      return result;
    }
  });

  if (isLoading) {
    return <div>Loading...</div>
  }

  console.log(adminUsersData.allStudents, "all students developer", studentWithLevel, "student with level");


  const handleSubjectSelect = (teacherId, subject) => {
    setTeachersArr((prev) => {
      // Create a new copy of the array to ensure immutability
      const updatedArr = [...prev];
      let flag = true;

      // Update the existing teacher's subject or add a new entry
      const newArr = updatedArr.map((item) => {
        if (item.teacher === teacherId) {
          item.subject = subject._id;
          flag = false;
        }
        return item;
      });

      if (flag) {
        newArr.push({ teacher: teacherId, subject: subject._id });
      }

      return newArr;
    });

    // Update selected subject state for this teacher
    setSelectedSubjects((prev) => ({ ...prev, [teacherId]: subject }));
  };

  return (
    <div
      ref={ref}
      className={`fixed z-10 mt-10 bg-white p-3  md:p-8 w-[90%] md:w-[800px] lg:w-[900px] px-4 md:px-10 border border-black/20 shadow-md text-black rounded-xl ml-5 md:ml-80 place-self-center ${open ? "" : "hidden"
        }`}
    >
      <div className="flex flex-1 ">
        <div className="flex flex-col w-full gap-4 overflow-y-auto max-h-[80vh] custom-scrollbar">
          <div className='pr-2'>
            <div className="flex items-center justify-between">
              <div className="flex justify-center flex-1 w-[fit] gap-2 items-center">
                <p className="text-2xl font-semibold cursor-text">
                  {isEditTrue ? "Edit" : "Create"} Classroom
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
                <p className="text-xs font-semibold text-grey_700">Classroom Name</p>
                <div className="flex flex-col border-[1px] py-1 px-4 rounded-lg w-full items-center border-grey/50">
                  <input
                    className="w-full text-sm outline-none text-custom-gray-3"
                    placeholder="Enter subject name"
                    value={classroomName}
                    onChange={(e) => setClassroomName(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-1">
              <div className="flex flex-col flex-1 gap-1">
                <p className="text-xs font-semibold text-grey_700 mt-2">Select Level</p>
                <Selectable
                  options={allLevels}
                  setSelectedOption={setSelectedLevel}
                  selectedOption={selectedLevel}
                />
              </div>
            </div>

            {
              selectedLevel && (
                <div className="flex flex-col">
                  <div className="flex flex-col flex-1 gap-1">
                    <p className="text-xs font-semibold text-grey_700">Select Head Teacher</p>
                    <Selectable
                      options={adminUsersData.allTeachers}  // Assuming the teachers are in this array
                      setSelectedOption={setHeadTeacher}    // setHeadTeacher will be the state for the selected head teacher
                      selectedOption={headTeacher}
                    />
                  </div>
                </div>
              )}


            {
              selectedLevel && (
                <div className="flex flex-col">
                  <div className="flex flex-col flex-1 gap-1">

                    <MultiSelect
                      placeholder="Select Teachers"
                      onSelect={setSelectedTeachers}
                      options={adminUsersData.allTeachers}
                      onChange={handleMultiSelectTeachersChange}
                    />
                  </div>
                  {
                    newSelectedTeachers.length === 0 ? (
                      ""
                    ) : (
                      <div className="flex justify-end py-1 text-xs text-maroon">
                        <p>Teachers Selected: {newSelectedTeachers.length}</p>
                      </div>
                    )
                  }
                </div>
              )
            }

            {newSelectedTeachers && newSelectedTeachers.map((item) => (
              selectedLevel && (
                <div key={item._id} className="flex items-center gap-3">
                  <div className="flex flex-col flex-1 gap-1">
                    <p className="text-xs font-semibold text-grey_700">Select subject for teachers</p>
                    <div className='flex gap-4 items-center'>
                      <p>{item?.name}</p>
                      <div className='flex-1'>
                        <Selectable
                          options={subjectWithLevel}
                          setSelectedOption={(val) => handleSubjectSelect(item._id, val)}
                          selectedOption={selectedSubjects[item._id]} // Pass the selected subject for this teacher
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            ))}



            {
              selectedLevel && (
                <div className="flex flex-col">
                  <div className="flex flex-col flex-1 gap-1">
                    <MultiSelect
                      placeholder="Select Students"
                      onSelect={setSelectedStudents}
                      options={studentWithLevel}
                      onChange={handleMultiSelectStudentsChange}
                    />
                  </div>
                  {
                    newSelectedStudents.length === 0 ? (
                      ""
                    ) : (
                      <div className="flex justify-end py-1 text-xs text-maroon">
                        <p>Students Selected: {newSelectedStudents.length}</p>
                      </div>
                    )
                  }
                </div>
              )
            }

            {createClassroomMutation.isPending && <div><Loader /></div>}

            {!createClassroomMutation.isPending && <div className="flex items-center gap-3 mt-2">
              <div
                onClick={() => {
                  handleCreateClass();
                }}
                className="flex items-center justify-center w-full py-2 text-center rounded-md cursor-pointer bg-maroon"
              >
                <p className="text-sm text-white">{isEditTrue ? "Update" : "Create"}</p>
              </div>
            </div>}
          </div>

        </div>
      </div>
    </div >
  );
};

export default ClassModal;
