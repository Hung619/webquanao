const express = require('express');
const router = express.Router();
const gioHangController = require('../controllers/gioHangController');
router.get('/',gioHangController.getAllGioHang);
// router.put('/:id',gioHangController.updateGioHang);
router.delete('/:id',gioHangController.deleteGioHang);
router.delete('/',gioHangController.deleteAllGioHang);


module.exports = router;