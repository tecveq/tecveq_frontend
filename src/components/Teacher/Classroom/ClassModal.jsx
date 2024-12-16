import React, { useState, useRef, useEffect } from 'react';

import Loader from '../../../utils/Loader';
import IMAGES from "../../../assets/images";

import { IoIosArrowDown } from "react-icons/io";
import { useMutation } from '@tanstack/react-query';
import { useUser } from '../../../context/UserContext';
import { useBlur } from "../../../context/BlurContext";
import { useTeacher } from '../../../context/TeacherContext';
import { createClassroom } from '../../../api/Admin/classroomApi';



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

const CustomSelectable = ({ label, options, setSelectedOption, selectedOption }) => {
  return (
    <div className='flex flex-col text-start py-1'>
      <div className='flex flex-col gap-1'>
        <div className='font-medium'>
          {label}
        </div>
        <div>
          <select value={selectedOption} onChange={(e) => { setSelectedOption(e.target.value) }}
            className='border outline-none rounded-md border-black/20 px-4 w-full py-2'>
            <option value={""}>Select</option>
            {options.map((item) => {
              return <option key={item._id} value={JSON.stringify(item)}>{item.name}</option>
            })}
          </select>
        </div>
      </div>
    </div>
  )
}

const CusotmInput = ({ label, value, setvalue, type, status, icon, name }) => {
  return (
    <div className="my-1 text-sm flex-1 w-full">
      <div className="flex items-center gap-4 ">
        <div
          className={`flex px-2 py-1 w-full border justify-between rounded-md items-center border-grey/70 ${status ? "text-black" : "text-grey"
            }`}
        >
          <input
            value={value}
            placeholder={name}
            type={type || "text"}
            className="flex flex-1 w-full py-1 outline-none"
            onChange={(e) => { setvalue(e.target.value) }}
          />
        </div>
      </div>
    </div>
  );
};

const ClassModal = ({ open, setopen, isEditTrue, refetch }) => {

  const ref = useRef(null);
  const [className, setClassName] = useState("");
  const [selectedLevel, setSelectedLevel] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [newSelectedStudents, setNewSelectedStudents] = useState([]);

  const { userData } = useUser();
  const { toggleBlur } = useBlur();
  const { allSubjects, teacherData, allLevels } = useTeacher();

  const handleMultiSelectStudentsChange = (options) => {
    console.log('Selected options:', options);
  };


  useEffect(() => {

    if (selectedStudents.length > 0) {
      setNewSelectedStudents(selectedStudents);
    }

  }, [selectedStudents])


  const handleCreateClass = async () => {

    if (selectedLevel && newSelectedStudents.length > 0) {

      let students = newSelectedStudents.map((item) => item._id);

      let data = {
        students,
        name: className,
        teachers: [userData._id],
        subject: JSON.parse(selectedSubject)._id,
      }

      createClassroomMutation.mutate(data);

    } else {
      alert("fill all fields first");
    }
  }

  const createClassroomMutation = useMutation({
    mutationKey: ["teacherCreateClassroom"], mutationFn: async (data) => {
      const result = await createClassroom(data);
      console.log("result of classroom creation is : ", result);
      return result;
    }, onSettled: async () => {
      await refetch();
      toggleBlur();
      setopen(false);
    }
  })


  return (
    <div
      ref={ref}
      className={`fixed z-10 mt-10 bg-white p-3  md:p-8 w-[90%] md:w-[800px] lg:w-[900px] px-4 md:px-10 border border-black/20 shadow-md text-black rounded-xl ml-5 md:ml-80 place-self-center flex ${open ? "" : "hidden"
        }`}
    >
      <div className="flex flex-1 gap-2">
        <div className="flex flex-col w-full gap-4">
          <div className="flex items-center justify-between">
            <div className="flex justify-center flex-1 w-[fit] gap-2 items-center">
              <p className="text-2xl font-semibold cursor-text">
                Create Classroom
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
              <p className="text-xs font-semibold text-grey_700">Classroom name</p>
              <CusotmInput label={"ClassName"}
                type={"text"}
                value={className}
                name={"Select Class"}
                setvalue={setClassName}
              />
            </div>
          </div>
          {/* <div className="flex items-center gap-3">
            <div className="flex flex-col flex-1 gap-1">
              <p className="text-xs font-semibold text-grey_700">Level name</p>
              <Selectable
                allLevels={allLevels}
                selectedLevel={selectedLevel}
                setSelectedLevel={setSelectedLevel}
              />
            </div>
          </div> */}
          <div className="flex flex-col">
            <div className="flex flex-col flex-1 gap-1">
              <p className="text-xs font-semibold text-grey_700">
                Select Subjects
              </p>
              <CustomSelectable
                options={allSubjects}
                selectedOption={selectedSubject}
                setSelectedOption={setSelectedSubject}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col flex-1 gap-1">
              {/* <p className="text-xs font-semibold text-grey_700">
                Select Students
              </p> */}
              <MultiSelect
                placeholder="Select Students"
                onSelect={setSelectedStudents}
                options={teacherData.allStudents}
                onChange={handleMultiSelectStudentsChange}
              />
            </div>
            <div className="flex justify-end py-1 text-xs text-maroon">
              <p>Students Selected: {newSelectedStudents.length}</p>
            </div>
          </div>
          {createClassroomMutation.isPending && <div className='' > <Loader /> </div>}
          {!createClassroomMutation.isPending &&
            <div className="flex items-center gap-3">
              <div
                onClick={() => {
                  handleCreateClass();
                }}
                className="flex items-center justify-center w-full py-2 text-center rounded-md cursor-pointer bg-maroon"
              >
                <p className="text-sm text-white">Create</p>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default ClassModal;
