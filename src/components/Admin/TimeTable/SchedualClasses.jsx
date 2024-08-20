import React, { useState } from "react";
import FilterButton from "./FilterButton";
import Loader from "../../../utils/Loader";
import IMAGES from "../../../assets/images";
import FilterClassesModal from "./FilterClassesModal";

import { useEffect } from "react";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";
import { useUser } from "../../../context/UserContext";
import { getAllClasses } from "../../../api/ForAllAPIs";
import { useAdmin } from "../../../context/AdminContext";
import { createClasses } from "../../../api/Teacher/Class";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllClassroom } from "../../../api/Admin/classroomApi";

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

const SchedualClasses = ({ classRefetch }) => {

  const SchedualClassesComponent = ({ onclose, isOpen, setIsOpen }) => {
    const [allowedEdit, setAllowedEdit] = useState(false);

    const handleEditClick = () => {
      setAllowedEdit(true);
    };

    const { userData } = useUser();
    const { allSubjects, adminUsersData } = useAdmin();
    const [allClassrooms, setAllClassrooms] = useState([]);
    const [selectedSubject, setSelctedSubject] = useState();
    const [selectedTeacher, setSelectedTeacher] = useState();
    const [selectedClassroom, setSelectedClassroom] = useState();

    const { data, isPending, refetch, isRefetching } = useQuery({ queryKey: ["classroom"], queryFn: getAllClassroom });

    useEffect(() => {
      if (!isPending) {
        setAllClassrooms(data);
      }
    }, [])

    // "{\n  \"title\": \"this is topic\",\n
    // \"startTime\": \"2024-02-18T09:00:13.386+00:00\",\n
    // \"endTime\": \"2024-02-18T10:29:13.386+00:00\",\n
    // \"oneTime\": true,\n  
    // \"classroomID\": \"65cd344d324a603b2040a6bc\",\n
    // \"subjectID\": \"65ccaae6fc6ffe2ac4fe3f88\",\n
    // \"teacher\": {\n
    // \"teacherID\": \"65cca68c9747c80928061e71\",\n
    // \"status\": \"present\"\n
    // }\n}",

    const [classObj, setClassObj] = useState({
      title: "",
      startTime: "",
      startDate: "",
      endTime: "",
      oneTime: true,
      classroomID: "",
      subjectID: "",
      teacher: ""
    })

    const handleSaveDetails = () => { };

    function convertToISOWithTimezoneOffset(startDate, startTime) {
      const dateTimeString = `${startDate}T${startTime}:00.000Z`;
      return dateTimeString;
    }

    const handleSchedualClass = () => {
      const isoFormattedStringEndTime = new Date(convertToISOWithTimezoneOffset(classObj.startDate, classObj.endTime));
      const isoFormattedStringStartTime = new Date(convertToISOWithTimezoneOffset(classObj.startDate, classObj.startTime));

      let myobj = {
        ...classObj,
        teacher: { teacherID: JSON.parse(selectedTeacher)._id, status: "present" },
        subjectID: JSON.parse(selectedSubject)._id,
        classroomID: JSON.parse(selectedClassroom)._id,
        startTime: isoFormattedStringStartTime,
        endTime: isoFormattedStringEndTime
      };

      console.log(new Date());

      console.log("my obj is : ", myobj);
      classCreateMutate.mutate(myobj);
    }

    const classCreateMutate = useMutation({
      mutationFn: async (data) => await createClasses(data),
      onSettled: async (data, error) => {
        if (!error) {
          toast.success("Class created successfully");
          await classRefetch();
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
                  label={"Select Teacher"}
                  selectedOption={selectedTeacher}
                  options={adminUsersData.allTeachers}
                  setSelectedOption={setSelectedTeacher}
                />

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
                  valuesObj={classObj}
                  value={classObj.title}
                  setValue={setClassObj}
                />
                <CustomSelectable
                  label={"Select Class"}
                  options={allClassrooms}
                  selectedOption={selectedClassroom}
                  setSelectedOption={setSelectedClassroom}
                />
                <CusotmInput
                  icon={"cap"}
                  type={"date"}
                  title={"Date"}
                  name={"startDate"}
                  selectable={false}
                  valuesObj={classObj}
                  status={allowedEdit}
                  setValue={setClassObj}
                  value={classObj.startDate}
                />
                <div className="flex gap-2">
                  <CusotmInput
                    type={"time"}
                    icon={"calendar"}
                    selectable={false}
                    name={"startTime"}
                    valuesObj={classObj}
                    status={allowedEdit}
                    title={"Start Time"}
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
                      {classCreateMutate.isPending && <div className="flex justify-center items-center"><Loader /></div>}
                      {!classCreateMutate.isPending &&
                        <>
                          <FilterButton text={"Schedual Class"} className={"px-4 text-sm"} clickHandler={() => handleSchedualClass()} />
                          <FilterButton text={"Cancel"} className={"px-8 text-sm bg-white border !text-maroon"} clickHandler={() => setaddEventModalOpen(false)} />
                        </>
                      }
                    </div>
                  </div>
                </div>

                {allowedEdit &&
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

  const { data, isPending, refetch, isRefetching } = useQuery({ queryKey: ["classes"], queryFn: getAllClasses });

  const [addEventModalOpen, setaddEventModalOpen] = useState(false);
  const [classModal, setClassModal] = useState(false);

  return (
    <div>
      <div>
        <div>
          <FilterClassesModal
            classData={data}
            isPending={isPending}
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
