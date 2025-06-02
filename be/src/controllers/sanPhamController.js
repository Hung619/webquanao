const sanPhamModel = require('../models/sanPhamModel');

class sanPham{
    async getProductByIdController(req, res) {
        try {
            const { id } = req.params; // Lấy id từ request params
            const sanPham = await sanPhamModel.getProductById(id); // Gọi hàm từ model

            if (!sanPham) {
                return  res.status(500).json("lõi");
            } 
            res.status(200).json(sanPham);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
    async getAllProduct(req,res){
        try {
            const sanPham = await sanPhamModel.getAll();
            res.status(201).json(sanPham);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
    async createProductController(req, res) {
        try {
            const newProduct = req.body;
            await sanPhamModel.createProduct(newProduct);
            res.status(201).json({ message: "Create product successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async updateProductController(req,res){
        try {
            const {id} = req.params;
            const updateSanPham = req.body;
            const sanPham = await sanPhamModel.getProductById(id);
            if (!sanPham) {
                return res.status(404).json({ message: "Product not found" });
            }
            await sanPhamModel.updateProduct(id, updateSanPham);
            res.status(200).json({ message: 'Product updated successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async deleteProductController(req, res) {
        try {
            const { id } = req.params;
            const sanPham = await sanPhamModel.getProductById(id);
            if (!sanPham) {
                return res.status(404).json({ message: "Product not found" });
            }
            await sanPhamModel.deleteProduct(id);
            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            res.status(500).json({message:error.message});
        }
    }

}

module.exports = new sanPham;