export default [
    {
        path: "/edit/:userId/:id",
        name: "CharacterCard",
        component: () =>
        import(
            /* webpackChunkName: "CharacterCard" */ "@/components/CharacterCard.vue"
        )
    }
];