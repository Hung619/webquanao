import { createWebHistory, createRouter } from "vue-router";

import ProductHome from '@/components/ProductHome.vue';
import ProductAoSoMi from '@/components/ProductAoSoMi.vue';
import ProductQuanShort from '@/components/ProductQuanShort.vue';
import ProductAoThun from '@/components/ProductAoThun.vue';
import ProductQuanJean from '@/components/ProductQuanJean.vue';
import ProductDetailHome from '@/components/ProductDetailHome.vue';
import ProductDetailAoSoMi from '@/components/ProductDetailAoSoMi.vue';
import ProductDetailAoThun from '@/components/ProductDetailAoThun.vue';
import ProductDetailQuanJean from '@/components/ProductDetailQuanJean.vue';
import ProductDetailQuanShort from '@/components/ProductDetailQuanShort.vue';
import ComCart from '@/components/ComCart.vue';
import ComPayment from '@/components/ComPayment.vue';
import ComLogin from '@/components/ComLogin.vue';
import OrderHistory from '@/components/ComOrderHistory';
import ProductList from "@/admin/ProductList.vue";
import AddProduct from "@/admin/AddProduct.vue";
import EditProduct from "@/admin/EditProduct.vue";
import UserList from '@/admin/UserList.vue';
import AddUser from '@/admin/AddUser.vue';
import EditUser from '@/admin/EditUser.vue';
import AdminDashboard from "@/admin/AdminDashboard.vue";

const routes = [
  {
    path: "/",
    name: "ProductHome",
    component: ProductHome,
    meta: { requiresAuth: true, role: ['Customer', 'Admin'] },
  },
  {
    path: "/productAoSoMi",
    name: "ProductAoSoMi",
    component: ProductAoSoMi,
    meta: { requiresAuth: true, role: ['Customer', 'Admin'] },
  },
  {
    path: "/productAoThun",
    name: "ProductAoThun",
    component: ProductAoThun,
    meta: { requiresAuth: true, role: ['Customer', 'Admin'] },
  },
  {
    path: "/productQuanShort",
    name: "ProductQuanShort",
    component: ProductQuanShort,
    meta: { requiresAuth: true, role: ['Customer', 'Admin'] }, // Sửa để Admin cũng truy cập được
  },
  {
    path: "/productQuanJean",
    name: "ProductQuanJean",
    component: ProductQuanJean,
    meta: { requiresAuth: true, role: ['Customer', 'Admin'] }, // Sửa để Admin cũng truy cập được
  },
  {
    path: "/productDetailHome",
    name: "ProductDetailHome",
    component: ProductDetailHome,
    meta: { requiresAuth: true, role: 'Customer' }, // Sửa để Admin cũng truy cập được
  },
  {
    path: "/productDetailAoSoMi/:id",
    name: "ProductDetailAoSoMi",
    component: ProductDetailAoSoMi,
    meta: { requiresAuth: true, role: 'Customer'}, // Sửa để Admin cũng truy cập được
  },
  {
    path: "/productDetailAoThun/:id",
    name: "ProductDetailAoThun",
    component: ProductDetailAoThun,
    meta: { requiresAuth: true, role: 'Customer' }, // Sửa để Admin cũng truy cập được
  },
  {
    path: "/productDetailQuanJean/:id",
    name: "ProductDetailQuanJean",
    component: ProductDetailQuanJean,
    meta: { requiresAuth: true, role: 'Customer' }, // Sửa để Admin cũng truy cập được
  },
  {
    path: "/productDetailQuanShort/:id",
    name: "ProductDetailQuanShort",
    component: ProductDetailQuanShort,
    meta: { requiresAuth: true, role: 'Customer' }, // Sửa để Admin cũng truy cập được
  },
  {
    path: "/comCart",
    name: "ComCart",
    component: ComCart,
    meta: { requiresAuth: true, role: 'Customer' },
  },
  {
    path: "/comPayment",
    name: "ComPayment",
    component: ComPayment,
    meta: { requiresAuth: true, role: 'Customer' },
  },
  {
    path: "/comLogin",
    name: "ComLogin",
    component: ComLogin,
  },
  {
    path: "/orderHistory",
    name: "OrderHistory",
    component: OrderHistory,
    meta: { requiresAuth: true, role: 'Customer' },
  },
  {
    path: "/adminDashboard",
    name: "adminDashboard",
    component: AdminDashboard,
    meta: { requiresAuth: true, role: 'Admin' },
  },
  {
    path: "/productList",
    name: "productList",
    component: ProductList,
    meta: { requiresAuth: true, role: 'Admin' },
  },
  {
    path: "/admin/add-product",
    name: "AddProduct",
    component: AddProduct,
    meta: { requiresAuth: true, role: 'Admin' },
  },
  {
    path: "/admin/edit-product/:id",
    name: "EditProduct",
    component: EditProduct,
    meta: { requiresAuth: true, role: 'Admin' },
  },
  {
    path: '/admin/users',
    name: 'UserList',
    component: UserList,
    meta: { requiresAuth: true, role: 'Admin' },
  },
  {
    path: '/admin/add-user',
    name: 'AddUser',
    component: AddUser,
    meta: { requiresAuth: true, role: 'Admin' },
  },
  {
    path: '/admin/edit-user/:id',
    name: 'EditUser',
    component: EditUser,
    meta: { requiresAuth: true, role: 'Admin' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // Nếu route yêu cầu đăng nhập
  if (to.meta.requiresAuth) {
    if (!currentUser || !currentUser.role) {
      console.log('Chưa đăng nhập hoặc không có role, chuyển đến /comLogin');
      return next('/comLogin');
    }

    // Chuyển requiredRole thành mảng nếu nó chưa phải mảng
    const requiredRole = Array.isArray(to.meta.role) ? to.meta.role : [to.meta.role];
    const userRole = currentUser.role;

    console.log('Required roles:', requiredRole);
    console.log('User role:', userRole);

    // Kiểm tra xem vai trò của user có trong danh sách requiredRole không
    if (!requiredRole.includes(userRole)) {
      console.log('Vai trò không được phép');
      if (userRole === 'Customer') {
        return next('/'); // Customer bị chặn khỏi trang Admin -> về trang chủ
      } else if (userRole === 'Admin') {
        return next('/adminDashboard'); // Admin bị chặn khỏi trang chỉ dành cho Customer
      }
    }

    // Vai trò khớp -> cho đi tiếp
    return next();
  }

  // Route không yêu cầu đăng nhập (như /comLogin) -> cho đi tiếp
  next();
});

export default router;