const cloudinary = require('cloudinary').v2;
const stream = require('stream');
const util = require('util');

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Promisify the upload_stream method to handle it with async/await
const uploadStreamAsync = util.promisify(cloudinary.uploader.upload_stream);

// Function to upload image to Cloudinary
const uploadImage = async (fileBuffer) => {
  try {
    // Create a readable stream from the file buffer
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileBuffer);

    // Upload the image buffer to Cloudinary using the upload stream
    const result = await uploadStreamAsync(
      {
        folder: 'users',          // Optional folder to organize images
        use_filename: true,       // Use the original file name
        unique_filename: false    // Keep the original file name
      },
      bufferStream
    );

    return result;  // Return the result containing the image URL and public_id
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw new Error('Error uploading image to Cloudinary: ' + error.message);
  }
};

module.exports = { uploadImage };
