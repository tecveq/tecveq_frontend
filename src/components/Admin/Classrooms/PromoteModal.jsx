import React, { useState } from 'react';
import { useAdmin } from '../../../context/AdminContext';

const PromoteModal = ({ classrooms = [], classroomStudents = {}, setPromotePopupMenu }) => {
  const { allLevels = [] } = useAdmin();
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const students = classroomStudents?.students || [];

  const handleStudentToggle = (id) => {
    setSelectedStudentIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedStudentIds([]);
    } else {
      const allIds = students.map((s) => s._id);
      setSelectedStudentIds(allIds);
    }
    setSelectAll(!selectAll);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4 py-8">
      <div className="relative w-full max-w-2xl max-h-screen overflow-y-auto bg-gradient-to-br from-white via-blue-50 to-white rounded-3xl shadow-2xl border border-gray-200 p-8 space-y-8">
        {/* ❌ Close Button */}
        <button
          onClick={setPromotePopupMenu}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold"
        >
          ×
        </button>

        {/* Header */}
        <h2 className="text-4xl font-bold text-center text-blue-800 flex items-center justify-center gap-3">
          🎓 Promote Students 🚀
        </h2>

        {/* Classroom & Level */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="classroomSelect" className="block mb-1 font-semibold text-gray-800">
              🏫 Select Classroom
            </label>
            <select
              id="classroomSelect"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            >
              <option value="">-- Choose Classroom --</option>
              {classrooms.map((classroom) => (
                <option key={classroom._id} value={classroom._id}>
                  {classroom.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="levelSelect" className="block mb-1 font-semibold text-gray-800">
              📘 Select Level
            </label>
            <select
              id="levelSelect"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            >
              <option value="">-- Choose Level --</option>
              {allLevels.map((level) => (
                <option key={level._id} value={level._id}>
                  {level.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block mb-1 font-semibold text-gray-800">
            📝 Promotion Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none shadow-sm"
            placeholder="Write a short reason for promotion..."
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block mb-1 font-semibold text-gray-800">📎 Attach File (optional)</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 shadow-sm"
          />
          {file && <p className="text-sm text-gray-600 mt-1">📄 {file.name}</p>}
        </div>

        {/* Student Selection */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold text-gray-800">🧑‍🎓 Select Students</p>
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
                className="accent-blue-600 w-4 h-4"
              />
              <span>✅ Select All</span>
            </label>
          </div>

          <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-md p-3 space-y-2 bg-gray-50 shadow-inner">
            {students.length === 0 ? (
              <p className="text-sm text-gray-500 text-center">❌ No students found in this classroom.</p>
            ) : (
              students.map((student) => (
                <label
                  key={student._id}
                  className={`flex items-center justify-between p-2 rounded-md border transition-all duration-200 ${
                    selectedStudentIds.includes(student._id)
                      ? 'bg-blue-100 border-blue-400'
                      : 'hover:bg-gray-100 border-gray-200'
                  }`}
                >
                  <span className="text-gray-800 text-sm">
                    👤 {student.name}{' '}
                    <span className="text-gray-500">({student.rollNo})</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={selectedStudentIds.includes(student._id)}
                    onChange={() => handleStudentToggle(student._id)}
                    className="accent-blue-600 w-5 h-5"
                  />
                </label>
              ))
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          className={`w-full py-3 rounded-lg font-semibold text-[#ffffff] transition duration-200 text-lg flex items-center justify-center gap-2 ${
            selectedStudentIds.length > 0
              ? 'bg-gradient-to-r from-[#4F46E5] to-[#3B82F6] hover:from-[#4338CA] hover:to-[#2563EB]'
              : 'bg-[#9CA3AF] cursor-not-allowed'
          }`}
          disabled={selectedStudentIds.length === 0}
        >
          🚀 Promote{' '}
          {selectedStudentIds.length > 0
            ? `${selectedStudentIds.length} Student${selectedStudentIds.length > 1 ? 's' : ''}`
            : 'Student'}
        </button>
      </div>
    </div>
  );
};

export default PromoteModal;
