const ChiTietDonHang = require('../models/chiTietDonHangModel');
class ChiTietDonHangController{
    async getAllChiTietDonHang(req,res){
        try{
            const ChiTietDonHangs =await ChiTietDonHang.getAll();
            res.status(201).json(ChiTietDonHangs);

        }catch (error){
            res.status(500).json({message: error.message})
        }
    }
     async createChiTietDonHang(req, res) {
    try {
        console.log("Dữ liệu nhận từ frontend:", req.body); // ✅ Debug

        // Kiểm tra nếu req.body là một mảng
        if (!Array.isArray(req.body) || req.body.length === 0) {
            return res.status(400).json({ message: "Dữ liệu gửi lên phải là mảng chứa chi tiết đơn hàng." });
        }

        // Xử lý từng phần tử trong mảng
        for (const detail of req.body) {
            const { orderId, productId, size, quantity } = detail;

            if (!orderId || !productId || !size || !quantity) {
                return res.status(400).json({ message: "Thiếu thông tin chi tiết đơn hàng." });
            }

            await ChiTietDonHang.create(detail);
        }

        res.status(201).json({ message: "Tạo chi tiết đơn hàng thành công!" });
    } catch (error) {
        console.error("Lỗi khi tạo chi tiết đơn hàng:", error);
        res.status(500).json({ message: error.message });
    }
}

}
module.exports = new ChiTietDonHangController;