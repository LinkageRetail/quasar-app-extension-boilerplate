<template>
  <!-- Layout Design -->
  <!-- Link: https://linkage-retail.atlassian.net/l/c/C9JQnWWV -->
  <!-- Type: Type 2 -->

  <BaseLayout :title="title" navs buttons>
    <!-- Navs -->
    <template #navs>
      <!-- Slot navs -->
      <slot name="navs" />
    </template>

    <template #buttons>
      <!-- Slot buttons at top right (origin position) -->
      <slot name="navs-buttons" />
    </template>

    <!-- Content -->
    <template #content>
      <div class="section">
        <div class="row q-col-gutter-x-md" v-if="$slots['section-right']">
          <!-- Section left -->
          <div
            class="col-12 section-left"
            :class="[
              `${topRows.lg && `col-lg-${topRows.lg[0]}`}`,
              `${topRows.md && `col-md-${topRows.md[0]}`}`,
              `${topRows.sm && `col-sm-${topRows.sm[0]}`}`,
              `${topRows.xs && `col-xs-${topRows.xs[0]}`}`,
            ]"
          >
            <q-card flat bordered>
              <q-card-section class="section-group">
                <!-- Slot section-left -->
                <slot name="section-left" />
                <!-- Slot Example -->
                <!-- <div class="row items-center q-pb-md">
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
          <div
            class="col-12 section-right"
            :class="[
              `${topRows.lg && `col-lg-${topRows.lg[1]}`}`,
              `${topRows.md && `col-md-${topRows.md[1]}`}`,
              `${topRows.sm && `col-sm-${topRows.sm[1]}`}`,
              `${topRows.xs && `col-xs-${topRows.xs[1]}`}`,
            ]"
          >
            <q-card flat bordered>
              <q-card-section class="section-group row justify-between" style="height: 100%">
                <!-- Slot section-right -->
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
                <div class="col-12">
                  <slot name="section-right" />
                </div>
                <div class="col-12 row">
                  <div class="col-12 row items-end justify-center">
                    <slot name="buttons" />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <!-- Section bottom -->
        <div class="row" v-if="$slots['section-bottom']">
          <q-card flat bordered class="col">
            <q-card-section class="section-group">
              <!-- Slot section-bottom -->
              <slot name="section-bottom" />
              <!-- Slot Example -->
              <!-- <div class="row items-center">
                <div class="col-2"><b>Brand Code</b></div>
                <div class="col-10">
                  <q-input ref="brandType" filled dense label-color="blue-8" label="brand code*" />
                </div>
              </div> -->
            </q-card-section>
          </q-card>
        </div>

        <!-- Default Slot -->
        <template>
          <slot />
        </template>
      </div>
    </template>
  </BaseLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { QCard, QCardSection } from 'quasar';

import BaseLayout from './BaseLayout.vue';

export default defineComponent({
  name: 'DetailLayout',
  components: { BaseLayout, QCard, QCardSection },
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
    topRows: {
      /**
       * 頂部 Section 區塊的左右格子數
       * @example ({ md: [9, 3], lg: [8, 4] })
       */
      type: Object,
      default: () => ({ md: [9, 3], lg: [8, 4] }),
    },
  },
});
</script>

<style lang="scss" scoped>
.section {
  > div.row {
    padding-bottom: 0.5rem;
  }
}

.section-right {
  > div {
    height: 100%;
  }
}

.section-left {
  height: 100%;

  // fix left
  > div .section-group:first-child {
    min-height: 180px;
  }
  // fix left top
  // @media screen and (max-width: $screen-mobile) {
  //   padding-right: 0;
  //   padding-bottom: 0.5rem;
  // }
}

.section-group {
  padding: 1.25rem 1.75rem;
}
</style>
