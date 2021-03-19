<template>
    <v-snackbar
      v-model="snackbar.display"
      :timeout="snackbar.type === 'error' ? 10000 : 5000"
      :color="snackbar.type"
      absolute
      right
      outlined
      top
    >
      <v-row justify="space-between" align="center">
        <v-col cols="1" class="title py-0 mr-2">
          <v-icon v-if="snackbar.type === 'success'" :color="snackbar.type">check</v-icon>
          <v-icon v-else :color="snackbar.type">error</v-icon>
        </v-col>
        <v-col class="py-0 mt-1 title">
          <div>{{ snackbar.message }}</div>
        </v-col>
        <v-col cols="1" class="py-0 mr-8">
          <v-btn
            data-testid="clear-snackbar-btn"
            class="clear-snackbar-btn"
            fab
            text
            @click="clearSnackbarMessage"
          >
            <v-icon>close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-snackbar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace, State } from "vuex-class";
import { SnackbarState } from "@/models";
import SnackbarModule from "@/store/modules/snackbar";

const snackbar = namespace(SnackbarModule.name);

@Component({
    name: "ApplicationSnackbar"
})
export default class ApplicationSnackbar extends Vue {
    // ===== Store ===== //
    @State("snackbar") public snackbar!: SnackbarState;
    @snackbar.Action("clearSnackbarMessage") public clearSnackbarMessage!: () => void;
}
</script>
