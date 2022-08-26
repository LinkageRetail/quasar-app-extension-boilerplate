<template>
  <q-layout view="lHh LpR fFf" class="bg-secondary" :style="{ background: bgColor }">
    <q-header bordered class="bg-white">
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          icon="menu"
          class="text-grey-8"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-space />

        <q-separator vertical />

        <section class="flex items-center q-pl-md text-caption">
          <!-- User Avatar -->
          <q-avatar class="bg-primary text-white" size="24px">
            <div>{{ userNameAvatar }}</div>
          </q-avatar>
          <!-- User Name -->
          <div class="text-grey-8 q-ml-md" style="letter-spacing: 0.1em">
            {{ userName }}
          </div>
          <q-btn
            dense
            flat
            round
            size="12px"
            icon="logout"
            class="text-grey-8 q-ml-lg"
            @click="$emit('logout')"
          />
        </section>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      bordered
      side="left"
      class="bg-white"
      :width="leftDrawerwidth"
      v-model="leftDrawerOpen"
    >
      <div class="column no-wrap justify-between full-height">
        <div>
          <div class="flex items-center" style="height: 80px">
            <slot name="left-drawer-header" />
          </div>
          <q-separator color="grey-11" />

          <q-list class="q-px-md">
            <!-- # Menu List -->
            <slot name="menu-list" />
          </q-list>
        </div>

        <div class="footer text-grey-8 q-pa-md">
          <!-- # Left Drawer Footer -->
          <slot name="left-drawer-footer" />
          <div v-if="systemTime">{{ dateTime }}</div>
        </div>
      </div>
    </q-drawer>

    <q-drawer overlay elevated behavior="mobile" side="right" v-model="rightDrawerOpen">
      <!-- # Right Drawer -->
      <slot name="right-drawer" />

      <!-- <div class="absolute-bottom text-center">
        <q-separator />
        <div class="q-py-lg text-grey-9 text-h6 cursor-pointer" @click="$emit('logout')">
          <q-icon name="logout" size="30px" class="q-mr-sm" />Logout
        </div>
      </div> -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import {
  date,
  QLayout,
  QHeader,
  QToolbar,
  QBtn,
  QAvatar,
  QDrawer,
  QSeparator,
  QList,
  QPageContainer,
} from 'quasar';

export default defineComponent({
  name: 'AdminLayout',
  components: {
    QLayout,
    QHeader,
    QToolbar,
    QBtn,
    QAvatar,
    QDrawer,
    QSeparator,
    QList,
    QPageContainer,
  },
  props: {
    userName: {
      type: String,
      default: '',
    },
    bgColor: {
      type: String,
      default: '',
    },
    systemTime: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const dateTime = ref(date.formatDate(new Date(), 'DD, MMM YYYY HH:mm'));
    const userNameAvatar = ref('');

    const getUserNameAvatar = () => {
      const name = props.userName.trim();
      if (name.length === 0) {
        userNameAvatar.value = 'N';
      } else {
        userNameAvatar.value = name.slice(0, 1);
      }
    };

    onMounted(() => {
      getUserNameAvatar();
      setInterval(
        () => (dateTime.value = date.formatDate(new Date(), 'DD, MMM YYYY HH:mm')),
        1000 * 60
      );
    });

    return {
      userNameAvatar,
      leftDrawerOpen: ref(true),
      rightDrawerOpen: ref(false),
      leftDrawerwidth: ref(250),
      dateTime,
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.q-header--bordered) {
  border-bottom: 2px solid #f5f5f5;
}

:deep(.q-drawer--left.q-drawer--bordered) {
  border-right: 1px solid #f5f5f5;
}

.footer {
  font-size: 12px;
  line-height: 20px;
}
</style>
