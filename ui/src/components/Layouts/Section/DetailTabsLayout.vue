<template>
  <main class="wrapper" style="background: #f4f5f6">
    <!-- Header -->
    <section class="relative-position row items-center head" style="padding: 0 30px">
      <!-- Props title -->
      <div class="on-left text-weight-bold text-h6">{{ title }}</div>

      <!-- Slot buttons -->
      <div class="header-buttons" v-if="buttons">
        <slot name="buttons" />
      </div>
    </section>
    <!-- Tabs -->
    <section v-if="tabNodesData.length > 0" class="q-mt-lg" style="padding: 0 30px">
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
      <q-tab-panels v-model="tabIndex" :animated="animated" :keep-alive="keepAlive">
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

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { QTabs, QTab, QTabPanels, QTabPanel, QCard, QCardSection, QSeparator } from 'quasar';

import { useModelWrapper } from '../../../hooks';

export default defineComponent({
  name: 'DetailTabsLayout',
  components: { QTabs, QTab, QTabPanels, QTabPanel, QCard, QCardSection, QSeparator },
  props: {
    animated: {
      type: Boolean,
      default: true,
    },
    keepAlive: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    buttons: {
      type: Boolean,
      default: true,
    },
    tabNodes: {
      type: Array as PropType<Array<string | number>>,
      default: () => [],
    },
    tabSelected: {
      type: [String, Number],
      default: 0,
    },
  },
  setup(props, context) {
    const tabIndex = ref(useModelWrapper(props, context.emit, 'tabSelected'));
    const tabNodesData = ref<any>(props.tabNodes.map((label, id) => ({ id, label })));

    return {
      tabIndex,
      tabNodesData,
    };
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 30px 0;
  color: var(--q-primary);
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
  box-shadow: rgba(0, 0, 0, 0.05) 0 2px 6px 0;
}
.section-group {
  padding: 1.25rem 1.75rem;
}
</style>
