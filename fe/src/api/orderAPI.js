import axios from 'axios';

export const getOrder = async () => {
  try {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser || !currentUser.id) {
      console.error("Không tìm thấy thông tin người dùng!");
      return [];
    }

    const response = await axios.get(`http://localhost:3000/dondathang/${currentUser.id}`);

    console.log("Dữ liệu đơn hàng nhận được:", response.data);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy đơn hàng:', error);
    return [];
  }
};


export const createOrder = async (newOrder) => {
  try {
    const response = await axios.post('http://localhost:3000/dondathang', newOrder);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tạo người dùng:', error);
    throw error;
  }
};

export const createOrderDetails = async (newOrder) => {
  try {
    const response = await axios.post('http://localhost:3000/chiTietDonHang', newOrder);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tạo người dùng:', error);
    throw error;
  }
};