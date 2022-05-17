<template>
  <DetailTreeLayout
    title="DetailLayout Tree Example"
    :tree-nodes="treeNodes"
    v-model:tree-label="treeLabel"
    v-model:tree-selected="treeSelected"
  >
    <template #navs>
      navs
      <!-- Add some templates -->
    </template>

    <template #buttons>
      <q-btn unelevated color="primary" label="Button" />
      <!-- Add some templates -->
    </template>

    <template #section-left>
      section-left
      <!-- Add some templates -->
    </template>

    <template #section-right>
      section-right
      <!-- Add some templates -->
    </template>

    <template #panel-0> panel 0 </template>
    <template #panel-1> panel 1 </template>
    <template #panel-2> panel 2 </template>
  </DetailTreeLayout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'DetailTreeLayoutPage',
  setup() {
    return {
      // Tree Pros
      treeNodes: ref(['Panel0', 'Panel1', 'Panel2']),
      treeLabel: ref(''),
      treeSelected: ref(0), // Current selected tab
    };
  },
});
</script>
