const express = require("express");
const AmemberCtrl = require("../controller/A_memberrecCtrl");
const router = express.Router();

module.exports = (app) => {

    router.post("/",AmemberCtrl.Amember);
    router.get("/:id",AmemberCtrl.getName)

    router.post("/recmember_of_upload/:id",AmemberCtrl.upload,AmemberCtrl.uploadAmember);
    router.route("/update/:id").patch(AmemberCtrl.update)

    app.use("/api/v1/A_member",router);

}