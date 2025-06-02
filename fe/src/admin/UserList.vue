<template>
    <div class="container">
      <!-- Danh sách người dùng -->
      <div class="user-list">
        <h2>Danh sách người dùng</h2>
        <div class="actions">
          <button class="btn btn-primary" @click="$router.push('/admin/add-user')">
            Thêm User
          </button>
        </div>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Họ và tên</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Địa chỉ</th>
                <th>Vai trò</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.fullname }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.phoneNumber || 'Không có' }}</td>
                <td>{{ user.address || 'Không có' }}</td>
                <td>{{ user.role }}</td>
                <td>
                  <button class="btn btn-edit" @click="$router.push(`/admin/edit-user/${user.id}`)">Sửa</button>
                  <button class="btn btn-delete" @click="deleteUser(user.id)">Xóa</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { getUser, deleteUser } from '../api/usersAPI';
  
  export default {
    data() {
      return {
        users: [], // Danh sách người dùng
        error: '', // Thông báo lỗi
      };
    },
    async created() {
      await this.fetchUsers(); // Lấy danh sách người dùng khi component được tạo
    },
    methods: {
      // Lấy danh sách người dùng
      async fetchUsers() {
        try {
          this.users = await getUser();
        } catch (error) {
          this.error = 'Lỗi khi lấy danh sách người dùng!';
          console.error(error);
        }
      },
  
      // Xóa người dùng
      async deleteUser(id) {
        if (confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
          try {
            await deleteUser(id);
            alert('Xóa người dùng thành công!');
            await this.fetchUsers();
          } catch (error) {
            this.error = 'Lỗi khi xóa người dùng!';
            console.error(error);
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
  
  .user-list {
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
  
  th,
  td {
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
  
  .error {
    color: red;
    margin-bottom: 10px;
  }
  </style>