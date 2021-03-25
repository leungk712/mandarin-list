<template>
  <div>
  <v-row>
    <div
      v-if="!updatedCharactersList.length"
      class="d-flex mx-auto"
      :class="this.view === 'category' ? 'mt-16' : ''"
    >
      <h2 v-if="!charactersList.length">You have no characters. Go create a character!</h2>
      <h2 v-else>No cards found. Select a different category.</h2>
    </div>
    <v-col
      v-for="(character, idx) in updatedCharactersList"
      :key="character._id"
      xl="4"
      :lg="view && view === 'category' ? 6 : 4"
    >
      <v-card
        class="mx-auto my-2 pa-2"
        max-width="400"
        min-height="225"
        outlined
        tag="div"
        hover
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

          <p class="title">{{ character.pinyin }} ({{ character.english }})</p>

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
            @click="handleDeleteModal(character)"
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
  <ApplicationModal
    data-testid="list-card-modal"
    class="list-card-modal"
    v-model="deleteCharacterModal"
    @handleCancel="handleCloseDeleteCharacterModal"
    @handleConfirm="handleDelete"
    @click:outside="deleteCharacterModal = false"
  >
    <div slot="modal-title" class="display-1">
      Delete Character 
      <span v-if="selectedCharacter">({{ selectedCharacter.character }})</span>
    </div>
    <div slot="modal-body" class="mt-4 font-weight-bold title">
      <p>Are you sure you want to delete this character?</p>
      <p>
        <v-icon class="mr-2" color="error">error</v-icon>
        This action cannot be undone.
      </p>
    </div>
  </ApplicationModal>
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace, State } from "vuex-class";
import { PostsState, SelectedCharacter, UserState } from "@/models";
import PostsModule from "@/store/modules/posts";
import UserModule from "@/store/modules/user";
import router from "@/router";
import converter from "number-to-chinese-words";
import ApplicationModal from "@/components/ApplicationModal.vue";

const posts = namespace(PostsModule.name);
const user = namespace(UserModule.name);

@Component({
  name: "ListCard",
  components: { ApplicationModal }
})
export default class ListCard extends Vue {
  // ===== Props ===== //
  @Prop({ default: "" }) private readonly view?: string;
  @Prop({ default: "" }) private readonly selectedCategory?: string;
  @Prop(Array) private readonly dashboardCategories?: string[];

  // ===== Store ===== //
  @State("posts") public posts!: PostsState;
  @State("user") public user!: UserState;
  @posts.Action("deleteMandarinCharacter")
  public deleteMandarinCharacter!: (payload: SelectedCharacter) => void;
  @posts.Action("getIndividualCharacter")
  public getIndividualCharacter!: (payload: {}) => void;
  @posts.Action("updateMandarinCharacter") public updateMandarinCharacter!: (
    payload: SelectedCharacter
  ) => void;
  @posts.Action("updateMandarinList") public updateMandarinList!: (
    list: SelectedCharacter[]
  ) => void;

  // ===== Data ===== //
  public reveal = true;
  public selectedIdx = -1;
  public favorited = false;
  public selectedCharacter: SelectedCharacter | null = null;
  public deleteCharacterModal = false;

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
    };
    await this.getIndividualCharacter(payload);
    router.push({
      name: "CharacterCard",
      params: { userId: character.user, id: character._id }
    });
  }

  public async handleDelete(): Promise<void> {
    await this.deleteMandarinCharacter(this.selectedCharacter!);
    this.deleteCharacterModal = false;
    this.selectedCharacter = null;
  }

  public handleDeleteModal(character: SelectedCharacter): void {
    this.selectedCharacter = character;
    this.deleteCharacterModal = true;
  }

  public handleCloseDeleteCharacterModal(): void {
    this.deleteCharacterModal = false;
    this.selectedCharacter = null;
  }

  // ===== Computed ===== //
  get charactersList(): SelectedCharacter[] {
    return this.posts.mandarinList;
  }

  get converter(): {} {
    return converter;
  }

  get updatedCharactersList() {
    if (this.view === "character" && this.dashboardCategories && this.dashboardCategories.length) {
      return this.charactersList.filter(cards =>
        this.dashboardCategories.some(category => cards.categories.includes(category))
      );
    }

    if (this.view === "category" && this.selectedCategory) {
      return this.charactersList.filter(cards =>
        cards.categories.includes(this.selectedCategory)
      );
    }

    return this.charactersList;
  }
}
</script>

<style scoped>
  .favorite-icon-select {
    height: 100%;
  }

  .v-card--reveal {
    height: 100%;
  }
</style>
