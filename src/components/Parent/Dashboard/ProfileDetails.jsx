import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import profile from "../../../assets/profile.png";
import { GoPerson } from "react-icons/go";

const ProfileDetails = ({ onclose }) => {
  const [allowedEdit, setAllowedEdit] = useState(false);

  const handleEditClick = () => {
    setAllowedEdit(true);
  };

  const handleSaveDetails = () =>{
  }
  
  const CusotmInput = ({ label, value, status, icon }) => {
    return (
      <div className="text-sm">
        <div className="flex flex-col ">
          <p className="">Name</p>
          <div
            className={`flex px-2 py-1 border justify-between rounded-md items-center border-grey/70 ${
              status ? "text-black" : "text-grey"
            }`}
          >
            <input
              type="text"
              className="py-1 outline-none"
              placeholder={value}
              value={value}
            />
            <GoPerson />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="absolute top-0 right-0 z-10 flex bg-white rounded-md shadow-lg w-96">
      <div className="flex flex-col">
        <div className="flex justify-between px-5 py-5 border-b border-b-black/10">
          <p className="text-xl font-medium">My Profile</p>
          <IoClose onClick={onclose} className="cursor-pointer" />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col justify-center px-10 ">
            <div className="flex justify-end mt-3">
              <div className="p-2 border-grey/10">
                <FiEdit onClick={handleEditClick} className="cursor-pointer" />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <img src={profile} alt="" className="w-28 h-28" />
              <p>M. Haseeb</p>
              <p>Bio</p>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Maxime, sint?
              </p>
            </div>
            <div className="flex flex-col gap-1 px-5 py-1 overflow-auto h-96 custom-scrollbar">
              <CusotmInput
                label={"Roll No."}
                value={"SP21-BCS-072"}
                status={allowedEdit}
                icon={"person"}
              />
              <CusotmInput
                label={"Name"}
                value={"Muneeb"}
                status={allowedEdit}
                icon={"person"}
              />
              <CusotmInput
                label={"Email"}
                value={"muneebjutt026@gmail.com"}
                status={allowedEdit}
                icon={"mail"}
              />
              <CusotmInput
                label={"Phone No."}
                value={"+92 313 7034670"}
                status={allowedEdit}
                icon={"phone"}
              />
              <CusotmInput
                label={"Class"}
                value={"IG Basics"}
                status={allowedEdit}
                icon={"cap"}
              />
              <CusotmInput
                label={"Parent Name"}
                value={"Farooq Ahmed"}
                status={allowedEdit}
                icon={"person"}
              />
              <CusotmInput
                label={"Parent Email"}
                value={"farooq@gmail.com"}
                status={allowedEdit}
                icon={"mail"}
              />
              <CusotmInput
                label={"Parent Phone No."}
                value={"+92 313 7034670"}
                status={allowedEdit}
                icon={"phone"}
              />
              {allowedEdit? <div className="flex justify-center my-4">
                <p onClick={handleSaveDetails} className="flex items-center justify-center w-1/2 px-1 py-2 text-center text-white cursor-pointer rounded-3xl bg-maroon">Save</p>
              </div> :""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
