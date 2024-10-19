const multer = require('multer');
const { uploadImage } = require('../services/cloudinary'); // Import the cloudinary service

// Set up multer to handle file uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('image'); // Handle single image upload

exports.handler = async (event, context) => {
  // Return a promise that resolves when the file is uploaded successfully
  return new Promise((resolve, reject) => {
    // Use multer to parse the incoming file upload
    upload(event, context, async (err) => {
      if (err) {
        console.error('Error during file upload:', err);
        reject({
          statusCode: 400,
          body: JSON.stringify({ error: 'No file uploaded or error in file processing' }),
        });
      }

      // Retrieve the file from the request
      const { file } = event;

      if (!file) {
        console.error('No file provided');
        reject({
          statusCode: 400,
          body: JSON.stringify({ error: 'No file uploaded' }),
        });
      }

      try {
        // Use the cloudinary service to upload the file to Cloudinary
        const result = await uploadImage(file.buffer);

        // Respond with the Cloudinary result (image URL and public_id)
        resolve({
          statusCode: 200,
          body: JSON.stringify({
            message: 'Image uploaded successfully',
            imageUrl: result.secure_url, // The URL of the uploaded image
            publicId: result.public_id, // Cloudinary public_id
          }),
        });
      } catch (uploadError) {
        console.error('Error uploading to Cloudinary:', uploadError);
        reject({
          statusCode: 500,
          body: JSON.stringify({ error: 'Error uploading image to Cloudinary', message: uploadError.message }),
        });
      }
    });
  });
};
