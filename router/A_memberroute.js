const express = require("express");
const AmemberCtrl = require("../controller/A_memberrecCtrl");
const router = express.Router();

module.exports = (app) => {

    router.post("/",AmemberCtrl.Amember);

    router.post("/recmember_of_upload/:id",AmemberCtrl.upload,AmemberCtrl.uploadAmember);

    app.use("/api/v1/A_member",router);

}