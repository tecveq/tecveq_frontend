import React, { useState } from "react";
import Loader from "../../../utils/Loader";
import Navbar from "../../../components/Teacher/Navbar";
import DataRow from "../../../components/Teacher/Classroom/DataRow";
import ClassMenu from "../../../components/Teacher/Classroom/ClassMenu";
import ClassModal from "../../../components/Teacher/Classroom/ClassModal";

import { BiSearch } from "react-icons/bi";
import { useBlur } from "../../../context/BlurContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteClassroom } from "../../../api/Admin/classroomApi";
import { getAllClassrooms } from "../../../api/Teacher/ClassroomApi";

const Classroom = () => {
  const [isClassMenuOpen, setIsClassMenuOpen] = useState(false);
  const [editClassData, setEditClassData] = useState({});

  const [editModal, setEditModal] = useState(false);
  const [searchText, setSearchText] = useState("");


  const toggleClassMenuOpen = (data) => {
    console.log("data is in menu ", data)
    setEditClassData(data);
    setIsClassMenuOpen(!isClassMenuOpen);
  };

  const handleEditClass = () => {
    // TODO: Pending this function
    console.log("data on edit clas is : ", editClassData);
  }

  const handleDeleteClass = async () => {
    classroomDellMutate.mutate(editClassData.data._id);
  }


  const { isBlurred, toggleBlur } = useBlur();

  const [createClassModal, setCreateClassModal] = useState(false);

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


  const { data, isPending, refetch, isRefetching } = useQuery({ queryKey: ["classroom"], queryFn: getAllClassrooms });

  return (
    isPending || isRefetching ? <Loader /> :
      <>
        <div className="flex flex-1 bg-[#F9F9F9] font-poppins">
          <div className="flex flex-1">
            <div
              className={`w-full h-screen lg:px-20 sm:px-10 px-3 flex-grow lg:ml-72`}
            >
              <div className="h-screen pt-4">
                <Navbar heading={"Classroom"} />
                <div className={`${isBlurred ? "blur" : ""}`}>
                  <div className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="">
                        <p className="text-black/60"></p>
                      </div>
                      <div className="flex gap-2">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white border border-black/10 rounded-3xl">
                          <BiSearch />
                          <input
                            type="text"
                            value={searchText}
                            placeholder="Search"
                            className="outline-none b"
                            onChange={(e) => setSearchText(e.target.value)}
                          />
                        </div>
                        <p onClick={onAddClass} className="flex items-center justify-center px-4 py-2 text-sm text-white cursor-pointer bg-maroon rounded-3xl">
                          Add Class
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 h-[80%] overflow-auto">
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
                    {searchText == "" && data?.map((cls, index) => (
                      <DataRow
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
                    {searchText && data?.map((cls, index) => {
                      if (cls.name.includes(searchText)) {
                        return <DataRow
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ClassModal
          refetch={refetch}
          open={createClassModal}
          isEditTrue={false}
          setopen={setCreateClassModal}
        />

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
