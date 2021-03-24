<template>
  <div>
    <v-container>
      <v-expansion-panels focusable>
        <v-expansion-panel v-for="story in stories.storiesList" :key="story._id">
          <v-expansion-panel-header>
            <h3>{{ story.title }}</h3>
          </v-expansion-panel-header>
          <v-expansion-panel-content class="mt-2">
            <h4>Written on {{ formatDateAndTime(story.createdAt) }}</h4>
            <v-divider class="my-2" />
            <div>
              {{ story.content }}
            </div>
            <v-row class="mt-8">
              <v-spacer />
              <v-icon
                data-testid="story-delete-btn"
                class="story-delete-btn"
                color="error"
                @click="handleDeleteStoryModal(story)"
              >
                delete_outline
              </v-icon>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
    <ApplicationModal
      data-testid="story-modal"
      class="story-modal"
      v-model="deleteStoryModal"
      @handleCancel="handleCloseDeleteStoryModal"
      @handleConfirm="handleDeleteStory"
      @click:outside="deleteStoryModal = false"
    >
    <div slot="modal-title" class="display-1">
      Delete Story
      <span v-if="selectedStory">
        ({{ selectedStory.title }})
      </span>
    </div>
    <div slot="modal-body" class="mt-4 font-weight-bold title">
      <p>Are you sure you want to delete this story?</p>
      <p>
        <v-icon class="mr-2" color="error">error</v-icon>
        This action cannot be undone.
      </p>
    </div>
    </ApplicationModal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace, State } from "vuex-class";
import { Stories, StoriesState } from "@/models";
import StoriesModule from "@/store/modules/stories";
import moment from "moment";
import ApplicationModal from "@/components/ApplicationModal.vue";

const stories = namespace(StoriesModule.name);

@Component({
  name: "StoriesIndex",
  components: { ApplicationModal }
})
export default class StoriesIndex extends Vue {
  // ===== Store ===== //
  @State("stories") public stories!: StoriesState;
  @stories.Action("getStories") public getStories!: () => void;
  @stories.Action("deleteStory") public deleteStory!: (storyId: string) => void;

  // ===== Data ===== //
  public deleteStoryModal = false;
  public selectedStory: Stories | null = null;

  // ===== Methods ===== //
  public async handleDeleteStory(): Promise<void> {
    this.deleteStory(this.selectedStory!._id);
    this.deleteStoryModal = false;
    this.selectedStory = null;
  }

  public handleDeleteStoryModal(story: Stories): void {
    this.selectedStory = story;
    this.deleteStoryModal = true;
  }

  public handleCloseDeleteStoryModal(): void {
    this.deleteStoryModal = false;
    this.selectedStory = null;
  }

  public formatDateAndTime(time: string) {
    return moment(time).format("MMMM Do YYYY, h:mm a");
  }

  // ===== Computed ===== //
}
</script>
