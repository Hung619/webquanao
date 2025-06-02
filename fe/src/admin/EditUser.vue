<template>
  <div class="container">
    <div class="form-container">
      <h2>Sửa người dùng</h2>
      <form @submit.prevent="submitForm">
        <div class="form-grid">
          <div class="form-group">
            <label for="fullName">Họ và tên:</label>
            <input
              v-model="user.fullname"
              type="text"
              id="fullName"
              placeholder="Nhập họ và tên"
              required
            />
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input
              v-model="user.email"
              type="email"
              id="email"
              placeholder="Nhập email"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">Mật khẩu (để trống nếu không thay đổi):</label>
            <input
              v-model="user.password"
              type="password"
              id="password"
              placeholder="Nhập mật khẩu mới"
            />
          </div>
          <div class="form-group">
            <label for="phoneNumber">Số điện thoại:</label>
            <input
              v-model="user.phoneNumber"
              type="text"
              id="phoneNumber"
              placeholder="Nhập số điện thoại (tùy chọn)"
            />
          </div>
          <div class="form-group">
            <label for="address">Địa chỉ:</label>
            <input
              v-model="user.address"
              type="text"
              id="address"
              placeholder="Nhập địa chỉ (tùy chọn)"
            />
          </div>
          <div class="form-group">
            <label for="role">Vai trò:</label>
            <select v-model="user.role" id="role" required>
              <option value="" disabled>Chọn vai trò</option>
              <option value="Customer">Customer</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        </div>
        <p v-if="error" class="error">{{ error }}</p>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary" :disabled="isLoading">
            {{ isLoading ? 'Đang cập nhật...' : 'Cập nhật' }}
          </button>
          <button type="button" class="btn btn-secondary" @click="cancel">Hủy</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { getUser, updateUser } from '../api/usersAPI';

export default {
  data() {
    return {
      user: {
        fullname: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: '',
        role: '',
      },
      error: '',
      isLoading: false,
    };
  },
  async created() {
    await this.fetchUser();
  },
  methods: {
    async fetchUser() {
      try {
        const id = this.$route.params.id;
        const userData = await getUser(); // Lấy danh sách và lọc theo id
        const user = userData.find(u => u.id === parseInt(id));
        if (user) {
          this.user = { ...user, password: '' }; // Không hiển thị mật khẩu cũ
        } else {
          this.error = 'Không tìm thấy người dùng!';
        }
      } catch (error) {
        this.error = 'Lỗi khi lấy thông tin người dùng!';
        console.error(error);
      }
    },
    async submitForm() {
      if (!this.user.fullname || !this.user.email || !this.user.role) {
        this.error = 'Vui lòng điền đầy đủ các trường bắt buộc!';
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.user.email)) {
        this.error = 'Email không hợp lệ!';
        return;
      }
      if (this.user.phoneNumber) {
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(this.user.phoneNumber)) {
          this.error = 'Số điện thoại không hợp lệ (phải có 10 chữ số)!';
          return;
        }
      }
      this.isLoading = true;
      this.error = '';
      try {
        const id = this.$route.params.id;
        await updateUser(id, this.user);
        alert('Cập nhật người dùng thành công!');
        this.$router.push('/admin/users');
      } catch (error) {
        this.error = error.response?.data?.message || 'Lỗi khi cập nhật người dùng!';
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    cancel() {
      this.$router.push('/admin/users');
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 2200px; /* Tăng chiều rộng tối đa */
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

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 16px; /* Tăng kích thước chữ của label */
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 12px; /* Tăng padding để trường to hơn */
  border: 1px solid #ddd;
  border-radius: 6px; /* Tăng border-radius */
  font-size: 16px; /* Tăng kích thước chữ */
  box-sizing: border-box;
}

.form-actions {
  display: flex;
  gap: 15px; /* Tăng khoảng cách giữa các nút */
}

.btn {
  padding: 12px 25px; /* Tăng kích thước nút */
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px; /* Tăng kích thước chữ nút */
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
  font-size: 16px; /* Tăng kích thước chữ thông báo lỗi */
}
</style>