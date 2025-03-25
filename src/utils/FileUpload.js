import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

import s3 from "../../aws.config"


export const uploadFile = async (file) => {
  const CLIENT = import.meta.env.VITE_CLIENT;
  const fileBuffer = await file.arrayBuffer();

  let folderName;
  if (CLIENT === "test") {
    folderName = "test";
  } else if (CLIENT === "tcsravi") {
    folderName = "tcs-ravi";
  } else if (CLIENT === "tcsshalimar") {
    folderName = "tcs-shalimar";
  } else {
    folderName = "test";
  }


  const params = {
    Bucket: "timetech-lms-prod",
    Key: `${folderName}/${Date.now()}-${file.name}`,
    Body: fileBuffer, // Pass as ArrayBuffer instead of Blob
    ContentType: file.type, // Ensure correct MIME type
  };

  try {
    const command = new PutObjectCommand(params);
    await s3.send(command);
    return `https://timetech-lms-prod.s3.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/${params.Key}`;
  } catch (error) {
    console.error("Error uploading image: ", error);
    throw new Error("Error uploading image");
  }
};
