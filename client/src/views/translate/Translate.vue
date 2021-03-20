<template>
  <div>
    <v-container fluid class="translate-container mb-6">
      <v-row class="mt-6">
        <h4>
          Inspired by Google Translate, type in your simplified chinese
          characters and we'll produce a pinyin version
        </h4>
      </v-row>
      <v-row justify="space-around" align="center" class="translate-row mt-6">
        <v-col cols="6">
          <h4>Simplified Chinese Characters | 简体中文</h4>
          <v-textarea
            data-testid="translate-simplified-textarea"
            class="translate-simplified-textarea"
            v-model="characters"
            outlined
            placeholder="你好"
            rows="4"
            no-resize
          />
        </v-col>
        <v-col>
          <h4>Pinyin | 拼音</h4>
          <v-textarea
            data-testid="translate-result-textarea"
            class="translate-result-textarea"
            v-model="converted"
            outlined
            readonly
            placeholder="Nǐ hǎo"
            rows="4"
            no-resize
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import pinyin from "chinese-to-pinyin";

@Component({
  name: "Translate"
})
export default class Translate extends Vue {
  // ===== Data ===== //
  public characters = "";

  // ===== Methods ===== //

  // ===== Computed ===== //
  get converted() {
    return pinyin(this.characters);
  }

  // ===== Lifecycle Hooks ===== //
}
</script>

<style scoped>
.translate-container {
  width: 80%;
}

.translate-row {
  border: 1px solid #eee;
  border-radius: 5px;
  width: 100%;
}
</style>
