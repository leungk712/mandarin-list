<template>
    <div class="mt-4">
        <h3>Create a new category</h3>
        <v-row>
            <v-col cols="4">
                <v-text-field 
                    data-testid="category-create-name-input"
                    class="category-create-name-input mt-2"
                    v-model="categoryName"
                    label="Category Name"
                    placeholder="Ex. (nature, health, family)"
                    outlined
                />
            </v-col>
            <v-col cols="2" class="mt-4">
                <v-btn
                    data-testid="category-create-btn"
                    class="category-create-btn"
                    color="primary"
                    @click="handleCreateCategory"
                    :loading="loadingState.includes('creating new category...')"
                    :disabled="!validCategory"
                >
                Create
                </v-btn>
            </v-col>
        </v-row>
        <v-divider />
        <div class="ml-1 my-4">
            <h1>Categories</h1>
            <v-row>
                <v-col 
                    cols="2"
                    v-for="category in categories.categoriesList"
                    :key="category._id"
                    class="my-1"
                >
                    <v-card class="pa-2">
                        <h4 class="text-center">{{ category.name }}</h4>
                    </v-card>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace, State } from "vuex-class";
import { CategoriesState, UserState } from "@/models";
import ApplicationLayout from "@/components/layouts/ApplicationLayout.vue";
import CategoriesModule from "@/store/modules/categories";
import UserModule from "@/store/modules/user";

const categories = namespace(CategoriesModule.name);
const user = namespace(UserModule.name);

@Component({
    name: "CreateCategory",
    components: { ApplicationLayout }
})
export default class CreateCategory extends Vue {
    // ===== Store ====== //
    @State("categories") public categories!: CategoriesState;
    @State("user") public user!: UserState;
    @categories.Action("createCategory") public createCategory!: (payload: {}) => void;
    @categories.Action("getCategories") public getCategories!: () => void;

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
    }

    // ===== Computed ===== //
    get userInfo() {
        return this.user.user;
    }
    get loadingState() {
        return this.categories.loadingState;
    }
    get validCategory() {
        return this.categoryName.length &&
        this.categories.categoriesList.every(category => category.name !== this.categoryName);
    }

    // ===== Lifecycle Hook ===== //
    private created(): void {
        this.getCategories();
    }
}
</script>