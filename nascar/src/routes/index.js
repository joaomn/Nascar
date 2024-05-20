import { createWebHistory, createRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import Login from "../components/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import Perfil from "../views/Perfil.vue";


const routes = [
  {
    name: "login",
    path: "/login",
    component: Login,
  },
   {
    path: '/',
    redirect: '/perfil'
   
  },
  
  {
    name: "dashboard",
    path: "/dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: "Perfil",
    path: "/perfil",
    component: Perfil,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
