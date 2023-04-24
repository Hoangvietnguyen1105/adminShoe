const express = require('express');
const homeController = require('../controller/homeController.js')
const user = require('./user.js');
const shoe = require('./shoes.js')
let router = express.Router();
//thiết kế routes cho project
let initWebRoutes = (app)=>{
    router.get('/trangchu',homeController.trangchu)

    router.use('/user',user)
    router.use('/shoe',shoe)

    return app.use("/",router);

}

module.exports = initWebRoutes;
