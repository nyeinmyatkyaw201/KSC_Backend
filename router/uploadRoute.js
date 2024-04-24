const express = require("express");
const UploadCtrl = require("../controller/upload");
const router = express.Router();

module.exports = (app) => {

    router.post("/",UploadCtrl.upload);

    router.get("/getallfile/:id",UploadCtrl.getAllFiles);

    router.delete("/deletephoto/:id",UploadCtrl.deletePhoto);

    app.use("/api/v1/member/upload",router);
}