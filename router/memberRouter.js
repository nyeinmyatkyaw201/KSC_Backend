const express = require('express');
const memberCtrl = require('../controller/memberCtrl');

module.exports = (app)=>{
    const Router = express.Router();
    Router.route('/nrc').get(memberCtrl.findAllnrc);
    Router.route('/relation').get(memberCtrl.findAllrelation);
    Router.route('/membertype').get(memberCtrl.findAllmembertype);
    Router.route('/race').get(memberCtrl.findAllrace);
    Router.route('/nrc/:no').get(memberCtrl.getNrc);
    Router.route('/religion').get(memberCtrl.findAllreligion);
    app.use('/api/v1/user',Router)
}