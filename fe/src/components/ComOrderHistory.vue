<template>
  <div v-if="!product || product.length === 0">
    <p class="gioHangTrong">Chưa có lịch sử</p>
  </div>
  <div v-else class="table-container">
    <table>
      <thead>
        <tr>
          <th>STT</th>
          <th>Ngày Giờ Đặt Hàng</th>
          <th>Hình</th>
          <th>Tên Sản Phẩm</th>
          <th>Đơn Giá</th>
          <th>Size</th>
          <th>Số Lượng</th>
          <th>Tổng Tiền</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(order, orderIndex) in product" :key="orderIndex">
          <!-- Hàng tiêu đề đơn hàng -->
          <tr class="order-header">
            <td colspan="8"><strong>Đơn Hàng Ngày {{ formatDate(order.dateTime) }}</strong></td>
          </tr>

          <!-- Sản phẩm trong đơn hàng -->
          <tr v-for="(item, itemIndex) in order.items" :key="itemIndex">
            <td>{{ itemIndex + 1 }}</td>
            <td>{{ formatDate(order.dateTime) }}</td>
            <td>
              <img :src="item.image" alt="Product Image" class="product-img" />
            </td>
            <td>{{ item.name }}</td>
            <td>{{ formatPrice(item.price) }}</td>
            <td>{{ item.size }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ formatPrice(item.totalPrice) }}</td>
          </tr>

          <!-- Thông tin người đặt hàng -->
          <tr class="order-user-info">
            <td colspan="8">
              <strong>Người đặt hàng:</strong> {{ order.customerName }}<br />
              <strong>Địa chỉ:</strong> {{ order.shippingAddress }}<br />
              <strong>Số điện thoại:</strong> {{ order.customerPhone }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getOrder } from "../api/orderAPI";

export default {
  data() {
    return {
      product: [],
    };
  },
  async created() {
    try {
      const orders = await getOrder();

      // Nhóm sản phẩm theo ngày đặt hàng
      const groupedOrders = orders.reduce((acc, order) => {
        const orderDate = order.orderDate || "N/A";

        if (!acc[orderDate]) {
          acc[orderDate] = {
            dateTime: order.orderDate,
            customerName: order.fullName || "Khách hàng",
            shippingAddress: order.shippingAddress || "N/A",
            customerPhone: order.phoneNumber || "N/A",
            items: [],
          };
        }

        acc[orderDate].items.push({
          id: order.id || Math.random(),
          name: order.name,
          image: order.image || "https://via.placeholder.com/50",
          price: parseFloat(order.price) || 0,
          size: order.size,
          quantity: order.quantity,
          totalPrice: parseFloat(order.totalAmount) || 0,
        });

        return acc;
      }, {});

      this.product = Object.values(groupedOrders);

      localStorage.setItem("orderHistory", JSON.stringify(this.product));
    } catch (error) {
      console.error("Không thể tải lịch sử đơn hàng:", error);
      this.product = [];
    }
  },
  methods: {
    formatPrice(value) {
      return `${Number(value).toLocaleString()} VNĐ`;
    },
    formatDate(dateString) {
      if (!dateString) return "N/A";
      const date = new Date(dateString);
      return date.toLocaleString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 7%;
}

table th,
table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

table th {
  background-color: #f2f2f2;
}

.table-container {
  counter-reset: rowNumber;
}

.product-img {
  width: 50px;
  height: 50px;
  object-fit: cover;
}
</style>
