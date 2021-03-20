<template>
  <application-layout>
    <v-container class="container-border resources-container">
      <h1>Mandarin Resources</h1>
      <p>
        Here are some resources to help you learn mandarin and/or look into
        traveling throughout China!
      </p>
      <v-divider />
      <v-list three-line>
        <template v-for="(resource, idx) in resources">
          <v-divider v-if="resource.divider" :key="idx" />

          <v-list-item v-else :key="resource.title">
            <v-list-item-content>
              <v-list-item-title>
                <span>
                  <v-icon>horizontal_rule </v-icon>
                  <span class="font-weight-bold title"
                    >{{ resource.title }}
                  </span>
                  <v-icon>horizontal_rule</v-icon>
                  <a
                    :href="resource.url"
                    target="_blank"
                    class="text-decoration-none"
                  >
                    <v-icon small color="teal">open_in_new</v-icon>
                  </a>
                </span>
              </v-list-item-title>
              <v-list-item-subtitle>{{
                resource.subtitle
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-container>
  </application-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ApplicationLayout from "@/components/layouts/ApplicationLayout.vue";
import { resourcesList } from "@/helpers/resources";

@Component({
  name: "Resources",
  components: { ApplicationLayout }
})
export default class Resources extends Vue {
  // ===== Store ===== //

  // ===== Data ===== //
  public resources = resourcesList;

  // ===== Methods ===== //

  // ===== Computed ===== //

  // ===== Lifecycle Hooks ===== //
}
</script>

<style scoped>
  .resources-container {
    width: 85%;
  }
</style>
