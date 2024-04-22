const catchAsync = require("../utils/catchAsync");
const db = require("../models/index");
const Newmember = db.newmember;
exports.registration = catchAsync(async (req, res, next) => {
  console.log(req.body);
  try {
    const existingmember = await Newmember.findOne({
      where: { t9: req.body.identityno },
    });

    if (existingmember) {
      return res.status(400).json({
        status: "fail",
        message: "already exist this member",
      });
    }
    const newmember = await Newmember.create({
      parentid: req.body.parentid,
      t2: req.body.name,
      t6: req.body.othername,
      t7: req.body.birthplace,
      t8: req.body.birthdate,
      t9: req.body.identityno,
      t10: req.body.Engidentityno,
      t11: req.body.fathername,
      t12: req.body.mothername,
      t13: req.body.education,
      t14: req.body.work,
      t15: req.body.currentwork,
      t16: req.body.address,
      t17: req.body.currentaddress,
      t18: req.body.phoneno,
      t28: req.body.workplace,
      t20: req.body.lastwork,
      t21: req.body.racereligion,
      n6: req.body.status,
    });
    res.status(200).json({
      status: "success",
      message: "newmember has been added successfully",
      user: newmember,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "errors occur when adding new member",
    });
  }
});

exports.update = catchAsync(async (req, res, next) => {
  try {
    
    const id = req.params.id;
    console.log(id)
    console.log(req.body);
    const identityno = req.body.nrcNostate + '/' + req.body.nrcNocity + req.body.nrcNotype + req.body.nrcNumber ;
    const existingmember = await Newmember.findOne({
      where: { t9: identityno },
    });
    
    if (existingmember && existingmember.id !=id ) {
      return res.status(400).json({
        status: "fail",
        message: "already exist this member",
      });
    }
    const Data = {
      t2: req.body.name,
      t6: req.body.othername,
      t7: req.body.birthplace,
      t8: req.body.birthdate,
      t9: identityno,
      t10: req.body.Engidentityno,
      t11: req.body.fathername,
      t12: req.body.mothername,
      t13: req.body.education,
      t14: req.body.work,
      t15: req.body.currentwork,
      t16: req.body.address,
      t17: req.body.currentaddress,
      t18: req.body.phoneno,
      t28: req.body.workplace,
      t20: req.body.lastwork,
      t21: req.body.racereligion,
      n6: req.body.status,
    }
    const data = await Newmember.update(Data, {
      where: { id: id },
    });
    res.status(200).json({
      status: "success",
      message: "newmember was updated successfully",
      data,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "error occurs when updating",
    });
  }
});
