import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../../constants/api";
import { Upload, File } from "lucide-react";

const AddCSVFileComponent = () => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setFileName(selectedFile ? selectedFile.name : "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert("Please select a file before uploading.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            await axios.post(`${BACKEND_URL}/upload/csv-file`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("File uploaded successfully.");
            setFile(null);
            setFileName("");
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Error uploading file.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 border border-gray-200">
                {/* Header */}
                <h2 className="text-xl font-semibold text-center flex items-center justify-center gap-2 mb-4">
                    <Upload className="w-6 h-6 text-blue-500" />
                    Upload CSV File
                </h2>

                {/* File Upload Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <label className="font-medium">Choose a CSV File</label>
                    <div className="relative flex items-center">
                        {/* Hidden File Input */}
                        <input type="file" accept=".csv" onChange={handleFileChange} className="hidden" id="fileInput" />
                        {/* Styled Label */}
                        <label
                            htmlFor="fileInput"
                            className="flex items-center justify-center w-full cursor-pointer border border-gray-300 rounded-md p-3 bg-grey/10 hover:bg-grey transition"
                        >
                            <File className="w-5 h-5 text-gray-600 mr-2" />
                            {fileName || "Select File"}
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-maroon hover:bg-maroon/60 text-white py-2 rounded-md font-medium transition"
                    >
                        Upload File
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCSVFileComponent;
