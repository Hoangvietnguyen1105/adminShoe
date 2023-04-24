const express = require('express');
const router = express.Router();
const shoesController = require('../controller/shoesController.js')

router.post('/addShoes', shoesController.addShoesController);
router.get('/getAllShoese', shoesController.getAllshoes);
module.exports = router;
