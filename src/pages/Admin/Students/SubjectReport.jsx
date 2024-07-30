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


const SubjectReport = () => {

  const location = useLocation();

  const [studentData, setStudentData] = useState({});
  const [allSubjects, setAllSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [subjectQueryFlag, setSubjectQueryFlag] = useState(false);

  console.log("locatio state is : ", location.state);

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

  const { data: subjects, isSuccess, isPending: subjectPending } = useQuery({ queryKey: ["subjectofstudents"], queryFn: async () => await getStudentSubjectsForAdmin(location.state?._id) });


  const studentAssignmentsQuizes = useQuery({ queryKey: ["student-assignments-quizes"], queryFn: async () => await getStudentSubjectReport(location.state?._id, JSON.parse(selectedSubject).subject._id), enabled: subjectQueryFlag });

  useEffect(() => {
    if (isSuccess) setAllSubjects(subjects);
  }, [isSuccess, subjects]);

  useEffect(() => {
    setSubjectQueryFlag(true);
    studentAssignmentsQuizes.refetch()
    if (!studentAssignmentsQuizes.isPending) {
      console.log("data is: ", studentAssignmentsQuizes.data);
    }
  }, [selectedSubject, studentAssignmentsQuizes.data, studentAssignmentsQuizes.isPending])


  return (
    isPending || subjectPending ? <LargeLoader /> :
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
                          {isSuccess && subjects.map((sub) => <option value={JSON.stringify(sub)}>{sub.subject?.name}</option>)}
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
                            grade={studentAssignmentsQuizes.data?.quizes?.avgGrade}
                            percentage={studentAssignmentsQuizes.data?.quizes?.avgMarksPer ? studentAssignmentsQuizes.data?.quizes?.avgMarksPer !== "NaN" ? studentAssignmentsQuizes.data?.quizes?.avgMarksPer: 0  : 0  }
                          />
                        </>
                      }
                    </div>
                  </div>
                </div>
                <div className="mt-7">
                  <div className="flex flex-col gap-2">
                    <p className="md:text-[20px]">System Usage Report</p>
                    <div className="flex flex-row items-center gap-2">
                      <img src={IMAGES.deviceGraph} alt="" className="w-full h-full" />
                    </div>
                  </div>
                </div>
                <div className="mt-7">
                  <div className="flex flex-col gap-4">
                    <p className="md:text-[20px]">Activity History</p>
                    <div className="flex flex-col  gap-2">
                      <ActivityCard />
                      <ActivityCard />
                      <ActivityCard />
                    </div>
                  </div>
                </div>
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
