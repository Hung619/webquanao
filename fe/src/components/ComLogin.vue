<template>
  <body>
    <div class="container-Login">
      <div class="toggle-buttons-Login">
        <button :class="{ active: isLoginForm }" @click="showLoginForm">
          Đăng nhập
        </button>
        <button :class="{ active: !isLoginForm }" @click="showRegisterForm">
          Đăng ký
        </button>
      </div>

      <div v-if="isLoginForm" class="wrapper-Login">
        <!-- Form Đăng nhập -->
        <form @submit.prevent="submitLogin">
          <h1>Đăng nhập</h1>
          <div class="input-box-Login">
            <input
              v-model="usernamelogin"
              type="text"
              placeholder="Tên đăng nhập"
              required
            />
          </div>
          <div class="input-box-Login-PassWord">
            <input
              v-model="passwordlogin"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Mật khẩu"
              required
            />
            <span class="toggle-password-Login" @click="togglePassword"> </span>
          </div>

          <button type="submit" class="btn-Login btn-icon-Login" :disabled="isLoading">
            {{ isLoading ? 'Đang đăng nhập...' : 'Đăng nhập' }}
            <ion-icon
              name="arrow-forward-circle-outline"
              id="icon-arrow-Login"
            ></ion-icon>
          </button>
        </form>
      </div>
      <!-- Form Đăng ký -->
      <div v-else class="wrapper-Login">
        <form @submit.prevent="submitRegister">
          <h1>Đăng ký</h1>
          <div class="input-box-Login">
            <input
              v-model="fullName"
              type="text"
              placeholder="Họ và tên"
              required
            />
          </div>
          <div class="input-box-Login">
            <input
              v-model="email"
              type="email"
              placeholder="Email"
              required
            />
          </div>
          <div class="input-box-Login">
            <input
              v-model="phoneNumber"
              type="text"
              placeholder="Số điện thoại (tùy chọn)"
            />
          </div>
          <div class="input-box-Login">
            <input
              v-model="address"
              type="text"
              placeholder="Địa chỉ (tùy chọn)"
            />
          </div>
          <div class="input-box-Login-PassWord">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              placeholder="Mật khẩu"
              required
            />
            <span class="toggle-password-Login" @click="togglePassword"></span>
          </div>
          <div class="input-box-Login-PassWord">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="confirmPassword"
              placeholder="Nhập lại mật khẩu"
              required
            />
          </div>
          <p v-if="error" class="error" style="color: red">{{ error }}</p>
          <button type="submit" class="btn-Login btn-icon-Login" :disabled="isLoading">
            {{ isLoading ? 'Đang đăng ký...' : 'Đăng ký' }}
            <ion-icon
              name="arrow-forward-circle-outline"
              id="icon-arrow-Login"
            ></ion-icon>
          </button>
        </form>
      </div>
    </div>
  </body>
</template>

<script>
import { createUser, loginUser } from "../api/usersAPI";
import eventBus from "@/eventBus";

export default {
  data() {
    return {
      isLoginForm: true,
      showPassword: false,
      usernamelogin: "",
      passwordlogin: "",
      error: "",
      fullName: "",
      email: "",
      phoneNumber: "",
      address: "",
      password: "",
      confirmPassword: "",
      isLoading: false, // Trạng thái loading
    };
  },
  created() {
    // Kiểm tra nếu đã đăng nhập thì chuyển hướng ngay
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      if (currentUser.role === 'Customer') {
        this.$router.push('/');
      } else if (currentUser.role === 'Admin') {
        this.$router.push('/productList');
      }
    }
  },
  methods: {
    showLoginForm() {
      this.isLoginForm = true;
    },
    showRegisterForm() {
      this.isLoginForm = false;
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    async submitRegister() {
      if (this.password !== this.confirmPassword) {
        alert("Mật khẩu không khớp!");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        this.error = "Email không hợp lệ!";
        alert("Email không hợp lệ!");
        return;
      }

      if (this.phoneNumber) {
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(this.phoneNumber)) {
          this.error = "Số điện thoại không hợp lệ (phải có 10 chữ số)!";
          alert("Nhập số điện thoại sai!");
          return;
        }
      }

      this.isLoading = true;
      try {
        const newUser = {
          fullname: this.fullName,
          email: this.email,
          password: this.password,
          phoneNumber: this.phoneNumber || null,
          address: this.address || null,
          role: "Customer",
        };

        await createUser(newUser);
        alert("Đăng ký thành công!");

        this.fullName = "";
        this.email = "";
        this.phoneNumber = "";
        this.address = "";
        this.password = "";
        this.confirmPassword = "";
        this.error = "";
        this.isLoginForm = true;
      } catch (error) {
        this.error = error.response?.data?.message || "Đăng ký thất bại!";
      } finally {
        this.isLoading = false;
      }
    },
    async submitLogin() {
      this.isLoading = true;
      try {
            const user = await loginUser(this.usernamelogin, this.passwordlogin);
            console.log('User nhận được:', user);
            localStorage.setItem("currentUser", JSON.stringify(user));
            eventBus.emit("loginSuccess", user);

        if (user.role === "Customer") {
          this.$router.push("/");
        } else if (user.role === "Admin") {
          this.$router.push("/adminDashboard");
        } else {
          throw new Error("Vai trò không hợp lệ!");
        }

        alert("Đăng nhập thành công!");
      } catch (error) {
        console.error("Lỗi khi đăng nhập:", error);
        alert(error.response?.data?.message || "Đăng nhập thất bại!");
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #ffffff;
  border: 5px solid rgba(255, 255, 255, 1);
  border-radius: 12px;
  margin: 0; /* Loại bỏ margin mặc định của body */
}

.container-Login {
  background-color: #fff;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
}

.toggle-buttons-Login {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.toggle-buttons-Login button {
  padding: 10px 20px;
  border: none;
  background-color: #ddd;
  cursor: pointer;
  font-weight: bold;
  border-radius: 5px;
  transition: background-color 0.3s ease; /* Thêm hiệu ứng mượt mà */
}

.toggle-buttons-Login .active {
  background-color: #6db8f9;
  color: white;
}

.wrapper-Login {
  width: 100%;
  max-width: 420px;
  color: #333;
  padding: 30px 20px;
}

.wrapper-Login h1 {
  font-size: 32px;
  text-align: center;
  margin-bottom: 20px;
  color: #6db8f9;
}

/* Đồng nhất input cho cả hai loại input-box */
.input-box-Login,
.input-box-Login-PassWord {
  position: relative; /* Để hỗ trợ toggle-password */
  margin-bottom: 15px; /* Khoảng cách giữa các input */
}

.input-box-Login input,
.input-box-Login-PassWord input {
  width: 100%; /* Đồng nhất chiều rộng */
  background: transparent;
  border: 2px solid rgba(0, 0, 0, 0.1);
  outline: none;
  border-radius: 10px;
  font-size: 16px;
  color: #333;
  padding: 15px;
  box-sizing: border-box; /* Đảm bảo padding không làm tăng kích thước */
}

.input-box-Login input::placeholder,
.input-box-Login-PassWord input::placeholder {
  color: #888;
}

.toggle-password-Login {
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  color: #333;
  cursor: pointer;
  font-size: 18px;
}

.btn-Login {
  width: 100%;
  height: 45px;
  background: #6db8f9;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  color: white;
  font-weight: 600;
  margin-top: 20px;
  transition: opacity 0.3s ease; /* Hiệu ứng mượt mà */
}

.btn-Login:disabled {
  background: #cccccc;
  cursor: not-allowed;
  opacity: 1; /* Đảm bảo nút disabled không bị mờ */
}

.social-login-Login,
.social-register-Login {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
}

.toggle-buttons-Login button:hover,
.social-btn-Login:hover,
.btn-Login:hover:not(:disabled) { /* Chỉ áp dụng hover khi không disabled */
  opacity: 0.6;
}

.or-Login {
  text-align: center;
  margin: 10px 0;
  color: #777;
}

.social-btn-Login {
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  padding: 0 10px;
  font-weight: 600;
  gap: 10px;
  transition: opacity 0.3s ease; /* Hiệu ứng mượt mà */
}

.btn-icon-Login {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.google-btn-Login {
  background-color: #db4437;
}

.facebook-btn-Login {
  background-color: #3b5998;
}

.social-btn-Login ion-icon {
  font-size: 23px;
}

#icon-arrow-Login {
  font-size: 23px;
}
</style>