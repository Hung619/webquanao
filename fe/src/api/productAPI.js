import axios from 'axios';

export const getSanPham = async () => {
    try {
        const response = await axios.get('http://localhost:3000/sanPham');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
        throw error;
    }
}

export const createSanPham = async (newSanPham) => {
    try {
        const response = await axios.post('http://localhost:3000/sanPham', newSanPham);
        console.log('Sản phẩm đã được thêm:', response.data);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi thêm sản phẩm:', error);
        throw error;
    }
};
// Lấy sản phẩm theo id
export const getSanPhamID = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3000/sanPham/${id}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu sản phẩm theo id:', error);
        throw error;
    }
}
export const updateSanPham = async (id, updatedProduct) => {
    try {
        const response = await axios.put(`http://localhost:3000/sanPham/${id}`, updatedProduct);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi cập nhật sản phẩm:', error);
        throw error;
    }
};

export const deleteSanPham = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:3000/sanPham/${id}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi xóa sản phẩm:', error);
        throw error;
    }
};

