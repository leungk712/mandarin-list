<template>
  <v-app>
    <transition
      appear
      name="slide-x-transition"
      mode="out-in"
    >
    <v-main>
      <router-view />
    </v-main>
    </transition>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import ApplicationToolbar from "@/components/layouts/ApplicationToolbar.vue";

@Component({
  name: "App",
  components: { ApplicationToolbar }
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
