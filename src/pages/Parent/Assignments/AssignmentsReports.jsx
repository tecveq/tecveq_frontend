import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import IMAGES from "../../../assets/images";
import Card from "../../../components/Parent/Reports/Card";
import QuizAssignmentsTable from "../../../components/Parent/QuizAssignment/QuizAssignmentsTable";

const AssignmentsReports = () => {
    const navigate = useNavigate();
  
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
        percentage: 40,
        grade: "Grade B",
      },
      {
        type: "Quizzes",
        percentage: 60,
        grade: "Grade B",
      },
      {
        type: "Attendance",
        percentage: 80,
        grade: "",
      },
    ];
    const assignmentData = [
      {
        title: "Assignment 1",
        obtainedMarks: 10,
        totalMarks: 10,
        grade: "A",
        feedback: false,
      },
      {
        title: "Assignment 2",
        obtainedMarks: 10,
        totalMarks: 10,
        grade: "A",
        feedback: false,
      },
      {
        title: "Assignment 3",
        obtainedMarks: 10,
        totalMarks: 10,
        grade: "A",
        feedback: true,
      },
      {
        title: "Assignment 4",
        obtainedMarks: 10,
        totalMarks: 10,
        grade: "A",
        feedback: false,
      },
    ];
    const quizData = [
      {
        title: "Quiz 1",
        obtainedMarks: 10,
        totalMarks: 10,
        grade: "A",
        feedback: false,
      },
      {
        title: "Quiz 2",
        obtainedMarks: 10,
        totalMarks: 10,
        grade: "A",
        feedback: false,
      },
      {
        title: "Quiz 3",
        obtainedMarks: 10,
        totalMarks: 10,
        grade: "A",
        feedback: true,
      },
      {
        title: "Quiz 4",
        obtainedMarks: 10,
        totalMarks: 10,
        grade: "A",
        feedback: false,
      },
    ];
  
    const attendanceData = [
      {
        status: "Present",
        date: "8th Jan, 2022",
        time: "8:30am - 9:30am",
      },
      {
        status: "Present",
        date: "8th Jan, 2022",
        time: "8:30am - 9:30am",
      },
      {
        status: "Present",
        date: "8th Jan, 2022",
        time: "8:30am - 9:30am",
      },
      {
        status: "Present",
        date: "8th Jan, 2022",
        time: "8:30am - 9:30am",
      },
      {
        status: "Present",
        date: "8th Jan, 2022",
        time: "8:30am - 9:30am",
      },
    ];
  
    return (
      <div className="flex flex-1 bg-[#F9F9F9] font-poppins">
        <div className="flex flex-1">
          <div className="flex-grow w-full px-5 lg:px-20 sm:px-10 lg:ml-72">
            <div className="pt-16 ">
              <div className="flex flex-row items-center justify-between flex-grow">
                <div className="flex flex-col justify-between gap-1 md:flex-row md:gap-6">
                  <p className="font-semibold md:text-[25px]">
                    Assignments
                  </p>
                </div>
                <div className="flex flex-row items-center gap-2 md:gap-4">
                  <div className="p-1 bg-white rounded-sm border-1 border-grey">
                    <img
                      src={IMAGES.Notification}
                      alt=""
                      className="md:w-[22px] md:h-[22px] w-[13px] h-[13px]"
                    />
                  </div>
                  <div className="p-1 bg-white rounded-sm border-1 border-grey">
                    <img
                      src={IMAGES.SMS}
                      alt=""
                      className="md:w-[22px] md:h-[22px] w-[13px] h-[13px]"
                    />
                  </div>
                  <p className="text-justify md:text-[16px] text-[12px]">
                    M. Haseeb
                  </p>
                  <div>
                    <img
                      src={IMAGES.ProfilePic}
                      alt=""
                      className="w-[29px] h-[30px]"
                    />
                  </div>
                  <div>
                    <img
                      src={IMAGES.ArrowLeft}
                      alt=""
                      className="w-[22px] h-[30px]"
                    />
                  </div>
                </div>
              </div>
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
                    <QuizAssignmentsTable data={assignmentData} />
                  </div>
                </div>
              </div>
              {/* <div className="mt-7">
                <div className="flex flex-col gap-2">
                  <p className="md:text-[20px]">Quizzes</p>
                  <div className="flex flex-row items-center gap-2">
                    <QuizAssignmentsTable data={quizData} />
                  </div>
                </div>
              </div>
  
              <div className="mt-7">
                <div className="flex flex-col gap-2">
                  <p className="md:text-[20px]">Attendance</p>
                  <div className="flex flex-row items-center gap-2">
                    <AttendanceTable data={attendanceData} />
                  </div>
                </div>
              </div> */}
  
              {/* <div className="mt-7">
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
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
}

export default AssignmentsReports
