import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { FaTrashCan } from "react-icons/fa6";

export const uploadFile = async (file, path) => {
  const storage = getStorage();
  const storageRef = ref(storage, `${path}/${file?.name}`);

  const resp = await uploadBytes(storageRef, file);
  let url = await getDownloadURL(resp.ref)
  console.log("response is : ", url);
  return url;
}
// export const default_profile = "https://firebasestorage.googleapis.com/v0/b/tca-backend-454ca.appspot.com/o/file-path?alt=media&token=88e392aa-8182-4f24-bbc1-e9f3e58082f0"
export const deleteUploadedFile = async (url) => {
  try {

    const storage = getStorage();
    let filename = url.split("/o/")[1].split("?")[0]
    const storageRef = ref(storage, `${filename}`);

    const resp = await deleteObject(storageRef);
    console.log("file deleted successfully");

    return true;

  } catch (error) {
    console.log("error in deleting file is : ", error);
    return false;
  }
}
