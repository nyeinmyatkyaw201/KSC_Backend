const db = require("../models/index");
const newMember = db.newmember;
const Upload = db.TblPath;
const { sequelize } = require("../models");
const multer = require("multer");
const catchAsync = require("../utils/catchAsync");
const transliteration = require("transliteration");
const path = require("path");
const fs = require("fs");

// Multer disk storage configuration
let pathName = "";
let pathDate = "";

exports.getName = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  console.log(id, ">>>>>>");
  try {
    const registrationName = await newMember.findOne({ where: { id: id } });

    pathName = `${registrationName.t2}`;
    pathDate = `${registrationName.t8}`;
    
    const folderPath = path.join(
      "D:",
      "Learning",
      "NodeJS",
      "KSC_project",
      "images",
      `${pathName}`,
      `${pathDate}`
    );
    console.log(folderPath, "Folder Path>>>>>>>>>>>>>>");
    if (!fs.existsSync(folderPath)) {
      // If it doesn't exist, create it
      fs.mkdirSync(folderPath);
      console.log("Folder created successfully.");
    } else {
      console.log("Folder already exists.");
    }
    res.status(200).json({
      status: "success",
      registrationName,
    });
  } catch (err) {
    res.status(200).json({
      status: "fail",
      message: err,
    });
  }
});

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(pathName, "??????????");
    cb(null, `images/${pathName}/${pathDate}`); // Destination folder for storing uploaded images
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
let myUpdateId = 0;
let upDatedParentid = 0;
let registrationName = "";
exports.uploadAmember = async (req, res) => {
  try {
    const id = req.params.id;

    if (myUpdateId != 0 && upDatedParentid == id) {
      const existmember = await db.newmember.findAll({
        where: { id: myUpdateId },
      });
      console.log(existmember);
      if (existmember && existmember.length > 0) {
        const num = await db.newmember.destroy({
          where: { id: myUpdateId },
        });
        console.log(num);
        if (num > 0) {
          myUpdateId = 0;
          res.send({
            message: "  deleted successfully!",
          });
        } else {
          res.status(404).send({
            message: `Cannot delete stock with id=${id}. Maybe  not found!`,
          });
        }
      }
      myUpdateId = 0;
    }

    const newMember = await db.newmember.create({
      parentid: id,
      t22: req.body.Recommendation_A_Member1_Number,
      t23: req.body.Recommendation_A_Member1_Name,
      t24: req.body.Recommendation_A_Member2_Number,
      t25: req.body.Recommendation_A_Member2_Name,
    });
    myUpdateId = newMember.id;
    upDatedParentid = newMember.parentid;
    registrationName = newMember.t23;

    // Handle image uploads
    const uploadPromises = [];
    const files = req.files;
    // Process each image upload
    for (const file of files) {
      // Extract data from the image object
      const t1 =
        `http://localhost:3000/api/v1/Images/${pathName}/${pathDate}` +
        file.filename;
      console.log(t1);
      const t2 = file.filename;

      // Process each image upload and save to database
      const uploadPromise = db.TblPath.create({
        parentid: newMember.parentid,
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
exports.update = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  try {
    const num = await db.newmember.update(
      {
        t22: req.body.Recommendation_A_Member1_Number,
        t23: req.body.Recommendation_A_Member1_Name,
        t24: req.body.Recommendation_A_Member2_Number,
        t25: req.body.Recommendation_A_Member2_Name,
      },
      {
        where: { id: id },
      }
    );

    if (num == 1) {
      res.status(200).json({
        message: "member was updated successfully!",
      });
    } else {
      return res.status(404).json({
        error: `Cannot update member with id-${id}. Maybe Stock was not found!`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});


