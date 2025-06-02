const express = require('express');
const router = express.Router();
const chiTietSanPhamController = require('../controllers/chiTietSanPhamController');

router.get('/',chiTietSanPhamController.getAllChiTietSanPhamController);
router.get('/:id',chiTietSanPhamController.getChiTietSanPhamByIdController);
router.post('/',chiTietSanPhamController.createChiTietSanPhamController);
router.put('/:id',chiTietSanPhamController.updateChiTietSanPhamController);
router.delete('/:id',chiTietSanPhamController.deleteChiTietSanPhamController);
module.exports = router;