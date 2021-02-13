<template>
  <v-app>
    <v-toolbar color="#8bbf9f" max-height="7vh">
      <v-toolbar-title class="white--text font-weight-bold">
        Community Mandarin List
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        data-testid="app-login-btn"
        class="app-login-btn"
        @click="handleLogin"
        color="orange lighten-2 white--text"
      >
        Sign Up/Login
      </v-btn>
      <!-- <v-icon
        data-testid="navbar-home-btn"
        class="navbar-home-btn"
        color="white"
        large
        @click="handleReturnHome"
      >
        home
      </v-icon> -->
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
  // ===== Store ===== //

  // ===== Data ===== //

  // ===== Methods ===== //
  public handleReturnHome(): void {
    router.push({ name: "Home" });
  }

  public handleLogin(): void {
    router.push({ name: "AppLogin" });
  }

  // ===== Computed ===== //

}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
