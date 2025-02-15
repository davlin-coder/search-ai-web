import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../views/landing_page.vue";
import LoginPage from "../views/login_page.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: LandingPage
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage
    }
  ]
});

export default router;
