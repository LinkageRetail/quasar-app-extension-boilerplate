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
                    :selected.sync="treeSelectedData"
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

<script>
import _ from 'lodash';
export default {
  name: 'DetailTreeLayout',
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
      type: Array,
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
  data() {
    return {
      splitterModelData: this.splitterModel,
      treeNodesData: [
        {
          id: -1,
          label: this.treeLabel,
          children: this.treeNodes.map((label, id) => ({ id, label })),
        },
      ],
      treeSelectedData: this.treeSelected,
      treeSelectedDataPrev: this.treeSelected,
      panelSelected: this.treeSelected,
    };
  },
  methods: {
    onSelectedTree(val) {
      this.panelSelected = val;
      this.$emit('selected', val);
    },
  },
  watch: {
    treeSelected(val) {
      this.treeSelectedData = val;
      this.panelSelected = val;
    },
    treeSelectedData(val) {
      // If reverse click or select tree label, then set current panel
      if (_.isNull(val) || val === this.treeNodesData[0].id) {
        this.panelSelected = this.treeSelectedDataPrev;
        this.treeSelectedData = this.treeSelectedDataPrev;
      } else {
        this.treeSelectedDataPrev = val;
        this.$emit('update:treeSelected', val);
      }
    },
    treeLabel(val) {
      // Reexpand tree when label update
      this.$refs['tree'].expandAll();
      this.treeNodesData.find(data => data.id === -1).label = val;
    },
  },
  components: {
    BaseLayout: () => import('./BaseLayout'),
  },
};
</script>

<style lang="scss" scoped>
@import 'quasar/src/css/variables.sass';

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
::v-deep .q-splitter__panel.q-splitter__before {
  overflow: auto;
  min-width: 180px;
  > .tree {
    min-width: 260px;
  }
}
::v-deep .q-splitter__panel.q-splitter__after {
  overflow: auto;
  > .q-tab-panels {
    min-width: 400px;
  }
}

// Tree node
.tree {
  overflow: auto;
  color: $primary;
}
::v-deep .q-tree__arrow {
  color: #c7c7c7;
}
::v-deep .q-tree__node--selected {
  font-weight: bold;
  user-select: none;
}
</style>
