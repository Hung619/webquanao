const express = require('express');
const router = express.Router();
const dondathangController = require('../controllers/donDatHangController');
router.get('/:id', dondathangController.getAllDatHang);
router.post('/',dondathangController.createDatHang);
router.put('/:id',dondathangController.updateDatHang);// Bỏ

module.exports = router;