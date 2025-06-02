const express = require('express');
const router = express.Router();
const sanPhamController = require('../controllers/sanPhamController');

router.get('/',sanPhamController.getAllProduct);
router.post('/',sanPhamController.createProductController);
router.put('/:id',sanPhamController.updateProductController);
router.delete('/:id',sanPhamController.deleteProductController);
router.get('/:id', sanPhamController.getProductByIdController);


module.exports = router;