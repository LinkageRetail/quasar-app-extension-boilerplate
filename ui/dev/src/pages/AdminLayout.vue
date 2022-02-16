<template>
  <q-page>
    <AdminLayout user-name="Admin" @logout="logout" bg-color="#f4f5f6">
      <template #left-drawer-header> left-drawer-header </template>
      <template #left-drawer-footer> left-drawer-footer </template>
      <template #menu-list>
        <Menu v-model="home" />
        <Menu v-model="management" title="MANAGEMENT" />
      </template>
      <template #right-drawer>Right Drawer</template>
    </AdminLayout>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      home: [{ label: 'Dashboard', path: '', icon: 'o_home' }],
      management: [
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
      ],
    };
  },
  methods: {
    logout() {
      console.log('logout');
    },
  },
};
</script>
