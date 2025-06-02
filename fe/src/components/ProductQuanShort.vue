<template>
  <div>
    <div class="background-Ao">
      <img src="https://img.upanh.tv/2025/03/23/backgroundQuanShortd31d16312e1e3c3e.png" alt="" />
    </div>
    <div class="jus"></div>
    <div class="product-grid">
      <div v-for="cata in filterProduct" :key="cata.id" class="image-container">
        <router-link
          :to="{ name: 'ProductDetailQuanShort', params: { id: cata.id } }"
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
        Update tủ đồ hè của bạn cùng bộ sưu tập quần short túi hộp, ống đứng,
        ống suông đẹp, cá tính, đầy năng động, hứng khởi tại thương hiệu thời
        trang nam HAPPYSTORE.
      </p>
      <hr />
      <h1 style="text-align: center">
        <strong>Quần Short Nam, Đa Dạng Kiểu Dáng</strong>
      </h1>
      <p>
        Mùa hè sôi động đang đến gần, tận hưởng bầu không khí náo nhiệt vì đây
        cũng là dịp update tủ đồ hè của bạn với những chiếc quần short và cá
        tính từ HAPPYSTORE. Chúng tôi tự hào mang đến cho bạn bộ sưu tập quần
        short nam đẹp đa dạng, đáp ứng mọi nhu cầu và sở thích!
      </p>
      <h2><strong>Các mẫu quần short nam model nhất tại HAPPYSTORE</strong></h2>
      <p>
        HAPPYSTORE mang đến đa dạng các mẫu short nam, đáp ứng mọi nhu cầu và
        phong cách của bạn. Dưới đây là một số gợi ý "hot trend" không thể bỏ
        qua:
      </p>
      <h3><strong>Quần short Jean nam</strong></h3>
      <p>
        Từ chất liệu jean co giãn thoải mái đến 100% denim mềm mại, thấm hút,
        short jean mang đến tiện lợi cho mọi hoạt động. Thiết kế đa dạng từ
        basic trơn đến cá tính, giúp bạn dễ dàng thể hiện phong cách riêng. Dù
        dạo phố, picnic hay các hoạt động ngoài trời, short jean luôn là lựa
        chọn hoàn hảo cho sự năng động và tự tin.
      </p>
      <h2 style="text-align: justify">
        <strong>Bảng size quần Short nam chính xác nhất</strong>
      </h2>
      <p style="text-align: justify">
        Để đảm bảo quần jean vừa vặn và tôn dáng hoàn hảo, việc chọn đúng size
        là rất quan trọng. Dưới đây là bảng size quần Short nam chuẩn nhất của
        HAPPYSTORE:
      </p>
      <p>
        <img src="https://img.upanh.tv/2025/03/23/bangSizeQuanShort7dd3a02e7d47cc0d.png" alt="" />
      </p>

      <h2><strong>Cửa hàng quần áo nam HAPPYSTORE</strong></h2>
      <p>
        HAPPYSTORE là thương hiệu thời trang nam uy tín, cung cấp các mẫu short
        nam chính hãng. Sản phẩm được làm từ chất liệu cao cấp, đảm bảo độ bền
        đẹp và thoải mái tối đa.
      </p>
      <p>
        Đến với HAPPYSTORE, bạn sẽ chìm đắm trong thế giới thời trang nam với vô
        số mẫu mã, kiểu dáng và màu sắc. Ngoài ra, HAPPYSTORE còn có dịch vụ
        giao hàng miễn phí tận nơi cho hóa đơn từ 399.000 đồng trở lên. Bên cạnh
        đó là chương trình cộng dồn Membership lên đến 15%.
      </p>
    </div>
  </div>
</template>

<script>
import { getSanPham } from "../api/productAPI";
export default {
  name: "ProductQuanShort",
  data() {
    return {
      products: [],
      currentPage: 1,
      limit: 8,
  
    };
  },
  computed: {
    // Lọc sản phẩm có category là "AoThun"
    filteredAoThunProducts() {
      return this.products.filter(product => product.category === "QuanShort");
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
</style>
