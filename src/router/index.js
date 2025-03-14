import { createRouter, createWebHistory } from "vue-router";
import RegisterView from "@/views/Auth/RegisterView.vue";
import LoginView from "@/views/Auth/LoginView.vue";
import ShopView from "@/views/ShopView.vue";
import { useAuthStore } from "@/stores/auth";
import ProductListView from "@/views/ProductListView.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: ProductListView,
    },
    {
      path: "/shop",
      name: "shop",
      component: ShopView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
  ],
});

export default router;
