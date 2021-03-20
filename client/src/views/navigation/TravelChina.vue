<template>
  <application-layout>
    <v-container class="container-border">
      <div class="my-4">
        <h1>Travel China</h1>
        <p class="ml-1">
          China is a country of both ancient and modern. Over 55 ethnic groups
          live in China offering a range of different cultures, languages,
          cuisine.
        </p>
        <p class="ml-1">
          From the Great Wall of China to Zhangjiajie (home of Avatar Mountains)
          to the ancient water towns, there is a lot of natural beauty to
          witness.
        </p>
        <v-divider />
      </div>
      <v-row>
        <v-col v-for="city in cities" :key="city.id" sm="12" md="6" lg="4">
          <v-card class="mx-auto" max-width="344" height="550">
            <v-img
              :src="city.img"
              height="200px"
              width="100%"
              aspect-ratio="1"
            />
            <a
              class="caption text-decoration-none ml-1"
              :href="city.url"
              target="_blank"
            >
              Image source
            </a>

            <v-card-title> {{ city.name }} | {{ city.pinyin }} </v-card-title>

            <v-card-subtitle style="height: 18vh">
              {{ city.description }}
            </v-card-subtitle>

            <v-card-subtitle>
              <h4>Main Attractions:</h4>
              <ul v-for="(attraction, idx) in city.attractions" :key="idx">
                <li>{{ attraction }}</li>
              </ul>
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </application-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ApplicationLayout from "@/components/layouts/ApplicationLayout.vue";
import { cities } from "@/helpers/travel-china.ts";

@Component({
  name: "TravelChina",
  components: { ApplicationLayout }
})
export default class TravelChina extends Vue {
  // ===== Store ===== //

  // ===== Data ===== //
  public cities = cities;

  // ===== Methods ===== //

  // ===== Computed ===== //

  // ===== Lifecycle Hooks ===== //
}
</script>
