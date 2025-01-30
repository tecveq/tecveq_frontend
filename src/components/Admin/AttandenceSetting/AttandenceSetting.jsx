import React, { useEffect, useState } from 'react';
import { useAddHeadSettings, useGetHeadSettings, useUpdateHeadSettings } from '../../../api/Admin/SettingsApi';
import axios from 'axios';
import { BACKEND_URL } from "../../../constants/api";

const AttandenceSetting = () => {
    const [isEnableHeadSetting, setIsEnableHeadSetting] = useState(false); // State for checkbox
    const [settingId, setSettingId] = useState(null); // State to store ID

    // Fetch head settings
    const { headSettings, isLoading: isGetHeadSettingLoading } = useGetHeadSettings();

    // Mutations for add and update
    const { addHeadSettings, isLoading: isAddHeadSettingLoading } = useAddHeadSettings();
    const { updateHeadSettings, isLoading: isUpdateHeadSettingLoading } = useUpdateHeadSettings();

    // Handle checkbox change
    const handleCheckboxChange = () => {
        const newValue = !isEnableHeadSetting; // Toggle value
        setIsEnableHeadSetting(newValue);

        if (settingId) {
            // If setting exists, update it
            updateHeadSettings({ settingId, enableHeadAttendance: newValue });
        } else {
            // Otherwise, add a new setting
            addHeadSettings({ enableHeadAttendance: newValue });
        }
    };

    // Sync API data to component state
    useEffect(() => {
        if (!isGetHeadSettingLoading && headSettings) {
            setIsEnableHeadSetting(headSettings?.attendenceSetting?.enableHeadAttendance || false); // Set checkbox state
            setSettingId(headSettings?._id || null); // Store setting ID if present
        }
    }, [headSettings, isGetHeadSettingLoading]); // Watch for changes



    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        console.log(formData ,"form data is saved");
        

        try {
            await axios.post(`${BACKEND_URL}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('File uploaded successfully.');
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file.');
        }
    };

    return (
        <>
            <div className='lg:ml-72 p-8 w-full'>
                <div className='w-full'>
                    <span className='text-2xl font-bold'>Attendance Settings</span>
                </div>
                <div className='w-full shadow-sm rounded-2xl shadow-grey_700 flex flex-row items-center p-6 mt-6 justify-between'>
                    <span className='text-lg font-semibold'>
                        Head Attendance {isEnableHeadSetting ? "enabled" : "disabled"}
                    </span>
                    <span className='h-6'>
                        <input
                            type="checkbox"
                            className='w-5 h-5'
                            onChange={handleCheckboxChange} // Handle change
                            checked={isEnableHeadSetting} // Bind checkbox to state
                        />
                    </span>
                </div>

                <div>



                    <div>
                        <h2>Upload CSV File</h2>
                        <form onSubmit={handleSubmit}>
                            <input type="file" accept=".csv" onChange={handleFileChange} />
                            <button type="submit">Upload</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AttandenceSetting;
