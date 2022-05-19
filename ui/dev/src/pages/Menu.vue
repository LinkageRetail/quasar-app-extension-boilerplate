<template>
  <q-page padding>
    <div class="bg-primary" style="width: 300px">
      <Menu v-model="home" />
      <Menu v-model="management" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    return {
      home: ref([{ label: 'Dashboard', path: '', icon: 'o_home' }]),
      management: ref([
        {
          label: 'Order Mgmt',
          path: '',
          icon: 'o_shopping_cart',
          children: [
            { label: 'Allocation', path: '' },
            { label: 'Refund Orders', path: '' },
            { label: 'Orders History', path: '' },
          ],
        },
      ]),
    };
  },
});
</script>
