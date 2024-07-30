import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Student/Dashboard/Dashboard";
import TDashboard from "./pages/Teacher/Dashboard/Dashboard";
import ADashboard from "./pages/Admin/Dashboard/Dashboard";
import PDashboard from "./pages/Parent/Dashboard/Dashboard";

import Reports from "./pages/Student/Reports/Reports";
import TReports from "./pages/Teacher/StudentReports/StudentReports";
import AReports from "./pages/Admin/Students/StudentReports";
import PReports from "./pages/Parent/Reports/Reports";

import ATeachers from "./pages/Admin/Teachers/Teachers";
import ATeacherDetails from "./pages/Admin/Teachers/TeacherDetails";

import SubjectReport from "./pages/Student/Reports/SubjectReport";
import TSubjectReport from "./pages/Teacher/StudentReports/SubjectReport";
import ASubjectReport from "./pages/Admin/Students/SubjectReport";
import PSubjectReport from "./pages/Parent/Reports/SubjectReport";

import AssignmentReport from "./pages/Student/Reports/AssignmentReport";
import Assignments from "./pages/Student/Assignments/Assignments";
import TAssignments from "./pages/Teacher/Assignments/Assignments";
import PAssignments from "./pages/Parent/Assignments/Assignments";
import PAssignmentsDetails from "./pages/Parent/Assignments/AssignmentsDetails";
import PAssignmentsReports from "./pages/Parent/Assignments/AssignmentsReports";

import TSubmissions from "./pages/Teacher/Assignments/Submissions";
import TGradingAssignments from "./pages/Teacher/Assignments/GradingAssignments";

import TQuizzSubmissions from "./pages/Teacher/Quizzes/Submissions";
import TGradingQuizzes from "./pages/Teacher/Quizzes/GradingQuizzes";
import Quizzes from "./pages/Student/Quizzes/Quizzes";
import TQuizzes from "./pages/Teacher/Quizzes/Quizzes";
import PQuizzes from "./pages/Parent/Quizzes/Quizzes";
import PQuizzesDetails from "./pages/Parent/Quizzes/QuizzDetails";
import PQuizzesReports from "./pages/Parent/Quizzes/QuizzReports";

import TClassroom from "./pages/Teacher/Classroom/Classroom";
import AClassroom from "./pages/Admin/Classrooms/Classroom";

import TimeTable from "./pages/Student/TImeTable/TimeTable";
import TTimeTable from "./pages/Teacher/TimeTable/TimeTable";
import ATimeTable from "./pages/Admin/TimeTable/TimeTable";

import AAnnouncements from "./pages/Admin/Announcements/Announcements";
// import AAnnouncements from "./pages/Parent/an";
import AManageUsers from "./pages/Admin/ManageUsers/ManageUsers";

import ALevels from "./pages/Admin/Levels/Levels";
import ASubjects from "./pages/Admin/Subjects/Subjects";

import StudentLayout from "./layouts/StudentLayout";
import TeacherLayout from "./layouts/TeacherLayout";
import AdminLayout from "./layouts/AdminLayout";
import ParentLayout from "./layouts/ParentLayout";
import ChildrenScreen from "./pages/Parent/ChildrenScreen/ChildrenScreen";
import Login from "./pages/Auth/Student/Login";
import ALogin from "./pages/Auth/Admin/Login";
import SignUp from "./pages/Auth/Student/SignUp";
import ProtectedStudent from "./utils/ProtectedStudent";
import ProtectedTeacher from "./utils/ProtectedTeacher";
import ProtectedAdmin from "./utils/ProtectedAdmin";
import ProtectedParent from "./utils/ProtectedParent";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <Login />
          }
        />
        <Route
          path="/admin/login"
          element={
            <ALogin />
          }
        />
        <Route
          path="/signup"
          element={
            <SignUp />
          }
        />
        <Route element={<ProtectedAdmin />} >
          <Route
            path="/admin/dashboard"
            element={
              <AdminLayout>
                <ADashboard />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/timetable"
            element={
              <AdminLayout>
                <ATimeTable />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/reports"
            element={
              <AdminLayout>
                <AReports />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/reports/:student"
            element={
              <AdminLayout>
                <ASubjectReport />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/announcements"
            element={
              <AdminLayout>
                <AAnnouncements />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/manageusers"
            element={
              <AdminLayout>
                <AManageUsers />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/levels"
            element={
              <AdminLayout>
                <ALevels />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/subjects"
            element={
              <AdminLayout>
                <ASubjects />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/classrooms"
            element={
              <AdminLayout>
                <AClassroom />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/teachers"
            element={
              <AdminLayout>
                <ATeachers />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/teachers/:teacher"
            element={
              <AdminLayout>
                <ATeacherDetails />
              </AdminLayout>
            }
          />
        </Route>
        <Route element={<ProtectedStudent />} >
          <Route
            path="/"
            element={
              <StudentLayout>
                <Dashboard />
              </StudentLayout>
            }
          />
          <Route
            path="/reports"
            element={
              <StudentLayout>
                <Reports />
              </StudentLayout>
            }
          />
          <Route
            path="/reports/:subject"
            element={
              <StudentLayout>
                <SubjectReport />
              </StudentLayout>
            }
          />
          <Route
            path="/reports/:subject/:title"
            element={
              <StudentLayout>
                <AssignmentReport />
              </StudentLayout>
            }
          />
          <Route
            path="/assignments"
            element={
              <StudentLayout>
                <Assignments />
              </StudentLayout>
            }
          />
          <Route
            path="/quizzes"
            element={
              <StudentLayout>
                <Quizzes />
              </StudentLayout>
            }
          />
          <Route
            path="/timetable"
            element={
              <StudentLayout>
                <TimeTable />
              </StudentLayout>
            }
          />
        </Route>
        <Route element={<ProtectedTeacher />} >
          <Route
            path="/teacher/dashboard"
            element={
              <TeacherLayout>
                <TDashboard />
              </TeacherLayout>
            }
          />
          <Route
            path="/teacher/timetable"
            element={
              <TeacherLayout>
                <TTimeTable />
              </TeacherLayout>
            }
          />
          <Route
            path="/teacher/assignments"
            element={
              <TeacherLayout>
                <TAssignments />
              </TeacherLayout>
            }
          />
          <Route
            path="/teacher/quizzes"
            element={
              <TeacherLayout>
                <TQuizzes />
              </TeacherLayout>
            }
          />
          <Route
            path="/teacher/reports"
            element={
              <TeacherLayout>
                <TReports />
              </TeacherLayout>
            }
          />
          <Route
            path="/teacher/reports/:student"
            element={
              <TeacherLayout>
                <TSubjectReport />
              </TeacherLayout>
            }
          />
          <Route
            path="/teacher/assignments/submissions"
            element={
              <TeacherLayout>
                <TSubmissions />
              </TeacherLayout>
            }
          />
          <Route
            path="/teacher/quizzes/submissions"
            element={
              <TeacherLayout>
                <TQuizzSubmissions />
              </TeacherLayout>
            }
          />
          <Route
            path="/teacher/assignments/GradingAssignments"
            element={
              <TeacherLayout>
                <TGradingAssignments />
              </TeacherLayout>
            }
          />
          <Route
            path="/teacher/quizzes/GradingQuizzes"
            element={
              <TeacherLayout>
                <TGradingQuizzes />
              </TeacherLayout>
            }
          />
          <Route
            path="/teacher/classroom"
            element={
              <TeacherLayout>
                <TClassroom />
              </TeacherLayout>
            }
          />
        </Route>
        <Route element={<ProtectedParent />} >
          <Route
            path="/parent/dashboard"
            element={
              <ParentLayout>
                <PDashboard />
              </ParentLayout>
            }
          />
          <Route
            path="/parent/reports"
            element={
              <ParentLayout>
                <PReports />
              </ParentLayout>
            }
          />
          <Route
            path="/parent/reports/:subject"
            element={
              <ParentLayout>
                <PSubjectReport />
              </ParentLayout>
            }
          />
          <Route
            path="/parent/quizzes/reports"
            element={
              <ParentLayout>
                <PQuizzesReports />
              </ParentLayout>
            }
          />
          <Route
            path="/parent/quizzes/:details"
            element={
              <ParentLayout>
                <PQuizzesDetails />
              </ParentLayout>
            }
          />
          <Route
            path="/parent/assignments/reports"
            element={
              <ParentLayout>
                <PAssignmentsReports />
              </ParentLayout>
            }
          />
          <Route
            path="/parent/assignments/:details"
            element={
              <ParentLayout>
                <PAssignmentsDetails />
              </ParentLayout>
            }
          />
          <Route
            path="/parent/assignments"
            element={
              <ParentLayout>
                <PAssignments />
              </ParentLayout>
            }
          />
          <Route
            path="/parent/quizzes"
            element={
              <ParentLayout>
                <PQuizzes />
              </ParentLayout>
            }
          />
          <Route
            path="/parent/children"
            element={
              <ChildrenScreen />
            }
          />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
