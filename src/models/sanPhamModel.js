const pool = require('../utils/connectDB');

const getAll = async()=>{
    const[rows] = await pool.execute('SELECT * FROM products');
    return rows;
}

const getProductById = async(id)=>{
    const [rows] = await pool.execute('SELECT * FROM products WHERE id = ?',[id]);
    return rows.length > 0 ? rows[0] : null;
}

const createProduct = async(newProduct)=>{
    const {name,image,price,size,quality,description,category,status} = newProduct;
    const query = 'INSERT INTO products(`name`,`image`,`price`,`size`,`quality`,`description`,`category`,`status`) VALUES(?,?,?,?,?,?,?,?)';
    const [rows ] = await pool.execute(query,[name,image,price,size,quality,description,category,status]);
    return rows;
}

const updateProduct = async(id,updateProduct)=>{
    const {name,image,price,size,quality,description,category,status} = updateProduct;
    const query = 'UPDATE `products` SET `name`=?,`image`=?,`price`=?,`size`=?,`quality`=?,`description`=?,`category`=?,`status`=? WHERE `id`=?';
    const [rows] = await pool.execute(query,[name,image,price,size,quality,description,category,status,id]);
    return rows;
}

const deleteProduct = async(id)=>{
    const [rows] = await pool.execute('DELETE FROM products WHERE id = ?',[id]);
    return rows;
}

module.exports = {
    getAll,createProduct,updateProduct,getProductById,deleteProduct
}