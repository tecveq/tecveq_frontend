import React from "react";
import Loader from "../../../utils/Loader";
import Card from "../../../components/Parent/Reports/Card";
import Navbar from "../../../components/Parent/Dashboard/Navbar";
import AttendanceTable from "../../../components/Parent/Reports/AttendanceTable";
import QuizAssignmentsTable from "../../../components/Parent/Reports/QuizAssignmentsTable";

import { Doughnut } from "react-chartjs-2";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useParent } from "../../../context/ParentContext";
import { getChildReport } from "../../../api/Parent/ParentApi";


const SubjectReport = () => {

  const location = useLocation();

  const { selectedChild } = useParent();

  const reportQuery = useQuery({
    queryKey: ["report"], queryFn: async () => {
      console.log("selected child is : ", selectedChild);
      let results = await getChildReport(selectedChild._id, location?.state?.classroom?._id, location?.state?.subject?._id, location?.state?.teacher?._id);
      console.log(" report result is : ", results);
      return results;
    }, staleTime: 30000, enabled: location?.state ? true: false
  })

  console.log("query data is : ", reportQuery.data);

  const chartData = [
    {
      label: "Present",
      value: 20,
    },
    {
      label: "Absent",
      value: 30,
    },
    {
      label: "Leave",
      value: 50,
    },
  ];

  const stats = [
    {
      type: "Assignments",
      percentage: parseInt(reportQuery?.data?.averageAssignmentMarks?.percentage),
      grade: `Grade ${reportQuery?.data?.averageAssignmentMarks?.grade}`,
    },
    {
      type: "Quizzes",
      percentage: parseInt(reportQuery?.data?.averageQuizMarks?.percentage),
      grade: `Grade ${reportQuery?.data?.averageAssignmentMarks?.grade}`,
    },
    {
      type: "Attendance",
      percentage: parseInt(reportQuery?.data?.avgAttendancePer),
      grade: "",
    },
  ];

  return (
    reportQuery.isPending ?  <div className="flex"> <Loader /> </div> :
    <>
      <div className="flex flex-1 bg-[#F9F9F9] font-poppins">
        <div className="flex flex-1">
          <div className="flex-grow w-full px-5 lg:px-20 sm:px-10 lg:ml-72">
            <div className="pt-16 ">

              <Navbar heading={"Subject Reports"} />

              <div className="mt-7">
                <div className="flex flex-col gap-2">
                  <p className="md:text-[20px]">Overview</p>
                  <div className="flex flex-col items-center flex-1 gap-2 sm:flex-row">
                    {stats.map((data) => (
                      <Card
                        percentage={data.percentage}
                        data={data.type}
                        grade={data.grade}
                        type={"Percentage"}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-7">
                <div className="flex flex-col gap-2">
                  <p className="md:text-[20px]">Assignments</p>
                  <div className="flex flex-row items-center gap-2">
                    <QuizAssignmentsTable data={reportQuery?.data?.assignments} />
                  </div>
                </div>
              </div>
              <div className="mt-7">
                <div className="flex flex-col gap-2">
                  <p className="md:text-[20px]">Quizzes</p>
                  <div className="flex flex-row items-center gap-2">
                    <QuizAssignmentsTable data={reportQuery?.data?.quizes} />
                  </div>
                </div>
              </div>

              <div className="mt-7">
                <div className="flex flex-col gap-2">
                  <p className="md:text-[20px]">Attendance <span className="text-xs">10/12 days present</span> </p>
                  <div className="flex flex-row items-center gap-2">
                    <AttendanceTable data={reportQuery?.data?.attendance} />
                  </div>
                </div>
              </div>

              <div className="mt-7">
                <p className="md:text-[20px]">Graph</p>
              </div>
              <div className="flex items-center justify-center mt-3 mb-10">
                <div className="flex flex-col gap-2">
                  <div className="flex w-[300px] h-[300px]">
                    <Doughnut
                      data={{
                        labels: chartData.map((data) => data.label),
                        datasets: [
                          {
                            label: "Count",
                            data: chartData.map((data) => data.value),
                            backgroundColor: ["#11AF03", "#C53F3F", "#EAECF0"],
                            borderColor: ["#11AF03", "#C53F3F", "#EAECF0"],
                          },
                        ],
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubjectReport;
