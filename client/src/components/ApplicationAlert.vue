<template>
    <v-alert
      v-model="alert.display"
      :color="alert.type === 'error' ? 'error' : 'success'"
      border="left"
      outlined
      text
    >
        <v-row>
            <v-col cols="1">
                <v-icon v-if="alert.type === 'error'" :color="alert.type">error</v-icon>
                <v-icon v-else :color="alert.type">check_circle_outline</v-icon>
            </v-col>
            <v-col>
                {{ alert.message }}
            </v-col>
            <v-col cols="1" class="mr-8">
                <v-icon
                    data-testid="clear-alert-btn"
                    class="clear-alert-btn"
                    @click="clearAlert"
                >
                    close
                </v-icon>
            </v-col>
        </v-row>
    </v-alert>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace, State } from "vuex-class";
import { AlertState } from "@/models";
import AlertModule from "@/store/modules/alert";

const alert = namespace(AlertModule.name);

@Component({
    name: "ApplicationAlert"
})
export default class ApplicationAlert extends Vue {
    // ===== Store ===== //
    @State("alert") public alert!: AlertState;
    @alert.Action("clearAlert") public clearAlert!: () => void;

    // ===== Data ===== //
    public error = true;
}
</script>
