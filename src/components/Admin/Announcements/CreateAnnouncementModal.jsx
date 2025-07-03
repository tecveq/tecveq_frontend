import React, { useRef, useState } from "react";
import IMAGES from "../../../assets/images";
import useClickOutside from "../../../hooks/useClickOutlise";

import { useMutation } from "@tanstack/react-query";
import { useBlur } from "../../../context/BlurContext";
import { createAnnouncements, editAnnouncements } from "../../../api/Admin/AnnouncementsApi";


const CreateAnnouncementModal = ({
    open,
    setopen,
    refetch,
    announcementData,
    isEditTrue,
}) => {

    console.log(announcementData, "announcement");
    const [sendOnWhatsapp, setSendOnWhatsapp] = useState(false);

    const { toggleBlur } = useBlur();


    const ref = useRef(null);


    useClickOutside(ref, () => {
        setopen(false)
        toggleBlur();
    });

    const [announcemnetObj, setAnnouncementObj] = useState({
        title: isEditTrue ? announcementData?.title : "",
        description: isEditTrue ? announcementData?.description : "",
        date: isEditTrue ? announcementData?.date?.slice(0, 10) : "", // YYYY-MM-DD
        time: isEditTrue ? announcementData?.date?.slice(11, 16) : "", // HH:MM
        type: "annoouncement",
        visibility: isEditTrue ? announcementData?.visibility : "all",
    });

    const mutation = useMutation({
        mutationFn: async () => {
            let anntime = announcemnetObj.time;
            let anndate = announcemnetObj.date;
            let datetime = (anntime && anndate) ? anndate + "T" + anntime + ":00.000Z" : new Date().toISOString();
            toggleBlur();
            setopen(false);
            let results;
            if (isEditTrue) {
                results = await editAnnouncements({ ...announcemnetObj, date: datetime }, announcementData._id);
            } else {
                results = await createAnnouncements({ ...announcemnetObj, date: datetime}, sendOnWhatsapp);
            }
            await refetch();
            console.log("add or edit announcemnt : ", results)
            return results
        }
    });

    return (
        <div
            ref={ref}
            className={`fixed z-10 mt-6 bg-white p-8 w-[600px] px-16 text-black rounded-xl ml-5 md:ml-96 ${open ? "" : "hidden"
                }`}
        >
            <div className="flex gap-2">
                <div className="flex flex-col w-full gap-4">
                    <div className="flex items-center justify-between">
                        <div className="flex justify-center flex-1 w-[fit] gap-2 items-center">
                            <p className="text-2xl font-semibold cursor-text">
                                {isEditTrue ? "Update Announcement" : "Create new Announcement"}
                            </p>
                        </div>
                        <div className="flex items-center gap-2 cursor-pointer">
                            <img
                                src={IMAGES.CloseIcon}
                                className="w-[15px] h-[15px]"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleBlur();
                                    setopen(false);
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex flex-col flex-1 gap-1">
                            <p className="text-xs font-semibold text-grey_700">Title</p>
                            <div className="flex justify-between border-[1px] py-1 px-4 rounded-lg w-full items-center border-grey/50">
                                <input
                                    className="text-sm outline-none text-custom-gray-3 w-full"
                                    placeholder="Enter title"
                                    value={announcemnetObj.title}
                                    onChange={(e) => { setAnnouncementObj({ ...announcemnetObj, title: e.target.value }) }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col flex-1 gap-1">
                        <p className="text-xs font-semibold text-grey_700">Schedule</p>
                        <div className="flex items-center gap-3 ">
                            <div className="flex flex-col flex-1 gap-1 ">
                                <div className="flex items-center flex-1 justify-between gap-3 px-3 py-1 border-[1.5px] rounded-lg border-grey/30">
                                    <input
                                        id="date"
                                        type="date"
                                        className="text-sm outline-none text-custom-gray-3 w-full"
                                        placeholder="Enter date"
                                        value={announcemnetObj.date}
                                        onChange={(e) => { setAnnouncementObj({ ...announcemnetObj, date: e.target.value }) }}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col flex-1 gap-1">
                                <div className="flex flex-1 items-center justify-between gap-3 px-3 py-1 border-[1.5px] rounded-lg border-grey/30">
                                    <input
                                        type="time"
                                        className="text-sm outline-none text-custom-gray-3 w-full"
                                        placeholder="Enter time"
                                        value={announcemnetObj.time}
                                        onChange={(e) => { setAnnouncementObj({ ...announcemnetObj, time: e.target.value }) }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* Visibility Dropdown */}
                        <div className="flex flex-col flex-1 gap-1">
                            <p className="text-xs font-semibold text-grey_700">Visibility</p>
                            <div className="flex justify-between border-[1px] py-1 px-4 rounded-lg w-full items-center border-grey/50">
                                <select
                                    value={announcemnetObj.visibility}
                                    onChange={(e) =>
                                        setAnnouncementObj({ ...announcemnetObj, visibility: e.target.value })
                                    }
                                    className="outline-none rounded-sm border-black/20 w-full text-sm"
                                >
                                    <option value="student">Students</option>
                                    <option value="parent">Parents</option>
                                    <option value="teacher">Teachers</option>
                                    <option value="all">All</option>
                                </select>
                            </div>
                        </div>

                        {/* Conditional WhatsApp Checkbox */}
                        {announcemnetObj.visibility === 'parent' && (
                            <div className="flex flex-row gap-x-2 flex-1 items-center">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4"
                                    checked={sendOnWhatsapp}
                                    onChange={(e) => setSendOnWhatsapp(e.target.checked)} />
                                <div className="text-[9px]">Do you want to send announcement on WhatsApp?</div>
                            </div>
                        )}
                    </div>

                    <div>
                        <textarea className="outline-none border border-black/20 w-full rounded-md p-2"
                            name="announcement"
                            id="announcement"
                            cols="30"
                            rows="7"
                            placeholder="Announcement"
                            value={announcemnetObj.description}
                            onChange={(e) => { setAnnouncementObj({ ...announcemnetObj, description: e.target.value }) }}
                        />
                    </div>
                    <div className="flex justify-center items-center gap-3">
                        <div className="w-32">
                            <div
                                onClick={() => { mutation.mutate() }}
                                className="flex items-center justify-center w-full py-2 text-center rounded-3xl cursor-pointer bg-maroon"
                            >
                                <p className="text-sm text-white">{isEditTrue ? "Update" : "Create"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateAnnouncementModal
