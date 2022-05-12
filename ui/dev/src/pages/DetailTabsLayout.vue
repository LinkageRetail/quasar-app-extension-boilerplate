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

      <template #panel-0>
        <q-card class="shadow-card">
          <q-card-section> panel-0 </q-card-section>
        </q-card>
      </template>
      <template #panel-1>
        <q-card class="shadow-card">
          <q-card-section> panel-1 </q-card-section>
        </q-card>
      </template>
      <template #panel-2>
        <div class="flex q-gutter-x-sm">
          <q-card class="shadow-card col">
            <q-card-section> panel-2 </q-card-section>
          </q-card>
          <q-card class="shadow-card col">
            <q-card-section> panel-2 </q-card-section>
          </q-card>
        </div>
      </template>
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

<style lang="scss" scoped>
.shadow-card {
  box-shadow: rgba(0, 0, 0, 0.05) 0px 2px 6px 0px;
}
</style>
