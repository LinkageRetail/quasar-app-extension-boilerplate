<template>
  <DetailTreeLayout
    title="DetailLayout Tree Example"
    :tree-nodes="treeNodes"
    :tree-label.sync="treeLabel"
    :tree-selected.sync="treeSelected"
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

<script>
export default {
  data() {
    return {
      // Tree Pros
      treeNodes: ['Panel1', 'Panel2', 'Panel3'],
      treeLabel: '',
      treeSelected: 0, // Current selected tab
    };
  },
};
</script>
