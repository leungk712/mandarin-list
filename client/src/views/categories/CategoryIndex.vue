<template>
  <application-layout>
    <v-container
      class="mt-1"
      style="border: 1px solid black; min-height: 80vh; max-width: 90%"
      fill-height
    >
      <v-row>
        <v-col cols="3" style="min-height: 80vh" fill-height>
          <v-btn>Add example</v-btn>
        <v-divider class="my-4"/>
        Categories
        <v-card class="my-2 py-2 px-2">All Characters</v-card>
        <v-card
          v-for="(item, idx) in items"
          :key="idx"
          class="my-2 py-2 px-2"
        >
          {{ item }}
        </v-card>
        </v-col>
        <v-col cols="9" style="border: 1px solid black">
          Cards
        </v-col>
      </v-row>
    </v-container>
  </application-layout>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
        import ApplicationLayout from "@/components/layouts/ApplicationLayout.vue";

    @Component({
        name: "CategoryIndex",
        components: { ApplicationLayout }
    })
    export default class CategoryIndex extends Vue {
        
    }
</script>

<style scoped>

</style>