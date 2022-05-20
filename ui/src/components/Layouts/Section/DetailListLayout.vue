<template>
  <!-- Layout Design -->
  <!-- Link: https://linkage-retail.atlassian.net/l/c/C9JQnWWV -->
  <!-- Type: Type 3 -->

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
            <!-- Section left top -->
            <q-card v-show="leftTop" flat bordered>
              <q-card-section class="section-group">
                <!-- Slot section-left-top -->
                <slot name="section-left-top" />
                <!-- Slot Example -->
                <!-- <div class="row items-center">
                  <div class="col-2"><b>Brand Code</b></div>
                  <div class="col-10"><b>M06</b></div>
                </div> -->
              </q-card-section>
            </q-card>

            <!-- Section left bottom -->
            <q-card flat bordered>
              <q-card-section class="section-group">
                <!-- Slot section-left-bottom -->
                <slot name="section-left-bottom" />
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
        <!-- Section middle -->
        <div class="row">
          <q-card flat bordered class="col">
            <q-card-section class="section-group">
              <!-- Slot section-middle -->
              <slot name="section-middle" />
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
        <!-- Section bottom -->
        <div class="row">
          <q-card flat bordered class="col">
            <q-card-section class="section-group">
              <!-- Slot section-bottom -->
              <slot name="section-bottom" />
              <!-- Slot Example -->
              <!-- <div class="row" style="padding-bottom: 0.75rem">
                <div class="col">
                  <b style="padding-bottom: 0.25rem; border-bottom: 1px solid #000"
                    >Allows Changeable</b
                  >
                </div>
              </div> -->
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
import { QCard, QCardSection } from 'quasar';
import BaseLayout from './BaseLayout.vue';

export default {
  name: 'DetailListLayout',
  components: { BaseLayout, QCard, QCardSection },
  props: {
    title: {
      type: String,
      default: '',
    },
    leftTop: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    BaseLayout: () => import('./BaseLayout'),
  },
};
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
  > div:first-child {
    margin-bottom: 0.5rem;
  }

  // fix left top
  > div:first-child .section-group:first-child {
    padding: 0.75rem 2rem;
  }

  // fix left bottom
  > div:nth-child(2) .section-group:first-child {
    min-height: 280px;
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
