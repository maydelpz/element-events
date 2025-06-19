import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import RegisterCompany from "./views/RegisterCompany.vue";
import RegisterEnterprise from "./views/RegisterEnterprise.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/registercompany",
    component: RegisterCompany,
  },
  {
    path: "/registerenterprise",
    component: RegisterEnterprise,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
