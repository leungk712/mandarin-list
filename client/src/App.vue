<template>
  <v-app>
    <v-toolbar color="#8bbf9f">
      <v-toolbar-title class="white--text font-weight-bold"
        >Community Mandarin List</v-toolbar-title
      >
    </v-toolbar>
    <transition appear name="slide-x-transition" mode="out-in">
      <router-view />
    </transition>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "App"
})
export default class App extends Vue {}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
