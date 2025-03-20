import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

import s3 from "../../aws.config"


export const uploadFile = async (file) => {
  const uploadPath = import.meta.env.VITE_UPLOAD_PATH;

  // Convert Blob to ArrayBuffer
  const fileBuffer = await file.arrayBuffer();

  const params = {
    Bucket: "timetech-lms-prod",
    Key: `${uploadPath}/${Date.now()}-${file.name}`,
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
