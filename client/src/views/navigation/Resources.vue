<template>
    <application-layout>
        <v-container>
          <h1>Resources.vue</h1>
        </v-container>
    </application-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ApplicationLayout from "@/components/layouts/ApplicationLayout.vue";

@Component({
  name: "Resources",
  components: { ApplicationLayout }
})
export default class Resources extends Vue {
  // ===== Store ===== //

  // ===== Data ===== //

  // ===== Methods ===== //

  // ===== Computed ===== //

  // ===== Lifecycle Hooks ===== //
}
</script>