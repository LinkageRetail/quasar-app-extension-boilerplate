<template>
  <q-page padding>
    <div class="bg-primary" style="width: 300px">
      <Menu v-model="home" />
      <Menu v-model="management" />
    </div>
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
};
</script>
