import React, { useState } from "react";
import FilterButton from "./FilterButton";
import Loader from "../../../utils/Loader";
import IMAGES from "../../../assets/images";
import FilterClassesModal from "./FilterClassesModal";

import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";
import { useUser } from "../../../context/UserContext";
import { createClasses } from "../../../api/Teacher/Class";
import { useTeacher } from "../../../context/TeacherContext";


const CustomSelectable = ({ label, options, setSelectedOption, selectedOption }) => {
  return (
    <div className='flex flex-col text-start py-1'>
      <div className='flex flex-col gap-1'>
        <div className='font-normal text-sm'>
          {label}
        </div>
        <div>
          <select value={selectedOption} onChange={(e) => { setSelectedOption(e.target.value) }}
            className='border text-sm text-grey/70 outline-none rounded-md border-black/20 px-4 w-full py-2'>
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

const CusotmInput = ({ valuesObj, value, type, name, status, title, setValue }) => {
  return (
    <div className="my-1 text-sm flex w-full">
      <div className="flex flex-col gap-2 flex-1 w-full">
        <div className="bg-white ">
          {title}
        </div>
        <div
          className={`flex px-2 py-1 w-full flex-1 border justify-between rounded-md items-center border-grey/70 ${status ? "text-black" : "text-grey"
            }`}
        >
          <input
            type={type}
            value={value}
            placeholder={`Enter ${name}`}
            className="flex flex-1 w-full py-1 outline-none"
            onChange={(e) => setValue({ ...valuesObj, [name]: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};

const SchedualClasses = ({ classesRefetch, data, isPending }) => {

  const SchedualClassesComponent = ({ onclose, isOpen, setIsOpen }) => {
    const [allowedEdit, setAllowedEdit] = useState(false);

    const handleEditClick = () => {
      setAllowedEdit(true);
    };

    const { allSubjects, allClassrooms, classesRefetch } = useTeacher();
    const { userData } = useUser();
    const [selectedSubject, setSelctedSubject] = useState();
    const [selectedClassroom, setSelectedClassroom] = useState();



    const [classObj, setClassObj] = useState({
      title: "",
      startTime: "",
      endTime: "",
      oneTime: true,
      meetingUrl: "",
      classroomID: "",
      subjectID: "",
      startEventDate: "",
      endEventDate: "",
      teacher: { teacherID: userData._id, status: "absent" }
    })


    const handleSaveDetails = () => { };

    function convertToISOWithTimezoneOffset(startEventDate, startTime) {
      const dateTimeString = `${startEventDate}T${startTime}:00.000Z`;
      return dateTimeString;
    }

    const handleSchedualClass = () => {
      const isoFormattedStringEndTime = new Date(convertToISOWithTimezoneOffset(classObj.startEventDate, classObj.endTime));
      const isoFormattedStringStartTime = new Date(convertToISOWithTimezoneOffset(classObj.startEventDate, classObj.startTime));

      let myobj = {
        ...classObj,
        subjectID: JSON.parse(selectedSubject)._id,
        classroomID: JSON.parse(selectedClassroom)._id,
        startTime: isoFormattedStringStartTime,
        endTime: isoFormattedStringEndTime
      };


      console.log("my obj is : ", myobj);
      classCreateMutate.mutate(myobj);
    }


    const classCreateMutate = useMutation({
      mutationFn: async (data) => await createClasses(data),
      onSettled: async (data, error) => {
        if (!error) {
          toast.success("Class created successfully");
          await classesRefetch();
          setaddEventModalOpen(false);
        }
      }
    });


    return (
      <div
        className={`absolute top-0 right-0 flex-1 z-10 flex bg-white rounded-md shadow-lg w-96 ${isOpen ? "" : "hidden"
          } `}
      >
        <div className="flex flex-col flex-1 w-full">
          <div className="flex justify-between px-5 py-5 border-b border-b-black/10">
            <p className="text-xl font-medium">Schedule Class</p>
            <IoClose
              onClick={() => {
                onclose();
                setIsOpen(false);
              }}
              className="cursor-pointer"
            />
          </div>
          <div className="flex flex-col flex-1 w-full">
            <div className="flex flex-col justify-center px-8 flex-1 w-full">
              <div className="flex justify-end">
                <div className="p-2 border-grey/10"></div>
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                <img src={IMAGES.classModal} alt="" className="w-28 h-28" />
              </div>
              <div className="flex flex-col w-full flex-1 gap-1 px-2 py-1 overflow-y-auto custom-scrollbar">

                <CustomSelectable
                  options={allSubjects}
                  label={"Select Subject"}
                  selectedOption={selectedSubject}
                  setSelectedOption={setSelctedSubject}
                />
                <CusotmInput
                  type={"text"}
                  icon={"mail"}
                  name={"title"}
                  title={"Topic"}
                  selectable={false}
                  status={allowedEdit}
                  value={classObj.title}
                  valuesObj={classObj}
                  setValue={setClassObj}
                />

                <CustomSelectable
                  label={"Select Class"}
                  options={allClassrooms}
                  selectedOption={selectedClassroom}
                  setSelectedOption={setSelectedClassroom}
                />
                <CusotmInput
                  type={"text"}
                  name={"meetingUrl"}
                  title={"Meeting URL"}
                  valuesObj={classObj}
                  setValue={setClassObj}
                  value={classObj.meetingUrl}
                  status={allowedEdit}
                />

                <div>
                  <CusotmInput
                    icon={"cap"}
                    type={"date"}
                    title={"Start Event Date"}
                    name={"startEventDate"}
                    selectable={false}
                    valuesObj={classObj}
                    status={allowedEdit}
                    setValue={setClassObj}
                    value={classObj.startEventDate}
                  />
                  <CusotmInput
                    icon={"cap"}
                    type={"date"}
                    title={"End Event Date"}
                    name={"endEventDate"}
                    selectable={false}
                    valuesObj={classObj}
                    status={allowedEdit}
                    setValue={setClassObj}
                    value={classObj.endEventDate}
                  />
                </div>

                <div className="flex gap-2">
                  <CusotmInput
                    type={"time"}
                    icon={"calendar"}
                    name={"startTime"}
                    selectable={false}
                    title={"Start Time"}
                    valuesObj={classObj}
                    status={allowedEdit}
                    setValue={setClassObj}
                    value={classObj.startTime}
                  />
                  <CusotmInput
                    type={"time"}
                    icon={"cake"}
                    name={"endTime"}
                    title={"End Time"}
                    selectable={false}
                    status={allowedEdit}
                    valuesObj={classObj}
                    setValue={setClassObj}
                    value={classObj.endTime}
                  />


                </div>



                <div className="py-8 border-t border-black/20">
                  <div className="flex items-center gap-2">
                    <div className="flex justify-between gap-4 px-4 py-2">
                      {!classCreateMutate.isPending && (
                        <>
                          <FilterButton text={"Schedual Class"} className={"px-4 text-sm"} clickHandler={() => handleSchedualClass()} />
                          <FilterButton text={"Cancel"} className={"px-8 text-sm bg-white border !text-maroon"} clickHandler={() => setaddEventModalOpen(false)} />
                        </>
                      )}
                    </div>
                  </div>
                  {classCreateMutate.isPending && <div><Loader /></div>}
                </div>

                {!classCreateMutate.isPending && allowedEdit &&
                  <div className="flex justify-center my-4">
                    <p
                      onClick={handleSaveDetails}
                      className="flex items-center justify-center w-1/2 px-1 py-2 text-center text-white cursor-pointer rounded-3xl bg-maroon"
                    >
                      Save
                    </p>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const [addEventModalOpen, setaddEventModalOpen] = useState(false);
  const [classModal, setClassModal] = useState(false);

  return (
    <div>
      <div>
        <div>
          <FilterClassesModal
            addModalOpen={addEventModalOpen}
            setaddModalOpen={setaddEventModalOpen}
          />
          <SchedualClassesComponent
            onclose={() => { }}
            isOpen={addEventModalOpen}
            setIsOpen={setaddEventModalOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default SchedualClasses;
