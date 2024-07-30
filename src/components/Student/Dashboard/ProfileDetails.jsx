import React, { useState } from "react";
import Loader from "../../../utils/Loader";

import { toast } from "react-toastify";
import { FiEdit } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { CusotmInput } from "./CustomInput";
import { useUser } from "../../../context/UserContext";
import { updateStudent } from "../../../api/Student/StudentApis";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import IMAGES from "../../../assets/images";


const ProfileDetails = ({ onclose }) => {

  const { userData, setUserData } = useUser();
  console.log("user data is : ", userData);

  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(userData?.name);
  const [email, setEmail] = useState(userData?.email);
  const [rollNo, setRollNo] = useState("SP21-BCS-072");
  const [allowedEdit, setAllowedEdit] = useState(false);
  const [className, setClassName] = useState("IG BASICS");
  const [phone, setPhone] = useState(userData?.phoneNumber);
  const [parentName, setParentName] = useState(userData?.guardianName);
  const [selectedFile, setSelectedFile] = useState(userData?.profilePic || IMAGES.Profile );
  const [parentEmail, setParentEmail] = useState(userData?.guardianEmail);
  const [parentPhone, setParentPhone] = useState(userData?.guardianPhoneNumber);

  const handleEditClick = () => {
    setAllowedEdit(true);
  };

  const uploadFile = async (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, file?.name);

    // const metadata = {
    //   contentType: 'image/jpeg',
    // };

    console.log("begin deploye")

    const resp = await uploadBytes(storageRef, file);
    console.log("resp : ", resp);
    let url = await getDownloadURL(resp.ref)
    console.log("response is : ", url);
    return url;
  }

  const handleSaveDetails = async () => {
    setLoading(true);

    let profilePicUrl = selectedFile;
    if (selectedFile?.name !== undefined) {
      profilePicUrl = await uploadFile(selectedFile);
    }

    const data = {
      name, email, bio, phoneNumber: phone, guardianName: parentName, guardianEmail: parentEmail,
      guardianPhoneNumber: parentPhone, className, studentID: rollNo, profilePic: profilePicUrl
    }

    console.log("data being sent is : ", data);

    const response = await updateStudent(data);

    if (response == "error") {
      console.log("error here");
    } else {
      console.log("updated student response is : ", response);
      toast.success("Profile Updated successfully!");
      await setUserData(response);
      onclose();
    }

    setLoading(false);
  }

  return (
    <div className="absolute top-0 right-0 z-10 flex bg-white rounded-md shadow-lg w-96">
      <div className="flex flex-col">
        <div className="flex justify-between px-5 py-5 border-b border-b-black/10">
          <p className="text-xl font-medium">My Profile</p>
          <IoClose onClick={onclose} className="cursor-pointer" />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col justify-center px-10 ">
            <div className="flex justify-end">
              <div className="p-2 border-grey/10">
                <FiEdit onClick={handleEditClick} className="cursor-pointer" />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <label htmlFor="profile" className="cursor-pointer">
                <img src={selectedFile} alt="" className="w-28 h-28 rounded-full" />
              </label>
              <input id="profile" type="file" onChange={(e) => setSelectedFile(e.target.files[0])} className="hidden" />
              <p>{userData?.name}</p>
              <p>Bio</p>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Maxime, sint?
              </p>
            </div>
            <div className="flex flex-col gap-1 px-5 py-1 overflow-auto h-96 custom-scrollbar">
              {allowedEdit &&
                <CusotmInput
                  value={bio}
                  icon={"person"}
                  label={"Bio"}
                  status={allowedEdit}
                  inputChange={setBio}
                />
              }
              <CusotmInput
                value={rollNo}
                icon={"person"}
                label={"Roll No."}
                status={allowedEdit}
              // inputChange={setRollNo}
              />
              <CusotmInput
                value={name}
                label={"Name"}
                icon={"person"}
                status={allowedEdit}
                inputChange={setName}
              />
              <CusotmInput
                value={email}
                icon={"mail"}
                label={"Email"}
                status={allowedEdit}
              // inputChange={setEmail}
              />
              <CusotmInput
                value={phone}
                icon={"phone"}
                label={"Phone No."}
                status={allowedEdit}
                inputChange={setPhone}
              />
              <CusotmInput
                icon={"cap"}
                label={"Class"}
                value={className}
                status={allowedEdit}
                inputChange={setClassName}
              />
              <CusotmInput
                icon={"person"}
                value={parentName}
                status={allowedEdit}
                label={"Parent Name"}
                inputChange={setParentName}
              />
              <CusotmInput
                icon={"mail"}
                value={parentEmail}
                status={allowedEdit}
                label={"Parent Email"}
                inputChange={setParentEmail}
              />
              <CusotmInput
                icon={"phone"}
                value={parentPhone}
                status={allowedEdit}
                label={"Parent Phone No."}
                inputChange={setParentPhone}
              />
              {loading  && <div className="py-4"> <Loader /> </div>}
              {!loading && allowedEdit && <div className="flex justify-center my-4">
                <p onClick={handleSaveDetails} className="flex items-center justify-center w-1/2 px-1 py-2 text-center text-white cursor-pointer rounded-3xl bg-maroon">Save</p>
              </div> }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
