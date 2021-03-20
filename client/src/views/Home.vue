<template>
  <div>
    <LandingPage />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LandingPage from "@/components/LandingPage.vue";

@Component({
  name: "Home",
  components: { LandingPage }
})
export default class Home extends Vue {
  // ===== Store ===== //
  // ===== Data ===== //
  // ===== Methods ===== //
  // ===== Computed ===== //
  // ===== Lifecycle Hooks ===== //
}
</script>
