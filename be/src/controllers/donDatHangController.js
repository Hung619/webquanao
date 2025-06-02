const donDatHang = require('../models/donDatHangModel');
const telebot = require('../utils/telegramBot');

class donDatHangController {
    async getAllDatHang(req, res) {
        try {
            const { id } = req.params;
            const donDatHangs = await donDatHang.getAllorderById(id);
            res.status(201).json(donDatHangs);

        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    async createDatHang(req, res) {
        try {
            const newOrder = req.body;
            console.log("Dữ liệu nhận được:", newOrder);

            const orderId = await donDatHang.createorder(newOrder);
            if (!orderId) {
                return res.status(400).json({ message: "Không thể tạo đơn hàng." });
            }
            telebot.sendMessage("Bạn vừa có một đơn hàng mới!");
            console.log("Đơn hàng đã tạo thành công! Order ID:", orderId);
            res.status(201).json({ id: orderId });  // ✅ Trả về ID đơn hàng mới
            
        } catch (error) {
            console.error("Lỗi khi tạo đơn hàng:", error);
            res.status(500).json({ message: "Lỗi khi tạo đơn hàng.", error: error.message });
        }
    }


    async updateDatHang(req, res) {
        try {
            const { id } = req.params;
            const updatedDatHang = req.body;
            updatedDatHang.id = id;

            // Gọi phương thức update
            await donDatHang.updateorder(updatedDatHang);

            res.status(201).json({ message: 'updated success' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
module.exports = new donDatHangController;