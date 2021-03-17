<template>
  <application-layout>
    <v-container>
    <v-card>
      <v-toolbar
        flat
        color="blue-grey lighten-2"
        dark
      >
        <v-toolbar-title>Dashboard</v-toolbar-title>
      </v-toolbar>
      <v-tabs vertical background-color="blue-grey lighten-4">
        <v-tab>
          <v-icon left>mdi-ideogram-cjk</v-icon>
          Characters
        </v-tab>
        <v-tab>
          <v-icon left>mdi-format-list-bulleted</v-icon>
          Categories
        </v-tab>
        <v-tab>
          <v-icon left>mdi-book-open-variant</v-icon>
          Stories
        </v-tab>
        <v-tab>
          <v-icon left>translate</v-icon>
          Translate
        </v-tab>

        <v-tab-item>
          <v-card flat class="ma-6">
              <CreateCharacter class="mt-6" />
              <v-divider class="my-8" />
              <ListCard />
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat class="ma-6">
              <CreateCategory class="ml-6" />
              <v-divider />
              <CategoryIndex />
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat class="ma-6">
              <CreateStory />
              <v-divider class="my-4" />
              <StoriesIndex />
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <Translate />
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
    </v-container>
  </application-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ApplicationLayout from "@/components/layouts/ApplicationLayout.vue";
import CategoryIndex from "@/views/categories/CategoryIndex.vue";
import CreateCategory from "@/views/categories/CreateCategory.vue";
import CreateCharacter from "@/components/CreateCharacter.vue";
import CreateStory from "@/views/stories/CreateStory.vue";
import ListCard from "@/components/ListCard.vue";
import StoriesIndex from "@/views/stories/StoriesIndex.vue";
import Translate from "@/views/translate/Translate.vue";

@Component({
  name: "Dashboard",
  components: {
    ApplicationLayout,
    CategoryIndex,
    CreateCategory,
    CreateCharacter,
    CreateStory,
    ListCard,
    StoriesIndex,
    Translate
  }
})
export default class Dashboard extends Vue {}
</script>