<template>
  <q-page padding>
    <Editor v-model="editor" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    return {
      editor: ref(''),
    };
  },
});
</script>
