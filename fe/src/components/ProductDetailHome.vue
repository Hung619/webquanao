<template>
  <div class="main-CTSP">
    <div class="container-CTSP">
      <img :src="product.image" alt="Hình ảnh sản phẩm" />
      <div class="info-CTSP">
        <h1>{{ product.name }}</h1>
        <p class="description-CTSP">{{ product.description }}</p>
        <div class="info-details">
          <p class="price-CTSP">{{ product.price }}0 VND</p>
          <p v-if="product.quality == 0" class="status-CTSP">Hết hàng</p>
          <p v-else class="status-CTSP">{{ product.status }}</p>
        </div>
        <div class="size-selection">
          <span>Kích thước:</span>
          <label v-for="size in product.size" :key="size">
            <input
              type="radio"
              :id="'size-' + size"
              name="size"
              :value="size"
              v-model="selectedSize"
            />
            {{ size }}
          </label>
        </div>
        <div v-if="product.quality > 0" class="quantity-selection">
          <span>Số lượng:</span>
          <input
            type="number"
            v-model="selectedQuantity"
            min="1"
            :max="product.quality"
            class="quantity-input"
          />
        </div>
        <div v-if="product.quality == 0">Hết hàng</div>
        <div v-else>
          <button @click="addToCart(product)" class="add-to-cart">
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cart from "@/data/cart";
import { getSanPhamID } from "../api/productAPI";
import eventBus from "@/eventBus";

export default {
  data() {
    return {
      product: {},
      cart: cart,
      selectedSize: "S",
      selectedQuantity: 1, // Thêm biến để lưu số lượng chọn
      loading: true,
      error: false,
    };
  },
  mounted() {
    let id = this.$route.params.id;
    getSanPhamID(id)
      .then((product) => {
        if (Array.isArray(product.size)) {
          product.size = product.size.map((size) => size.replace(/,/g, ""));
        } else if (typeof product.size === "string") {
          product.size = product.size
            .split(",")
            .map((size) => size.trim().replace(/,/g, ""));
        }
        this.product = product;
      })
      .catch((error) => {
        console.error("Lỗi khi lấy thông tin sản phẩm:", error);
        this.error = true;
      })
      .finally(() => {
        this.loading = false;
      });

    // Khôi phục giỏ hàng từ localStorage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      this.cart.length = 0; // Xóa dữ liệu cũ trong cart
      this.cart.push(...JSON.parse(savedCart)); // Load dữ liệu từ localStorage
    }
  },
  methods: {
    addToCart(product) {
      const infoProduct = this.cart.find(
        (item) =>
          item.id == product.id &&
          item.size == this.selectedSize &&
          item.category == "AoSoMi"
      );
      if (infoProduct) {
        // Kiểm tra nếu tổng số lượng sau khi thêm không vượt quá tồn kho
        if (infoProduct.quantity + this.selectedQuantity <= product.quality) {
          infoProduct.quantity += this.selectedQuantity;
        } else {
          alert("Số lượng trong kho không đủ!");
          return;
        }
      } else {
        if (this.selectedQuantity <= product.quality) {
          const newProduct = {
            ...product,
            quantity: this.selectedQuantity,
            size: this.selectedSize,
          };
          this.cart.push(newProduct);
        } else {
          alert("Số lượng trong kho không đủ!");
          return;
        }
      }
      product.quality -= this.selectedQuantity; // Giảm số lượng trong kho (chỉ trong UI)
      this.saveCartToLocalStorage(); // Lưu giỏ hàng vào localStorage
      eventBus.emit("cartUpdated", this.cart); // Phát sự kiện cập nhật giỏ hàng
      alert(
        `${product.name} (Size: ${this.selectedSize}, Số lượng: ${this.selectedQuantity}) đã được thêm vào giỏ hàng!`
      );
      this.selectedQuantity = 1; // Reset số lượng về 1 sau khi thêm
    },
    saveCartToLocalStorage() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
  },
};
</script>

<style>
.main-CTSP {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  background-color: #f5f5f5;
}

.container-CTSP {
  display: flex;
  width: 900px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.container-CTSP img {
  width: 50%;
  object-fit: cover;
}

.info-CTSP {
  width: 50%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.info-CTSP h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

.description-CTSP {
  font-size: 16px;
  color: #666;
}

.price-CTSP {
  font-size: 20px;
  color: #333;
  font-weight: bold;
  margin-right: 20px; /* Thêm khoảng cách giữa giá và trạng thái */
}

.status-CTSP {
  font-size: 16px;
  color: green;
}

.info-details {
  display: flex;
  align-items: center; /* Căn giữa các phần tử theo chiều dọc */
  gap: 10px; /* Giảm gap để gọn hơn */
  margin-bottom: 10px;
}

.size-selection {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.size-selection span {
  font-weight: bold;
}

.size-selection label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.size-selection input[type="radio"] {
  margin-right: 5px;
}

.quantity-selection {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.quantity-selection span {
  font-weight: bold;
}

.quantity-input {
  width: 60px;
  padding: 5px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.add-to-cart {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-to-cart:hover {
  background-color: #0056b3;
}
</style>