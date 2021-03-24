export default [
  {
    path: "/login",
    name: "AppLogin",
    component: () =>
      import(
        /* webpackChunkName: "AppLogin" */ "@/views/authorization/AppLogin.vue"
      )
  }
];
