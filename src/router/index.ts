import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../views/landing_page.vue";
import LoginPage from "../views/login_page.vue";
import RegisterPage from "../views/register_page.vue";
import SearchPage from "../views/search_page.vue";
import { requireAuth, redirectIfAuthenticated } from './auth-guard';
import ChatPage from "../views/chat_page.vue";

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
      component: LoginPage,
      beforeEnter: redirectIfAuthenticated
    },
    {
      path: "/register",
      name: "register",
      component: RegisterPage,
      beforeEnter: redirectIfAuthenticated
    },
    {
      path: "/search",
      name: "search",
      component: SearchPage,
      meta: { requiresAuth: true }
    },
    {
      path: "/chat",
      name: "chat",
      component: ChatPage
    }
  ]
});

router.beforeEach(requireAuth);

export default router;
