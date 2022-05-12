<template>
  <div>
    <DetailTabsLayout
      title="DetailTabsLayout"
      :tab-nodes="tabNodes"
      :tab-selected.sync="tabSelected"
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

<script>
export default {
  data() {
    return {
      tabNodes: ['Panel0', 'Panel1', 'Panel2'],
      tabSelected: 0,
    };
  },
};
</script>
