<template>
  <div>
    <ApplicationToolbar />
    <v-container style="min-height: 80vh" fill-height fluid>
      <v-row justify="center" align="center">
        <v-carousel height="750" cycle interval="10000" hide-delimiters>
          <v-carousel-item
            v-for="(item, idx) in carouselItems"
            :key="idx"
            :src="item.img"
            reverse-transition="fade-transition"
            transition="fade-transition"
          />
        </v-carousel>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ApplicationToolbar from "@/components/layouts/ApplicationToolbar.vue";
import { carouselItems } from "@/helpers/home";

@Component({
  name: "LandingPage",
  components: { ApplicationToolbar }
})
export default class LandingPage extends Vue {
  // ===== Store ===== //

  // ===== Data ===== //
  public carouselItems = carouselItems;

  // ===== Methods ===== //

  // ===== Computed ===== //

  // ===== Lifecycle Hooks ===== //
}
</script>

<style scoped></style>
