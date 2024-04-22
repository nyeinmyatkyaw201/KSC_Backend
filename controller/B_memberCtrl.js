const db = require("../models/index");
const catchAsync = require("../utils/catchAsync");
const Bmember = db.newmember;

exports.Bmember_Create = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  console.log(req.body);
  console.log(req.body.Name);
  console.log(req.body.Card);
  await Bmember.create({
    t2: req.body.Name,
    n5: req.body.relation,
    t8: req.body.Date_of_Birth,
    t14: req.body.Work,
    t19: req.body.Card,
  })
    .then((data) => {
      res.status(200).json({
        status: "Success",
        message: "Bmember created Successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        status: "Fail",
        message: err || "Error occoured while creating B Member",
      });
    });
};

exports.createBmemberbulk = catchAsync(async (req, res, next) => {
  try {
    const data = req.body;
    const bulkdata = data.map((data) => ({
      parentid: data.parentid,
      t2: data.Name,
      t27: data.relation,
      t8: data.Date_of_Birth,
      t14: data.Work,
      t19: data.Card,
    }));
    console.log(bulkdata);
    const member = await Bmember.bulkCreate(bulkdata);
    res.status(200).json({
      status: "success",
      message: "create successfully",
      member,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: "something was wrong",
    });
  }
});
exports.BmembergetAndDelete = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  try {
    const existmember = await Bmember.findAll({ where: { parentid: id } });
    if (existmember && existmember.length > 0) {
      const num = await Bmember.destroy({
        where: { parentid: id },
      });
      console.log(num);
      if (num > 0) {
        res.send({
          message: "Bmember was deleted successfully!",
        });
      } else {
        res.status(404).send({
          message: `Cannot delete stock with id=${id}. Maybe stock was not found!`,
        });
      }
    }
  } catch (err) {
    next(err);
  }
});



// exports.getBmember = (req, res) => {
//   const title = req.query.id;
//   var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

//   Bmember.findAll({ where: condition })
//     .then((data) => {
//       res.status(200).send({
//         status: "Success",
//         message: "Retrieved all users.",
//         data: data,
//       });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "Some error occurred while retrieving users.",
//       });
//     });
// };
exports.getBmember= catchAsync(async(req,res,next)=>{
  const id = req.params.id;
  try{
    const data = await Bmember.findAll({ where: { parentid: id } });
    res.status(200).json({
      status: 'success',
      message: "get b member successfully",
      data
    })
  }catch(err){
    res.status(500).json({
      status: "fail",
      message: "something went wrong"
    })
  }
})