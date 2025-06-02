const express = require('express');
const router = express.Router();
const nguoiDungController = require('../controllers/nguoiDungController');

router.get('/', nguoiDungController.getAllUser);
router.post('/', nguoiDungController.createUserController);
router.put('/:id', nguoiDungController.updateUserController);
router.delete('/:id', nguoiDungController.deleteUserController);
router.post('/login', nguoiDungController.loginUserController);
module.exports = router;