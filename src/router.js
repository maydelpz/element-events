import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "./stores/user";

import Login from "./views/Login.vue";
import Home from "./views/Home.vue";
import RegisterCompany from "./views/RegisterCompany.vue";
import RegisterEnterprise from "./views/RegisterEnterprise.vue";

const requireAuth = async (to, from, next) => {
  const userStore = useUserStore();
  userStore.loadingSession = true;
  const user = await userStore.currentUser();
  if (user) {
    next();
  } else {
    next("/login");
  }
  userStore.loadingSession = false;
};

const routes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/",
    component: Home,
    beforeEnter: requireAuth,
  },
  {
    path: "/registercompany",
    component: RegisterCompany,
    beforeEnter: requireAuth,
  },
  {
    path: "/registerenterprise",
    component: RegisterEnterprise,
    beforeEnter: requireAuth,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
