<template>
  <v-container>
    <transition name="scroll-x-transition" mode="out-in">
    <div v-if="!addStory" :key="'add-story-key'">
      <h2>What are stories?</h2>
      <p>{{ storiesOverview }}</p>
      <v-btn
        data-testid="create-story-add-btn"
        class="create-story-add-btn"
        @click="handleAddNewStory"
        color="green lighten-2 white--text"
      >
        Add New Story
      </v-btn>
    </div>
    <div v-else :key="'story-form-key'">
      <ValidationObserver ref="storyForm">
        <v-row>
          <v-col cols="12" class="pb-0">
            <ValidationProvider mode="eager" rules="required">
              <v-text-field
                data-testid="create-story-title-input"
                class="create-story-title-input"
                v-model="storyPayload.title"
                label="Title"
                placeholder="Buying Clothes | 买衣服"
                outlined
                slot-scope="{ errors, valid }"
                :error-messages="errors"
                :success="valid"
              />
            </ValidationProvider>
          </v-col>
          <v-col cols="12" class="pt-0">
            <ValidationProvider mode="eager" rules="required">
              <v-textarea
                data-testid="create-story-content-textarea"
                class="create-story-content-textarea"
                v-model="storyPayload.content"
                label="Content"
                placeholder="Today I went to buy clothes... | 今天我去了买衣服..."
                outlined
                slot-scope="{ errors, valid }"
                :error-messages="errors"
                :success="valid"
              />
            </ValidationProvider>
          </v-col>
        </v-row>
      </ValidationObserver>
      <v-row class="mr-1">
        <v-spacer />
        <v-btn
          data-testid="create-story-cancel-btn"
          class="create-story-cancel-btn"
          color="error"
          @click="handleCancel"
        >
          Cancel
        </v-btn>
        <v-btn
          data-testid="create-story-submit-btn"
          class="create-story-submit-btn ml-4"
          color="teal lighten-2 white--text"
          @click="handleSubmitStory"
          :loading="loadingState.includes('creating new story...')"
        >
          Submit
        </v-btn>
      </v-row>
    </div>
    </transition>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace, State } from "vuex-class";
import { StoryPayload, StoriesState, UserState } from "@/models";
import UserModule from "@/store/modules/user";
import StoriesModule from "@/store/modules/stories";
import { storiesOverview } from "@/helpers/stories-text";
import { ValidationObserver, ValidationProvider } from "vee-validate";

const user = namespace(UserModule.name);
const stories = namespace(StoriesModule.name);

@Component({
  name: "CreateStory",
  components: { ValidationObserver, ValidationProvider }
})
export default class CreateStory extends Vue {
  $refs!: {
    storyForm: InstanceType<typeof ValidationObserver>
  }
  // ===== Store ===== //
  @State("stories") public stories!: StoriesState;
  @State("user") public user!: UserState;
  @stories.Action("createStory") public createStory!: (
    payload: StoryPayload
  ) => void;

  // ===== Data ===== //
  public addStory = false;
  public storyPayload: StoryPayload = {
    title: "",
    content: ""
  };
  public storiesOverview = storiesOverview;

  // ===== Methods ===== //
  public handleAddNewStory(): void {
    this.addStory = true;
  }

  public handleCancel(): void {
    this.resetStoryPayload();
    this.addStory = false;
  }

  public async handleSubmitStory(): Promise<void> {
    const payload = {
      ...this.storyPayload,
      user: this.user.user!._id
    };
    await this.createStory(payload);
    this.resetStoryPayload();
    this.addStory = false;
    this.$refs.storyForm.reset();
  }

  public resetStoryPayload(): void {
    this.storyPayload.title = "";
    this.storyPayload.content = "";
  }

  // ===== Computed ===== //
  get loadingState(): string[] {
    return this.stories.loadingState;
  }

  // ===== Lifecycle Hooks ===== //
}
</script>
