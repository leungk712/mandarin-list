<template>
  <div>
    <v-skeleton-loader
      v-if="loadingStatus.includes('retrieving mandarin character...')"
      type="card"
      elevation="14"
      tile
    />
    <div v-else>
      <v-container class="mt-6" v-if="this.$vuetify.breakpoint.smAndUp">
        <v-row>
          <h1>Edit {{ selectedCharacter.character }}</h1>
        </v-row>
        <v-form class="mt-4">
          <v-container>
            <v-row>
              <v-col cols="4">
                <v-text-field
                  label="Character ( )"
                />
              </v-col>
              <v-col cols="4">
                <v-text-field
                  label="Pinyin ( )"
                />
              </v-col>
              <v-col cols="4">
                <v-text-field
                  label="English ( )"
                />
              </v-col>
            </v-row>
            <v-row>
              <div>
                <v-expansion-panels>
                  <v-expansion-panel
                      v-for="(example, i) in selectedCharacter.examples"
                      :key="example.id"
                  >
                    <v-expansion-panel-header>
                      {{ selectedCharacter.character }} Example #{{ i+1 }}
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      {{ example.sentence }}
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
                  flat
                  @click.once="handleReturnHome"
              >
                Return Home
              </v-btn>
              <v-btn
                  data-testid="submit-edit-btn"
                  class="submit-edit-btn"
                  color="teal lighten-1"
                  flat
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
import { PostsState } from "@/models";
import Vue from "vue";
import PostsModule from "@/store/modules/posts";
import router from "@/router";

const posts = namespace(PostsModule.name);

@Component({
  name: "CharacterCard"
})

export default class CharacterCard extends Vue {
  // ===== Store ===== //
  @State("posts") public posts!: PostsState;
  @posts.Action("getIndividualCharacter") public getIndividualCharacter!: (id: string) => void;

  // ===== Data ===== //

  // ===== Methods ===== //
  public handleReturnHome(): void {
    router.push({name: "Home"});
  }

  public handleSubmitUpdate(): void {
    const updatePayload = {
      character: ""
    };
  }

  // ===== Computed ===== //
  get loadingStatus(): string[] {
    return this.posts.loadingState;
  }
  get selectedCharacter(): {} {
    return this.posts.selectedMandarin;
  }

  // ===== Lifecycle ===== //
  private created(): void {
    this.getIndividualCharacter(this.$route.params.id);
  }
}
</script>
