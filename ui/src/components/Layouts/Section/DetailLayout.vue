<template>
  <!-- Layout Design -->
  <!-- Link: https://linkage-retail.atlassian.net/l/c/C9JQnWWV -->
  <!-- Type: Type 2 -->
  <main class="wrapper">
    <q-card flat class="q-pa-lg q-mb-md">
      <!-- Breadcrumbs -->
      <section>
        <slot name="breadcrumbs" />
      </section>
      <!-- Title -->
      <section
        class="text-h6 text-weight-bold text-black text-weight-regular on-left q-mt-md"
        :class="titleClass"
        :style="titleStyle"
      >
        {{ title }}
        <slot name="title" />
      </section>
      <q-separator color="grey-11" style="margin: 32px 0" />
      <!-- Content -->
      <section>
        <slot name="content" />
      </section>
    </q-card>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { QCard, QSeparator } from 'quasar';

export default defineComponent({
  name: 'DetailLayout',
  components: { QCard, QSeparator },
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
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 15px;
}
</style>
