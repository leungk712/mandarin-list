<template>
  <div>
    <v-skeleton-loader
      v-if="loadingStatus.includes('retrieving mandarin character...')"
      type="card"
      elevation="14"
      tile
    />
    <div v-else>
      <h1>{{ selectedCharacter.character }}</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { namespace, State } from "vuex-class";
import { PostsState } from "@/models";
import Vue from "vue";
import PostsModule from "@/store/modules/posts";

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
