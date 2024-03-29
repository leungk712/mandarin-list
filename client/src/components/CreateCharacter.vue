<template>
  <v-container class="container-border py-6">
    <v-row align-content="center" justify="center">
      <div class="display-4 character-text-box">
        <p class="text-center">
          {{ newExample.character ? newExample.character : "大家好！" }}
        </p>
      </div>
    </v-row>
    <ValidationObserver ref="characterForm">
      <v-row
        align-content="center"
        justify="center"
        class="mt-3"
      >
        <v-col
          sm="12"
          md="3"
          xl="2"
        >
          <ValidationProvider
            mode="eager"
            :rules="'required'"
          >
            <v-text-field
              data-testid="new-example-character-input"
              class="new-example-character-input"
              v-model="newExample.character"
              label="Chinese Character"
              placeholder="Ex. (你好)"
              outlined
              slot-scope="{ errors, valid }"
              :error-messages="errors"
              :success="valid"
            />
          </ValidationProvider>
        </v-col>
        <v-col
          sm="12"
          md="3"
          xl="2"
        >
          <ValidationProvider
            mode="eager"
            :rules="'required'"
          >
            <v-text-field
              data-testid="new-example-pinyin-input"
              class="new-example-pinyin-input"
              v-model="newExample.pinyin"
              label="Pinyin"
              placeholder="Ex. (ni2hao3)"
              outlined
              slot-scope="{ errors, valid }"
              :error-messages="errors"
              :success="valid"
            />
          </ValidationProvider>
        </v-col>
        <v-col
          sm="12"
          md="3"
          xl="2"
        >
          <ValidationProvider
            mode="eager"
            :rules="'required'"
          >
            <v-text-field
              data-testid="new-example-english-input"
              class="new-example-english-input"
              v-model="newExample.english"
              label="English"
              placeholder="Ex. (Hello)"
              outlined
              slot-scope="{ errors, valid }"
              :error-messages="errors"
              :success="valid"
            />
          </ValidationProvider>
        </v-col>
      </v-row>
    </ValidationObserver>
    <v-row align-content="center" justify="center">
      <v-col
        sm="12"
        md="9"
        xl="6"
      >
        <p class="font-weight-bold">Select 1 or more categories:</p>
        <v-select
          data-testid="new-example-category-menu"
          class="new-example-category-menu"
          v-model="newExample.categories"
          :items="categories.categoriesList"
          item-text="name"
          item-value="name"
          multiple
          label="Categories"
          chips
          outlined
        />
      </v-col>
    </v-row>
    <v-row align-content="center" justify="center">
      <v-col
        sm="12"
        md="9"
        xl="6"
      >
        <p class="font-weight-bold">Add an example (optional):</p>
        <v-text-field
          data-testid="new-example-sentence-input"
          class="new-example-sentence-input"
          v-model="example.sentence"
          label="Sentence example..."
          placeholder="Ex. （你好， Kevin。你今天做什么?)"
          outlined
        />
      </v-col>
    </v-row>
    <v-row align-content="center" justify="center">
      <v-col cols="8">
        <div
          v-for="example in newExample.examples"
          :key="example.id"
          class="my-2 px-4 py-2 example-card"
          outlined
          label
        >
          <v-row>
            <v-col cols="10">
              <p class="title pt-1 my-auto">
                <v-icon>chevron_right</v-icon>
                {{ example.sentence }}
              </p>
            </v-col>
            <v-spacer />
            <v-col cols="1">
              <v-icon
                data-testid="delete-sentence-btn"
                class="delete-sentence-btn ml-4"
                @click="handleDeleteSentence(example.id)"
              >
                clear
              </v-icon>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
    <v-row
      justify="center"
      align-content="center"
      class="mt-4"
    >
      <v-col
        lg="9"
        xl="6"
        class="mr-6"
      >
        <v-row justify="end">
          <v-btn
            data-testid="add-example-btn"
            class="add-example-btn mx-4"
            @click.native="handleAddExample"
            color="purple lighten-2 white--text"
            :disabled="!example.sentence.length"
          >
            <v-icon class="mr-1">add_circle_outline</v-icon> Add Example
          </v-btn>
          <v-btn
            data-testid="submit-character-btn"
            class="submit-character-btn"
            @click.native="handleSubmit"
            :disabled="!validForm"
            color="teal lighten-2 white--text"
            :loading="loading"
          >
            Submit
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace, State } from "vuex-class";
import {
  CategoriesState,
  Example,
  PostPayload,
  PostsState,
  UserState
} from "@/models";
import CategoriesModule from "@/store/modules/categories";
import PostsModule from "@/store/modules/posts";
import UserModule from "@/store/modules/user";
import { ValidationObserver, ValidationProvider } from "vee-validate";

const categories = namespace(CategoriesModule.name);
const posts = namespace(PostsModule.name);
const user = namespace(UserModule.name);

@Component({
  name: "CreateCharacter",
  components: { ValidationObserver, ValidationProvider }
})
export default class CreateCharacter extends Vue {
  $refs!: {
    characterForm: InstanceType<typeof ValidationObserver>
  }
  // ===== Store ===== //
  @State("categories") public categories!: CategoriesState;
  @State("posts") public posts!: PostsState;
  @State("user") public user!: UserState;
  @posts.Action("submitMandarinCharacter") public submitMandarinCharacter!: (
    payload: PostPayload
  ) => void;

  // ===== Data ===== //
  public newExample: PostPayload = {
    categories: [],
    character: "",
    pinyin: "",
    english: "",
    examples: [],
    starred: false,
    user: "",
    date: new Date().toISOString()
  };
  public example: Example = {
    id: Math.floor(Math.random() * 1000),
    sentence: ""
  };
  public loading = false;

  // ===== Methods ===== //
  public handleAddExample(): void {
    this.newExample.examples?.push(this.example);
    this.example = {
      id: Math.floor(Math.random() * 1000),
      sentence: ""
    };
  }

  public async handleSubmit(): Promise<void> {
    this.loading = true;
    const payload = {
      character: this.newExample.character,
      categories: this.newExample.categories,
      pinyin: this.newExample.pinyin,
      english: this.newExample.english,
      examples: this.newExample.examples,
      starred: false,
      user: this.user.user!._id,
      date: new Date().toISOString()
    };
    await this.submitMandarinCharacter(payload);
    this.loading = false;
    this.resetExample();
    this.$refs.characterForm.reset();
  }

  public resetExample(): void {
    this.newExample = {
      categories: [],
      character: "",
      pinyin: "",
      english: "",
      examples: [],
      starred: false,
      date: new Date().toISOString()
    };
  }

  public handleDeleteSentence(id: number) {
    const filteredSentences = this.newExample.examples?.filter(
      example => example.id !== id
    );
    this.newExample.examples = filteredSentences;
  }

  // ===== Computed ===== //
  get validForm() {
    return this.newExample.character.length &&
      this.newExample.pinyin.length &&
      this.newExample.english.length &&
      this.newExample.categories.length
  }

  // ===== Lifecycle Hooks ===== //
}
</script>

<style scoped>
  .character-text-box {
    height: 15vh;
    width: 35vw;
  }
  .example-card {
    border: 1px solid #eee;
    border-radius: 5px;
  }
</style>
