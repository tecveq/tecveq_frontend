import React, { useState, useMemo, useCallback, useRef } from 'react';
import { Search, Filter, X, Users, BookOpen, Clock } from 'lucide-react';
import { fetchStudentAttendanceReport, getMyAllClassroom } from '../../../api/Admin/classroomApi';
import { useMutation, useQuery } from '@tanstack/react-query';

import { Download } from "lucide-react";

const INITIAL_FILTERS = {
    classroomId: '',
    subjectId: '',
    startDate: '',
    endDate: ''
};

const AttendanceReportComp = () => {
    const [filters, setFilters] = useState(INITIAL_FILTERS);
    const [isFilterExpanded, setIsFilterExpanded] = useState(true);
    const [attendanceData, setAttendanceData] = useState(null);
    const reportRef = useRef();

    // Fetch classrooms
    const { data: myClassroomData, isPending: isLoadingClassrooms } = useQuery({
        queryKey: ["classroom"],
        queryFn: getMyAllClassroom
    });

    // Fetch attendance report
    const attendanceSearch = useMutation({
        mutationFn: fetchStudentAttendanceReport,
        onSuccess: (data) => {
            setAttendanceData(data);
        },
        onError: (error) => {
            console.error('Failed to fetch attendance data:', error);
        }
    });

    const classrooms = useMemo(() => myClassroomData?.data || [], [myClassroomData]);
    const studentReport = attendanceData?.data;

    // Get subjects for selected classroom
    const availableSubjects = useMemo(() => {
        if (!filters.classroomId || !classrooms.length) return [];

        const selectedClassroom = classrooms.find(classroom => classroom._id === filters.classroomId);
        if (!selectedClassroom?.teachers) return [];

        const subjects = selectedClassroom.teachers
            .map(teacher => teacher.subject)
            .filter(Boolean);

        return subjects.reduce((acc, current) => {
            const exists = acc.find(item => item._id === current._id);
            if (!exists) acc.push(current);
            return acc;
        }, []);
    }, [filters.classroomId, classrooms]);

    // Handle filter changes
    const handleFilterChange = useCallback((field, value) => {
        setFilters(prev => {
            const newFilters = { ...prev, [field]: value };
            // Reset subject when classroom changes
            if (field === 'classroomId') {
                newFilters.subjectId = '';
            }
            return newFilters;
        });
    }, []);

    const handleReset = useCallback(() => {
        setFilters(INITIAL_FILTERS);
        setAttendanceData(null);
    }, []);

    // Calculate active filters
    const activeFiltersCount = useMemo(() =>
        Object.values(filters).filter(Boolean).length, [filters]
    );

    // Handle search
    const handleSearch = useCallback(async () => {
        if (!filters.classroomId) {
            alert('Please select a classroom');
            return;
        }

        if (filters.startDate && filters.endDate && new Date(filters.startDate) > new Date(filters.endDate)) {
            alert('Start date cannot be after end date');
            return;
        }

        const searchPayload = {
            classroomId: filters.classroomId,
            subjectId: filters.subjectId || null,
            startDate: filters.startDate || null,
            endDate: filters.endDate || null
        };

        console.log(searchPayload, "search")

        attendanceSearch.mutate(searchPayload);
    }, [filters, attendanceSearch]);

    // Get display names
    const selectedClassroomName = useMemo(() => {
        if (!filters.classroomId) return '';
        const classroom = classrooms.find(c => c._id === filters.classroomId);
        return classroom ? `${classroom.name} - ${classroom.level?.name || 'N/A'}` : '';
    }, [filters.classroomId, classrooms]);

    const selectedSubjectName = useMemo(() => {
        if (!filters.subjectId) return '';
        const subject = availableSubjects.find(s => s._id === filters.subjectId);
        return subject?.name || '';
    }, [filters.subjectId, availableSubjects]);

    const formatDate = (dateString) => {
        return dateString ? new Date(dateString).toLocaleDateString() : '';
    };

    if (isLoadingClassrooms) {
        return (
            <div className="bg-white border border-[#e5e7eb] rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2563eb] mx-auto"></div>
                    <p className="mt-2 text-[#6b7280]">Loading classrooms...</p>
                </div>
            </div>
        );
    }


    const handlePrint = () => {
        const content = reportRef.current.innerHTML;
        const win = window.open('', '', 'width=800,height=600');
        win.document.write(`
    <html>
      <head>
        <title>Print Report</title>
        <style>
          .export-button { display: none !important; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
        </style>
      </head>
      <body>${content}</body>
    </html>
  `);
        win.document.close();
        win.focus();
        win.print();
        win.close();
    };

    return (
        <div className="bg-white border border-[#e5e7eb] rounded-xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-[#6A00FF] px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="bg-white/20 p-2 rounded-lg">
                            <Filter className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Attendance Report Filters</h2>
                            <p className="text-[#bfdbfe] text-sm">Configure your search parameters</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        {activeFiltersCount > 0 && (
                            <div className="bg-white/20 px-3 py-1 rounded-full">
                                <span className="text-white text-sm font-medium">
                                    {activeFiltersCount} active
                                </span>
                            </div>
                        )}
                        <button
                            onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                            className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
                        >
                            <Filter className={`h-4 w-4 text-white transition-transform ${isFilterExpanded ? 'rotate-180' : ''}`} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Filter Content */}
            {isFilterExpanded && (
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        {/* Classroom Selection */}
                        <div className="space-y-3">
                            <label className="flex items-center space-x-2 text-sm font-semibold text-[#374151]">
                                <Users className="h-4 w-4 text-[#2563eb]" />
                                <span>Select Classroom</span>
                            </label>
                            <div className="relative">
                                <select
                                    value={filters.classroomId}
                                    onChange={(e) => handleFilterChange('classroomId', e.target.value)}
                                    className="w-full px-4 py-3 border border-[#d1d5db] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent transition-all duration-200 appearance-none bg-white"
                                >
                                    <option value="">Choose a classroom...</option>
                                    {classrooms.map(classroom => (
                                        <option key={classroom._id} value={classroom._id}>
                                            {classroom.name} - {classroom.level?.name || 'N/A'} ({classroom.students?.length || 0} students)
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                                    <svg className="h-5 w-5 text-[#9ca3af]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Subject Selection */}
                        <div className="space-y-3">
                            <label className="flex items-center space-x-2 text-sm font-semibold text-[#374151]">
                                <BookOpen className="h-4 w-4 text-[#059669]" />
                                <span>Select Subject</span>
                            </label>
                            <div className="relative">
                                <select
                                    value={filters.subjectId}
                                    onChange={(e) => handleFilterChange('subjectId', e.target.value)}
                                    disabled={!filters.classroomId || availableSubjects.length === 0}
                                    className="w-full px-4 py-3 border border-[#d1d5db] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:border-transparent transition-all duration-200 appearance-none bg-white disabled:bg-[#f9fafb] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <option value="">Choose a subject...</option>
                                    {availableSubjects.map(subject => (
                                        <option key={subject._id} value={subject._id}>
                                            {subject.name}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                                    <svg className="h-5 w-5 text-[#9ca3af]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                            {!filters.classroomId && (
                                <p className="text-xs text-[#6b7280] flex items-center">
                                    <span className="w-2 h-2 bg-[#f59e0b] rounded-full mr-2"></span>
                                    Select a classroom first
                                </p>
                            )}
                        </div>

                        {/* Start Date */}
                        <div className="space-y-3">
                            <label className="flex items-center space-x-2 text-sm font-semibold text-[#374151]">
                                <Clock className="h-4 w-4 text-[#7c3aed]" />
                                <span>Start Date</span>
                            </label>
                            <input
                                type="date"
                                value={filters.startDate}
                                onChange={(e) => handleFilterChange('startDate', e.target.value)}
                                className="w-full px-4 py-3 border border-[#d1d5db] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] focus:border-transparent transition-all duration-200"
                            />
                        </div>

                        {/* End Date */}
                        <div className="space-y-3">
                            <label className="flex items-center space-x-2 text-sm font-semibold text-[#374151]">
                                <Clock className="h-4 w-4 text-[#7c3aed]" />
                                <span>End Date</span>
                            </label>
                            <input
                                type="date"
                                value={filters.endDate}
                                onChange={(e) => handleFilterChange('endDate', e.target.value)}
                                min={filters.startDate}
                                className="w-full px-4 py-3 border border-[#d1d5db] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] focus:border-transparent transition-all duration-200"
                            />
                        </div>
                    </div>

                    {/* Active Filters Display */}
                    {activeFiltersCount > 0 && (
                        <div className="mt-6 p-4 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-sm font-semibold text-[#374151] flex items-center">
                                    <span className="w-2 h-2 bg-[#2563eb] rounded-full mr-2"></span>
                                    Active Filters ({activeFiltersCount})
                                </h3>
                                <button
                                    onClick={handleReset}
                                    className="text-xs text-[#6b7280] hover:text-[#6A00FF] transition-colors flex items-center"
                                >
                                    <X className="h-3 w-3 mr-1" />
                                    Clear all
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {filters.classroomId && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#dbeafe] text-[#1e40af] border border-[#93c5fd]">
                                        <Users className="h-3 w-3 mr-1" />
                                        {selectedClassroomName}
                                        <button
                                            onClick={() => handleFilterChange('classroomId', '')}
                                            className="ml-1 hover:text-[#2563eb]"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </span>
                                )}
                                {filters.subjectId && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#dcfce7] text-[#166534] border border-[#bbf7d0]">
                                        <BookOpen className="h-3 w-3 mr-1" />
                                        {selectedSubjectName}
                                        <button
                                            onClick={() => handleFilterChange('subjectId', '')}
                                            className="ml-1 hover:text-[#059669]"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </span>
                                )}
                                {filters.startDate && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#f3e8ff] text-[#7c2d12] border border-[#e9d5ff]">
                                        <Clock className="h-3 w-3 mr-1" />
                                        From: {formatDate(filters.startDate)}
                                        <button
                                            onClick={() => handleFilterChange('startDate', '')}
                                            className="ml-1 hover:text-[#7c3aed]"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </span>
                                )}
                                {filters.endDate && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#f3e8ff] text-[#7c2d12] border border-[#e9d5ff]">
                                        <Clock className="h-3 w-3 mr-1" />
                                        To: {formatDate(filters.endDate)}
                                        <button
                                            onClick={() => handleFilterChange('endDate', '')}
                                            className="ml-1 hover:text-[#7c3aed]"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-end mt-6 pt-4 border-t border-[#e5e7eb]">
                        <button
                            onClick={handleReset}
                            className="px-6 py-3 border border-[#d1d5db] text-[#374151] rounded-lg hover:bg-[#f9fafb] focus:outline-none focus:ring-2 focus:ring-[#6b7280] focus:ring-offset-2 transition-all duration-200 font-medium"
                        >
                            Reset All Filters
                        </button>
                        <button
                            onClick={handleSearch}
                            disabled={!filters.classroomId || attendanceSearch.isPending}
                            className="px-8 py-3 bg-[#6A00FF] text-white rounded-lg hover:from-[#1d4ed8] hover:to-[#1e40af] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {attendanceSearch.isPending ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Search className="h-4 w-4" />
                                    Generate Report
                                </>
                            )}
                        </button>
                    </div>

                    {/* Results Table */}
                    <section ref={reportRef}>
                        {studentReport && studentReport.length > 0 && (
                            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <div className="flex flex-row justify-between items-center px-4 mb-6">
                                    <h3 className="text-2xl font-semibold text-gray-800">
                                        Attendance Report Results
                                    </h3>
                                    <button
                                        onClick={handlePrint}
                                        className="export-button inline-flex items-center gap-2 px-4 py-2 bg-[#6A00FF] hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        <Download size={16} />
                                        Export
                                    </button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse border border-gray-300">
                                        <thead>
                                            <tr className="bg-gray-100">
                                                <th className="border border-gray-300 px-4 py-2 text-left">No.</th>
                                                <th className="border border-gray-300 px-4 py-2 text-left">Student</th>
                                                <th className="border border-gray-300 px-4 py-2 text-left">Classroom</th>
                                                <th className="border border-gray-300 px-4 py-2 text-left">Subject</th>
                                                <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                                                <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {studentReport.map((item, index) => (
                                                <tr key={index} className="hover:bg-gray-50">
                                                    <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                                                    <td className="border border-gray-300 px-4 py-2">
                                                        {item.studentName} ({item.rollNo})
                                                    </td>
                                                    <td className="border border-gray-300 px-4 py-2">{item.classroomName}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{item.subjectName}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{formatDate(item.date)}</td>
                                                    <td className="border border-gray-300 px-4 py-2">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'present'
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-red-100 text-red-800'
                                                            }`}>
                                                            {item.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </section>

                    {studentReport && studentReport.length === 0 && (
                        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                            <p className="text-yellow-800 text-center">No attendance records found for the selected criteria.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AttendanceReportComp;