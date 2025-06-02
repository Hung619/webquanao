<template>
  <div class="checkout-container">
    <h2>Thông Tin Đặt Hàng</h2>
    <form @submit.prevent="submitOrder">

      <div class="form-group">
        <label for="address">Địa chỉ:</label>
        <input type="text" v-model="formData.address" id="address" required />
      </div>

      <div class="form-group">
        <label for="phone">Số điện thoại:</label>
        <input type="tel" v-model="formData.phone" id="phone" required />
      </div>

      <div class="form-group">
        <label for="payment">Phương thức thanh toán:</label>
        <select v-model="formData.paymentMethod" id="payment">
          <option value="cash">Thanh toán khi nhận hàng</option>
          <option value="credit">Thẻ tín dụng</option>
          <option value="momo">Momo</option>
        </select>
      </div>
      <h5>*Lưu ý: Đơn hàng sẽ có từ 3 - 4 ngày.</h5>
      <h3 class="totalMoney">Tổng tiền: {{ tongtien }} VNĐ</h3>

      <button type="submit" class="payment-button">
        Thanh Toán
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      formData: {
        name: "",
        address: "",
        phone: "",
        paymentMethod: "cash",
      },
      cart: JSON.parse(localStorage.getItem("cart")) || [],
    };
  },
  computed: {
    tongtien() {
      return this.cart.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );
    },
  },
  methods: {
    async submitOrder() {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (!currentUser) {
        alert("Vui lòng đăng nhập để tiếp tục thanh toán!");
        this.$router.push("/comLogin");
        return;
      }

      if (this.cart.length === 0) {
        alert("Giỏ hàng trống, vui lòng thêm sản phẩm!");
        return;
      }

      try {
        const newOrder = {
          userId: currentUser.id,
          totalAmount: this.tongtien,
          shippingAddress: this.formData.address,
          status: "Đang xử lý",
        };

        const orderResponse = await axios.post("http://localhost:3000/dondathang", newOrder);
        console.log("Order Response:", orderResponse.data);
   
        const orderId = orderResponse.data.id; 
        alert(orderId)
        if (!orderId) {
          throw new Error("Không thể tạo đơn hàng.");
        }

        // 2️⃣ Gửi chi tiết đơn hàng với orderId
        const orderDetails = this.cart.map((item) => ({
        orderId: orderId,
        productId: item.id ?? null,
        size: item.size ?? "M",
        quantity: item.quantity ?? 1,
      }));


        console.log("Sending orderDetails:", orderDetails);
        await axios.post("http://localhost:3000/chiTietDonHang", orderDetails);
        let orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || {};
        let userOrderHistory = orderHistory[currentUser.username] || [];

        userOrderHistory.push({
          orderId: orderId,
          dateTime: new Date().toLocaleString("vi-VN"),
          customerName: this.formData.name,
          customerAddress: this.formData.address,
          customerPhone: this.formData.phone,
          paymentMethod: this.formData.paymentMethod,
          items: this.cart,
          totalAmount: this.tongtien,
        });

        orderHistory[currentUser.username] = userOrderHistory;
        localStorage.setItem("orderHistory", JSON.stringify(orderHistory));
        localStorage.removeItem("cart");
        this.cart = [];
        alert("Thanh toán thành công!");
        this.$router.push("/orderHistory");
      } catch (error) {
        console.error("Lỗi khi đặt hàng:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại!");
      }
    }
  },
};
</script>


<style>
.checkout-container {
  width: 600px;
  height: auto;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f8f8f8;
  margin-top: 7%;
}

h2 {
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  width: 100%;
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  color: #555;
}

input,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

button.payment-button {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  color: white;
  background-color: #28a745;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button.payment-button:hover {
  background-color: #218838;
}

.totalMoney {
  text-align: right;
  font-size: 18px;
  font-weight: bold;
}
</style>
