<template>
  <header>
    <div class="containerHeader">
      <div class="logo">
        <h2 class="nameShop">
          <img src="/Images/icon-quan-ao.png" alt="" /><a href="/">HappY_Store</a>
        </h2>
      </div>
      <nav>
        <ul>
          <li><router-link to="/">Trang Chủ</router-link></li>
          <li><router-link to="/productAoSoMi">Áo Sơ Mi</router-link></li>
          <li><router-link to="/productAoThun">Áo Thun</router-link></li>
          <li><router-link to="/productQuanShort">Quần Short</router-link></li>
          <li><router-link to="/productQuanJean">Quần Jean</router-link></li>
          <li v-if="isAdmin"><router-link to="/productList">Sản phẩm </router-link></li>
          <li v-if="isAdmin"><router-link to="/admin/users">Người dùng</router-link></li>
        </ul>
      </nav>
      <div class="header-icons">
        <!-- Đăng nhập/Đăng xuất -->
        <div
          @mouseover="showTooltip(user ? 'logout' : 'login')" @mouseleave="hideTooltip">
          <div v-if="!user" class="logo-user">
            <router-link to="/comLogin">
              <img src="/Images/user-account.png" alt="User Account" />
            </router-link>
            <!-- Tooltip Đăng nhập -->
            <div v-if="tooltipVisible === 'login'" class="tooltip">
              Đăng nhập
            </div>
          </div>
          <div v-else class="logo-user">
            <img @click="logout" src="/Images/exit.png" alt="Logout" />
            <!-- Tooltip Đăng xuất -->
            <div v-if="tooltipVisible === 'logout'" class="tooltip">
              Đăng xuất
            </div>
          </div>
        </div>

        <!-- Giỏ hàng -->
        <div v-if="!isAdmin"
          @mouseover="showTooltip('cart')" @mouseleave="hideTooltip" class="logo-cart">
          <router-link to="/comCart" class="cta-button">
            <img src="/Images/icon-cart.png" alt="Cart" />
            <div class="soluongCart" v-if="cartQuantity">{{ cartQuantity }}</div>
          </router-link>
          <!-- Tooltip giỏ hàng -->
          <div v-if="tooltipVisible === 'cart'" class="tooltip">Giỏ hàng</div>
        </div>

        <!-- Lịch sử mua hàng -->
        <div v-if="!isAdmin"
          @mouseover="showTooltip('history')" @mouseleave="hideTooltip" class="logo-user-file">
          <router-link to="/orderHistory">
            <img src="/Images/file.png" alt="Order History" />
          </router-link>
          <!-- Tooltip lịch sử mua hàng -->
          <div v-if="tooltipVisible === 'history'" class="tooltip"> Lịch sử mua</div>
        </div>
      </div>
    </div>
  </header>
  <router-view />
</template>

<script>
import cart from "@/data/cart";
import eventBus from "@/eventBus";
export default {
  data() {
    return {
      cart: cart, // hoặc lấy dữ liệu từ store hay một nơi khác
      user: JSON.parse(localStorage.getItem("currentUser")) || null,
      tooltipVisible: null,
    };
  },
  computed: {
    cartQuantity() {
      return this.cart.reduce((total, item) => total + item.quantity, 0);
    },
    isAdmin() {
      return this.user && this.user.role === 'Admin';
    },
  },
  methods: {
    logout() {
      // Hiển thị thông báo xác nhận
      const confirmation = confirm("Bạn có chắc chắn muốn đăng xuất không?");

      // Nếu người dùng nhấn "Cancel", dừng lại và không làm gì cả
      if (!confirmation) return;

      this.cart.length = 0;
      // Nếu người dùng nhấn "OK", tiến hành đăng xuất
      localStorage.removeItem("currentUser");
      this.user = null;
      this.$router.push("/");
    },
    showTooltip(type) {
      this.tooltipVisible = type;
    },
    hideTooltip() {
      this.tooltipVisible = null;
    },
  },
  created() {
    eventBus.on("loginSuccess", (data) => {
      this.user = data;
    });
  },
  beforeUnmount() {
    eventBus.off("loginSuccess");
  },
};
</script>

<style >
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  transition: transform 0.3s ease;
}

.containerHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f4f6f8;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0 40px;
}

.logo {
  margin-left: 5%;
}

.logo a {
  text-decoration: none;
  color: #4c8ed0;
  margin-left: 10px;
}

.logo a:hover {
  color: #91b0cf;
  transition: color 0.3s ease;
}

.nameShop img {
  vertical-align: middle;
  width: 40px;
}

nav ul {
  list-style: none;
  display: flex;
  margin-left: 100px;
  padding: 0;
}

nav ul li {
  margin: 0 15px;
  font-size: 18px;
}

nav ul li a {
  text-decoration: none;
  color: #000;
  font-weight: bold;
  transition: color 0.3s ease;
}

nav ul li a:hover {
  color: #959595;
}

.header-icons {
  display: flex;
  align-items: center;
  gap: 30px;
}

.logo-user,
.logo-cart,
.logo-user-file {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo-user img,
.logo-cart img,
.logo-user-file img {
  width: 30px;
  margin-right: 20px;
}

.logo-user img:hover {
  cursor: pointer;
}

.logo-cart {
  position: relative;
}

.soluongCart {
  position: absolute;
  top: -5px; /* Điều chỉnh số lượng giỏ hàng lên trên */
  right: 10px; /* Đặt số lượng sát góc phải */
  background-color: red;
  color: white;
  font-size: 12px;
  border-radius: 50%;
  padding: 2px 5px;
  text-align: center;
}

.logo-user-file {
  margin-left: 30px;
}
.logo-user,.logo-cart,
.logo-user-file {
  position: relative; /* Để tooltip nằm tương đối với icon */
}

.tooltip {
  position: absolute;
  bottom: -35px; /* Hiển thị tooltip ngay dưới icon */
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  padding: 8px 16px;
  border-radius: 6px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
  z-index: 1000;
  opacity: 0;
  animation: fadeIn 0.3s forwards;
}

/* Tạo mũi tên chỉ lên trên */
.tooltip::after {
  content: "";
  position: absolute;
  top: -6px; /* Mũi tên chỉ lên trên tooltip */
  left: 50%;
  transform: translateX(-50%);
  border-width: 6px;
  border-style: solid;
  border-color: transparent transparent #333 transparent;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
</style>