const express = require('express');
const router = express.Router();
const chiTietDonHangController = require('../controllers/ChiTietDonHangController');
router.get('/',chiTietDonHangController.getAllChiTietDonHang);
router.post('/',chiTietDonHangController.createChiTietDonHang);

module.exports = router;