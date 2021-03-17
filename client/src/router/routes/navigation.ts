export default [
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
    }
];