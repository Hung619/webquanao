






const pool = require('../utils/connectDB');
const getAll = async()=>{
    const[rows] = await pool.execute('SELECT * FROM order_details');
    return rows;
}
const create = async (newChiTietDonHang) => {
    const { orderId, productId, size, quantity } = newChiTietDonHang;

    if (!orderId || !productId || !size || !quantity) {
        console.error("Lỗi: Thiếu dữ liệu chi tiết đơn hàng", { orderId, productId, size, quantity });
        throw new Error("Thiếu thông tin chi tiết đơn hàng");
    }

    const query = 'INSERT INTO order_details(`orderId`, `productId`, `size`, `quantity`) VALUES (?, ?, ?, ?)';
    const [rows] = await pool.execute(query, [orderId, productId, size, quantity]);
    return rows;
};

module.exports ={
    getAll,create
}