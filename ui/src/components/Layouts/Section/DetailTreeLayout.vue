<template>
  <!-- Layout Design -->
  <!-- Link: https://linkage-retail.atlassian.net/l/c/Ps72DD1e -->

  <BaseLayout :title="title" navs buttons>
    <!-- Navs -->
    <template #navs>
      <!-- Slot navs -->
      <slot name="navs" />
    </template>

    <template #buttons>
      <!-- Slot form buttons -->
      <slot name="buttons" />
    </template>

    <!-- Content -->
    <template #content>
      <div class="section">
        <div class="row q-col-gutter-x-md">
          <!-- Section left -->
          <div class="col-12 col-md-7 section-left">
            <q-card flat bordered>
              <q-card-section class="section-group">
                <!-- Slot section-left -->
                <slot name="section-left" />
                <!-- Slot Example -->
                <!-- <div class="row items-center" style="padding-bottom: 0.75rem">
                  <div class="col-2"><b>Brand Code</b></div>
                  <div class="col-10">
                    <q-input
                      ref="brandType"
                      filled
                      dense
                      label-color="blue-8"
                      label="brand code*"
                    />
                  </div>
                </div> -->
              </q-card-section>
            </q-card>
          </div>
          <!-- Section right -->
          <div class="col-12 col-md-5 section-right">
            <q-card flat bordered>
              <q-card-section class="section-group">
                <!-- Slot section-right -->
                <slot name="section-right" />
                <!-- Slot Example -->
                <!-- <div class="row items-center">
                  <div class="col-2"><b>Brand Code</b></div>
                  <div class="col-10">
                    <q-input
                      ref="brandType"
                      filled
                      dense
                      label-color="blue-8"
                      label="brand code*"
                    />
                  </div>
                </div> -->
              </q-card-section>
            </q-card>
          </div>
        </div>
        <!-- Section bottom -->
        <div class="row">
          <q-card flat bordered class="col">
            <q-card-section class="section-group" style="padding: 1rem">
              <!-- Splitter -->
              <q-splitter
                v-model="splitterModelData"
                class="splitter"
                style="width: 100%; height: 100%"
              >
                <template #before>
                  <!-- Tree -->
                  <q-tree
                    ref="tree"
                    class="tree"
                    node-key="id"
                    text-color="grey-8"
                    selected-color="primary"
                    @update:selected="onSelectedTree"
                    :nodes="treeNodesData"
                    v-model:selected="treeSelectedData"
                    :default-expand-all="treeExpandAll"
                  />
                </template>

                <template #after>
                  <!-- Panel -->
                  <q-tab-panels
                    animated
                    transition-prev="jump-up"
                    transition-next="jump-up"
                    v-model="panelSelected"
                  >
                    <!-- Dynamic Tab -->
                    <q-tab-panel
                      v-for="panel in treeNodesData[0].children"
                      :key="`panel-${panel.id}`"
                      :name="panel.id"
                    >
                      <div class="text-h6 text-weight-bold q-mb-xl">{{ panel.label }}</div>
                      <!-- Slot panel-{id} -->
                      <slot :name="`panel-${panel.id}`" />
                      <!-- Slot panel-{label} -->
                      <slot :name="`panel-${panel.label}`" />
                      <!-- Slot Example -->
                      <!-- <div class="row items-center">
                        <div class="col-2"><b>Brand Code</b></div>
                        <div class="col-10">
                          <q-input
                            ref="brandType"
                            filled
                            dense
                            label-color="blue-8"
                            label="brand code*"
                          />
                        </div>
                      </div> -->
                    </q-tab-panel>
                  </q-tab-panels>
                </template>
              </q-splitter>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </template>

    <!-- Default Slot -->
    <template>
      <slot />
    </template>
  </BaseLayout>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue';
import { QCard, QCardSection, QSplitter, QTree, QTreeNode, QTabPanels, QTabPanel } from 'quasar';
import { isNull } from 'lodash';

import { useModelWrapper } from '../../../hooks';
import BaseLayout from './BaseLayout.vue';

export default defineComponent({
  name: 'DetailTreeLayout',
  components: { BaseLayout, QCard, QCardSection, QSplitter, QTree, QTabPanels, QTabPanel },
  props: {
    title: {
      type: String,
      default: '',
    },
    navs: {
      type: Boolean,
      default: true,
    },
    buttons: {
      type: Boolean,
      default: true,
    },
    splitterModel: {
      type: Number,
      default: 20,
    },
    treeNodes: {
      type: Array as PropType<Array<string | number>>,
      default: () => [],
    },
    treeLabel: {
      type: [String, Number],
      default: '',
    },
    treeSelected: {
      type: [String, Number],
      default: 0,
    },
    treeExpandAll: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, context) {
    const splitterModelData = ref(useModelWrapper(props, context.emit, 'splitterModel'));
    const treeSelectedData = ref(useModelWrapper(props, context.emit, 'treeSelected'));
    const treeSelectedDataPrev = ref(useModelWrapper(props, context.emit, 'treeSelected'));
    const panelSelected = ref(useModelWrapper(props, context.emit, 'treeSelected'));

    const treeNodesData = ref<any>([
      {
        id: -1,
        label: props.treeLabel,
        children: props.treeNodes.map((label, id) => ({ id, label })),
      },
    ]);

    const tree = ref();

    const onSelectedTree = (val: string | number) => {
      panelSelected.value = val;
      context.emit('selected', val);
    };

    watch(
      () => props.treeSelected,
      val => {
        treeSelectedData.value = val;
        panelSelected.value = val;
      }
    );

    watch(
      () => props.treeLabel,
      val => {
        // Reexpand tree when label update
        if (tree.value) tree.value.expandAll();

        const node = (treeNodesData.value as QTreeNode<unknown>[]).find(data => data.id === -1);
        if (node) node.label = val.toString();
      }
    );

    watch(treeSelectedData, val => {
      // If reverse click or select tree label, then set current panel
      if (isNull(val) || val === treeNodesData.value[0].id) {
        panelSelected.value = treeSelectedDataPrev.value;
        treeSelectedData.value = treeSelectedDataPrev.value;
      } else {
        treeSelectedDataPrev.value = val;
        context.emit('update:treeSelected', val);
      }
    });

    return {
      splitterModelData,
      treeSelectedData,
      treeSelectedDataPrev,
      panelSelected,
      treeNodesData,
      onSelectedTree,
    };
  },
});
</script>

<style lang="scss" scoped>
.section {
  > div.row {
    padding-bottom: 0.5rem;
    font-size: 14px;
  }
}

.section-right {
  > div {
    height: 100%;
  }
}

.section-left {
  height: 100%;
  // fix left top
  > div .section-group {
    min-height: 270px;
  }
}

.section-group {
  padding: 1.25rem 1.75rem;
}

// Tree container scrollable
:deep(.q-splitter__panel.q-splitter__before) {
  overflow: auto;
  min-width: 180px;

  > .tree {
    min-width: 260px;
  }
}

:deep(.q-splitter__panel.q-splitter__after) {
  overflow: auto;

  > .q-tab-panels {
    min-width: 400px;
  }
}

// Tree node
.tree {
  overflow: auto;
  color: var(--q-primary);
}

:deep(.q-tree__arrow) {
  color: #c7c7c7;
}

:deep(.q-tree__node--selected) {
  font-weight: bold;
  user-select: none;
}
</style>
