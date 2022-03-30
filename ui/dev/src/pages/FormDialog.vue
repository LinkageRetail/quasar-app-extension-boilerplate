<template>
  <q-page padding>
    <FormDialog
      title="New Category"
      :visible="formDialogVisible"
      @on-cancel="cancelFormDialog"
      @on-save="saveFormDialog"
    >
      <template #content> content </template>
    </FormDialog>

    <q-btn label="click" color="blue" @click="formDialogVisible = true" />
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      formDialogVisible: false,
    };
  },
  methods: {
    cancelFormDialog() {
      this.formDialogVisible = false;
    },
    saveFormDialog() {
      this.formDialogVisible = false;
    },
  },
};
</script>
