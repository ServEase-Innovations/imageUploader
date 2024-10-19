require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const multer = require('multer');
const { uploadImage } = require('./services/cloudinary');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files (index.html) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up multer to store the uploaded files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to upload image
app.post('/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    // Save the file to Cloudinary
    const result = await uploadImage(req.file.buffer);
    
    // Respond with the Cloudinary upload result (image URL, public_id, etc.)
    res.status(200).json({
      message: 'Image uploaded successfully',
      imageUrl: result.secure_url, // The URL of the uploaded image
      publicId: result.public_id
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error uploading image');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
