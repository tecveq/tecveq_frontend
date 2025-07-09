import React from 'react'
import Navbar from '../../../components/Admin/Navbar'
import AttendenceReportComp from '../../../components/Admin/AttendenceReport/AttendenceReportComp'

const AttendenceReport = () => {
    return (
        <>
            <div className='md:ml-80 w-full' >
                <div className='mr-10'>
                    <Navbar heading={"Attendence Report"} />

                </div>
                <AttendenceReportComp />

            </div>
        </>
    )
}

export default AttendenceReport