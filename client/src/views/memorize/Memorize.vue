<template>
  <div>
    <v-container class="container-border memorize-container mb-6">
      <h1 class="display-1 my-4">Memorize!</h1>
      <p>Test your vocabulary by hovering over a card to see the meaning!</p>
      <v-divider class="my-2" />
      <v-row class="mt-1">
          <v-col cols="6">
            <v-select
                data-testid="memorize-categories-menu"
                class="memorize-category-menu my-0 py-0"
                v-model="selectedCategory"
                :items="categories.categoriesList"
                label="Select one or more categories to view the associated characters"
                outlined
                chips
                multiple
                item-value="value"
                item-text="name"
            />
          </v-col>
      </v-row>
      <v-row>
        <v-col v-if="!charactersList.length">
            <h2 class="text-center">No characters found. Search again.</h2>
        </v-col>
        <v-col
            v-else
            v-for="(character) in charactersList"
            :key="character._id"
            sm="6"
            md="4"
            lg="3"
            xl="2"
        >
        <div class="memorize-card">
            <div class="memorize-card-inner">
                <v-card
                    class="my-2 pa-2 memorize-card-front"
                    outlined
                    tag="div"
                    hover
                >
                    <v-card-text>
                        <v-row justify="center" align="center">
                            <v-col cols="12" class="mt-10">
                                <p class="display-2 text--primary">{{ character.character }}</p>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
                <v-card
                    class="mx-auto my-2 pa-2 memorize-card-back"
                    outlined
                    tag="div"
                    hover
                >
                    <v-card-text>
                        <v-row justify="center" align="center">
                            <v-col cols="12" class="ma-0 pa-0">
                                <p class="title">{{ character.pinyin }}</p>
                            </v-col>
                            <v-col cols="12" class="ma-0 pa-0">
                                <h1 class="display-2">{{ character.character }}</h1>
                            </v-col>
                            <v-col cols="12" class="mt-3">
                                <p class="title">{{ character.english }}</p>    
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </div>
        </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace, State } from "vuex-class";
import { CategoriesState, PostsState, SelectedCharacter } from "@/models";
import CategoriesModule from "@/store/modules/categories";
import PostsModule from "@/store/modules/posts";

const categories = namespace(CategoriesModule.name);
const posts = namespace(PostsModule.name);

@Component({
  name: "Memorize"
})
export default class Memorize extends Vue {
  // ===== Store ===== //
  @State("categories") public categories!: CategoriesState;
  @State("posts") public posts!: PostsState;

  // ===== Data ===== //
  public selectedCategory = [];

  // ===== Methods ===== //

  // ===== Computed ===== //
get charactersList(): SelectedCharacter[] {
    if (this.selectedCategory && this.selectedCategory.length) {
      return this.posts.mandarinList.filter(cards =>
        this.selectedCategory.some(category => cards.categories.includes(category))
      ).sort(() => 0.5 - Math.random());
    }

    return this.posts.mandarinList.sort(() => 0.5 - Math.random());
  }

  // ===== Lifecycle Hooks ===== //
}
</script>

<style scoped>
    .memorize-container {
        width: 100%;
    }
    .memorize-card {
        height: 200px;
        width: 200px;
    }

    .memorize-card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        text-align: center;
        transition: transform 0.8s;
        transform-style: preserve-3d;
    }

    .memorize-card:hover .memorize-card-inner {
        transform: rotateY(180deg);
    }

    .memorize-card-front, .memorize-card-back {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        background-color: #D1C4E9;
    }

    .memorize-card-back {
        color: white;
        transform: rotateY(180deg);
    }
</style>
