import React, { useEffect, useState } from "react";
import Loader from "../../../utils/Loader";
import Navbar from "../../../components/Teacher/Navbar";
import DataRow from "../../../components/Teacher/Attendence/Submission/DataRow";
import { BiSearch } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { useBlur } from "../../../context/BlurContext";
import { useMutation } from "@tanstack/react-query";
import { markHeadAttendence, useGetAttandenceOfClassroom, useUpdateAttandenceOfClassroom } from "../../../api/Teacher/Attendence";
import { toast } from "react-toastify";

const ClassroomAttendence = () => {
  const location = useLocation();

  const { isBlurred } = useBlur();
  const [searchText, setSearchText] = useState("");
  const [attendenceData, setAttendenceData] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0])
  const navigate = useNavigate();

  const { getAttandence } = useGetAttandenceOfClassroom(location?.state?._id, currentDate)
  
  const { updateAttandence } = useUpdateAttandenceOfClassroom()

  const [showPopup, setShowPopup] = useState(false);

  const updateFunction = () => {
    setShowPopup(true); // Show the confirmation popup
  };

  const handleConfirmUpdate = () => {
    setShowPopup(false); // Close the popup
    try {
      updateAttandence({ data: attendenceData, classroomID: location?.state?._id, date: currentDate });
    } catch (error) {
      console.error("Error updating attendance:", error);
    }
    console.log("Attendance updated!");
  };

  const handleCancelUpdate = () => {
    setShowPopup(false); // Close the popup
  };


  const attendenceMutation = useMutation({
    mutationKey: ["mark-attendence"],
    mutationFn: async () => {
      const result = await markHeadAttendence(attendenceData, location?.state?._id, currentDate);
      console.log(result, "result");
      return result;
    },
    onSettled: (data, error) => {
      setFilteredStudents(data)
      if (error) {


        toast.error(error?.response?.data?.message);
        navigate("/teacher/classroom/head-attendence");
      } else {
        toast.success("Attendance submitted successfully!");
        navigate("/teacher/classroom/head-attendence");
      }
    },
  });

  useEffect(() => {
    if (getAttandence) {
      // Map the fetched attendance data to match the required structure
      const fetchedAttendanceData = getAttandence?.students?.map((attendance) => ({
        studentID: attendance.studentID,
        isPresent: attendance.isPresent,
        late: attendance.late || false, // Add late status if applicable
      }));

      setAttendenceData(fetchedAttendanceData);
      setFilteredStudents(location.state?.studentDetails || []);
    } else if (location.state?.studentDetails) {
      // Fallback to initial attendance data if no fetched attendance is present
      const students = location.state.studentDetails;
      const initialAttendenceData = students.map((student) => ({
        studentID: student._id,
        isPresent: true,
      }));

      setAttendenceData(initialAttendenceData);
      setFilteredStudents(students);
    } else {
      console.warn("No student details found in location.state");
    }
  }, [getAttandence, location.state]);



  useEffect(() => {
    const filtered = searchText
      ? location.state?.studentDetails?.filter((student) =>
        student.name.toLowerCase().includes(searchText.toLowerCase())
      )
      : location.state?.studentDetails;

    setFilteredStudents(filtered || []);
  }, [searchText, location.state?.studentDetails]);



  return (
    <>

      <div className="flex flex-1 bg-[#F9F9F9] font-poppins">
        <div className="flex flex-1">
          <div className={`w-full h-screen flex-grow lg:ml-72`}>
            <div className="h-screen pt-1">
              <Navbar heading={"Mark Attendance"} />
              <div className={`px-3 lg:px-20 sm:px-10 ${isBlurred ? "blur" : ""}`}>
                <div className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-2 w-full md:flex-row md:justify-between items-center ">
                      <div className="flex items-center gap-2 px-4 py-2 bg-white border border-black/10 rounded-3xl">
                        <BiSearch />
                        <input
                          type="text"
                          value={searchText}
                          placeholder="Search"
                          className="outline-none"
                          onChange={(e) => setSearchText(e.target.value)}
                        />
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-white border border-black/10 rounded-3xl">
                        <input
                          type="date"
                          value={currentDate}
                          placeholder="add date"
                          onChange={(e) => setCurrentDate(e.target.value)}

                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 h-[80%] overflow-auto">
                  <DataRow
                    isQuiz={true}
                    header={true}
                    index={"Sr. No"}
                    classname={"Name"}
                    bgColor={"#F9F9F9"}
                    students={"Students"}
                    teachers={"Teachers"}
                  />
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student, index) => (
                      <DataRow
                        key={index}
                        data={student}
                        header={false}
                        classname={student.name}
                        profile={student.profilePic}
                        index={index + 1}
                        bgColor={"#FFFFFF"}
                        attendeceData={attendenceData}
                        setAttendenceData={setAttendenceData}
                      />
                    ))
                  ) : (
                    <p>No students found</p>
                  )}
                </div>

                {attendenceMutation.isPending && <Loader />}

                {!attendenceMutation.isPending && (
                  <div className="flex justify-end my-4 border-t border-black">
                    <div className="flex justify-end py-4">

                      {
                        !getAttandence ? (<button
                          onClick={attendenceMutation.mutate}
                          className="flex cursor-pointer px-8 py-3 text-sm text-white rounded-3xl bg-maroon"
                        >
                          Submit
                        </button>) : (
                          <button
                            onClick={updateFunction}
                            className="flex cursor-pointer px-8 py-3 text-sm text-white rounded-3xl bg-maroon"
                          >
                            Update
                          </button>
                        )
                      }
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="mb-4 text-lg">Are you sure you want to update attendance?</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleCancelUpdate}
                  className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  No
                </button>
                <button
                  onClick={handleConfirmUpdate}
                  className="px-4 py-2 text-sm text-white bg-maroon rounded-md hover:bg-maroon-dark"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

    </>
  );
};

export default ClassroomAttendence;
