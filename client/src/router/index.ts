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

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "Home" */ "@/views/Home.vue")
  },
  {
    path: "/edit/:userId/:id",
    name: "CharacterCard",
    component: () =>
      import(
        /* webpackChunkName: "CharacterCard" */ "@/components/CharacterCard.vue"
      )
  },
  {
    path: "/login",
    name: "AppLogin",
    component: () =>
      import(
        /* webpackChunkName: "AppLogin" */ "@/views/authorization/AppLogin.vue"
      )
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () =>
      import(
        /* webpackChunkName: "Dashboard" */ "@/views/dashboard/Dashboard.vue"
      )
  },
  {
    path: "/profile",
    name: "Profile",
    component: () =>
      import(
        /* webpackChunkName: "Profile" */ "@/views/navigation/Profile.vue"
      )
  },
  {
    path: "/travel-china",
    name: "TravelChina",
    component: () =>
      import(
        /* webpackChunkName: "TravelChina" */ "@/views/navigation/TravelChina.vue"
      )
  },
  {
    path: "/resources",
    name: "Resources",
    component: () =>
      import(
        /* webpackChunkName: "Resources" */ "@/views/navigation/Resources.vue"
      )
  },
  {
    path: "/code",
    name: "Code",
    component: () =>
      import(
        /* webpackChunkName: "Code" */ "@/views/navigation/Code.vue"
      )
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
