import "../../init"
import AWS from '../../aws.config';


// Create an S3 instance
const s3 = new AWS.S3();

// Function to upload an image and generate a URL
export const uploadFile = async (file) => {

  const params = {
    Bucket: 'timetech-lms-prod',
    Key: `test/${Date.now()}-${file.name}`, // Add timestamp to avoid name conflicts
    Body: file,
  }

  try {
    // Upload the file to S3
    const data = await s3.upload(params).promise();

    // Return the URL of the uploaded file
    return data.Location;
  } catch (error) {
    console.error('Error uploading image: ', error);
    throw new Error('Error uploading image');
  }
};



