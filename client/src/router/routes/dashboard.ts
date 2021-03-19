import { ifAuthenticated } from "@/router/index";

export default [
    {
        path: "/dashboard",
        name: "Dashboard",
        beforeEnter: ifAuthenticated,
        component: () =>
          import(
            /* webpackChunkName: "Dashboard" */ "@/views/dashboard/Dashboard.vue"
          )
    }
];