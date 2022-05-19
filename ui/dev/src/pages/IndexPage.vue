<template>
  <q-page padding class="row justify-center">
    <q-list dense class="list">
      <div class="text-h4 q-mb-md">Test pages</div>
      <q-item v-for="page in pages" :key="page.path" :to="page.path">
        <q-item-section avatar>
          <q-icon name="pages" />
        </q-item-section>
        <q-item-section>
          {{ page.title }}
        </q-item-section>
        <q-item-section side>
          <q-icon name="chevron_right" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import pages from '../router/pages';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    return { pages };
  },
});
</script>
