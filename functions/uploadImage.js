// functions/uploadImage.js
const multer = require('multer');
const dotenv = require('dotenv');
const { uploadImage } = require('../services/cloudinary');  // Import the service to handle image upload

// Load environment variables
dotenv.config();

// Set up multer to handle file uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('image');  // Handle single image upload

// Serverless function handler
exports.handler = async (event, context) => {
  return new Promise((resolve, reject) => {
    // Handle the image upload
    upload(event, context, async (err) => {
      if (err) {
        reject({
          statusCode: 400,
          body: JSON.stringify({ error: 'No file uploaded or error in file processing' }),
        });
      }

      const { file } = event;

      try {
        // Use the uploadImage service to upload to Cloudinary
        const result = await uploadImage(file.buffer);

        // Respond with the Cloudinary result (image URL and public_id)
        resolve({
          statusCode: 200,
          body: JSON.stringify({
            message: 'Image uploaded successfully',
            imageUrl: result.secure_url,  // The URL of the uploaded image
            publicId: result.public_id,   // Cloudinary public_id
          }),
        });
      } catch (uploadError) {
        reject({
          statusCode: 500,
          body: JSON.stringify({ error: 'Error uploading image to Cloudinary', message: uploadError.message }),
        });
      }
    });
  });
};
