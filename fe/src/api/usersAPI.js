import axios from 'axios';

// Lấy danh sách người dùng
export const getUser = async () => {
  try {
    const response = await axios.get('http://localhost:3000/nguoidung');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu:', error);
    throw error;
  }
};

// Tạo người dùng mới
export const createUser = async (newUser) => {
  try {
    const response = await axios.post('http://localhost:3000/nguoidung', newUser);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tạo người dùng:', error);
    throw error;
  }
};

// Cập nhật người dùng
export const updateUser = async (id, updatedUser) => {
  try {
    const response = await axios.put(`http://localhost:3000/nguoidung/${id}`, updatedUser);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi cập nhật user:', error);
    throw error;
  }
};

// Xóa người dùng
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3000/nguoidung/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi xóa user:', error);
    throw error;
  }
};

export const loginUser = async (fullName, password) => {
    try {
      const response = await axios.post('http://localhost:3000/nguoidung/login', { fullName, password });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi đăng nhập:', error);
      throw error;
    }
  };