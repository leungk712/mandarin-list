<template>
    <application-layout>
        <v-container>
          <h1>Profile.vue</h1>
        </v-container>
    </application-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ApplicationLayout from "@/components/layouts/ApplicationLayout.vue";

@Component({
  name: "Profile",
  components: { ApplicationLayout }
})
export default class Profile extends Vue {
  // ===== Store ===== //

  // ===== Data ===== //

  // ===== Methods ===== //

  // ===== Computed ===== //

  // ===== Lifecycle Hooks ===== //
}
</script>