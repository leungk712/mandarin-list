export default [
    {
        path: "/dashboard",
        name: "Dashboard",
        component: () =>
          import(
            /* webpackChunkName: "Dashboard" */ "@/views/dashboard/Dashboard.vue"
          )
    }
];