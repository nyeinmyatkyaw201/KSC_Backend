// Import required modules
// Import required modules
const db = require("../models/index.js");
const Upload = db.TblPath;
const multer = require("multer");

// Multer disk storage configuration
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'images'); // Destination folder for storing uploaded images
  },
  filename: (req, file, cb) => {
      const fileExtension = file.originalname.split('.').pop(); // Extract file extension
      const fileNameWithoutExtension = file.originalname.replace(/\.[^/.]+$/, ''); // Remove existing file extension from filename
      const fileName = fileNameWithoutExtension + '-' + Date.now() + '.' + fileExtension; // Append timestamp and file extension
      cb(null, fileName);
  }
});

// Multer file filter configuration
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(new Error('Invalid file type'), false);
}

// Multer middleware configuration
const upload = multer({ 
    storage: diskStorage, 
    fileFilter: fileFilter 
}).array('t1', 10); // Allow multiple file uploads with field name "t1"

// File upload endpoint
// File upload endpoint
exports.upload = async (req, res) => {
  try {
      upload(req, res, async function (err) {
          if (err instanceof multer.MulterError) {
              console.error('Multer error:', err);
              return res.status(400).json({ message: 'Multer error', error: err.message });
          } else if (err) {
              console.error('Upload error:', err);
              return res.status(500).json({ message: 'Upload error', error: err });
          }

          console.log('Request body:', req.body); // Log request body
          console.log('Uploaded files:', req.files); // Log uploaded files

          if (!req.files || req.files.length === 0) {
              return res.status(400).json({ message: 'No files uploaded' });
          }

          const { Recommendation_A_Member1_Number, Recommendation_A_Member1_Name, Recommendation_A_Member2_Number, Recommendation_A_Member2_Name } = req.body;

          const uploadRecords = [];

          // Iterate over uploaded files
          for (const file of req.files) {
              const t1 = 'http://localhost:3000/api/v1/images/' + file.filename;
              const t2 = file.filename;

              // Create a new upload record in the database
              const uploadRecord = await Upload.create({
                  Recommendation_A_Member1_Number,
                  Recommendation_A_Member1_Name,
                  Recommendation_A_Member2_Number,
                  Recommendation_A_Member2_Name,
                  t1,
                  t2
              });
              uploadRecords.push(uploadRecord);
          }

          res.status(200).json({ message: 'Files uploaded successfully', data: uploadRecords });
      });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};






// Retrieve all uploaded files
exports.getAllFiles = async (req, res) => {
  try {
    const uploads = await Upload.findAll(); // Fetch all uploaded records from the database

    // Map uploads to extract filePaths and fileNames
    const fileData = uploads.map(upload => ({
      id: upload.id,
      t1: upload.t1,
      t2: upload.t2
    }));

    // Send the file data as a response
    res.status(200).json({ message: 'Uploaded files retrieved successfully', data: fileData });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a specific photo by its ID
exports.deletePhoto = async (req, res) => {
  try {
    const photoId = req.params.id;

    // Delete the photo record from the database
    await Upload.destroy({ where: { id: photoId } });

    res.status(200).json({ message: 'Photo deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
