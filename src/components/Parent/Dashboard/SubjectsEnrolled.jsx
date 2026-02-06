import React, { useEffect, useState } from "react";
import TeacherMessageDialog from "./TeacherMessageDialog";
import { useParent } from "../../../context/ParentContext";
import { useQuery } from "@tanstack/react-query";
import { getAllSubjects } from "../../../api/Parent/ParentApi";
import Loader from "../../../utils/Loader";

const SubjectsEnrolled = () => {
  const [popup, setPopup] = useState(false);
  const [clickedItem, setClickedItem] = useState(null);
  const [enableQuery, setEnableQuery] = useState(false);

  const { allSubjects, setAllSubjects, selectedChild } = useParent();

  const toggleClickTeacher = (item) => {
    setPopup(!popup);
    setClickedItem(item);
  };

  const handleFeedback = () => {
    toggleClickTeacher();
    // Add backend call here if needed
  };

  // Fetch subjects with React Query
  const subjectQuery = useQuery({
    queryKey: ["subjects", selectedChild?._id],
    queryFn: async () => {
      const results = await getAllSubjects(selectedChild?._id);
      //console.log("Subjects in enrolled classes:", results);
      setAllSubjects(results);
      return results;
    },
    staleTime: 300000,
    enabled: enableQuery && !!selectedChild?._id, // Enable query only if `selectedChild._id` is defined
  });

  // Enable query if `allSubjects` is empty
  useEffect(() => {
    if (allSubjects.length === 0 && selectedChild?._id) {
      setEnableQuery(true);
    }
  }, [allSubjects, selectedChild]);

  //console.log(subjectQuery.data ,"subject query data");


  //console.log(allSubjects ,"all Subjects Of Parent ");
  

  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 gap-2">
        <div>
          <p className="text-lg font-medium">Subjects Enrolled</p>
        </div>
        <div className="flex flex-1">
          <table className="flex flex-col flex-1 bg-white rounded-lg table-fixed">
            <thead className="flex gap-5 px-2 py-3 border-t-4 rounded-tl-lg rounded-tr-lg border-t-[#007EEA] bg-[#c7cafd]">
              <tr className="flex flex-1 font-medium">
                <td className="flex-[1] flex justify-center">Sr No.</td>
                <td className="flex-[3] flex justify-center">Subject Name</td>
                <td className="flex-[3] flex justify-center">Instructor</td>
                <td className="flex-[3] flex justify-center">Attendance</td>
              </tr>
            </thead>

            {subjectQuery.isPending ? (
              <tbody className="flex flex-1">
                <tr className="flex flex-1 justify-center py-5">
                  <td colSpan="4">
                    <Loader />
                  </td>
                </tr>
              </tbody>
            ) : subjectQuery.isError ? (
              <tbody className="flex flex-1">
                <tr className="flex flex-1 justify-center py-5">
                  <td colSpan="4" className="text-red-500">
                    Error fetching subjects. Please try again later.
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody className="flex flex-col">
                {subjectQuery?.data?.subjects?.length > 0 ? (
                  subjectQuery.data.subjects.map((item, index) => (
                    <tr key={index} className="flex flex-1 text-xs border-t border-t-black/10">
                      <td className="flex-[1] py-2 lg:py-3 flex justify-center">{index + 1}</td>
                      <td className="flex-[3] py-2 lg:py-3 border-l border-l-black/10 flex justify-center">
                        {item.subject.name}
                      </td>
                      <td
                        onClick={() => toggleClickTeacher(item)}
                        style={{ cursor: "pointer" }}
                        className="flex-[3] py-2 lg:py-3 border-l border-l-black/10 flex justify-center"
                      >
                        {item.teacher.name}
                      </td>
                      <td className="flex-[3] py-2 lg:py-3 border-l border-l-black/10 flex w-full justify-center">
                        <div className="flex w-[90%] h-4 bg-grey/50 rounded-3xl">
                          <div
                            style={{ width: `${item.avgAttendancePer || 0}%` }}
                            className="text-xs h-4 bg-gradient-to-r from-green to-yellow_green_light rounded-3xl flex justify-center text-white"
                          >
                            {item?.avgAttendancePer || 0} %
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-4 text-center">
                      No subjects are found.
                    </td>
                  </tr>
                )}
                {popup && <TeacherMessageDialog handleFeedback={handleFeedback} item={clickedItem} />}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubjectsEnrolled;
