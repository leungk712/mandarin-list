<template>
    <v-container>
      <v-expansion-panels focusable>
        <v-expansion-panel
          v-for="story in stories.storiesList"
          :key="story._id"
        >
          <v-expansion-panel-header>
            {{ story.title }}
          </v-expansion-panel-header>
          <v-expansion-panel-content class="mt-2">
            <h4>Written: {{ formatDateAndTime(story.createdAt) }}</h4>
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
              @click="handleDeleteStory(story._id)"
             >
               delete_outline
             </v-icon>
           </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace, State } from "vuex-class";
import { StoriesState } from "@/models";
import StoriesModule from "@/store/modules/stories";
import moment from "moment";

const stories = namespace(StoriesModule.name);

@Component({
  name: "StoriesIndex"
})
export default class StoriesIndex extends Vue {
  // ===== Store ===== //
  @State("stories") public stories!: StoriesState;
  @stories.Action("getStories") public getStories!: () => void;

  // ===== Data ===== //

  // ===== Methods ===== //
  public handleDeleteStory(id: string): void {
    console.log("id", id);
  }
  public formatDateAndTime(time: string) {
    return moment(time).format('MMMM Do YYYY, h:mm:ss a')
  }

  // ===== Computed ===== //

  // ===== Lifecycle Hooks ===== //
  private mounted(): void {
    this.getStories();
  }
}
</script>