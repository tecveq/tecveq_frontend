import React, { useState } from "react";
import Loader from "../../utils/Loader";
import profile from "../../assets/profile.png";

import { toast } from "react-toastify";
import { BsCake } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { FiPhone } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { GoPerson } from "react-icons/go";
import { IoMailOutline } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import { useUser } from "../../context/UserContext";
import { useMutation } from "@tanstack/react-query";
import { RiGraduationCapLine } from "react-icons/ri";
import { updateUser } from "../../api/Admin/UsersApi";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const CusotmInput = ({ label, value, status, icon, name, valuesObj, setValuesObj }) => {
  return (
    <div className="my-1 text-sm">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-white rounded-md border-1 border border-[#00000030]">
          {icon == "person" ?
            <GoPerson />
            : icon == "mail" ? <IoMailOutline /> : icon == "phone" ? <FiPhone /> : icon == "cap" ? <RiGraduationCapLine /> : icon == "calendar" ? <IoCalendarOutline /> : <BsCake />}
        </div>
        <div
          className={`flex px-2 py-1 border justify-between rounded-md items-center border-grey/70 ${status ? "text-black" : "text-grey"
            }`}
        >
          <input
            type="text"
            value={value}
            readOnly={!status}
            placeholder={value}
            className="flex flex-1 w-full py-1 outline-none"
            onChange={(e) => { setValuesObj({ ...valuesObj, [name]: e.target.value }) }}
          />
        </div>
      </div>
    </div>
  );
};


const ProfileDetails = ({ onclose }) => {

  const { userData, setUserData } = useUser();
  const [allowedEdit, setAllowedEdit] = useState(false);
  const [selectedFile, setSelectedFile] = useState(userData.profilePic || "");

  const [userDataObj, setUserDataOjb] = useState({
    userType: "admin",
    name: userData.name,
    email: userData.email,
    phoneNumber: userData.phoneNumber,
    bio: userData.bio
  })


  const uploadFile = async (file) => {

    const storage = getStorage();
    const storageRef = ref(storage, file?.name);

    const resp = await uploadBytes(storageRef, file);
    let url = await getDownloadURL(resp.ref)

    console.log("response is : ", url);
    return url;
  }

  const handleEditClick = () => {
    setAllowedEdit(true);
  };

  const handleSaveDetails = async () => {
    updateuserMutation.mutate(userDataObj);
  };

  const updateuserMutation = useMutation({
    mutationFn: async (data) => {
      let fileurl = await uploadFile(selectedFile);
      console.log("uploaded file url is : ", fileurl);
      data = { ...data, profilePic: fileurl };
      const results = await updateUser(data, userData._id);
      return results;
    },

    onError: (error, variables, context) => {
      console.log("data after error on mutation method ", error, variables, context);
      toast.error("Profile cannot be updated successfully!")
    },

    onSettled: (data, error, variables, context) => {
      console.log("data setteled after on mutation method ", data, error, variables, "context : ", context);
      setUserData({ ...data });
      onclose();
      toast.success("Profile Update successfully!")
    }

  })


  return (
    <div className="absolute top-0 right-0 z-10 flex bg-white h-full rounded-md shadow-lg w-96">
      <div className="flex flex-col">
        <div className="flex justify-between px-5 py-5 border-b border-b-black/10">
          <p className="text-xl font-medium">My Profile</p>
          <IoClose onClick={onclose} className="cursor-pointer" />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col justify-center px-8 ">
            <div className="flex justify-end">
              <div className="p-2 border-grey/10">
                <FiEdit onClick={handleEditClick} className="cursor-pointer" />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <label htmlFor="profile" className="cursor-pointer">
                <img src={userData.profilePic} alt="" className="w-28 h-28 rounded-full" />
              </label>
              <input id="profile" type="file" onChange={(e) => setSelectedFile(e.target.files[0])} className="hidden" />
              <p>{userData.name}</p>
              {/* <p>Bio</p> */}
              <p className="text-xs">
                {userData.bio ? userData.bio : 
                `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime, sint?`
                }
              </p>
            </div>
            <div className="flex flex-col gap-1 px-2 py-1 overflow-auto h-96 custom-scrollbar">
              <CusotmInput
                label={"Name"}
                value={userDataObj.name}
                name={"name"}
                status={allowedEdit}
                valuesObj={userDataObj}
                setValuesObj={setUserDataOjb}
                icon={"person"}
              />
              <CusotmInput
                label={"Email"}
                name="email"
                value={userDataObj.email}
                status={allowedEdit}
                valuesObj={userDataObj}
                setValuesObj={setUserDataOjb}
                icon={"mail"}
              />
              <CusotmInput
                label={"Phone No."}
                name="phoneNumber"
                value={userDataObj.phoneNumber}
                status={allowedEdit}
                valuesObj={userDataObj}
                setValuesObj={setUserDataOjb}
                icon={"phone"}
              />
              {updateuserMutation.isPending && <div> <Loader /> </div>}
              {!updateuserMutation.isPending && allowedEdit && <div className="flex justify-center my-4">
                <p
                  onClick={handleSaveDetails}
                  className="flex items-center justify-center w-1/2 px-1 py-2 text-center text-white cursor-pointer rounded-3xl bg-maroon"
                > Save </p>
              </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
