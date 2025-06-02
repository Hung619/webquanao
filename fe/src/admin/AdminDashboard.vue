<template>
    <div class="container">
      <div class="dashboard">
        <h2>Trang quản trị</h2>
        <p>Chào mừng bạn, {{ currentUser.fullname }}! Bạn đang đăng nhập với vai trò Admin.</p>
        <div class="options">
          <div class="option-card" @click="goToProducts">
            <h3>Management Product</h3>
            <p>Xem, thêm, sửa, xóa danh sách sản phẩm.</p>
            <button class="btn btn-primary">Đi đến Quản lý sản phẩm</button>
          </div>
          <div class="option-card" @click="goToUsers">
            <h3>Management User</h3>
            <p>Xem, thêm, sửa, xóa danh sách người dùng.</p>
            <button class="btn btn-primary">Đi đến Quản lý người dùng</button>
          </div>
        </div>
        <button class="btn btn-secondary logout" @click="logout">Đăng xuất</button>
      </div>
    </div>
  </template>
  
  <script>
  import eventBus from '@/eventBus';
  
  export default {
    data() {
      return {
        currentUser: null,
      };
    },
    created() {
      // Lấy thông tin người dùng từ localStorage
      const user = JSON.parse(localStorage.getItem('currentUser'));
      if (user && user.role === 'Admin') {
        this.currentUser = user;
      } else {
        // Nếu không phải Admin, chuyển về trang chủ hoặc login
        this.$router.push('/comLogin');
      }
    },
    methods: {
      goToProducts() {
        this.$router.push('/productList'); // Hoặc '/admin/products' tùy cấu hình
      },
      goToUsers() {
        this.$router.push('/admin/users');
      },
      logout() {
        localStorage.removeItem('currentUser');
        eventBus.emit('logout');
        alert('Đã đăng xuất!');
        this.$router.push('/comLogin');
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
  
  .dashboard {
    background-color: #f9f9f9;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  h2 {
    margin-bottom: 20px;
    color: #007bff;
  }
  
  p {
    margin-bottom: 30px;
    font-size: 16px;
  }
  
  .options {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 30px;
  }
  
  .option-card {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    width: 300px;
    cursor: pointer;
    transition: transform 0.2s;
  }
  
  .option-card:hover {
    transform: translateY(-5px);
  }
  
  .option-card h3 {
    margin-bottom: 10px;
    color: #333;
  }
  
  .option-card p {
    margin-bottom: 15px;
    color: #666;
    font-size: 14px;
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
  
  .btn-primary:hover {
    background-color: #0056b3;
  }
  
  .btn-secondary {
    background-color: #6c757d;
    color: white;
  }
  
  .btn-secondary:hover {
    background-color: #5a6268;
  }
  
  .logout {
    margin-top: 20px;
  }
  </style>