<template>
  <q-layout view="lHh LpR fFf" :style="{ background: bgColor }">
    <q-header elevated class="bg-white text-white header">
      <q-toolbar>
        <q-toolbar-title class="flex no-wrap items-center">
          <q-btn
            dense
            flat
            round
            icon="menu"
            class="text-black"
            @click="leftDrawerOpen = !leftDrawerOpen"
          />
        </q-toolbar-title>
        <span class="text-black">{{ userName }}</span>
        <q-btn dense flat round class="q-ml-xs" @click="rightDrawerOpen = !rightDrawerOpen">
          <q-avatar class="bg-primary" size="26px">
            <div>{{ userName.slice(0, 1) }}</div>
            <!-- <img src="~assets/boy-avatar.png" /> -->
          </q-avatar>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      side="left"
      class="bg-primary q-px-sm"
      :width="leftDrawerwidth"
      v-model="leftDrawerOpen"
    >
      <div class="column no-wrap justify-between full-height">
        <div>
          <div class="flex items-center" style="height: 50px">
            <slot name="left-drawer-header" />
          </div>
          <q-separator color="white" style="opacity: 0.1" />

          <q-list dark class="text-weight-regular text-caption">
            <!-- # Menu List -->
            <slot name="menu-list" />
          </q-list>
        </div>

        <div class="footer">
          <!-- # Left Drawer Footer -->
          <slot name="left-drawer-footer" />
          <div>{{ dateTime }}</div>
        </div>
      </div>
    </q-drawer>

    <q-drawer overlay elevated behavior="mobile" side="right" v-model="rightDrawerOpen">
      <!-- # Right Drawer -->
      <slot name="right-drawer" />

      <div class="absolute-bottom text-center">
        <q-separator />
        <div class="q-py-lg text-grey-9 text-h6 cursor-pointer" @click="$emit('logout')">
          <q-icon name="logout" size="30px" class="q-mr-sm" />Logout
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { date } from 'quasar';

export default defineComponent({
  name: 'AdminLayout',
  props: {
    userName: {
      type: String,
      default: 'Admin',
    },
    bgColor: {
      type: String,
      default: '#f4f5f6',
    },
  },
  setup() {
    const dateTime = ref(date.formatDate(new Date(), 'DD, MMM YYYY HH:mm'));

    onMounted(() => {
      setInterval(
        () => (dateTime.value = date.formatDate(new Date(), 'DD, MMM YYYY HH:mm')),
        1000 * 60
      );
    });

    return {
      leftDrawerOpen: ref(true),
      rightDrawerOpen: ref(false),
      leftDrawerwidth: ref(250),
      dateTime,
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.q-layout__shadow) {
  &::after {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
}

.footer {
  margin-top: 50px;
  padding: 1rem;
  font-size: 12px;
  color: #fff;
  opacity: 0.4;
  line-height: 20px;
}
</style>
