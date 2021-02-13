import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "Home" */ "@/views/Home.vue")
  },
  {
    path: "/edit/:id",
    name: "CharacterCard",
    component: () =>
      import(/* webpackChunkName: "CharacterCard" */ "@/components/CharacterCard.vue")
  },
  {
    path: "/login",
    name: "AppLogin",
    component: () => import(/* webpackChunkName: "AppLogin" */ "@/views/authorization/AppLogin.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
