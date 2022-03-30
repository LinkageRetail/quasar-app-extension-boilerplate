<template>
  <!-- Example: -->
  <!--  <FormDialog
      title="New Category"
      :visible="formDialogVisible"
      @on-cancel="cancelFormDialog"
      @on-save="saveFormDialog"
    >
      <template #content>
      </template>
    </FormDialog> 
  -->
  <q-dialog
    content-class="dialog"
    persistent
    :value="visible"
    @hide="$emit('hide') && $emit('input', false)"
  >
    <q-card class="dialog-card">
      <!-- Dialog Header -->
      <q-card-section class="dialog-header">
        <span>{{ title }}</span>
      </q-card-section>
      <!-- Dialog Content -->
      <q-card-section>
        <slot name="content">
          <!-- Content here -->
        </slot>
      </q-card-section>
      <!-- Dialog Buttons -->

      <q-card-actions align="right">
        <slot name="buttons">
          <!-- Content here -->
        </slot>
        <q-btn
          unelevated
          no-caps
          class="q-mr-xs q-px-sm"
          color="blue"
          :label="saveLabel"
          @click="$emit('on-save')"
        />
        <q-btn
          unelevated
          no-caps
          color="grey"
          class="q-px-sm"
          :label="cancelLabel"
          @click="$emit('on-cancel')"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'FormDialog',
  props: {
    title: {
      type: String,
      default: 'Dialog',
    },
    saveLabel: {
      type: String,
      default: 'save',
    },
    cancelLabel: {
      type: String,
      default: 'cancel',
    },
    visible: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog {
  .dialog-card {
    width: 100%;
    max-width: 700px;
  }

  .dialog-header {
    padding-bottom: 2rem;
    height: 40px;
    color: #fff;
    background-color: $primary;

    > span {
      padding-bottom: 0.25rem;
      width: auto;
      border-bottom: 2px solid #fff;
    }
  }
}
</style>
