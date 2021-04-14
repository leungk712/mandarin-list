import { ifAuthenticated } from "@/router/index";

export default [
    {
        path: "/error",
        beforeEnter: ifAuthenticated,
        name: "ErrorPage",
        component: () => import(/* webpackChunkName: "ErrorPage" */ "@/views/errors/ErrorPage.vue")
    }
]