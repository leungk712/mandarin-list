<template>
  <application-layout>
    <v-container class="mb-6 dashboard-container">
      <v-card>
        <v-toolbar flat color="blue-grey lighten-2" dark>
          <v-toolbar-title>Dashboard</v-toolbar-title>
        </v-toolbar>
        <v-tabs vertical background-color="blue-grey lighten-4">
          <v-tab>
            <v-icon left>mdi-ideogram-cjk</v-icon>
            Characters
          </v-tab>
          <v-tab>
            <v-icon left>mdi-format-list-bulleted</v-icon>
            Categories
          </v-tab>
          <v-tab>
            <v-icon left>mdi-book-open-variant</v-icon>
            Stories
          </v-tab>
          <v-tab>
            <v-icon left>translate</v-icon>
            Translate
          </v-tab>
          <v-tab>
            <v-icon left>search</v-icon>
            Dictionary
          </v-tab>
          <v-tab>
            <v-icon left>psychology</v-icon>
            Memorize!
          </v-tab>

          <v-tab-item>
            <v-card flat class="ma-6">
              <CreateCharacter class="mt-6" />
              <v-divider class="my-8" />
              <v-select
                data-testid="view-cards-category-menu"
                class="view-cards-category-menu my-0 py-0"
                :class="$vuetify.breakpoint.xl ? 'mx-8' : ''"
                v-model="selectedCategories"
                :items="categories.categoriesList"
                label="Select one or more categories to view the associated characters"
                outlined
                chips
                multiple
                item-value="value"
                item-text="name"
              />
              <ListCard
                :dashboardCategories="selectedCategories"
                :view="'character'"
              />
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat class="ma-6">
              <CreateCategory class="ml-6" />
              <v-divider />
              <CategoryIndex />
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat class="ma-6">
              <CreateStory />
              <v-divider class="my-4" />
              <StoriesIndex />
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <Translate />
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat class="ma-6">
              <Dictionary />
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat class="ma-6">
              <Memorize />
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-container>
  </application-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace, State } from "vuex-class";
import { CategoriesState, UserState } from "@/models";
import ApplicationLayout from "@/components/layouts/ApplicationLayout.vue";
import CategoryIndex from "@/views/categories/CategoryIndex.vue";
import CategoriesModule from "@/store/modules/categories";
import CreateCategory from "@/views/categories/CreateCategory.vue";
import CreateCharacter from "@/components/CreateCharacter.vue";
import CreateStory from "@/views/stories/CreateStory.vue";
import Dictionary from "@/views/dictionary/Dictionary.vue";
import ListCard from "@/components/ListCard.vue";
import Memorize from "@/views/memorize/Memorize.vue";
import StoriesIndex from "@/views/stories/StoriesIndex.vue";
import Translate from "@/views/translate/Translate.vue";
import UserModule from "@/store/modules/user";

const categories = namespace(CategoriesModule.name);
const user = namespace(UserModule.name);

@Component({
  name: "Dashboard",
  components: {
    ApplicationLayout,
    CategoryIndex,
    CreateCategory,
    CreateCharacter,
    CreateStory,
    Dictionary,
    ListCard,
    Memorize,
    StoriesIndex,
    Translate
  }
})
export default class Dashboard extends Vue {
  // ===== Store ===== //
  @State("categories") public categories!: CategoriesState;
  @State("user") public user!: UserState;

  // ===== Data ===== //
  public selectedCategories = [];

  // ===== Methods ===== //

  // ===== Computed ===== //
  get loadingState(): string[] {
    return this.user.loadingState;
  }

  // ===== Lifecycle Hooks ===== //
}
</script>

<style scoped>
  .dashboard-container {
    width: 95%;
  }
</style>
