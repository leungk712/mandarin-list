<template>
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
    <div v-else>
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
                <v-text-field
                  data-testid="update-character-character-input"
                  class="update-character-character-input"
                  label="Character"
                  v-model="updateCharacter.character"
                  outlined
                />
              </v-col>
              <v-col cols="4">
                <v-text-field
                  data-testid="update-character-pinyin-input"
                  class="update-character-pinyin-input"
                  label="Pinyin"
                  v-model="updateCharacter.pinyin"
                  outlined
                />
              </v-col>
              <v-col cols="4">
                <v-text-field
                  data-testid="update-character-english-input"
                  class="update-character-english-input"
                  label="English"
                  v-model="updateCharacter.english"
                  outlined
                />
              </v-col>
            </v-row>
            <v-row>
              <div>
                <v-expansion-panels focusable>
                  <v-expansion-panel
                    v-for="(example, i) in selectedCharacter.examples"
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
                      <span>
                        <span class="title">{{ example.sentence }}</span>
                      </span>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </div>
            </v-row>
            <v-row class="mt-4">
              <v-spacer />
              <v-btn
                data-testid="return-home-btn"
                class="return-home-btn mr-4"
                color="red lighten-1"
                @click.once="handleReturnHome"
              >
                Cancel
              </v-btn>
              <v-btn
                data-testid="submit-edit-btn"
                class="submit-edit-btn"
                color="teal lighten-1"
                @click.once="handleSubmitUpdate"
              >
                Submit Update
              </v-btn>
            </v-row>
          </v-container>
        </v-form>
      </v-container>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { namespace, State } from "vuex-class";
import {PostPayload, PostsState, SelectedCharacter} from "@/models";
import Vue from "vue";
import PostsModule from "@/store/modules/posts";
import router from "@/router";
import converter from "number-to-chinese-words";

const posts = namespace(PostsModule.name);

@Component({
  name: "CharacterCard"
})
export default class CharacterCard extends Vue {
  // ===== Store ===== //
  @State("posts") public posts!: PostsState;
  @posts.Action("clearSelectedMandarin")
  public clearSelectedMandarin!: () => void;
  @posts.Action("getIndividualCharacter") public getIndividualCharacter!: (
    id: string
  ) => void;

  // ===== Data ===== //

  // ===== Methods ===== //
  public handleReturnHome(): void {
    this.clearSelectedMandarin();
    router.push({ name: "Home" });
  }

  public handleSubmitUpdate(): void {
    const updatePayload = {
      character: ""
    };
  }

  // ===== Computed ===== //
  get converter() {
    return converter;
  }
  get loadingStatus(): string[] {
    return this.posts.loadingState;
  }
  get selectedCharacter(): any {
    return this.posts.selectedMandarin;
  }
  get updateCharacter(): object {
    return {
      character: this.selectedCharacter ? this.selectedCharacter.character: "",
      pinyin: this.selectedCharacter ? this.selectedCharacter.pinyin : "",
      english: this.selectedCharacter ? this.selectedCharacter.english : "",
      examples: this.selectedCharacter ? this.selectedCharacter.examples : [],
      starred: this.selectedCharacter ? this.selectedCharacter.starred: false
    };
  }

  // ===== Lifecycle ===== //
  private created(): void {
    this.getIndividualCharacter(this.$route.params.id);
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
</style>
