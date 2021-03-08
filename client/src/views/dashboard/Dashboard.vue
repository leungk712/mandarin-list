<template>
  <application-layout>
    <v-container>
    <v-card>
      <v-toolbar
        flat
        color="teal"
        dark
      >
        <v-toolbar-title>Dashboard</v-toolbar-title>
      </v-toolbar>
      <v-tabs vertical>
        <v-tab>
          <v-icon left>
            mdi-account
          </v-icon>
          Characters
        </v-tab>
        <v-tab>
          <v-icon left>
            mdi-lock
          </v-icon>
          Categories
        </v-tab>
        <v-tab>
          <v-icon left>
            mdi-access-point
          </v-icon>
          Option 3
        </v-tab>

        <v-tab-item>
          <v-card flat>
              <CreateCharacter class="mt-6" />
              <v-divider class="my-8" />
              <ListCard />
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
              <CreateCategory />
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
              Section Three
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
import CreateCategory from "@/views/categories/CreateCategory.vue";
import CreateCharacter from "@/components/CreateCharacter.vue";
import ListCard from "@/components/ListCard.vue";

@Component({
  name: "Dashboard",
  components: {
    ApplicationLayout,
    CreateCategory,
    CreateCharacter,
    ListCard
  }
})
export default class Dashboard extends Vue {}
</script>
