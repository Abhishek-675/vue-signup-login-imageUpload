/* eslint-disable */

import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeView.vue";
import Signup from "../views/SignupView.vue";
import Login from "../views/LoginView.vue";
import UploadImage from "../views/UploadImage.vue"
import PageNotFound from "../views/PageNotFound.vue";

import store from "../store/index";

const isAuthenticatedLocal = JSON.parse(localStorage.getItem("isLoggedIn_Local"));

const routes = [
  {
    path: "/",
    redirect: "/upload-image",
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    meta: {
      auth: false,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      auth: false,
    },
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      auth: true,
    },
  },
  {
    path: "/upload-image",
    name: "UploadImage",
    component: UploadImage,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "PageNotFound",
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  // console.log('Coming from:', from.path)
  // console.log('Going to:', to.path)
  // console.log('meta', to.meta.auth)
  // console.log('isLoggedIn', store.state.isLoggedIn)

  // console.log("isAuthenticatedLocal type", typeof(isAuthenticatedLocal))
  // console.log("isLoggedIn type", typeof(store.state.isLoggedIn))

  // this.$store.state.headerTitle = '';

  // if (to.meta.auth && !isAuthenticatedLocal) {
  if (to.meta.auth && !store.state.isLoggedIn) {
    next("/login");
  } 
  // else if (!to.meta.auth && isAuthenticatedLocal) {
  else if (!to.meta.auth && store.state.isLoggedIn) {
    next("/home");
  } else {
    next();
  }
});

export default router;
