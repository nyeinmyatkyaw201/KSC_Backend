const db = require("../models/index");
const bcrypt = require("bcrypt");
const catchAsync = require("../utils/catchAsync");
const User = db.user;

exports.createUser = catchAsync(async (req, res, next) => {
  try {
    if (req.body.password !== req.body.passwordComfirm) {
      console.log(">>>>>>>>>");
      return res.status(400).json({
        status: "fail",
        message: "Password and Password Confirm do not match",
      });
    }
    const hashedPassword = await bcrypt.hash(req.body.EncryptPassword, 10);
    // Hash password confirm separately
    console.log(hashedPassword);

    const newUser = await User.create({
      userid: req.body.userid,
      username: req.body.username,
      EncryptPassword: hashedPassword,
      PasswordComfirm: hashedPassword,
    });
    res.status(200).json({
      status: "success",
      message: "user has been added successfully",
      user: newUser,
    });
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      const errors = err.errors.map((error) => error.message);
      return res.status(400).json({
        status: "fail",
        message: "Validation Error",
        errors: errors,
      });
    }

    // Handle other types of errors
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});
exports.login = catchAsync(async (req, res, next) => {
  if(!req.body.userid){
    return res.status(400).json({
      status: "fail",
      message: "Please Enter User Id",
    });
  }else if(!req.body.password){
    return res.status(400).json({
      status: "fail",
      message: "Please Enter Password",
    });
  }
  const user = await User.findOne({ where: { userid: req.body.userid } });


  if (!user) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid User Id",
    });
  }

  try {
    const comparedPassword = await bcrypt.compare(
      req.body.password,
      user.EncryptPassword
    );

    if (comparedPassword) {
      res.status(200).json({
        status: "success",
        user: user,
      });
    } else {
      res.status(401).json({
        status: "fail",
        message: "Invalid password",
      });
    }
  } catch (error) {
    console.error("Error comparing passwords:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});
