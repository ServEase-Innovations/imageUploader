// services/cloudinary.js
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Function to upload image to Cloudinary
const uploadImage = async (fileBuffer) => {
  try {
    // Upload the file buffer to Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      {
        folder: 'users',  // Optional folder to organize images
        use_filename: true,       // Use the original file name
        unique_filename: false    // Keep the original file name
      },
      (error, result) => {
        if (error) {
          throw new Error('Error uploading image to Cloudinary: ' + error.message);
        }
        return result;
      }
    );

    // Create a readable stream from the buffer
    const stream = require('stream');
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileBuffer);

    // Pipe the buffer stream to Cloudinary's upload_stream method
    bufferStream.pipe(result);

    return result;
  } catch (error) {
    throw new Error('Error uploading image to Cloudinary: ' + error.message);
  }
};

module.exports = { uploadImage };
