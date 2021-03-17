import store from "@/store";
import Vue from "vue";
import VueRouter, { NavigationGuardNext, Route, RouteConfig } from "vue-router";

export function ifAuthenticated(to: Route, from: Route, next: NavigationGuardNext) {
  if (store.getters["user/isAuthenticated" || to.path === "/login"]) {
    next();
    return;
  }

  if (store.getters["user/isAuthenticated"] && to.path === "/login") {
    next("/");
    return;
  }

  next("/login")
}

Vue.use(VueRouter);

import CharacterRoute from "@/router/routes/character";
import DashboardRoute from "@/router/routes/dashboard";
import HomeRoute from "@/router/routes/home";
import LoginRoute from "@/router/routes/login";
import NavigationRoute from "@/router/routes/navigation";

const routes: Array<RouteConfig> = [
  ...CharacterRoute,
  ...DashboardRoute,
  ...HomeRoute,
  ...LoginRoute,
  ...NavigationRoute
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
