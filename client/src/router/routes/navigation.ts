import { ifAuthenticated } from "@/router/index";

export default [
  {
    path: "/profile",
    name: "Profile",
    beforeEnter: ifAuthenticated,
    component: () =>
      import(/* webpackChunkName: "Profile" */ "@/views/navigation/Profile.vue")
  },
  {
    path: "/travel-china",
    name: "TravelChina",
    beforeEnter: ifAuthenticated,
    component: () =>
      import(
        /* webpackChunkName: "TravelChina" */ "@/views/navigation/TravelChina.vue"
      )
  },
  {
    path: "/resources",
    name: "Resources",
    beforeEnter: ifAuthenticated,
    component: () =>
      import(
        /* webpackChunkName: "Resources" */ "@/views/navigation/Resources.vue"
      )
  },
  {
    path: "/code",
    name: "Code",
    beforeEnter: ifAuthenticated,
    component: () =>
      import(/* webpackChunkName: "Code" */ "@/views/navigation/Code.vue")
  }
];
