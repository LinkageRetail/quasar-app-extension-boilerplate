<template>
  <!-- Example: -->
  <!--  <FormDialog
      title="New Category"
      :loading="loading"
      @cancel="cancelFormDialog"
      @save="saveFormDialog"
      v-model="formDialogVisible"
    >
      <template #content> content </template>
    </FormDialog>
  -->
  <q-dialog content-class="dialog" :persistent="persistent" @hide="onHide" v-model="model">
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
          :loading="loading"
          :label="saveLabel"
          @click="onSave"
        />
        <q-btn
          unelevated
          no-caps
          color="grey"
          class="q-px-sm"
          :disable="loading"
          :label="cancelLabel"
          @click="onCancel"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { useModelWrapper } from '../hooks';

export default defineComponent({
  name: 'FormDialog',
  emits: ['modelValue', 'hide', 'input', 'save', 'cancel'],
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    persistent: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
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
  },
  setup(props, context) {
    return {
      model: ref(useModelWrapper(props, context.emit, 'modelValue')),
      onHide() {
        context.emit('hide');
      },
      onSave() {
        context.emit('save');
      },
      onCancel() {
        context.emit('cancel');
      },
    };
  },
});
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
    background-color: var(--q-primary);

    > span {
      padding-bottom: 0.25rem;
      width: auto;
      border-bottom: 2px solid #fff;
    }
  }
}
</style>
