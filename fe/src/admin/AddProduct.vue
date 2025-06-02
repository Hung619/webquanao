<template>
  <div class="container">
    <div class="form-container">
      <h2>Thêm sản phẩm</h2>
      <form @submit.prevent="submitForm">
        <div class="form-grid">
          <div class="form-group">
            <label for="name">Tên sản phẩm:</label>
            <input
              v-model="product.name"
              type="text"
              id="name"
              placeholder="Nhập tên sản phẩm"
              required
            />
          </div>
          <div class="form-group">
            <label for="image">Hình ảnh (URL):</label>
            <input
              v-model="product.image"
              type="text"
              id="image"
              placeholder="Nhập URL hình ảnh"
              required
            />
          </div>
          <div class="form-group">
            <label for="price">Giá (VNĐ):</label>
            <input
              v-model.number="product.price"
              type="number"
              id="price"
              step="0.01"
              placeholder="Nhập giá sản phẩm"
              required
            />
          </div>
          <div class="form-group">
            <label for="size">Kích thước:</label>
            <input
              v-model="product.size"
              type="text"
              id="size"
              placeholder="Nhập kích thước (VD: S,M,L)"
              required
            />
          </div>
          <div class="form-group">
            <label for="quality">Số lượng tồn kho:</label>
            <input
              v-model.number="product.quality"
              type="number"
              id="quality"
              placeholder="Nhập số lượng tồn kho"
              required
            />
          </div>
          <div class="form-group">
            <label for="category">Danh mục:</label>
            <select v-model="product.category" id="category" required>
              <option value="AoThun">Áo Thun</option>
              <option value="AoSoMi">Áo Sơ Mi</option>
              <option value="QuanJean">Quần Jean</option>
              <option value="QuanShort">Quần Short</option>
            </select>
          </div>
          <div class="form-group">
            <label for="status">Trạng thái:</label>
            <select v-model="product.status" id="status" required>
              <option value="Còn Hàng">Còn Hàng</option>
              <option value="Hết Hàng">Hết Hàng</option>
            </select>
          </div>
        </div>
        <div class="form-group full-width">
          <img v-if="product.image" :src="product.image" alt="Preview" class="image-preview" />
        </div>
        <div class="form-group full-width">
          <label for="description">Mô tả:</label>
          <textarea
            v-model="product.description"
            id="description"
            placeholder="Nhập mô tả sản phẩm"
          ></textarea>
        </div>
        <p v-if="error" class="error">{{ error }}</p>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary" :disabled="isLoading">
            {{ isLoading ? 'Đang thêm...' : 'Thêm' }}
          </button>
          <button type="button" class="btn btn-secondary" @click="cancel">Hủy</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { createSanPham } from '../api/productAPI';

export default {
  data() {
    return {
      product: {
        name: '',
        image: '',
        price: 0,
        size: '',
        quality: 0,
        description: '',
        category: 'AoThun',
        status: 'Còn Hàng',
        createdAt: new Date().toISOString()
      },
      error: '',
      isLoading: false,
    };
  },
  methods: {
    async submitForm() {
      if (!this.product.name || !this.product.image || !this.product.price || !this.product.size || !this.product.quality || !this.product.category || !this.product.status) {
        this.error = 'Vui lòng điền đầy đủ các trường bắt buộc!';
        return;
      }
      if (this.product.price < 0 || this.product.quality < 0) {
        this.error = 'Giá và số lượng tồn kho không được âm!';
        return;
      }
      const urlRegex = /^(https?:\/\/[^\s$.?#].[^\s]*)$/;
      if (!urlRegex.test(this.product.image)) {
        this.error = 'URL hình ảnh không hợp lệ!';
        return;
      }
      const sizeRegex = /^[SML](,[SML])*$/;
      if (!sizeRegex.test(this.product.size)) {
        this.error = 'Kích thước không hợp lệ! Vui lòng nhập dạng S,M,L';
        return;
      }
      this.isLoading = true;
      this.error = '';
      try {
        console.log('Dữ liệu gửi đi:', this.product);
        await createSanPham(this.product);
        alert('Thêm sản phẩm thành công!');
        this.$router.push('/productList');
      } catch (error) {
        console.error('Lỗi chi tiết:', error);
        this.error = error.response?.data?.message || 'Lỗi khi thêm sản phẩm! Vui lòng kiểm tra console để biết thêm chi tiết.';
      } finally {
        this.isLoading = false;
      }
    },
    cancel() {
      this.$router.push('/productList');
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 2200px;
  margin: 0 auto;
  padding: 20px;
}

.form-container {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr; /* 2 cột đều nhau */
  gap: 20px; /* Khoảng cách giữa các cột và hàng */
}

.form-group {
  margin-bottom: 20px;
}

.form-group.full-width {
  grid-column: 1 / -1; /* Chiếm toàn bộ chiều rộng */
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 16px;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  box-sizing: border-box;
}

.form-group textarea {
  height: 150px;
  resize: vertical;
}

.image-preview {
  max-width: 300px;
  margin-top: 10px;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  gap: 15px;
}

.btn {
  padding: 12px 25px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.error {
  color: red;
  margin-bottom: 10px;
  font-size: 16px;
}
</style>