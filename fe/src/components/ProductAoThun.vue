<template>
  <div>
    <div class="background-Ao">
      <img src="https://img.upanh.tv/2025/03/23/backgroundAoThune4dfab68f762af4c.png" alt="" />
    </div>
    <div class="jus"></div>
    <div class="product-grid">
      <div v-for="cata in filterProduct" :key="cata.id" class="image-container">
        <router-link
          :to="{ name: 'ProductDetailAoThun', params: { id: cata.id } }"
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
      <p style="text-align: center">
        HAPPYSTORE là điểm đến lý tưởng cho tín đồ áo thun với hàng ngàn mẫu
        hàng hiệu cao cấp, đa dạng màu sắc, kiểu dáng như cổ tròn, trơn, tay
        dài, tay lỡ, form rộng.
      </p>
      <hr />
      <h1 style="text-align: center">
        <strong>Áo Thun Nam Đẹp Giá Tốt, Đa Dạng Mẫu Mã - HAPPYSTORE</strong>
      </h1>
      <p>
        Nắm bắt được xu hướng thời trang nhanh gọn giữa nhịp sống tất bật,
        HAPPYSTORE tự hào mang đến những mẫu áo thun cao cấp, đa dạng phong cách
        giúp bạn tự tin thể hiện bản thân. Hãy cùng HAPPYSTORE khẳng định phong
        cách với bộ sưu tập áo thun thiết kế độc quyền đầy ấn tượng!
      </p>
      <h2>
        <strong>Thương hiệu áo thun thời trang nam&nbsp;HAPPYSTORE</strong>
      </h2>
      <p>
        Là thương hiệu thời trang đồng hành cùng nam giới Việt,
        <strong>HAPPYSTORE </strong>luôn chú trọng vào chất lượng và sự đa dạng
        mẫu mã. Áo thun hàng hiệu của chúng tôi được làm từ
        <strong>cotton cao cấp với định lượng từ 220gsm đến 240gsm</strong>.
        Những chiếc áo thun có độ chắc tay nhất định khi sờ vào, nhưng luôn đảm
        bảo thấm hút, mềm mại, thoải mái khi mặc. Cùng với đó là form dáng
        regular tôn lên hình thể, phù hợp nhiều dáng người.
      </p>
      <p>
        Chúng tôi không đơn thuần là thương hiệu thời trang, mà còn là địa chỉ
        của những thiết kế độc đáo, thể hiện cá tính riêng. Với đội ngũ thiết kế
        tâm huyết, chúng tôi luôn cập nhật những xu hướng thời trang mới nhất.
        Đồng thời sáng tạo những mẫu áo thun mang đậm dấu ấn riêng.
      </p>
      <h2><strong>Hướng dẫn chọn size áo thun nam chuẩn nhất</strong></h2>
      <p>
        Chọn size áo thun nam tưởng chừng đơn giản nhưng lại khiến không ít
        người đau đầu. Áo quá rộng thùng thình có thể khiến bạn trông thiếu thẩm
        mỹ, kém thanh lịch, trong khi áo quá chật lại gây khó chịu và gò bó. Vậy
        làm thế nào để chọn được chiếc áo vừa vặn, tôn lên vóc dáng của bạn?
      </p>
      <ul>
        <li>
          Nắm rõ số đo cơ thể để dễ dàng tra cứu bảng size của từng thương hiệu.
        </li>
        <li>
          Nếu bạn có số đo nằm giữa hai size, hãy ưu tiên chọn size lớn hơn để
          đảm bảo sự thoải mái.
        </li>
        <li>
          Nếu bạn có vòng ngực đầy đặn, nên chọn áo có độ co giãn tốt hoặc tăng
          1 size so với bảng size gợi ý.
        </li>
        <li>
          Đối với áo thun form rộng, bạn có thể chọn size theo sở thích về độ
          rộng rãi mong muốn.
        </li>
      </ul>
      <p>
        <img src="https://img.upanh.tv/2025/03/23/bangSize34b14858c5e55508.png" alt="" />
      </p>
    </div>
  </div>
</template>

<script>
import { getSanPham } from "../api/productAPI";

export default {
  name: "ProductAoThun",
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
      return this.products.filter(product => product.category === "AoThun");
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
.background-Ao img {
  width: 80%;
  margin-top: 50px;
}
.introduction-AoThun {
  background-color: rgb(246, 246, 246);
  width: 80%;
  margin: 0 auto;
  padding: 5px;
  border-radius: 10px;
  margin-top: 10px;
}
</style>