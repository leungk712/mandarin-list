<template>
  <div class="my-8 pa-4">
    <v-skeleton-loader
      v-if="posts.loadingState.includes('retrieving list of mandarin characters...')"
      type="card@8"
    />
    <div v-else>
      <v-row>
        <v-col
          v-for="(character, idx) in updatedCharactersList"
          :key="character._id"
          xl="3"
          :lg="categoryView ? 6 : 4"
        >
        <v-card
          class="mx-auto my-2 pa-2"
          max-width="400"
          outlined
          tag="div"
        >
          <v-card-text>
            <v-row>
              <p class="display-2 text--primary">{{ character.character }}</p>
              <v-spacer />
              <v-icon
                data-testid="favorite-icon-select"
                class="favorite-icon-select"
                :color="character.starred ? 'pink' : ''"
                size="30"
                @click="handleRating(character)"
              >
                favorite_border
              </v-icon>
            </v-row>

            <p class="title">
              {{ character.pinyin }} ({{ character.english }})
            </p>

            <v-chip
              v-for="(category, idx) in character.categories"
              :key="idx"
              class="mx-1"
              color="deep-purple lighten-4"
            >
              {{ category }}
            </v-chip>
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
              @click="handleEdit(character)"
              color="blue-grey lighten-1"
            >
              create
            </v-icon>
            <v-icon
              data-testid="edit-card-btn"
              class="edit-card-btn mr-2"
              @click="handleDelete(character)"
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
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace, State } from "vuex-class";
import { PostsState, SelectedCharacter, UserState } from "@/models";
import Draggable from "vuedraggable";
import PostsModule from "@/store/modules/posts";
import UserModule from "@/store/modules/user";
import router from "@/router";
import converter from "number-to-chinese-words";

const posts = namespace(PostsModule.name);
const user = namespace(UserModule.name);

@Component({
  name: "ListCard",
  components: { Draggable }
})
export default class ListCard extends Vue {
  // ===== Props ===== //
  @Prop({ default: false }) private readonly categoryView?: boolean;

  // ===== Store ===== //
  @State("posts") public posts!: PostsState;
  @State("user") public user!: UserState;
  @posts.Action("deleteMandarinCharacter") public deleteMandarinCharacter!: (payload: {}) => void;
  @posts.Action("getIndividualCharacter") public getIndividualCharacter!: (payload: {}) => void;
  @posts.Action("updateMandarinCharacter") public updateMandarinCharacter!: (payload: SelectedCharacter) => void;
  @posts.Action("updateMandarinList") public updateMandarinList!: (list: SelectedCharacter[]) => void;

  // ===== Data ===== //
  public reveal = true;
  public selectedIdx = -1;
  public favorited = false;

  // ===== Methods ===== //
  public handleRating(character: SelectedCharacter): void {
    this.favorited = !this.favorited;

    const payload = {
      _id: character._id,
      __v: character.__v,
      character: character.character,
      createdAt: character.createdAt,
      categories: character.categories,
      date: character.date,
      english: character.english,
      examples: character.examples,
      pinyin: character.pinyin,
      starred: this.favorited,
      user: this.user.user!._id,
      updatedAt: character.updatedAt
    };

    this.updateMandarinCharacter(payload);
  }

  public handleReveal(idx: number): void {
    this.selectedIdx = idx;
    this.reveal = true;
  }

  public handleRevealClose(): void {
    this.selectedIdx = -1;
    this.reveal = false;
  }

  public async handleEdit(character: SelectedCharacter): Promise<void> {
    const payload = {
      userId: character.user,
      _id: character._id
    }
    await this.getIndividualCharacter(payload);
    router.push({ name: "CharacterCard", params: { userId: character.user, id: character._id } });
  }

  public handleDelete(character: SelectedCharacter): void {
    this.deleteMandarinCharacter(character);
  }

  // ===== Computed ===== //
  get converter(): {} {
    return converter;
  }

  get updatedCharactersList(): SelectedCharacter[] {
    return this.posts.mandarinList;
  }
}
</script>
