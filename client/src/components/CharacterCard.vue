<template>
  <application-layout>
    <div>
      <v-skeleton-loader
        v-if="
          loadingStatus.includes('retrieving mandarin character...') &&
            !selectedCharacter
        "
        type="card"
        elevation="14"
        tile
      />
      <div v-else-if="selectedCharacter">
        <v-container
          class="update-container mt-6 pa-6"
          v-if="this.$vuetify.breakpoint.smAndUp"
        >
          <v-row justify="center">
            <h1>Edit {{ selectedCharacter.character }}</h1>
          </v-row>
          <v-divider class="character-divider my-4" />
          <v-form class="mt-4">
            <v-container>
              <v-row>
                <v-col cols="4">
                  <ValidationProvider rules="required" v-slot="{ errors }">
                    <v-text-field
                      data-testid="update-character-character-input"
                      class="update-character-character-input"
                      v-model="updateCharacter.character"
                      label="Character"
                      outlined
                      :error-messages="errors"
                    />
                  </ValidationProvider>
                </v-col>
                <v-col cols="4">
                  <ValidationProvider rules="required" v-slot="{ errors }">
                    <v-text-field
                      data-testid="update-character-pinyin-input"
                      class="update-character-pinyin-input"
                      v-model="updateCharacter.pinyin"
                      label="Pinyin"
                      outlined
                      :error-messages="errors"
                    />
                  </ValidationProvider>
                </v-col>
                <v-col cols="4">
                  <ValidationProvider rules="required" v-slot="{ errors }">
                    <v-text-field
                      data-testid="update-character-english-input"
                      class="update-character-english-input"
                      v-model="updateCharacter.english"
                      label="English"
                      outlined
                      :error-messages="errors"
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="8">
                  <v-select
                    data-testid="edit-card-category-menu"
                    class="edit-card-category-menu my-0 py-0"
                    v-model="posts.selectedMandarin.categories"
                    :items="categories.categoriesList"
                    outlined
                    chips
                    multiple
                    item-value="value"
                    item-text="name"
                  />
                </v-col>
              </v-row>
              <v-row>
                <div>
                  <v-expansion-panels focusable style="width: 40vw">
                    <v-expansion-panel
                      v-for="(example, i) in posts.selectedMandarinExamples"
                      :key="example.id"
                      class="my-1"
                    >
                      <v-expansion-panel-header>
                        <span class="title">
                          {{ selectedCharacter.character }} Example #{{
                            i + 1
                          }}
                          ｜ {{ selectedCharacter.character }} 第
                          {{ converter.toWords(i + 1) }} 个 例子
                        </span>
                      </v-expansion-panel-header>
                      <v-expansion-panel-content class="mt-2">
                        <v-row class="my-2">
                          <v-text-field
                            data-testid="example-sentence-input"
                            class="example-sentence-input"
                            v-model="example.sentence"
                            :append-icon="!editing ? 'edit' : 'check'"
                            :readonly="!editing"
                            @click:append="handleEditSentence"
                          />
                          <v-icon
                            data-testid="delete-sentence-btn"
                            class="delete-sentence-btn mx-2"
                            @click="handleDeleteSentence(example.id)"
                            color="red"
                          >
                            delete_outline
                          </v-icon>
                        </v-row>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </div>
              </v-row>
              <v-row class="my-4">
                <v-btn
                  data-testid="update-character-example-btn"
                  class="update-character-example-btn"
                  @click="handleAddNewExample"
                  text
                  color="purple lighten-2"
                >
                  <v-icon class="mr-2">add</v-icon>
                  Add Example
                </v-btn>
              </v-row>
              <v-row class="mt-4">
                <v-spacer />
                <v-btn
                  data-testid="return-home-btn"
                  class="return-home-btn mr-4"
                  color="red lighten-1 white--text"
                  @click.once="handleReturnHome"
                >
                  Cancel
                </v-btn>
                <v-btn
                  data-testid="submit-edit-btn"
                  class="submit-edit-btn"
                  color="teal lighten-1 white--text"
                  @click.once="handleSubmitUpdate"
                  :loading="loading"
                >
                  Update
                </v-btn>
              </v-row>
            </v-container>
          </v-form>
        </v-container>
      </div>
    </div>
  </application-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace, State } from "vuex-class";
import { CategoriesState, PostsState, SelectedCharacter, UserState } from "@/models";
import ApplicationLayout from "@/components/layouts/ApplicationLayout.vue";
import CategoriesModule from "@/store/modules/categories";
import PostsModule from "@/store/modules/posts";
import UserModule from "@/store/modules/user";
import router from "@/router";
import converter from "number-to-chinese-words";
import { ValidationProvider } from "vee-validate";

const categories = namespace(CategoriesModule.name);
const posts = namespace(PostsModule.name);
const user = namespace(UserModule.name);

@Component({
  name: "CharacterCard",
  components: { ApplicationLayout, ValidationProvider }
})
export default class CharacterCard extends Vue {
  // ===== Store ===== //
  @State("categories") public categories!: CategoriesState;
  @State("posts") public posts!: PostsState;
  @State("user") public user!: UserState;
  @posts.Action("clearSelectedMandarin") public clearSelectedMandarin!: () => void;
  @posts.Action("getIndividualCharacter") public getIndividualCharacter!: (id: string) => void;
  @posts.Action("handleAddMandarinExample") public handleAddMandarinExample!: () => void;
  @posts.Action("handleDeleteMandarinExample") public handleDeleteMandarinExample!: (id: number) => void;
  @posts.Action("updateMandarinCharacter") public updateMandarinCharacter!: (payload: SelectedCharacter) => void;

  // ===== Data ===== //
  public editing = false;
  public loading = false;

  // ===== Methods ===== //
  public handleReturnHome(): void {
    this.clearSelectedMandarin();
    router.push({ name: "Dashboard" });
  }

  public handleDeleteSentence(id: number): void {
    this.handleDeleteMandarinExample(id);
  }

  public handleEditSentence(): void {
    this.editing = !this.editing;
  }

  public handleAddNewExample(): void {
    this.handleAddMandarinExample();
  }

  public async handleSubmitUpdate(): Promise<void> {
    this.loading = true;
    const updatePayload = {
      _id: this.updateCharacter._id,
      __v: this.selectedCharacter.__v,
      categories: this.selectedCharacter.categories,
      character: this.updateCharacter.character,
      createdAt: this.selectedCharacter.createdAt,
      date: this.selectedCharacter.date,
      pinyin: this.updateCharacter.pinyin,
      english: this.updateCharacter.english,
      examples: this.updateCharacter.examples,
      starred: this.updateCharacter.starred,
      user: this.user.user!._id,
      updatedAt: new Date().toISOString()
    };
    await this.updateMandarinCharacter(updatePayload);
    this.loading = false;
    this.handleReturnHome();
  }

  // ===== Computed ===== //
  get converter() {
    return converter;
  }
  get loadingStatus(): string[] {
    return this.posts.loadingState;
  }
  get selectedCharacter(): SelectedCharacter {
    return this.posts.selectedMandarin!;
  }
  get updateCharacter(): SelectedCharacter {
    return {
      _id: this.selectedCharacter._id,
      __v: this.selectedCharacter.__v,
      character: this.selectedCharacter ? this.selectedCharacter.character : "",
      categories: this.selectedCharacter.categories,
      createdAt: this.selectedCharacter.createdAt,
      date: this.selectedCharacter.date,
      pinyin: this.selectedCharacter ? this.selectedCharacter.pinyin : "",
      english: this.selectedCharacter ? this.selectedCharacter.english : "",
      examples: this.posts.selectedMandarinExamples,
      starred: this.selectedCharacter ? this.selectedCharacter.starred : false,
      user: this.user.user!._id,
      updatedAt: this.selectedCharacter.updatedAt
    };
  }
}
</script>

<style>
  .character-divider {
    width: 350px;
    margin: 0px auto;
  }

  .update-container {
    border: 1px solid gray;
    border-radius: 5px;
  }

  .example-sentence-input {
    width: 10vw;
  }
</style>
