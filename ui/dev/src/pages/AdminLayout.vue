<template>
  <q-page>
    <AdminLayout user-name="Admin" @logout="onLogout">
      <template #left-drawer-header> <span class="text-white">left-drawer-header</span> </template>
      <template #left-drawer-footer> version: 0.0.1 </template>
      <template #menu-list>
        <Menu v-model="home"></Menu>
        <q-separator color="grey-11" />
        <Menu v-model="tool" title="Tool"></Menu>
        <q-separator color="grey-11" />
        <Menu v-model="setting" title="Tool"></Menu>
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
      tool: ref([
        {
          label: 'Underwriting',
          path: '',
          icon: 'o_edit',
          children: [
            { label: 'Page1', path: '' },
            { label: 'Page2', path: '' },
            { label: 'Page3', path: '' },
          ],
        },
        {
          label: 'Result',
          path: '',
          icon: 'o_list',
        },
      ]),
      setting: ref([
        {
          label: 'Account',
          path: '',
          icon: 'o_person',
        },
        {
          label: 'Application',
          path: '',
          icon: 'o_shopping_cart',
        },
      ]),
      onLogout() {
        console.log('logout');
      },
    };
  },
});
</script>
