<template>
  <!-- Layout Design -->
  <!-- Link: https://linkage-retail.atlassian.net/l/c/C9JQnWWV -->
  <!-- Type: Type 1 -->

  <main class="wrapper">
    <!-- Header -->
    <q-card flat class="q-pa-lg q-mb-md">
      <section class="flex items-center justify-between" style="margin-bottom: 32px">
        <!-- Props title -->
        <div
          class="text-h6 text-weight-bold text-black text-weight-regular on-left"
          :class="titleClass"
          :style="titleStyle"
        >
          {{ title }}
        </div>

        <!-- Button -->
        <div class="buttons" v-if="buttons">
          <!-- Slot buttons -->
          <slot name="buttons" />
        </div>
      </section>

      <section v-if="search">
        <slot name="search" />
      </section>
    </q-card>

    <!-- Content -->
    <section
      class="content text-grey-9 text-body2 text-weight-regular"
      :class="contentClass"
      :style="contentStyle"
    >
      <!-- Slot default -->
      <slot />
      <!-- Slot content -->
      <slot name="content" />
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseLayout',
  props: {
    title: {
      type: String,
      default: '',
    },
    titleStyle: {
      type: String,
      default: '',
      example: 'justify-content: space-between;',
    },
    titleClass: {
      type: String,
      default: '',
    },
    buttons: {
      type: Boolean,
      default: true,
    },
    contentStyle: {
      type: String,
      default: '',
      example: 'justify-content: space-between;',
    },
    contentClass: {
      type: String,
      default: '',
    },
    search: {
      type: Boolean,
      default: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 30px;
}
</style>
