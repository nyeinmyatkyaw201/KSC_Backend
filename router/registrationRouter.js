const express = require('express');
const registrationCtrl = require('../controller/registrationCtrl');
const b_memberCtrl = require('../controller/B_memberCtrl')
module.exports = (app)=>{
    const Router = express.Router();
    Router.route('/registrationmember/Bmembercreate/:id').post(b_memberCtrl.createBmemberbulk);
    Router.route('/registrationmember').post( registrationCtrl.registration);
    Router.route('/registrationmember/:id').patch(registrationCtrl.update);
    Router.route('/registrationmember/BmemberGet/:id').delete(b_memberCtrl.BmembergetAndDelete);

    
    app.use('/api/v1/user',Router)
}