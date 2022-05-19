<template>
  <q-page>
    <AdminLayout user-name="Admin" @logout="onLogout" bg-color="#f4f5f6">
      <template #left-drawer-header> <span class="text-white">left-drawer-header</span> </template>
      <template #left-drawer-footer> left-drawer-footer </template>
      <template #menu-list>
        <Menu v-model="home" />
        <Menu v-model="management" title="MANAGEMENT" />
      </template>
      <template #right-drawer>Right Drawer</template>
    </AdminLayout>
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
      onLogout() {
        console.log('logout');
      },
    };
  },
});
</script>
