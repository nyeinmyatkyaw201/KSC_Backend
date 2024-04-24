const db = require("../models/index");
const newMember = db.newmember;
const Upload = db.TblPath;
const { sequelize } = require("../models");
const multer = require("multer");

// Multer disk storage configuration
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images"); // Destination folder for storing uploaded images
  },
  filename: (req, file, cb) => {
    const fileExtension = file.originalname.split(".").pop(); // Extract file extension
    const fileNameWithoutExtension = file.originalname.replace(/\.[^/.]+$/, ""); // Remove existing file extension from filename
    const fileName =
      fileNameWithoutExtension + "-" + Date.now() + "." + fileExtension; // Append timestamp and file extension
    cb(null, fileName);
  },
});

// Multer file filter configuration
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
  allowedMimeTypes.includes(file.mimetype)
    ? cb(null, true)
    : cb(new Error("Invalid file type"), false);
};

// Multer middleware configuration
exports.upload = multer({
  storage: diskStorage,
  fileFilter: fileFilter,
}).array("t1", 10); // Allow multiple file uploads with field name "t1"

//<<------------------------------------------------------------------------------------->>
exports.uploadAmember = async (req, res) => {
  try {
    // Extract data from the request body

    // Ensure Image is an array before proceeding
    // if (!Array.isArray(Image)) {
    //     return res.status(400).json({
    //         status: "Fail",
    //         message: "Images must be provided as an array"
    //     });
    // }

    // Create a new member
    const id = req.params.id;
    const newMember = await db.newmember.create({
      parentid: id,
      t22: req.body.Recommendation_A_Member1_Number,
      t23: req.body.Recommendation_A_Member1_Name,
      t24: req.body.Recommendation_A_Member2_Number,
      t25: req.body.Recommendation_A_Member2_Name,
    });

    // Handle image uploads
    const uploadPromises = [];
    const files = req.files;
    // Process each image upload
    for (const file of files) {
      // Extract data from the image object
      const t1 = "http://localhost:3000/api/v1/Images" + file.filename;
      const t2 = file.filename;

      // Process each image upload and save to database
      const uploadPromise = db.TblPath.create({
        ID: id,
        Recommendation_A_Member1_Number:
          newMember.Recommendation_A_Member1_Number,
        Recommendation_A_Member1_Name: newMember.Recommendation_A_Member1_Name,
        Recommendation_A_Member2_Number:
          newMember.Recommendation_A_Member2_Number,
        Recommendation_A_Member2_Name: newMember.Recommendation_A_Member2_Name,
        t1,
        t2,
      });

      uploadPromises.push(uploadPromise);
    }

    // Wait for all image uploads to complete
    await Promise.all(uploadPromises);

    // Respond with success message
    return res.status(201).json({
      status: "Success",
      message: "Member created and images uploaded successfully",
      data: newMember,
    });
  } catch (error) {
    // If an error occurs during member creation or image upload, handle it and respond with an error message
    console.error(
      "Error occurred during member creation or image upload:",
      error
    );
    return res.status(500).json({
      status: "Fail",
      message: "Error occurred during member creation or image upload",
      error: error.message, // You can choose to include the error message for debugging purposes
    });
  }
};

exports.Amember = async (req, res) => {
  const A_member = await Amemberrec.create({
    Recommendation_A_Member1_Number: req.body.Recommendation_A_Member1_Number,
    Recommendation_A_Member1_Name: req.body.Recommendation_A_Member1_Name,
    Recommendation_A_Member2_Number: req.body.Recommendation_A_Member2_Number,
    Recommendation_A_Member2_Name: req.body.Recommendation_A_Member2_Name,
  })
    .then((data) => {
      res.status(201).send({
        status: "Success",
        message: "Created Successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.status(401).send({
        status: "Fail",
        message: err.message,
      });
    });
};

// exports.CreateEmployeeAndUpload = async (req, res) => {
//     try {
//         const {
//             Recommendation_A_Member1_Number,
//             Recommendation_A_Member1_Name,
//             Recommendation_A_Member2_Number,
//             Recommendation_A_Member2_Name
//         } = req.body;

//         // Check if any of the recommendation member fields are undefined, if so, assign them empty strings
//         const recMember1Number = Recommendation_A_Member1_Number || "";
//         const recMember1Name = Recommendation_A_Member1_Name || "";
//         const recMember2Number = Recommendation_A_Member2_Number || "";
//         const recMember2Name = Recommendation_A_Member2_Name || "";

//         const transaction = await sequelize.transaction();
//         try {
//             const newEmployee = await Amemberrec.create({
//                 Recommendation_A_Member1_Number: recMember1Number,
//                 Recommendation_A_Member1_Name: recMember1Name,
//                 Recommendation_A_Member2_Number: recMember2Number,
//                 Recommendation_A_Member2_Name: recMember2Name
//             }, { transaction });

//             // Handle file upload
//             upload(req, res, async function (err) {
//                 if (err instanceof multer.MulterError) {
//                     await transaction.rollback();
//                     console.error('Multer error:', err);
//                     return res.status(400).json({ message: 'Multer error', error: err.message });
//                 } else if (err) {
//                     await transaction.rollback();
//                     console.error('Upload error:', err);
//                     return res.status(500).json({ message: 'Upload error', error: err });
//                 }

//                 if (!req.files || req.files.length === 0) {
//                     await transaction.rollback();
//                     return res.status(400).json({ message: 'No files uploaded' });
//                 }

//                 // Save uploaded files to the database
//                 const uploadRecords = [];
//                 for (const file of req.files) {
//                     const t1 = 'http://localhost:3000/api/v1/images/' + file.filename;
//                     const t2 = file.filename;
//                     const uploadRecord = await Upload.create({
//                         Recommendation_A_Member1_Number: recMember1Number,
//                         Recommendation_A_Member1_Name: recMember1Name,
//                         Recommendation_A_Member2_Number: recMember2Number,
//                         Recommendation_A_Member2_Name: recMember2Name,
//                         t1,
//                         t2
//                     }, { transaction });
//                     uploadRecords.push(uploadRecord);
//                 }
//                 await transaction.commit();
//                 return res.status(201).json({ message: 'Employee and files uploaded successfully', data: uploadRecords });
//             });

//         } catch (error) {
//             await transaction.rollback();
//             console.error(error);
//             return res.status(500).json({
//                 status: "Fail",
//                 message: "Error occurred during Employee and file upload"
//             });
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             status: "Fail",
//             message: "Internal server error"
//         });
//     }
// };
