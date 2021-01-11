<template>
  <div class="my-4">
    <h1 class="text-center">Mandarin List</h1>
    <Draggable
      tag="v-card"
      v-model="posts.mandarinList"
      group="characters"
      @start="drag = true"
      @end="drag = false"
    >
      <v-card
        v-for="character in posts.mandarinList"
        :key="character.id"
        class="mx-auto my-2 pa-2"
        max-width="400"
        outlined
      >
        <v-card-text>
          <v-row>
            <p class="display-2 text--primary">
              {{ character.character }}
            </p>
            <v-spacer />
            <v-rating
              length="1"
              hover
              size="30"
              color="yellow"
            />
          </v-row>

          <p class="title">{{ character.pinyin }} ({{ character.english }})</p>
        </v-card-text>
        <v-card-actions>
          <v-btn text color="teal accent-4" @click="reveal = true">
            {{ character.character }} Examples
          </v-btn>
        </v-card-actions>

        <v-expand-transition>
          <v-card
            v-if="reveal"
            class="transition-fast-in-fast-out v-card--reveal"
            style="height: 100%;"
          >
            <v-card-text class="pb-0">
              <p class="display-1 text--primary">
                Origin
              </p>
              <p>
                late 16th century (as a noun denoting a place where alms were
                distributed):
              </p>
            </v-card-text>
            <v-card-actions class="pt-0">
              <v-btn text color="teal accent-4" @click="reveal = false">
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-expand-transition>
      </v-card>
    </Draggable>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace, State } from "vuex-class";
import Draggable from "vuedraggable";
import { PostsState } from "@/models";
import PostsModule from "@/store/modules/posts";

const posts = namespace(PostsModule.name);

@Component({
  components: {
    Draggable
  }
})
export default class Home extends Vue {
  // ===== Store ===== //
  @State("posts") public posts!: PostsState;
  @posts.Action("getMandarinList") public getMandarinList!: () => void;

  // ===== Data ===== //
  data() {
    return {
      reveal: false
    };
  }

  // ===== Lifecycle Hooks ===== //
  private created(): void {
    this.getMandarinList();
  }
}
</script>

<style>

</style>
