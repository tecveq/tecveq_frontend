import React, { useRef } from 'react';
import useClickOutside from '../../../hooks/useClickOutlise';
import { useBlur } from '../../../context/BlurContext';
import moment from 'moment';
import { useUser } from '../../../context/UserContext';

const ShowQuizAssignmentModal = ({ data, isQuiz, setIsShow }) => {
    const { toggleBlur } = useBlur();
    const { userData } = useUser();

    const ref = useRef(null);

    useClickOutside(ref, () => {
        toggleBlur();
        setIsShow(false);
    });

    const {
        title,
        text,
        totalMarks,
        dueDate,
        files,
        classroomID,
        subjectID
    } = data || {};

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div
                ref={ref}
                className="bg-white rounded-2xl shadow-2xl w-[90%] md:w-[60%] lg:w-[50%] max-h-[85vh] overflow-y-auto p-6 space-y-6"
            >
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-2">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        {isQuiz ? '📝 Quiz' : '📘 Assignment'} Details
                    </h2>
                    <button
                        onClick={() => {
                            toggleBlur();
                            setIsShow(false);
                        }}
                        className="text-gray-400 hover:text-red-500 text-2xl font-bold"
                    >
                        ×
                    </button>
                </div>

                {/* Assignment Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                    <div>
                        <span className="font-semibold">📌 Title:</span> {title}
                    </div>
                    <div>
                        <span className="font-semibold">🧮 Total Marks:</span> {totalMarks}
                    </div>
                    <div>
                        <span className="font-semibold">📅 Due Date:</span>{' '}
                        {moment(dueDate).format('MMMM Do YYYY, h:mm A')}
                    </div>
                    <div>
                        <span className="font-semibold">📚 Subject:</span>{' '}
                        {subjectID?.name}
                    </div>
                    <div>
                        <span className="font-semibold">🏫 Classroom:</span>{' '}
                        {classroomID?.name}
                    </div>
                </div>

                {
                    text && (<div>
                        <span className="font-semibold">📌 Text Assignment:</span> {text}
                    </div>)
                }

                {/* Files */}

                <div>
                    <h3 className="font-semibold text-lg mb-2">📎 Attached Files</h3>
                    {files?.length > 0 ? (
                        <ul className="space-y-2">
                            {files.map((file) => (
                                <li key={file._id} className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
                                    <span className="truncate text-sm">{file.name}</span>
                                    <a
                                        href={file.url}
                                        download
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-blue-600 hover:underline"
                                    >
                                        📥 Download
                                    </a>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 italic">No files attached.</p>
                    )}
                </div>

                {/* Teachers */}
                <div>
                    <h3 className="font-semibold text-lg mb-2">👨‍🏫 Assigned Teachers</h3>
                    {classroomID?.teachers?.some((t) => t.teacher._id === userData._id) ? (
                        <ul className="space-y-1 text-sm">
                            {classroomID.teachers
                                .filter((t) => t.teacher._id === userData._id)
                                .map((t) => (
                                    <li key={t._id} className="bg-gray-50 px-3 py-2 rounded-md">
                                        👤 <span className="font-medium">Name:</span> {t.teacher.name}<br />
                                        📘 <span className="font-medium">Subject:</span> {t.subject.name}
                                    </li>
                                ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 italic">This assignment was not created by you.</p>
                    )}
                </div>

                {/* Students */}
                <div>
                    <h3 className="font-semibold text-lg mb-2">👨‍🎓 Students</h3>
                    {classroomID?.students?.length > 0 ? (
                        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                            {classroomID.students.map((student) => (
                                <li
                                    key={student._id}
                                    className="bg-blue-50 text-blue-800 px-3 py-2 rounded-md"
                                >
                                    👤 {student.name}<br />

                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 italic">No students found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShowQuizAssignmentModal;
