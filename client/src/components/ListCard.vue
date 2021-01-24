<template>
  <div class="my-4 pa-4">
    <h3>Select a card and drag it anywhere you like on the list.</h3>
    <Draggable
      tag="v-card"
      v-model="posts.mandarinList"
      group="characters"
      @start="drag = true"
      @end="drag = false"
      class="pa-6"
    >
      <v-card
        v-for="(character, idx) in posts.mandarinList"
        :key="character._id"
        class="mx-auto my-2 pa-2"
        max-width="400"
        outlined
        tag="div"
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
              clearable
              @input="handleRating($event, character._id)"
            />
          </v-row>

          <p class="title">{{ character.pinyin }} ({{ character.english }})</p>
        </v-card-text>
        <v-card-actions>
          <v-btn
            data-testid="character-examples-btn"
            class="character-examples-btn"
            v-if="character.examples.length"
            text
            color="teal accent-4"
            @click.native="handleReveal(idx)"
          >
            {{ character.character }}
            Examples ({{ character.examples.length }} |
            {{ converter.toWords(character.examples.length) }})
          </v-btn>
          <v-spacer />
          <v-icon
            data-testid="edit-card-btn"
            class="edit-card-btn mr-2"
            @click="handleEdit(character._id)"
            color="blue-grey lighten-1"
          >
            create
          </v-icon>
          <v-icon
            data-testid="edit-card-btn"
            class="edit-card-btn mr-2"
            @click="handleDelete(character._id)"
            color="red"
          >
            delete_outline
          </v-icon>
        </v-card-actions>

        <v-expand-transition>
          <v-card
            v-model="selectedIdx"
            v-show="selectedIdx === idx"
            class="transition-fast-in-fast-out v-card--reveal"
            style="height: 100%;"
          >
            <v-card-text class="pb-0">
              <p class="title font-weight-bold text--primary">Example(s)</p>
              <p v-for="example in character.examples" :key="example.id">
                {{ example.sentence }}
              </p>
            </v-card-text>
            <v-card-actions class="pt-0">
              <v-btn
                data-testid="close-reveal-btn"
                class="close-reveal-btn"
                @click.native="handleRevealClose"
                text
                color="teal accent-4"
              >
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
import { PostsState } from "@/models";
import Draggable from "vuedraggable";
import PostsModule from "@/store/modules/posts";
import router from "@/router";
import converter from "number-to-chinese-words";

const posts = namespace(PostsModule.name);

@Component({
  name: "ListCard",
  components: { Draggable }
})
export default class ListCard extends Vue {
  // ===== Store ===== //
  @State("posts") public posts!: PostsState;
  @posts.Action("deleteMandarinExample") public deleteMandarinExample!: (
    id: string
  ) => void;

  // ===== Data ===== //
  public reveal = true;
  public selectedIdx = -1;
  public hello = converter;

  // ===== Methods ===== //
  public handleRating(value: number, id: string) {
    console.log(value, id);
    // may need to switch this to a computed property w/ getters and setters to autoupdate
  }

  public handleReveal(idx: number) {
    this.selectedIdx = idx;
    this.reveal = true;
  }

  public handleRevealClose() {
    this.selectedIdx = -1;
    this.reveal = false;
  }

  public handleEdit(cardId: string) {
    router.push({ name: "CharacterCard", params: { id: cardId } });
  }

  public handleDelete(id: string) {
    this.deleteMandarinExample(id);
  }

  // ===== Computed ===== //
  get converter() {
    return converter;
  }
}
</script>

<style scoped></style>
