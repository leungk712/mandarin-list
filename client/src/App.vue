<template>
  <v-app>
    <v-toolbar color="#8bbf9f" max-height="6vh">
      <v-toolbar-title class="white--text font-weight-bold">
        Community Mandarin List
      </v-toolbar-title>
      <v-spacer />
      <v-icon
        data-testid="navbar-home-btn"
        class="navbar-home-btn"
        color="white"
        large
        @click="handleReturnHome"
      >
        home
      </v-icon>
    </v-toolbar>
    <transition appear name="slide-x-transition" mode="out-in">
      <router-view />
    </transition>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import router from "@/router";

@Component({
  name: "App"
})
export default class App extends Vue {
  public handleReturnHome(): void {
    router.push({ name: "Home" });
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
