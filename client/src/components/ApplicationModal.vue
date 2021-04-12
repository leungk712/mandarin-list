<template>
  <v-row justify="center">
    <v-dialog
      v-model="displayModal"
      persistent
      max-width="50%"
      @click:outside="handleCancel"
    >
      <v-card>
        <v-card-title class="headline">
          <slot name="modal-title" />
        </v-card-title>
        <v-divider />
        <v-card-text>
          <slot name="modal-body" />
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <slot name="modal-cancel-btn">
            <v-btn
              data-testid="modal-cancel-btn"
              class="modal-cancel-btn"
              color="error"
              text
              outlined
              @click.native="handleCancel"
            >
              <span>
                <slot name="modal-cancel-btn-text">Cancel</slot>
              </span>
            </v-btn>
          </slot>
          <slot name="modal-confirm-btn">
            <v-btn
              data-testid="modal-confirm-btn"
              class="modal-confirm-btn"
              color="primary lighten-1"
              text
              outlined
              :loading="loading"
              @click="handleConfirm"
            >
              <span>
                <slot name="modal-confirm-btn-text">Confirm</slot>
              </span>
            </v-btn>
          </slot>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "ApplicationModal"
})
export default class ApplicationModal extends Vue {
  // ===== Props ====== //
  @Prop({ default: false }) public readonly loading?: boolean;
  @Prop(Boolean) public readonly value!: boolean;

  // ===== Methods ===== //
  @Emit("handleCancel")
  public handleCancel(): boolean {
    return true;
  }

  @Emit("handleConfirm")
  public handleConfirm(): boolean {
    return true;
  }

  // ===== Computed ===== //
  get displayModal(): boolean {
    return this.value;
  }
}
</script>
