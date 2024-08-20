import React, { useEffect, useState } from "react";
import Loader from "../../../utils/Loader";
import IMAGES from "../../../assets/images";
import Navbar from "../../../components/Admin/Navbar";
import DataRows from "../../../components/Admin/Teachers/DataRows";

import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useBlur } from "../../../context/BlurContext";
import { useAdmin } from "../../../context/AdminContext";
import { getAllTeachers } from "../../../api/Admin/AdminApi";

const Teachers = () => {

  const navigate = useNavigate();
  const { isBlurred } = useBlur();
  const { adminUsersDataPending } = useAdmin();
  const [searchText, setSearchText] = useState("");
  const [teacherData, setTeacherData] = useState([]);

  const handleFunctionClick = (thr) => {
    return () => {
      navigate(`/admin/teachers/${thr.name}`, { state: thr });
    };
  };

  const teacherQuery = useQuery({ queryKey: ["teacherDetails"], queryFn: getAllTeachers });
  console.log("teacher data is : ", teacherQuery.data);

  useEffect(() => {
    if (!teacherQuery.isPending) {
      let values = Object.values(teacherQuery.data);
      console.log("teacher object values are : ", values);
      setTeacherData(values);
    }
  }, [teacherQuery.isPending])

  return (
    adminUsersDataPending ? <div className="flex justify-center flex-1"> <Loader /> </div> :
      <>
        <div className="flex flex-1 bg-[#F9F9F9] font-poppins">
          <div className="flex flex-1 ">
            <div
              className={`w-full h-screen lg:px-10 sm:px-10 px-3 flex-grow lg:ml-72`}
            >
              <div className="h-screen pt-6">
                <Navbar heading={"Teachers"} />
                <div className={`${isBlurred ? "blur" : ""}`}>
                  <div className="flex flex-row-reverse my-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-4 border bg-white border-[#00000020] px-4 py-2 rounded-3xl">
                        <IoSearch className="hover:text-grey cursor-pointer" />
                        <input
                          type="text"
                          value={searchText}
                          placeholder="Search Teacher"
                          className="bg-transparent outline-none"
                          onChange={(e) => { setSearchText(e.target.value) }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 h-[70%] overflow-auto">

                    <DataRows
                      index={"Sr No."}
                      teacherName={"Name"}
                      teacherId={"Teacher ID."}
                      subject={"Subject"}
                      classAvg={"Class Average"}
                      attendance={"Attandence"}
                      bgColor={"#F9F9F9"}
                      header={true}
                    />

                    {/* When search filter is not applied */}
                    {searchText == "" && teacherData && teacherData.map((thr, index) => (
                      <DataRows
                        header={false}
                        attendance={70}
                        index={index + 1}
                        bgColor={"#FFFFFF"}
                        classAvg={thr[0].classAvg}
                        subject={thr[0].subject.name}
                        teacherProfile={thr[0].teacher.profilePic || IMAGES.Profile}
                        teacherName={thr[0].teacher.name}
                        teacherId={thr[0].teacher._id.slice(0, 4)}
                        onClickFunction={handleFunctionClick(thr[0])}
                      />
                    ))}

                    {/* When search filter is applied */}
                    {searchText && teacherData.map((thr, index) => {
                      if (thr[0].teacher.name.includes(searchText)) {
                        return <DataRows
                          index={index + 1}
                          teacherName={thr[0].teacher.name}
                          teacherId={thr[0].teacher._id.slice(0, 4)}
                          subject={thr[0].subject.name}
                          classAvg={thr[0].classAvg}
                          attendance={70}
                          teacherProfile={thr[0].teacher.profilePic || IMAGES.Profile}
                          bgColor={"#FFFFFF"}
                          header={false}
                          onClickFunction={handleFunctionClick(thr[0])}
                        />
                      }
                    }
                    )}

                    {/* When there is not any teacher present*/}
                    {teacherData.length == 0 && <div className="text-center py-4 text-3xl font-medium">No teachers to display!</div>}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
  );
};

export default Teachers;
