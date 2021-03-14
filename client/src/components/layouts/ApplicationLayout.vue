<template>
  <div id="layout--application">
    <ApplicationToolbar />
    <NavigationDrawer />
    <v-main>
      <slot />
    </v-main>
    <ApplicationSnackbar />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ApplicationSnackbar from "@/components/ApplicationSnackbar.vue";
import ApplicationToolbar from "@/components/layouts/ApplicationToolbar.vue";
import NavigationDrawer from "@/components/layouts/NavigationDrawer.vue";

@Component({
  name: "ApplicationLayout",
  components: { ApplicationSnackbar, ApplicationToolbar, NavigationDrawer }
})
export default class ApplicationLayout extends Vue {}
</script>
