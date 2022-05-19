<template>
  <q-page padding>
    <FormDialog
      title="New Category"
      :loading="loading"
      @cancel="cancelFormDialog"
      @save="saveFormDialog"
      v-model="formDialogVisible"
    >
      <template #content> content </template>
    </FormDialog>

    <q-btn label="click" color="blue" @click="formDialogVisible = true" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    return {
      loading: ref(false),
      formDialogVisible: ref(false),
    };
  },
  methods: {
    cancelFormDialog() {
      console.log('cancelFormDialog');
      this.formDialogVisible = false;
    },
    saveFormDialog() {
      console.log('saveFormDialog');
      this.formDialogVisible = false;
    },
  },
});
</script>
