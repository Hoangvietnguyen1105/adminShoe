const express = require('express');
const router = express.Router();
const usersController = require('../controller/userController.js')

router.post('/addUser', usersController.addUserController);
router.get('/getAllUser', usersController.getAllUser);
router.get('/formAddUser',usersController.formAddUser);
router.get('/deleteUser',usersController.deleteUser);
router.get('/findByPhoneNumber',usersController.findByPhoneNumber);
router.get('/updateUser',usersController.updateUser)
module.exports = router;
