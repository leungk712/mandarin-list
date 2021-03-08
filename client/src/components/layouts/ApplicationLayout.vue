<template>
  <div id="layout--application">
    <ApplicationToolbar />
    <NavigationDrawer />
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ApplicationToolbar from "@/components/layouts/ApplicationToolbar.vue";
import NavigationDrawer from "@/components/layouts/NavigationDrawer.vue";

@Component({
  name: "ApplicationLayout",
  components: { ApplicationToolbar, NavigationDrawer }
})
export default class ApplicationLayout extends Vue {}
</script>
