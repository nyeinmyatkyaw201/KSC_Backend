const catchAsync = require("../utils/catchAsync");
const db = require("../models/index");
const Membertype = db.member.Member;
const Nrc = db.member.nrc;
const Race = db.member.race;
const Religion = db.member.religion;
const Relation = db.member.relation;

// function for find datafrom database
const findAllRecords = (model, req, res) => {
  const query = req.query;
  model
    .findAll(query)
    .then((data) => {
      res.status(200).json({
        status: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "fail",
        message: err.message,
      });
    });
};
exports.getNrc = catchAsync(async (req, res) => {
  id = req.params.no;
  const nrc = await Nrc.findAll({ where: { t3: id } });

  if (!nrc) {
    return res.status(404).json({
      status: "fail",
      message: "Not found",
    });
  }

  res.status(200).json({
    status: "success",
    RequestedAt: req.requestTime,
    nrc,
  });
});

// Controller function to find all records for the Nrc model
exports.findAllnrc = (req, res) => {
  findAllRecords(Nrc, req, res);
};

// Controller function to find all records for the Religion model
exports.findAllreligion = (req, res) => {
  findAllRecords(Religion, req, res);
};
exports.findAllrace= (req, res) => {
  findAllRecords(Race, req, res);
};
exports.findAllrelation= (req, res) => {
  findAllRecords(Relation, req, res);
};
exports.findAllmembertype= (req, res) => {
    findAllRecords(Membertype, req, res);
  };
