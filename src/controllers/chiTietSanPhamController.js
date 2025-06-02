const chitietsanphamModel = require('../models/chiTietSanPhamModel');

class chiTietSanPham{
    async getAllChiTietSanPhamController(req,res){
        try {
            const chitietsanpham = await chitietsanphamModel.getAll();
            res.status(201).json(chitietsanpham);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
    async getChiTietSanPhamByIdController(req,res){
        try {
            const {id} = req.params;
            const chitietsanpham = await chitietsanphamModel.getChiTietSanPhamById(id);
            if(!chitietsanpham){
                return res.status(404).json({message: 'Chi tiet san pham not found'});
            }
            res.status(200).json(chitietsanpham);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
    async createChiTietSanPhamController(req, res) {
        try {
            const newChiTietSanPham = req.body;
            await chitietsanphamModel.createChiTietSanPham(newChiTietSanPham);
            res.status(201).json({ message: "Create chi tiet san pham successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async updateChiTietSanPhamController(req, res) {
        try {
            const {id} = req.params;
            const updateChiTietSanPham = req.body;

            const chitietsanpham = await chitietsanphamModel.getChiTietSanPhamById(id);
            if (!chitietsanpham) {
                return res.status(404).json({ message: "Chi tiet san pham not found" });
            }

            await chitietsanphamModel.updateChiTietSanPham(id, updateChiTietSanPham);
            res.status(200).json({ message: 'Chi tiet san pham updated successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async deleteChiTietSanPhamController(req, res) {
        try {
            const { id } = req.params;
            const chitietsanpham = await chitietsanphamModel.getChiTietSanPhamById(id);
            if (!chitietsanpham) {
                return res.status(404).json({ message: "Chi tiet san pham not found" });
            }
            await chitietsanphamModel.deleteChiTietSanPham(id);
            res.status(200).json({ message: 'Chi tiet san pham deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}
module.exports = new chiTietSanPham;