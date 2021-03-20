<template>
  <application-layout>
    <v-container class="container-border">
      <h1>Code Overview</h1>
      <v-divider />
      <div class="mt-4">
        <h3>Project Timeline</h3>
        <v-timeline>
          <v-timeline-item color="red lighten-2"
            >Jan '21 - Project idea enters brain</v-timeline-item
          >
          <v-timeline-item class="text-right" color="purple lighten-2">
            Jan '21 - Mar '21 - Coding & suffering
          </v-timeline-item>
          <v-timeline-item color="green lighten-2"
            >Mar '21 - Project v1.0 release</v-timeline-item
          >
          <v-timeline-item class="text-right"
            >Apr '21 - Beyond - ???</v-timeline-item
          >
        </v-timeline>
      </div>
      <v-divider class="mt-4" />
      <div class="mt-4">
        <v-row>
          <v-col cols="6">
            {{ codeNote }}
            <v-row class="mt-4 ml-1">
              <div class="mr-4">
                <a
                  href="https://github.com/leungk712"
                  target="_blank"
                  class="code-icon github-icon"
                  title="Check out my Github account!"
                >
                  <i class="fab fa-github fa-2x"></i>
                </a>
              </div>
              <div>
                <a
                  href="https://www.linkedin.com/in/leungk712/"
                  target="_blank"
                  class="code-icon linkedin-icon"
                  title="Check out my LinkedIn account!"
                >
                  <i class="fab fa-linkedin fa-2x"></i>
                </a>
              </div>
            </v-row>
          </v-col>
          <v-col cols="6">
            <h3>Project Resources</h3>
            <v-divider class="my-2" />
            <ul v-for="(resource, idx) in projectResources" :key="idx">
              <li>
                <a
                  class="text-decoration-none"
                  :href="resource.url"
                  target="_blank"
                >
                  {{ resource.name }}
                </a>
              </li>
            </ul>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </application-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ApplicationLayout from "@/components/layouts/ApplicationLayout.vue";
import { codeNote, projectResources } from "@/helpers/code.ts";

@Component({
  name: "Code",
  components: { ApplicationLayout }
})
export default class Code extends Vue {
  // ===== Store ===== //

  // ===== Data ===== //
  public projectResources = projectResources;
  public codeNote = codeNote;

  // ===== Methods ===== //

  // ===== Computed ===== //

  // ===== Lifecycle Hooks ===== //
}
</script>

<style scoped>
/* .fa-github, .fa-linkedin {
    color: black;
  } */

.github-icon {
  color: #6e5494;
}

.linkedin-icon {
  color: #0072b1;
}
</style>
