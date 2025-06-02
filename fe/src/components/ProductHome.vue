<template>
  <div>
    <div class="background-Ao">
      <img src="https://img.upanh.tv/2025/03/23/backgroundHome.png" alt="" />
    </div>
    <h2>Sản Phẩm Bán Chạy Nhất</h2>
    <div class="container">
      <div class="slideshow-background">
        <div class="slide" style="background-image: url('/Images/masterAoThun.jpg')"></div>
        <div class="slide" style="background-image: url('/Images/masterSoMiDai.jpg')"></div>
        <div class="slide" style="background-image: url('/Images/quanShort.PNG')"></div>
        <div class="slide" style="background-image: url('/Images/masterSoMi.jpg')"></div>
        <div class="slide" style="background-image: url('/Images/masterPolo.jpg')"></div>
      </div>
    </div>
    <div class="imageHome">
      <h2 class="heading-bar__title">Combo Mix & Match Đúng Chuẩn</h2>
      <img src="https://img.upanh.tv/2025/03/23/combo1_2_master.webp" alt="" />
      <img src="https://img.upanh.tv/2025/03/23/combo2_1_master.jpg" alt="" />
      <img src="https://img.upanh.tv/2025/03/23/combo3_master.jpg" alt="" />
      <img src="https://img.upanh.tv/2025/03/23/combo4_master.webp" alt="" />
      <h2>Sản Phẩm Mới Nhất HAPPYSTORE</h2>
    </div>
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Tìm kiếm sản phẩm..."
      class="search-input"
      @input="resetPage"
    />
    <div class="product-grid">
      <div v-if="loading">Đang tải sản phẩm...</div>
      <div v-else-if="error">Có lỗi xảy ra khi tải sản phẩm!</div>
      <div v-else-if="filteredProducts.length === 0">Không có sản phẩm nào!</div>
      <div v-else v-for="cata in filteredProducts" :key="cata.id" class="image-container">
        <router-link
          :to="{ name: 'ProductDetailHome', params: { id: cata.id } }"
          class="no-underline"
        >
          <img :src="cata.image" alt="Tên hình ảnh" />
          <h3>{{ cata.name }}</h3>
          <p>{{ cata.price }}0 VNĐ</p>
          <div class="status">
            <p v-if="cata.quality == 0">Hết hàng</p>
            <p v-else>{{ cata.status }}</p>
          </div>
        </router-link>
      </div>
    </div>
    <!-- Phần phân trang -->
    <div class="pagination-buttons" v-if="!loading && !error && filteredProductsBase.length > 0">
      <button
        v-for="page in totalPage"
        :key="page"
        :class="{ active: page === currentPage }"
        @click="changePage(page)"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script>
import { getSanPham } from "../api/productAPI";

export default {
  name: "ProductHome",
  data() {
    return {
      products: [],
      currentPage: 1,
      limit: 8,
      searchQuery: "",
      loading: true,
      error: false,
    };
  },
  computed: {
    filteredProductsBase() {
      return this.products.filter((product) =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      ) || [];
    },
    totalPage() {
      return Math.ceil(this.filteredProductsBase.length / this.limit);
    },
    filteredProducts() {
      const start = (this.currentPage - 1) * this.limit;
      const end = start + this.limit;
      return this.filteredProductsBase.slice(start, end);
    },
  },
  async mounted() {
    try {
      this.loading = true;
      const data = await getSanPham();
      this.products = data || [];
      console.log(this.products);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
      this.error = true;
    } finally {
      this.loading = false;
    }

    let slides = document.querySelectorAll(".slide");
    let currentIndex = 0;

    slides[currentIndex].classList.add("active");

    function showNextSlide() {
      slides[currentIndex].classList.remove("active");
      currentIndex = (currentIndex + 1) % slides.length;
      slides[currentIndex].classList.add("active");
    }

    setInterval(showNextSlide, 2000);
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPage) {
        this.currentPage = page;
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    },
    resetPage() {
      this.currentPage = 1; // Reset về trang 1 khi tìm kiếm thay đổi
    },
  },
};
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.slideshow-background {
  position: relative;
  width: 100%;
  max-width: 1024px;
  height: 600px;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;
}

.slide {
  position: absolute;
  width: 70%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  margin-left: 15%;
}

.slide.active {
  opacity: 1;
}

.imageHome img {
  width: 20%;
  margin: 3px;
  border-radius: 10px;
}

.product-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 10px;
}

.image-container {
  text-align: center;
  width: 200px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.image-container img {
  width: 100%;
  border-radius: 8px;
}

.image-container h3 {
  margin: 15px 0 5px;
  color: #333;
}

.no-underline {
  text-decoration: none;
}

.image-container p {
  color: #13125e;
  font-size: 20px;
  float: left;
}

.status p {
  margin-left: 5%;
  margin-top: 11%;
  font-size: 15px;
  color: green;
}

.image-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.jus {
  margin-top: 10px;
}

.pagination-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination-buttons button {
  padding: 10px 15px;
  margin: 0 5px;
  background-color: #9cb7d4;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pagination-buttons button:hover:not(:disabled) {
  background-color: #0056b3;
}

.search-input {
  display: block;
  margin: 20px auto;
  padding: 10px;
  width: 80%;
  max-width: 400px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>