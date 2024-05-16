import { createWebHistory, createRouter } from "vue-router";
import Login from "../components/Login.vue";
import App from "../App.vue";
import Dashboard from "../views/Dashboard.vue";
import Perfil from "../views/Perfil.vue";

const routes = [
  {
    name: "login",
    path: "/login",
    component: Login,
  },
  {
    name: "app",
    path: "/main",
    component: App,
    meta: {
      requiresAuth: false,
    },
  },
  {
    name: "dashboard",
    path: "/dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: false,
    },
  },
  {
    name: "Perfil",
    path: "/Perfil",
    component: Perfil,
    meta: {
      requiresAuth: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem("token")) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
