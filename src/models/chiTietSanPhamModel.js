const pool = require('../utils/connectDB')

const getAll = async()=>{
    const[rows] = await pool.execute('SELECT * FROM chitietsanpham');
    return rows;
}

const createChiTietSanPham = async (newChiTietSanPham) => {
    const {idSanPham,tenSanPham,moTaChiTiet,gia,kichThuoc,soLuong} = newChiTietSanPham;
    const query = 'INSERT INTO `chitietsanpham`(`idSanPham`,`tenSanPham`,`moTaChiTiet`,`gia`, `kichThuoc`, `soluong`) VALUES (?,?,?,?,?,?)';
    const [rows] = await pool.execute(query,[idSanPham,tenSanPham,moTaChiTiet,kichThuoc,gia,soLuong]);
    return rows;
}


const updateChiTietSanPham = async(id,updateChiTietSanPham)=>{
    const {idSanPham,tenSanPham,moTaChiTiet,gia,kichThuoc,soLuong} = updateChiTietSanPham;
    const query = 'UPDATE `chitietsanpham` SET `idSanPham`=?,`tenSanPham`=?,`moTaChiTiet`=?,`gia`=?,`kichThuoc`=?,`soluong`=? WHERE `id`=?';
    const [rows] = await pool.execute(query,[idSanPham,tenSanPham,moTaChiTiet,gia,kichThuoc,soLuong,id]);
    return rows;
}

const getChiTietSanPhamById = async (id) => {
    const [rows] = await pool.execute('SELECT * FROM chitietsanpham WHERE id = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
};

const deleteChiTietSanPham = async(id)=>{
    const [rows] = await pool.execute('DELETE FROM chitietsanpham WHERE id = ?',[id]);
    return rows;
}

module.exports ={
    getAll, createChiTietSanPham,updateChiTietSanPham,getChiTietSanPhamById,deleteChiTietSanPham
}