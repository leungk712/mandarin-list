<template>
  <div>
    <v-container class="container-border mb-6" style="width: 80%">
      <!-- <p class="display-1 text-center my-4">Chinese Dictionary</p>
      <v-row justify="center" align="center">
        <v-col cols="8">
          <v-text-field
              data-testid="dictionary-search-input"
              class="dictionary-search-input"
              v-model="word"
              outlined
              label="Enter word (输入字词)"
              placeholder="Example (你好)"
              append-icon="search"
              @click:append="handleSearch"
          />
        </v-col>
      </v-row>

      <v-row
        v-if="definition.length"
        justify="center"
        align-content="center"
      >
        <v-col cols="6">
          <v-card
              v-for="(result, idx) in definition"
              :key="idx"
              class="my-2 pa-4"
          >
            <p class="display-1">{{ result.simp }} | {{ result.pinyin }} | {{ result.pinyinTones }}</p>
            <p class="title">Traditional Character(s): {{ result.trad }}</p>
            <h3 class="title">Definitions：</h3>
            <ul
              v-for="(definition, idx) in result.definitions"
              :key="idx"
            >
              <li>{{ definition }}</li>
            </ul>
          </v-card>
        </v-col>
      </v-row> -->
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import { getEntries } from "chinese-lexicon";

@Component({
  name: "Dictionary"
})
export default class Dictionary extends Vue {
  // ===== Data ===== //
  public word = "";
  public definition = [];

  // ===== Methods ===== //
  // public handleSearch() {
  //   this.definition = getEntries(this.word);
  // }

  // ===== Computed ===== //

  // ===== Lifecycle Hooks ===== //
}
</script>
