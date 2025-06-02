<template>
  <div class="main-ComCart">
    <div v-if="this.cart.length == 0">
      <p   class="gioHangTrong">Giỏ Hàng Trống</p>
    </div>
    <div v-else class="modal-content">
      <h3 class="title-gioHang">Giỏ hàng của bạn:</h3>
      <hr />
      <table style="width: 100%" class="text-center table">
        <tr>
          <th></th>
          <th>HÌNH</th>
          <th>SẢN PHẨM</th>
          <th>Đơn giá</th>
          <th>Size</th>
          <th>Số lượng</th>
          <th>Tiền</th>
          <th></th>
        </tr>
        <!-- dùng v-for thể hiện giỏ hàng -->
        <tr v-for="item in cart" :key="item.id">
          <td class="align-middle">
            <button @click="removeCart(item.id)" class="btn btn-danger">X</button>
          </td>
          <td><img :src="item.image" style="height: 100px; width: 100px" /></td>
          <td class="align-middle">{{ item.name.slice(0, 15) }}</td>
          <td class="align-middle">{{ item.price }}0 VNĐ</td>
          <th>{{ item.size }}</th>
          <td class="align-middle">
            {{ item.quantity }}
          </td>
          <td class="align-middle">{{ item.price * item.quantity }},000 VNĐ</td>
        </tr>

        <tr>
          <th>
            <button @click="removeAll()" class="btn btn-danger">
              Xóa hết!
            </button>
          </th>
          <th></th>
          <th></th>
          <th></th>
          <th>Tổng số lượng: {{ tongsoluong }}</th>
          <th>Tổng tiền: {{ tongtien }},000 VNĐ</th>
          <th>
            <button @click="kiemTraDangNhap" class="btn btn-primary">
              Mua hàng
            </button>
          </th>
        </tr>
      </table>
      <hr />
    </div>
  </div>
</template>

<script>
// import items from "../data/itemsProductHome";
// import items1 from "../data/itemsAoThun";
// import items2 from "../data/itemsSoMi";
// import items3 from "../data/itemsQuanJean";
// import items4 from "../data/itemsQuanShort";
import cart from "../data/cart";

export default {
  data() {
    return {
      cart: cart,
    };
  },
  computed: {
    tongtien() {
      return this.cart.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );
    },
    tongsoluong() {
      return this.cart.reduce((total, item) => total + item.quantity, 0);
    },
  },
  mounted() {
    // Khôi phục giỏ hàng từ localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
    }
  },
  methods: {
    removeCart(id) {
      const index = this.cart.findIndex((item) => item.id == id);
      this.cart.splice(index, 1);
      this.saveCartToLocalStorage(); // Lưu giỏ hàng vào localStorage
    },
    removeAll() {
      this.cart.splice(0, this.cart.length);
      this.saveCartToLocalStorage(); // Lưu giỏ hàng vào localStorage
    },
    // increaseQuantity(item) {
    //   const stockItem = (() => {
    //     switch (item.category) {
    //       case "home":
    //         return items.find((x) => x.id === item.id);
    //       case "AoThun":
    //         return items1.find((x) => x.id === item.id);
    //       case "AoSoMi":
    //         return items2.find((x) => x.id === item.id);
    //       case "QuanJean":
    //         return items3.find((x) => x.id === item.id);
    //       case "QuanShort":
    //         return items4.find((x) => x.id === item.id);
    //       default:
    //         return null;
    //     }
    //   })();

    //   if (stockItem.quality > 0) {
    //     item.quantity++;
    //     stockItem.quality--;
    //     this.saveCartToLocalStorage(); // Lưu giỏ hàng vào localStorage
    //   }
    // },
    // decreaseQuantity(item) {
    //   const stockItem = (() => {
    //     switch (item.category) {
    //       case "home":
    //         return items.find((x) => x.id === item.id);
    //       case "Aothun":
    //         return items1.find((x) => x.id === item.id);
    //       case "AoSoMi":
    //         return items2.find((x) => x.id === item.id);
    //       case "Quanjean":
    //         return items3.find((x) => x.id === item.id);
    //       case "QuanShort":
    //         return items4.find((x) => x.id === item.id);
    //       default:
    //         return null;
    //     }
    //   })();
    //   if (item.quantity > 1) {
    //     item.quantity--;
    //     stockItem.quality++;
    //     this.saveCartToLocalStorage(); // Lưu giỏ hàng vào localStorage
    //   } else {
    //     item.quantity == 1;
    //     return;
    //   }
    // },
    saveCartToLocalStorage() {
      localStorage.setItem('cart', JSON.stringify(this.cart)); // Lưu giỏ hàng vào localStorage
    },
    kiemTraDangNhap() {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (!currentUser) {
        alert("Vui lòng đăng nhập để tiếp tục thanh toán!");
        this.$router.push("/comLogin");
        return;
      } else {
        this.$router.push("/comPayment");
      }
    },
  },
};
</script>

<style>
.main-ComCart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 7%;
  width: 90%; /* Giới hạn chiều rộng để giữ nội dung trong một khung */
  max-width: 1200px; /* Giới hạn chiều rộng tối đa */
  margin: auto; /* Để căn giữa nội dung nếu có chiều rộng */
  padding: 20px;
  background-color: #f9f9f9; /* Thêm màu nền nhẹ */
  border: 1px solid #ddd;
  border-radius: 10px;
}

.gioHangTrong {
  font-size: 30px;
  border: solid 1px;
  color: rgb(70, 123, 154);
}
.title-gioHang {
  margin-right: 800px;
}
.btn-primary {
  width: 150px;
  height: 40px;
  background-color: #91b0cf;
  color: white;
  border-radius: 5px;
}

.btn-primary:hover {
  background-color: #abbfd4;
  cursor: pointer;
}
.modal-content {
  width: 100%;
  border-collapse: collapse; /* Loại bỏ khoảng cách giữa các đường viền */
}
</style>