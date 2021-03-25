<template>
  <div>
    <v-container class="container-border dictionary-container mb-6">
      <p class="display-1 my-4">Chinese Dictionary</p>
      <v-divider />
      <p class="my-4 title">
        {{ dictionaryText }}
      </p>
      <v-row justify="center" class="my-6">
        <v-btn
          data-testid="dictionary-link-btn"
          class="dictionary-link-btn"
          color="blue lighten-1 white--text"
          large
        >
          <v-icon class="mr-2">open_in_new</v-icon>
          <a
            href="https://mandarin-list-dictionary.netlify.com"
            target="_blank"
            class="text-decoration-none white--text"
          >
          Dictionary
          </a>
        </v-btn>
      </v-row>
      <v-img src="@/assets/misc/mandarin-list-dictionary.png" />
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { dictionaryText } from "@/helpers/dictionary";

@Component({
  name: "Dictionary"
})
export default class Dictionary extends Vue {
  // ===== Data ===== //
  public dictionaryText = dictionaryText;

  // ===== Methods ===== //

  // ===== Computed ===== //

  // ===== Lifecycle Hooks ===== //
}
</script>

<style scoped>
  .dictionary-container {
    width: 80%;
  }
</style>
