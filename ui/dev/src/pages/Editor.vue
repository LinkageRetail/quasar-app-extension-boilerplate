<template>
  <q-page padding>
    <Editor v-model="Editor" />
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      Editor: '',
    };
  },
};
</script>
