<template>
  <div>
    <v-container class="my-4 category-index-container">
      <v-row>
        <v-col md="4" lg="3" class="categories-list" fill-height>
          <h4 class="font-weight-bold">Categories (click on a category)</h4>
          <v-divider class="my-2" />
          <v-card
            v-for="category in categories.categoriesList"
            :key="category._id"
            class="my-2 py-2 px-2"
            @click="handleViewCategory(category.name)"
            outlined
          >
            <v-row class="py-4 px-2">
              <h4 class="font-weight-bold pl-2">{{ category.name }}</h4>
              <v-spacer />
              <!-- <v-icon>edit</v-icon>
              <v-icon>delete_outline</v-icon> -->
            </v-row>
          </v-card>
        </v-col>
        <v-col md="8" lg="9">
          <ListCard
            :view="'category'"
            :selectedCategory="this.selectedCategory"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace, State } from "vuex-class";
import { CategoriesState } from "@/models";
import CategoriesModule from "@/store/modules/categories";
import ListCard from "@/components/ListCard.vue";

const categories = namespace(CategoriesModule.name);

@Component({
  name: "CategoryIndex",
  components: { ListCard }
})
export default class CategoryIndex extends Vue {
  // ===== Store ===== //
  @State("categories") public categories!: CategoriesState;
  @categories.Action("getCategories") public getCategories!: () => void;

  // ===== Data ===== //
  public selectedCategory = "";

  // ===== Methods ===== //
  public handleViewCategory(categoryName: string) {
    this.selectedCategory = categoryName;
  }

  // ===== Computed ===== //

  // ===== Lifecycle Hook ===== //
  private mounted(): void {
    this.getCategories();
  }
}
</script>

<style scoped>
.categories-list {
  border-right: 1px solid #eee;
}
.category-index-container {
  border: 1px solid #eee;
  min-height: 80vh;
  max-width: 95%;
}
</style>
