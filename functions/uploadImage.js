const { uploadImage } = require('../services/cloudinary');

exports.handler = async (event, context) => {
  try {
    // Decode file if body is base64 (commonly used in API Gateway)
    let fileBuffer;
    
    if (event.isBase64Encoded) {
      fileBuffer = Buffer.from(event.body, 'base64');
    } else {
      fileBuffer = event.body; // If already a buffer, this should work
    }

    // Validate if fileBuffer is correctly passed
    if (!fileBuffer) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No file uploaded' }),
      };
    }

    // Call the uploadImage function to upload the image to Cloudinary
    const result = await uploadImage(fileBuffer); // Assume uploadImage returns a promise

    // Respond with the URL of the uploaded image
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Image uploaded successfully',
        imageUrl: result.secure_url,  // URL of the uploaded image
        publicId: result.public_id,  // Cloudinary public_id
      }),
    };
  } catch (error) {
    console.error('Error uploading image:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error uploading image to Cloudinary', message: error.message }),
    };
  }
};
