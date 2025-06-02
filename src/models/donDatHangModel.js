const pool = require('../utils/connectDB');

const getAllorderById = async (userId) => {
    const query = `
        SELECT 
            u.fullName,
            o.orderDate,
            p.image,
            p.name,
            p.price,
            od.size,
            od.quantity,
            o.shippingAddress,
            u.phoneNumber,
            (p.price * od.quantity) AS totalAmount
        FROM 
            orders o
        JOIN 
            users u ON o.userId = u.id
        JOIN 
            order_details od ON o.id = od.orderId
        JOIN 
            products p ON od.productId = p.id
        WHERE u.id = ?
    `;
    const [rows] = await pool.execute(query, [userId]);
    return rows;
};
const createorder = async (newDonDatHang) => {
    const { userId, totalAmount, shippingAddress, status } = newDonDatHang;
    const query = 'INSERT INTO orders (`userId`, `totalAmount`, `shippingAddress`, `status`) VALUES (?, ?, ?, ?)';

    const [result] = await pool.query(query, [userId, totalAmount, shippingAddress, status]);

    if (result.affectedRows === 1) {
        console.log("Order ID vừa tạo:", result.insertId); // ✅ Kiểm tra log
        return result.insertId; // ✅ Trả về ID đơn hàng mới
    }

    return null;
};


const updateorder = async (updatedDatHang) => {
    const { id, trangThai } = updatedDatHang;

    const enumValues = {
        "ChoXacNhan": 1,
        "DaXacNhan": 2,
        "DangGiao": 3,
        "HoanTat": 4,
        "Huy": 5
    };

    const query = `
    UPDATE orders 
    SET status = ? 
    WHERE id = ?;
`;

    const [rows] = await pool.execute(query, [enumValues[trangThai], id]);
    return rows


};
module.exports = {
    getAllorderById, createorder, updateorder
}