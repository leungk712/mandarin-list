<template>
  <div class="mt-4">
    <h3 :class="$vuetify.breakpoint.xl ? 'ml-3' : ''">Create a new category</h3>
    <v-row>
      <v-col cols="4" :class="$vuetify.breakpoint.xl ? 'ml-3' : ''">
        <ValidationObserver ref="categoryForm">
          <ValidationProvider
            mode="eager"
            rules="required"
          >
            <v-text-field
              data-testid="category-create-name-input"
              class="category-create-name-input mt-2"
              v-model="categoryName"
              label="Category Name"
              placeholder="Ex. (nature, health, family)"
              outlined
              slot-scope="{ errors, valid }"
              :error-messages="errors"
              :success="valid"
            />
          </ValidationProvider>
        </ValidationObserver>
      </v-col>
      <v-col cols="2" class="mt-4">
        <v-btn
          data-testid="category-create-btn"
          class="category-create-btn"
          color="teal lighten-2 white--text"
          @click="handleCreateCategory"
          :loading="loadingState.includes('creating new category...')"
          :disabled="!validCategory"
        >
          Create
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace, State } from "vuex-class";
import { CategoriesState, UserState } from "@/models";
import { CategoryPayload, UserData } from "@/models";
import ApplicationLayout from "@/components/layouts/ApplicationLayout.vue";
import CategoriesModule from "@/store/modules/categories";
import UserModule from "@/store/modules/user";
import { ValidationProvider, ValidationObserver } from "vee-validate";

const categories = namespace(CategoriesModule.name);
const user = namespace(UserModule.name);

@Component({
  name: "CreateCategory",
  components: { ApplicationLayout, ValidationObserver, ValidationProvider }
})
export default class CreateCategory extends Vue {
  $refs!: {
    categoryForm: InstanceType<typeof ValidationObserver>
  }
  // ===== Store ====== //
  @State("categories") public categories!: CategoriesState;
  @State("user") public user!: UserState;
  @categories.Action("createCategory") public createCategory!: (
    payload: CategoryPayload
  ) => void;

  // ===== Data ====== //
  public categoryName = "";

  // ===== Methods ===== //
  public async handleCreateCategory(): Promise<void> {
    const categoryPayload = {
      name: this.categoryName,
      user: this.userInfo._id
    };
    await this.createCategory(categoryPayload);
    this.categoryName = "";
    this.$refs.categoryForm.reset();
  }

  // ===== Computed ===== //
  get userInfo(): UserData {
    return this.user.user!;
  }
  get loadingState(): string[] {
    return this.categories.loadingState;
  }
  get validCategory() {
    return (
      this.categoryName.length &&
      this.categories.categoriesList.every(
        category => category.name !== this.categoryName
      )
    );
  }
}
</script>
