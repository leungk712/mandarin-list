<template>
  <div class="landing-background">
    <ApplicationToolbar />
    <v-container class="vocab-container" fill-height>
      <v-row
        justify="center"
        align-content="center"
        class="my-10"
      >
        <v-col
          v-for="item in vocabItems"
          :key="item.id"
          cols="4"
          class="pa-0 ma-0"
        >
          <v-card
            :color="item.backgroundColor"
            class="vocab-card rounded-0"
            flat
          >
            <v-row
              justify="center"
              align-content="center"
              class="vocab-card-row"
            >
              <p
                :class="$vuetify.breakpoint.lg ? 'display-3' :'display-4'"
              >
                {{ item.character }}
              </p>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ApplicationToolbar from "@/components/layouts/ApplicationToolbar.vue";
import { vocabItems } from "@/helpers/home";

@Component({
  name: "LandingPage",
  components: { ApplicationToolbar }
})
export default class LandingPage extends Vue {
  // ===== Store ===== //

  // ===== Data ===== //
  public vocabItems = vocabItems;

  // ===== Methods ===== //

  // ===== Computed ===== //

  // ===== Lifecycle Hooks ===== //
}
</script>

<style scoped>
  .landing-background {
    background: #eee;
  }

  .vocab-container {
    min-height: 65vh;
  }

  .vocab-card {
    height: 35vh;
  }

  .vocab-card-row {
    height: 100%;
  }
</style>
