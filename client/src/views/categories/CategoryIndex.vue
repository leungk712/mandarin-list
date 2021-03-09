<template>
  <div>
    <v-container
      class="my-4"
      style="border: 1px solid #eee; min-height: 80vh; max-width: 95%"
      fill-height
    >
      <v-row>
        <v-col cols="2" style="min-height: 80vh; border-right: 1px solid #eee" fill-height>
        <h4 class="font-weight-bold">Categories</h4>
        <v-divider class="my-2" />
        <v-card
          v-for="(category) in categories.categoriesList"
          :key="category._id"
          class="my-2 py-2 px-2"
          @click="handleViewCategory(category)"
          outlined
        >
          <h4 class="font-weight-bold">{{ category.name }}</h4>
        </v-card>
        </v-col>
        <v-col cols="10">
          <ListCard />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace, State } from "vuex-class";
import { Category, CategoriesState } from "@/models";
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

    // ===== Methods ===== //
    public handleViewCategory(category: Category):void  {
      console.log("cate", category);
    }

    // ===== Computed ===== //

    // ===== Lifecycle Hook ===== //
    private mounted(): void {
        this.getCategories();
    }
}
</script>

<style scoped>

</style>