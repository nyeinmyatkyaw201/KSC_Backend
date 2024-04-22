const express = require('express')
const userCtrl = require('../controller/userCtrl');
module.exports = (app)=>{
    const Router = express.Router();
    Router.route("/create").post(userCtrl.createUser);
    Router.route("/login").post(userCtrl.login);
    app.use("/api/v1/user",Router)
}