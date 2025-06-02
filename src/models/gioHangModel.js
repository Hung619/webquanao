const pool = require('../utils/connectDB');
const getAllcart = async()=>{
    const[rows] =await pool.execute('SELECT * FROM GioHang');
    return rows;
    
}
const createcart = async (newGioHang)=>{
    const {idNguoiDung, idSanPham,hinh,tenSanPham,gia, kichThuoc,soLuong,tongTien}=newGioHang;
    const query='INSERT INTO giohang(`idNguoiDung`,`idSanPham`,`hinh`,`tenSanPham`,`gia`,`kichThuoc`,`soLuong`,`tongTien`) VALUES(?,?,?,?,?,?,?,?)'
    const[rows]=await pool.execute(query,[idNguoiDung, idSanPham,hinh,tenSanPham,gia, kichThuoc,soLuong,tongTien]);
    return rows
}
// const updatecart = async (updatedGioHang) => {
//     const {id, kichThuoc, mauSac, soLuong } = updatedGioHang;

//     const query = `
//         UPDATE giohang 
//         SET kichThuoc = ?, mauSac = ?, soLuong = ?
//         WHERE id = ?
//     `;

//     const [rows] = await pool.execute(query, [ kichThuoc, mauSac, soLuong,id]);
//     return rows;
// };
const deletecart = async (id) => {
    const query = `DELETE FROM GioHang WHERE id = ?`;

    const [rows] = await pool.execute(query, [id]);
    return rows;
};
const deleteAllCart = async () => {
    const query = `DELETE FROM GioHang`; // Xóa toàn bộ dữ liệu trong bảng
    const [rows] = await pool.execute(query);
    return rows;
};


module.exports={
    getAllcart,createcart,deletecart,deleteAllCart
}