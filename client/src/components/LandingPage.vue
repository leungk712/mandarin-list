<template>
  <div>
    <ApplicationToolbar />
    <v-container style="min-height: 80vh" fill-height>
      <v-row justify="center" align="center">
          <v-img src="../assets/carousel-imgs/diem-nhi-nguyen-Y-HwuSKt6gM-unsplash.jpg" />
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ApplicationToolbar from "@/components/layouts/ApplicationToolbar.vue";

@Component({
  name: "LandingPage",
  components: { ApplicationToolbar }
})
export default class LandingPage extends Vue {
  // ===== Store ===== //

  // ===== Data ===== //

  // ===== Methods ===== //

  // ===== Computed ===== //

  // ===== Lifecycle Hooks ===== //
}
</script>
