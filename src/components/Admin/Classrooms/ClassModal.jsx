import React, { useState, useRef, useEffect } from 'react';
import IMAGES from "../../../assets/images";

import { IoIosArrowDown } from "react-icons/io";
import { useMutation } from '@tanstack/react-query';
import { useBlur } from "../../../context/BlurContext";
import { useAdmin } from "../../../context/AdminContext";
import { createClassroom } from '../../../api/Admin/classroomApi';
import Loader from '../../../utils/Loader';
import { toast } from 'react-toastify';


const MultiSelect = ({ options, placeholder, onChange, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const ref = useRef();

  const handleOptionClick = (option) => {
    setSelectedOptions((prevSelected) => {
      if (prevSelected.includes(option)) {
        return prevSelected.filter((item) => item !== option);
      } else {
        return [...prevSelected, option];
      }
    });
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsOpen(false);
      onSelect(selectedOptions);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    onChange(selectedOptions);
  }, [selectedOptions]);

  return (
    <div className="relative inline-block w-full" ref={ref}>
      <div
        className="bg-white border border-[#00000040] rounded-md cursor-pointer"
        onClick={() => {
          if (isOpen) {
            onSelect(selectedOptions)
          };
          setIsOpen(!isOpen)
        }}
      >
        <div className="p-1 text-sm flex justify-between items-center px-4">
          <p>

            {selectedOptions.length > 0
              ? selectedOptions.map((option) => option.name).join(', ')
              : placeholder}
          </p>
          <p>
            <IoIosArrowDown />
          </p>
        </div>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full h-60 overflow-y-auto register-scrollbar bg-white border border-[#00000020] rounded shadow-sm">
          {options.map((option) => (
            <div
              key={option._id}
              className={`p-2 cursor-pointer hover:bg-gray-100 ${selectedOptions.includes(option) ? 'bg-gray-500' : ''
                }`}
              onClick={() => handleOptionClick(option)}
            >
              <p className='bg-[#00000005] px-2 py-1 rounded-sm font-medium'>
                p
                {option.name}
                <span className='font-normal text-[#00000040]'>{option?.qualification}</span>
              </p>
            </div>
          ))}
        </div>
      )}
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
          <select value={selectedOption} onChange={(e) => { setSelectedOption(JSON.parse(e.target.value)) }}
            className='border outline-none rounded-sm border-black/20 px-4 w-full py-[4px]'>
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

  const { adminUsersData, allLevels, allSubjects } = useAdmin();
  const [selectedLevel, setSelectedLevel] = useState([]);
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
    if (classroomName && selectedLevel && newSelectedStudents.length > 0 && newSelectedTeachers.length > 0) {

      let tempstudents = newSelectedStudents.map((item) => item?._id);

      let data = {
        name: classroomName,
        levelID: selectedLevel._id,
        students: tempstudents,
        teachers: teacherArr,
      }

      console.log("data sending to backend is : ", data);

      createClassroomMutation.mutate(data);
    } else {
      toast.error("Fill all fields first");
      // alert("Fill all fields first");
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

  return (
    <div
      ref={ref}
      className={`fixed z-10 mt-10 bg-white p-8 w-[500px] px-20 border border-black/20 shadow-md text-black rounded-xl ml-5 md:ml-96 place-self-center flex ${open ? "" : "hidden"
        }`}
    >
      <div className="flex flex-1 gap-2">
        <div className="flex flex-col w-full gap-4">
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
              <p className="text-xs font-semibold text-grey_700">Class name</p>
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
              <p className="text-xs font-semibold text-grey_700">Select Level</p>
              <Selectable
                options={allLevels}
                setSelectedOption={setSelectedLevel}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-col flex-1 gap-1">
              <p className="text-xs font-semibold text-grey_700">
                Select Teachers
              </p>
              <MultiSelect
                placeholder="Select Teachers"
                onSelect={setSelectedTeachers}
                options={adminUsersData.allTeachers}
                onChange={handleMultiSelectTeachersChange}
              />
            </div>
            <div className="flex justify-end py-1 text-xs text-maroon">
              <p>Teachers Selected: {newSelectedTeachers.length}</p>
            </div>
          </div>

          {newSelectedStudents && newSelectedTeachers.map((item) => {

            const updateFunc = (val) => {
              console.log("selected subject for a specific teacher is : ", val);
              let teacherObj = {
                teacher: item._id,
                subject: val._id
              }
              let flag = true;
              let tempArr = teacherArr;
              let myarr = tempArr.map((item) => {
                if (item.teacher == teacherObj.teacher) {
                  item.subject = teacherObj.subject
                  flag = false;
                }
                return item;
              })

              if (flag) {
                myarr.push(teacherObj);
              }

              setTeachersArr(myarr);

              console.log("temp arr is : ", myarr);
            }

            return (
              <div className="flex items-center gap-3">
                <div className="flex flex-col flex-1 gap-1">
                  <p className="text-xs font-semibold text-grey_700">Select subject for teachers</p>
                  <div>
                    <div className='flex gap-4 items-center'>
                      <p>{item?.name} </p>
                      <div className='flex-1'>
                        <Selectable
                          options={allSubjects}
                          setSelectedOption={updateFunc}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}


          <div className="flex flex-col">
            <div className="flex flex-col flex-1 gap-1">
              <p className="text-xs font-semibold text-grey_700">
                Select Students
              </p>
              <MultiSelect
                placeholder="Select Students"
                onSelect={setSelectedStudents}
                options={adminUsersData.allStudents}
                onChange={handleMultiSelectStudentsChange}
              />
            </div>
            <div className="flex justify-end py-1 text-xs text-maroon">
              <p>Students Selected: {newSelectedStudents.length}</p>
            </div>
          </div>

          {createClassroomMutation.isPending && <div><Loader /></div>}

          {!createClassroomMutation.isPending && <div className="flex items-center gap-3">
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
    </div >
  );
};

export default ClassModal;
