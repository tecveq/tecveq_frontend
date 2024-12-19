import { Circle } from "rc-progress";
import React, { useEffect, useState } from "react";
import { useParent } from "../../../context/ParentContext";
import { useQuery } from "@tanstack/react-query";
import { getAllSubjects } from "../../../api/Parent/ParentApi";

const LastDeliverables = () => {


  const [enableQuery, setEnableQuery] = useState(false);

  const { allSubjects, setAllSubjects, selectedChild } = useParent();

  const subjectQuery = useQuery({
    queryKey: ["subjects"], queryFn: async () => {
      const results = await getAllSubjects(selectedChild?._id);
      console.log("subject in enrolled classes is : ", results);
      setAllSubjects(results);
      return results
    }, staleTime: 300000, enabled: enableQuery
  });

  useEffect(() => {
    if (allSubjects.length == 0) {
      setEnableQuery(true);
    }
  }, []);


  const DeliverableComponent = ({ subjectQuery }) => {
    return (
      <div className="flex flex-col items-center justify-center w-full gap-2 bg-white rounded-md md:px-8 sm:flex-1 md:py-2 md:gap-3">
        <div className="flex flex-col items-center justify-center w-28 h-36 md:flex-row relative">
          {subjectQuery?.data?.length > 0 ? (
            subjectQuery.data.map((item, index) => (
              <div className="text-xs" key={index}>
                {JSON.stringify(item)}
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-500"></div>
          )}

          
          <Circle
            percent={40}
            strokeColor="#A41D30"
            strokeWidth={12}
            trailColor="#EAECF0"
            trailWidth={12}
          />
          <div className="absolute flex flex-col items-center">
            <span className="text-[7px] md:text-[10px]">Submission</span>
            <div className="flex">
              <span className="text-[7px] md:text-base font-semibold">40 %</span>
            </div>
          </div>

        </div>
        <p className="text-xs text-center">Submissions: 40/100</p>
      </div>
    );
  }
  const CustomGradeComponent = () => {
    return (
      <div className="flex flex-col items-center justify-center w-full gap-2 bg-white rounded-md md:px-8 sm:flex-1 md:py-2 md:gap-3">
        <div className="flex flex-col items-center justify-center w-28 h-28 md:flex-row bg-maroon/10 text-[#555555] rounded-full">
          <div className=" flex flex-col items-center ">
            <span className="text-[7px] md:text-[10px]">Average Grade</span>
            <div className="flex">
              <span className="text-3xl  font-semibold">B</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-center">Grade: B</p>
      </div>
    );
  };

  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 gap-2">
        <div className="flex">
          <p className="flex text-xl font-medium">Last Deliverable</p>
        </div>
        <div className="flex flex-col gap-1 px-3 py-5 bg-white rounded-lg custom-shadow">
          <div className="flex px-5 text-sm ">
            <div className="flex justify-center flex-1">
              <p>Assignment 3</p>
            </div>
          </div>
          <div className="flex flex-1 gap-2 p-2">
            <CustomGradeComponent />
            <DeliverableComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastDeliverables;
