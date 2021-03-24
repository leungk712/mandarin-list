import { ifAuthenticated } from "@/router/index";

export default [
  {
    path: "/edit/:userId/:id",
    name: "CharacterCard",
    beforeEnter: ifAuthenticated,
    component: () =>
      import(
        /* webpackChunkName: "CharacterCard" */ "@/components/CharacterCard.vue"
      )
  }
];
