<template>
  <div class="background-Ao">
    <img src="https://img.upanh.tv/2025/03/23/backgroundAoSoMi21e12841a8cc0cf2.png" alt="" />
  </div>
  <div class="jus"></div>
  <div class="product-grid">
    <div v-for="cata in filterProduct" :key="cata.id" class="image-container">
      <router-link
        :to="{ name: 'ProductDetailAoSoMi', params: { id: cata.id } }"
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
  <div class="pagination-buttons">
    <button
      v-for="page in totalPage"
      :key="page"
      :class="{ active: page === currentPage }"
      @click="changePage(page)"
    >
      {{ page }}
    </button>
  </div>
  <div class="introduction-AoThun">
    <p>
      HAPPYSTORE cung cấp các mẫu áo sơ mi nam chất liệu cao cấp, thiết kế lịch
      lãm, đa dạng kiểu dáng như tay ngắn, tay dài cổ trụ, form rộng, phù hợp
      mọi hoàn cảnh.
    </p>
    <hr />
    <h1 style="text-align: center">
      <strong>Áo Sơ Mi Nam Dạo Phố, Công Sở Thương Hiệu HAPPYSTORE</strong>
    </h1>
    <p>
      Áo sơ mi - biểu tượng thời trang trường tồn theo thời gian, là item không
      thể thiếu trong món đồ của bất kỳ ai. Dù bạn là ai, theo đuổi phong cách
      nào, áo sơ mi cũng có thể giúp thể hiện bản thân một cách hoàn hảo nhất.
      Hiểu được điều đó, <strong>HAPPYSTORE </strong>luôn nỗ lực phát triển
      những sản phẩm chất lượng, đa dạng phong cách, đáp ứng mọi nhu cầu.
    </p>
    <h2><strong>Top những mẫu áo sơ mi nam HOT nhất tại HAPPYSTORE</strong></h2>
    <p>
      Tại HAPPYSTORE, áo sơ mi nam luôn là items được phái mạnh săn đón nhiều
      nhất. Dưới đây là một số mẫu áo sơ mi nam đẹp thịnh hành nhất tại
      HAPPYSTORE mà bạn không nên bỏ qua:
    </p>
    <h2><strong>Hướng dẫn chọn size áo sơ mi nam chuẩn nhất</strong></h2>
    <p>
      Lựa chọn size áo sơ mi nam chuẩn là chìa khóa để tôn lên vóc dáng và phong
      cách của bạn. Sau đây là bí quyết "chuẩn chỉnh" giúp bạn tự tin lựa chọn
      áo sơ mi phù hợp:
    </p>
    <ul>
      <li>Dựa vào số đo của cơ thể để chọn size áo phù hợp.</li>
      <li>
        Nên chọn áo có độ rộng vừa phải để thoải mái cử động. Không nên chọn áo
        quá ôm sẽ khiến bạn khó chịu, lộ khuyết điểm hoặc áo quá rộng khiến bạn
        trông luộm thuộm.
      </li>
      <li>
        Nên thử áo trước khi mua để đảm bảo chiếc áo vừa vặn với cơ thể. Hãy thử
        với quần tây sẽ phối cùng để chắc chắn có được một set đồ phù hợp.
      </li>
      <li>
        Ngoài ra, bạn cũng có thể tham khảo bảng size chuẩn của HAPPYSTORE dưới
        đây để dễ dàng lựa chọn.
      </li>
    </ul>
    <p class="bangSizeAoSoMi">
      <img src="https://img.upanh.tv/2025/03/23/bangSizeAoSoMi.jpg" alt="" />
    </p>
  </div>
</template>

<script>
import { getSanPham } from "../api/productAPI";
export default {
  name: "ProductSoMi",
  data() {
    return {
      products: [],
      currentPage: 1,
      limit: 8,
    };
  },
  computed: {
    filteredAoThunProducts() {
      return this.products.filter(product => product.category === "AoSoMi");
    },
    totalPage() {
      return Math.ceil(this.filteredAoThunProducts.length / this.limit);
    },
    filterProduct() {
      const start = (this.currentPage - 1) * this.limit;
      const end = start + this.limit;
      return this.filteredAoThunProducts.slice(start, end);
    },
  },
  async mounted() {
    // Gọi API để lấy danh sách sản phẩm khi component được mounted
    try {
      this.products = await getSanPham();
      console.log(this.products);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
      this.error = true;
    } finally {
      this.loading = false;
    }
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPage) {
        this.currentPage = page;
        window.scrollTo({
          top: 0,
          behavior: "smooth", // Tạo hiệu ứng cuộn mượt mà
        });
      }
    },
  },
};
</script>

<style>
.bangSizeAoSoMi img {
  width: 95%;
}
</style>
