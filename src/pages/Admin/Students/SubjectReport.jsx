import React, { useEffect, useState } from "react";
import Loader from "../../../utils/Loader";
import IMAGES from "../../../assets/images";
import LargeLoader from "../../../utils/LargeLoader";
import Navbar from "../../../components/Admin/Navbar";
import Card from "../../../components/Admin/StudentReports/Card";
import ActivityCard from "../../../components/Admin/StudentReports/ActivityCard";

import { LuPhone } from "react-icons/lu";
import { useLocation } from "react-router-dom";
import { IoMailOutline } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { getStudentSubjectsForAdmin } from "../../../api/Admin/UsersApi";
import { getStudentReport, getStudentSubjectReport } from "../../../api/Admin/AdminApi";


// import React from 'react'
// import IMAGES from '../../../assets/images'

// const SystemOverview = () => {
//   return (
//     <div>
//         <img src={IMAGES.graph} alt="" className='w-full h-full' />

//     </div>
//   )
// }

// export default SystemOverview
// import React from 'react';
///////////////////
// import CanvasJSReact from '@canvasjs/react-charts';
////////////////////
// import IMAGES from '../../../assets/images';
// var CanvasJSReact = require('@canvasjs/react-charts');

// const CanvasJSChart = CanvasJSReact.CanvasJSChart;

// const SystemOverview = () => {
//   const options = {
//     backgroundColor: "transparent",
//     animationEnabled: true,
//     toolTip: {
//       shared: true,
//     },
//     axisX: {
//       titleFontColor: "#00000090",
//       fontFamily:"verdana",
//       labelFontColor: "#00000080",
//       tickThickness: 0,
//       title:"Month",
//       lineColor: "#00000020"
//     },
//     axisY: {
//       interval: 200,
//       titleFontColor: "#00000090",
//       labelFontColor: "#00000080",
//       title:"Active users",
//       fontFamily:"verdana",
//       gridColor: "#00000020",
//       lineThickness: 0,
//     },
//     legend: {
//       padding: 120,
//       horizontalAlign: "right",
//       verticalAlign: "top"
//     },
//     data: [
//       {
//         type: "spline",
//         showInLegend: true,
//         name: "students",
//         dataPoints: [
//           { y: 310, label: "Jan" },
//           { y: 410, label: "Feb" },
//           { y: 510, label: "Mar" },
//           { y: 610, label: "Apr" },
//           { y: 710, label: "May" },
//           { y: 810, label: "Jun" },
//           { y: 920, label: "Jul" },
//           { y: 400, label: "Aug" },
//           { y: 500, label: "Sept" },
//           { y: 600, label: "Oct" },
//           { y: 800, label: "Nov" },
//           { y: 1000, label: "Dec" },
//         ],
//       },
//       {
//         type: "spline",
//         showInLegend: true,
//         name: "parents",
//         dataPoints: [
//           { y: 210, label: "Jan" },
//           { y: 410, label: "Feb" },
//           { y: 510, label: "Mar" },
//           { y: 610, label: "Apr" },
//           { y: 810, label: "May" },
//           { y: 910, label: "Jun" },
//           { y: 920, label: "Jul" },
//           { y: 200, label: "Aug" },
//           { y: 400, label: "Sept" },
//           { y: 600, label: "Oct" },
//           { y: 800, label: "Nov" },
//           { y: 1000, label: "Dec" },
//         ],
//       },
//     ],
//   };

//   return (
//     <div className='px-4 py-8 bg-white border border-black/20 rounded-lg flex-1'>
//       {/* <CanvasJSChart options={options} /> */}
//       <div>
//         <img src={IMAGES.graph} alt="" className='w-full h-full' />
//       </div>
//     </div>
//   );
// };

// export default SystemOverview;



const SubjectReport = () => {

  const location = useLocation();

  const [studentData, setStudentData] = useState({});
  const [allSubjects, setAllSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [subjectQueryFlag, setSubjectQueryFlag] = useState(false);

  // console.log("locatio state in subject report is : ", location.state);

  useEffect(() => {
    setStudentData(location.state);
  }, [location.state])


  const { data, isPending, isError } = useQuery({
    queryKey: ["report"], queryFn: async () => {
      if (studentData) {
        return await getStudentReport(location.state?._id);
      }
    }
  });

  // console.log("unused activity data in subject report is : ", data);

  const { data: subjects, isSuccess, isPending: subjectPending } = useQuery({ queryKey: ["subjectofstudents"], queryFn: async () => await getStudentSubjectsForAdmin(location.state?._id) });


  const studentAssignmentsQuizes = useQuery({ queryKey: ["student-assignments-quizes"], queryFn: async () => await getStudentSubjectReport(location.state?._id, JSON.parse(selectedSubject).subject._id), enabled: subjectQueryFlag });

  useEffect(() => {
    if (isSuccess) setAllSubjects(subjects);
  }, [isSuccess, subjects]);

  useEffect(() => {
    setSubjectQueryFlag(true);
    studentAssignmentsQuizes.refetch();
    if (!studentAssignmentsQuizes.isPending) {
      console.log("subject report data in subject report section in admin penal is: ", studentAssignmentsQuizes.data);
    }
  }, [selectedSubject, studentAssignmentsQuizes.data, studentAssignmentsQuizes.isPending])


  return (
    isPending || subjectPending ?  <div className="flex justify-center flex-1"> <LargeLoader /> </div> :
      <>
        <div className="flex flex-1 bg-[#F9F9F9] font-poppins">
          <div className="flex flex-1">
            <div className="flex-grow w-full px-5 lg:px-20 sm:px-10 lg:ml-72">
              <div className="pt-6">
                <Navbar heading={"Subjects"} />
                <div className="mt-7">
                  <div className="flex flex-col items-center justify-center gap-1">
                    <img src={studentData.profilePic || IMAGES.Profile} alt="" className="w-40 h-40 rounded-full" />
                    <p className="text-lg font-semibold">{studentData.name}</p>
                    <div className="flex items-center gap-2 text-xs">
                      <LuPhone />
                      <p>{studentData.phoneNumber} </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <IoMailOutline />
                      <p>{studentData.email} </p>
                    </div>
                  </div>
                </div>
                <div className="mt-7">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <p className="md:text-[20px]">Overview</p>
                      <div className="flex items-center gap-4 border bg-white border-[#00000020] px-4 py-2 rounded-3xl">
                        <select className="outline-none w-60" value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} >
                          <option value={""}>Select Subject</option>
                          {isSuccess && subjects?.subjects?.map((sub) => <option value={JSON.stringify(sub)}>{sub.subject?.name}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="flex flex-col items-center flex-1 gap-2 sm:flex-row">
                      {selectedSubject !== "" && studentAssignmentsQuizes && studentAssignmentsQuizes.isPending ? <Loader />
                        :
                        <>
                          <Card
                            type={"Percentage"}
                            data={"Assignment"}
                            grade={studentAssignmentsQuizes.data?.assignments.avgGrade}
                            percentage={studentAssignmentsQuizes.data?.assignments?.avgMarksPer ? studentAssignmentsQuizes.data?.assignments?.avgMarksPer !== "NaN" ? studentAssignmentsQuizes.data?.assignments?.avgMarksPer: 0  : 0  }
                          />
                          <Card
                            data={"Quizes"}
                            type={"Percentage"}
                            grade={studentAssignmentsQuizes.data?.quizes?.avgGrade}
                            percentage={studentAssignmentsQuizes.data?.quizes?.avgMarksPer ? studentAssignmentsQuizes.data?.quizes?.avgMarksPer !== "NaN" ? studentAssignmentsQuizes.data?.quizes?.avgMarksPer: 0  : 0  }
                          />
                          <Card
                            data={"Attendence"}
                            type={"Percentage"}
                            // percentage={studentAssignmentsQuizes.data?.quizes?.avgMarksPer ? studentAssignmentsQuizes.data?.quizes?.avgMarksPer !== "NaN" ? studentAssignmentsQuizes.data?.quizes?.avgMarksPer: 0  : 0  }
                            percentage={studentAssignmentsQuizes.data?.attendance?.avgAttendencePer ? studentAssignmentsQuizes.data?.attendance?.avgAttendencePer : 0 }
                          />
                        </>
                      }
                    </div>
                  </div>
                </div>
                {/* <div className="mt-7 flex-1">
                  <div className="flex flex-col gap-2 flex-1">
                    <div className="flex flex-row items-center gap-2 w-full flex-1">
                      <img src={IMAGES.deviceGraph} alt="" className="w-full h-full" />
                    </div>
                  </div>
                </div> */}
                      {/* <SystemOverview /> */}
                {/* <div className="mt-7">
                  <div className="flex flex-col gap-4">
                    <p className="md:text-[20px]">Activity History</p>
                    <div className="flex flex-col  gap-2">
                      <ActivityCard />
                      <ActivityCard />
                      <ActivityCard />
                    </div>
                  </div>
                </div> */}
                <div className="mt-7">
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
  );
};

export default SubjectReport;
