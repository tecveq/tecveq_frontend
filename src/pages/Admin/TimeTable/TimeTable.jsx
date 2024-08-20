import React from "react";
import Loader from "../../../utils/Loader";
import Navbar from "../../../components/Admin/Navbar";
import MyCalendar from "../../../components/Admin/TimeTable/calendar";
import SchedualClasses from "../../../components/Admin/TimeTable/SchedualClasses";

import { useQuery } from "@tanstack/react-query";
import { useBlur } from "../../../context/BlurContext";
import { getAllClasses } from "../../../api/ForAllAPIs";

const TimeTable = () => {

  const { isBlurred } = useBlur();

  const { data, isPending, refetch, isRefetching } = useQuery({ queryKey: ["timetable"], queryFn: getAllClasses });
  if (!isPending) {
    console.log("classea in admin are : ", data);
  }

  return (
    
      isPending || isRefetching ? <div className="flex flex-1 justify-start items-center" > <Loader /> </div> :
        <>
          <div className="flex flex-1 min-h-screen bg-[#f9f9f9]/50 font-poppins">
            <div className="flex flex-1 gap-4">
              <div className={`flex flex-col flex-1 px-5 lg:ml-72`}>
                <div className="flex h-20 md:px-14 lg:px-0">
                  <Navbar heading={"Time Table"} />
                </div>
                <div
                  className={`flex px-10 flex-col md:px-10 lg:px-0 lg:flex-row flex-1 gap-5 py-2 ${isBlurred ? "blur" : ""
                    }`}
                >
                  <div className="flex flex-1 gap-4 bg-white">
                    <div className="flex-[4] border p-5 border-grey/30 rounded-md shadow-lg">
                      <MyCalendar data={data} isPending={isPending} refetch={refetch} isRefetching={isRefetching} />
                    </div>
                    <div className="flex-1 p-5 border rounded-md shadow-lg border-grey/30">
                      <SchedualClasses classRefetch={refetch} data={data} isPending={isPending} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>

  );
};

export default TimeTable;
