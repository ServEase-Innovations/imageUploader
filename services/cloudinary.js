const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (fileBuffer) => {
  try {
    // Cloudinary upload using a promise-based approach
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
            console.log(result)
          if (error) {
            reject(error);
          } else {
            resolve(result); // This will be the Cloudinary result
          }
        }
      );

      // Convert buffer to a stream and pipe it into Cloudinary
      const bufferStream = require('stream').Readable.from(fileBuffer);
      bufferStream.pipe(uploadStream);
    });

    return result; // Return the Cloudinary result (contains secure_url and public_id)
  } catch (error) {
    console.error('Error during Cloudinary upload:', error);
    throw new Error('Cloudinary upload failed');
  }
};

module.exports = { uploadImage };
