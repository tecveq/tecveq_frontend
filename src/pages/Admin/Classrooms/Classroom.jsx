import React, { useState } from "react";
import Navbar from "../../../components/Admin/Navbar";
import DataRow from "../../../components/Admin/Classrooms/DataRow";
import ClassMenu from "../../../components/Admin/Classrooms/ClassMenu";
import ClassModal from "../../../components/Admin/Classrooms/ClassModal";

import { BiSearch } from "react-icons/bi";
import Loader from "../../../utils/Loader";
import { useBlur } from "../../../context/BlurContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteClassroom, getAllClassroom } from "../../../api/Admin/classroomApi";

const Classroom = () => {

  const { isBlurred, toggleBlur } = useBlur();
  const [searchText, setSearchText] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [editClassData, setEditClassData] = useState({});
  const [isClassMenuOpen, setIsClassMenuOpen] = useState(false);
  const [createClassModal, setCreateClassModal] = useState(false);


  const toggleClassMenuOpen = (data) => {
    console.log("data on opening class menu si : ", data);
    setEditClassData(data);
    setIsClassMenuOpen(!isClassMenuOpen);
  };

  const handleEditClass = () => {
    // TODO: Pending this function
    console.log("data on edit clas is : ", editClassData);
  }

  const handleDeleteClass = async () => {
    classroomDellMutate.mutate(editClassData._id);
  }


  const onAddClass = () => {
    setCreateClassModal(!createClassModal);
    toggleBlur();
  }

  const classroomDellMutate = useMutation({
    mutationFn: async (id) => await deleteClassroom(id),
    onSettled: async () => {
      await refetch();
      return toast.success("Classroom deleted successfully");
    }
  });

  const { data, isPending, refetch, isRefetching } = useQuery({ queryKey: ["classroom"], queryFn: getAllClassroom });

  return (
    isPending || isRefetching ? <Loader /> :
      <>
        <div className="flex flex-1 bg-[#F9F9F9] font-poppins">
          <div className="flex flex-1">
            <div
              className={`w-full h-screen lg:px-10 sm:px-10 px-3 flex-grow lg:ml-72`}
            >
              <div className="min-h-screenn pt-6">
                <Navbar heading={"Classroom"} />
                <div className={`${isBlurred ? "blur" : ""}`}>
                  <div className="py-2">
                    <div className="flex items-center justify-between">
                      <div className="">
                        <p className="text-black/60"></p>
                      </div>
                      <div className="flex gap-2">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white border border-black/10 rounded-3xl">
                          <BiSearch />
                          <input
                            className="outline-none b"
                            type="text"
                            placeholder="Search"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                          />
                        </div>
                        <p onClick={onAddClass} className="flex items-center justify-center px-4 py-2 text-sm text-white cursor-pointer bg-maroon rounded-3xl">
                          Add Class
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="py-2 h-[80%] overflow-auto">

                    <DataRow
                      isQuiz={true}
                      index={"Sr. No"}
                      classname={"Class Name"}
                      classesSchedualled={"Classes Scheduled"}
                      students={"Students"}
                      teachers={"Teachers"}
                      createdBy={"Created By"}
                      bgColor={"#F9F9F9"}
                      header={true}
                    />

                    {searchText == "" && data.map((cls, index) => (
                      <DataRow
                        key={cls._id}
                        data={cls}
                        toggleClassMenu={toggleClassMenuOpen}
                        index={index + 1}
                        classname={cls.name}
                        classesSchedualled={cls.classes.length}
                        students={cls.students.length}
                        teachers={cls.teachers.length}
                        createdBy={cls.createdBy.userType}
                        bgColor={"#FFFFFF"}
                        header={false}
                      />
                    ))}

                    {searchText && data.map((cls, index) => {
                      if (cls.name.includes(searchText) || cls.createdBy.userType.includes(searchText)) {
                        return <DataRow
                          key={cls._id}
                          data={cls}
                          toggleClassMenu={toggleClassMenuOpen}
                          index={index + 1}
                          classname={cls.name}
                          classesSchedualled={cls.classes.length}
                          students={cls.students.length}
                          teachers={cls.teachers.length}
                          createdBy={cls.createdBy.userType}
                          bgColor={"#FFFFFF"}
                          header={false}
                        />
                      }
                    })}

                    {data.length == 0 && <div className="text-center py-4 text-3xl font-medium">No classrooms to display!</div>}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {createClassModal &&
          <ClassModal
            refetch={refetch}
            open={createClassModal}
            isEditTrue={false}
            setopen={setCreateClassModal}
          />
        }

        {editModal &&
          <ClassModal
            editData={editClassData}
            refetch={refetch}
            isEditTrue={true}
            open={editModal}
            setopen={setEditModal}
          />
        }

        <ClassMenu
          editClassRoom={handleEditClass}
          deleteClassRoom={handleDeleteClass}
          isopen={isClassMenuOpen}
          setIsOpen={setIsClassMenuOpen}
        />
      </>
  );
};

export default Classroom;
