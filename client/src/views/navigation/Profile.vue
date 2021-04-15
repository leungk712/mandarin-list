<template>
  <application-layout>
    <v-container class="container-border profile-container" v-if="userInfo">
      <h1>
        <v-icon large class="pb-1">
          person_outline
        </v-icon>
        My Profile
      </h1>
      <p>Member since {{ userSince }}</p>
      <v-divider />
      <v-row class="my-6">
        <v-col cols="12 py-0">
          <v-row class="ml-1 mb-2">
            <v-icon class="mr-1">analytics</v-icon>
            <h2>Statistics</h2>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-card class="mx-auto" color="#eee" max-width="600">
            <v-card-title>
              <v-icon large left>
                mdi-ideogram-cjk
              </v-icon>
              <span class="title font-weight-light">Characters</span>
            </v-card-title>

            <v-card-text
              data-testid="profile-characters-card-text"
              class="profile-characters-card-text display-1 font-weight-bold text-center"
            >
              {{ posts.mandarinList.length }} characters
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card class="mx-auto" color="#26c6da" dark max-width="600">
            <v-card-title>
              <v-icon large left>
                mdi-format-list-bulleted
              </v-icon>
              <span class="title font-weight-light">Categories</span>
            </v-card-title>

            <v-card-text
              data-testid="profile-categories-card-text"
              class="profile-categories-card-text display-1 font-weight-bold text-center"
            >
              {{ categories.categoriesList.length }} categories
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card class="mx-auto" color="#BA68C8" dark max-width="600">
            <v-card-title>
              <v-icon large left>
                mdi-book-open-variant
              </v-icon>
              <span class="title font-weight-light">Stories</span>
            </v-card-title>

            <v-card-text
              data-testid="profile-stories-card-text"
              class="profile-stories-card-text display-1 font-weight-bold text-center"
            >
              {{ stories.storiesList.length }} stories
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card class="mx-auto" color="#F06292" dark max-width="600">
            <v-card-title>
              <v-icon large left>
                favorite_border
              </v-icon>
              <span class="title font-weight-light">Favorites</span>
            </v-card-title>

            <v-card-text
              data-testid="profile-favorites-card-text"
              class="profile-favorites-card-text display-1 font-weight-bold text-center"
            >
              {{ favorites }} favorites
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </application-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace, State } from "vuex-class";
import {
  CategoriesState,
  PostsState,
  StoriesState,
  UserData,
  UserState
} from "@/models";
import ApplicationLayout from "@/components/layouts/ApplicationLayout.vue";
import CategoriesModule from "@/store/modules/categories";
import PostsModule from "@/store/modules/posts";
import StoriesModule from "@/store/modules/stories";
import UserModule from "@/store/modules/user";
import moment from "moment";

const categories = namespace(CategoriesModule.name);
const posts = namespace(PostsModule.name);
const stories = namespace(StoriesModule.name);
const user = namespace(UserModule.name);

@Component({
  name: "Profile",
  components: { ApplicationLayout }
})
export default class Profile extends Vue {
  // ===== Store ===== //
  @State("categories") public categories!: CategoriesState;
  @State("posts") public posts!: PostsState;
  @State("stories") public stories!: StoriesState;
  @State("user") public user!: UserState;

  // ===== Data ===== //

  // ===== Methods ===== //

  // ===== Computed ===== //
  get userInfo(): UserData {
    return this.user.user!;
  }

  get userSince(): string {
    return moment(this.userInfo.date)
      .utc()
      .format("MMMM Do, YYYY");
  }

  get favorites() {
    return this.posts.mandarinList.filter(characters => characters.starred)
      .length;
  }

  // ===== Lifecycle Hooks ===== //
}
</script>

<style scoped>
.profile-container {
  width: 85%;
}
</style>
