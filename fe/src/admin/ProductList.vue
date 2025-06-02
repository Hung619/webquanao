<template>
  <div class="container">
    <!-- Danh sách sản phẩm -->
    <div class="product-list">
      <h2>Danh sách sản phẩm</h2>
      <div class="actions">
        <button class="btn btn-primary" @click="$router.push('/admin/add-product')">
          Thêm sản phẩm
        </button>
      </div>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên sản phẩm</th>
              <th>Hình ảnh</th>
              <th>Giá</th>
              <th>Kích thước</th>
              <th>Số lượng</th>
              <th>Mô tả</th>
              <th>Danh mục</th>
              <th>Trạng thái</th>
              <th>Ngày tạo</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in products" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>
                <img :src="item.image" alt="Product Image" class="product-image" />
              </td>
              <td>{{ item.price }}</td>
              <td>{{ item.size }}</td>
              <td>{{ item.quality }}</td>
              <td>{{ item.description || 'Không có mô tả' }}</td>
              <td>{{ item.category }}</td>
              <td>{{ item.status }}</td>
              <td>{{ new Date(item.createdAt).toLocaleDateString() }}</td>
              <td>
                <button class="btn btn-edit" @click="$router.push(`/admin/edit-product/${item.id}`)">Sửa</button>
                <button class="btn btn-delete" @click="deleteProduct(item.id)">Xóa</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { getSanPham, deleteSanPham } from '../api/productAPI';

export default {
  data() {
    return {
      products: [], // Danh sách sản phẩm
      error: '', // Thông báo lỗi
    };
  },
  async created() {
    await this.fetchProducts(); // Lấy danh sách sản phẩm khi component được tạo
  },
  methods: {
    // Lấy danh sách sản phẩm
    async fetchProducts() {
      try {
        this.products = await getSanPham();
      } catch (error) {
        this.error = 'Lỗi khi lấy danh sách sản phẩm!';
        console.error(error);
      }
    },

    // Xóa sản phẩm
    async deleteProduct(id) {
      if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
        try {
          await deleteSanPham(id);
          alert('Xóa sản phẩm thành công!');
          await this.fetchProducts();
        } catch (error) {
          this.error = 'Lỗi khi xóa sản phẩm!';
        }
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.actions {
  margin-bottom: 20px;
}

.product-list {
  margin-top: 20px;
}

.table-wrapper {
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 4px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th, td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f1f1f1;
  font-weight: bold;
  position: sticky;
  top: 0;
  z-index: 1;
}

tr:hover {
  background-color: #f5f5f5;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-edit {
  background-color: #28a745;
  color: white;
  margin-right: 5px;
}

.btn-delete {
  background-color: #dc3545;
  color: white;
}

.product-image {
  max-width: 50px;
  max-height: 50px;
  object-fit: cover;
}

.error {
  color: red;
  margin-bottom: 10px;
}
</style>