import React, { useEffect, useState } from "react";
import Loader from "../../../utils/Loader";
import Navbar from "../../../components/Teacher/Navbar";
import DataRow from "../../../components/Teacher/Attendence/Submission/DataRow";

import { BiSearch } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { useBlur } from "../../../context/BlurContext";
import { useMutation } from "@tanstack/react-query";
import { markAttendence } from "../../../api/Teacher/Attendence";
import { toast } from "react-toastify";

const MarkAttendence = () => {

    const location = useLocation();
    const { isBlurred, toggleBlur } = useBlur();
    const [classData, setClassData] = useState();
    const [searchText, setSearchText] = useState("");

    const navigate = useNavigate();

    const [attendeceData, setAttendenceData] = useState([{ id: "no id", isPresent: true }]);

    const attendenceMutation = useMutation({
        mutationKey: ["mark-attendence"], mutationFn: async () => {
            const result = await markAttendence(attendeceData, location?.state?._id);
            return result;
        },
        onSettled: (data, error) => {
            if (error) console.log(error);
            if (!error) {
                toast.success("Attendance submitted successfully!");
                navigate("/teacher/attendence");
                console.log(" data is: ", data);
            }
        }
    })

    useEffect(() => {
        console.log(location.state);
        if (location.state) {

            console.log("inside state if");

            // if(location.state.attendance.length == 0){


            let temparray = attendeceData;
            location?.state?.classroom?.students?.map((cls, index) => {
                temparray[index] = { studentID: cls?._id, isPresent: true };
            });

            setAttendenceData(temparray);

            setClassData(location?.state);
        }

    }, [location])

    useEffect(() => {
        console.log("set Attendence data is : ", attendeceData);
    }, [attendeceData])

    return (
        false ? <div className="flex justify-start flex-1"> <Loader /> </div> :
            <>
                <div className="flex flex-1 bg-[#F9F9F9] font-poppins">
                    <div className="flex flex-1">
                        <div
                            className={`w-full h-screen lg:px-20 sm:px-10 px-3 flex-grow lg:ml-72`}
                        >
                            <div className="h-screen pt-4">
                                <Navbar heading={"Mark Attendence"} />
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
                                        {searchText == "" && classData?.classroom?.studentdetails?.map((cls, index) => (
                                            <DataRow
                                                data={cls}
                                                header={false}
                                                classname={cls.name}
                                                profile={cls?.profilePic}
                                                index={index + 1}
                                                bgColor={"#FFFFFF"}
                                                attendeceData={attendeceData}
                                                setAttendenceData={setAttendenceData}
                                            />
                                        ))}
                                        {searchText && classData?.classroom?.studentdetails?.map((cls, index) => {
                                            if (cls.includes(searchText)) {
                                                return <DataRow
                                                    data={cls}
                                                    header={false}
                                                    classname={cls.name}
                                                    profile={cls.profilePic}
                                                    index={index + 1}
                                                    bgColor={"#FFFFFF"}
                                                    attendeceData={attendeceData}
                                                    setAttendenceData={setAttendenceData}
                                                />
                                            }
                                        })}
                                    </div>

                                    {attendenceMutation.isPending && <div> <Loader /> </div>}

                                    {!attendenceMutation.isPending && <div className="flex justify-end my-4 border-t border-black">
                                        <div className="flex justify-end py-4">
                                            <p onClick={attendenceMutation.mutate} className="flex cursor-pointer px-8 py-3 text-sm text-white rounded-3xl bg-maroon">Submit</p>
                                        </div>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
    )
}

export default MarkAttendence;
