<template>
  <main class="wrapper" style="background: #f4f5f6">
    <!-- Header -->
    <section class="relative-position row items-center head" style="padding: 0px 30px">
      <!-- Props title -->
      <div class="on-left text-weight-bold text-h6">{{ title }}</div>

      <!-- Slot buttons -->
      <div class="header-buttons" v-if="buttons">
        <slot name="buttons" />
      </div>
    </section>
    <!-- Tabs -->
    <section v-if="tabNodesData.length > 0" class="q-mt-lg" style="padding: 0px 30px">
      <div class="relative-position">
        <q-tabs
          dense
          no-caps
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="left"
          v-model="tabIndex"
        >
          <q-tab
            v-for="tab in tabNodesData"
            :key="`tab-${tab.id}`"
            :name="tab.id"
            :label="tab.label"
          />
        </q-tabs>
        <q-separator class="absolute-bottom" />
      </div>
    </section>

    <!-- Content -->
    <section v-if="tabNodesData.length > 0">
      <q-tab-panels v-model="tabIndex" animated>
        <q-tab-panel v-for="tab in tabNodesData" :key="`tab-panel-${tab.id}`" :name="tab.id">
          <q-card class="shadow-card">
            <q-card-section class="section-group">
              <slot :name="`panel-${tab.id}`" />
            </q-card-section>
          </q-card>
        </q-tab-panel>
      </q-tab-panels>
    </section>
  </main>
</template>

<script>
export default {
  name: 'DetailTabsLayout',
  props: {
    title: {
      type: String,
      default: '',
    },
    buttons: {
      type: Boolean,
      default: true,
    },
    tabNodes: {
      type: Array,
      default: () => [],
    },
    tabSelected: {
      type: [String, Number],
      default: 0,
    },
  },
  data() {
    return {
      tabIndex: this.tabSelected,
      tabNodesData: this.tabNodes.map((label, id) => ({ id, label })),
    };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 30px 0px;
  color: var(--q-color-primary);
}
.header-buttons {
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 30px;
}
.q-panel-parent {
  background: transparent;
}
.q-tab-panel {
  padding: 25px 30px;
}
.shadow-card {
  box-shadow: rgba(0, 0, 0, 0.05) 0px 2px 6px 0px;
}
.section-group {
  padding: 1.25rem 1.75rem;
}
</style>
