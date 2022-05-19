<template>
  <div>
    <DetailTabsLayout
      title="DetailTabsLayout"
      :tab-nodes="tabNodes"
      v-model:tab-selected="tabSelected"
    >
      <template #buttons>
        <q-btn unelevated no-caps color="primary" label="Back" />
      </template>

      <template #panel-0> panel-0 </template>
      <template #panel-1> panel-1 </template>
      <template #panel-2> panel-2 </template>
    </DetailTabsLayout>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'DetailTabsLayoutPage',
  setup() {
    return {
      tabNodes: ref(['Panel0', 'Panel1', 'Panel2']),
      tabSelected: ref(0),
    };
  },
});
</script>
