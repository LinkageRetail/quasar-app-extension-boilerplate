<template>
  <div v-if="value && value.length !== 0" class="q-my-xs">
    <div v-if="title" class="q-px-md q-mt-md text-caption text-weight-regular" style="opacity: 0.3">
      {{ title }}
    </div>
    <q-expansion-item
      v-for="(menu, index) in value"
      expand-separator
      exact-active-class="exact-active-link"
      :ref="menu.label"
      :group="title ? title : ''"
      :key="'menu' + index"
      :icon="menu.icon"
      :expand-icon-class="menu.children && menu.children.length > 0 ? '' : 'hid-expand-icon'"
      :label="menu.label"
      :value="'/' + $route.path.split('/')[1] === menu.path"
      :header-class="{
        'active-header': '/' + $route.path.split('/')[1] === menu.path,
      }"
      :to="menu.children && menu.children.length > 0 ? '' : menu.path"
    >
      <template v-if="menu.children">
        <q-expansion-item
          v-for="(item, itemIndex) in menu.children"
          expand-separator
          exact-active-class="exact-active-link"
          :key="'menu-item' + itemIndex"
          :header-inset-level="1"
          :expand-icon-class="item.children && item.children.length > 0 ? '' : 'hid-expand-icon'"
          :label="item.label"
          :header-class="{
            'active-header': item.path.includes($route.path.split('/')[2]),
          }"
          :to="item.children && item.children.length > 0 ? '' : item.path"
        >
        </q-expansion-item>
      </template>
    </q-expansion-item>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  props: {
    value: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .q-item__section--side > .q-icon {
  font-size: 22px;
}

::v-deep .hid-expand-icon {
  display: none;
}

::v-deep .exact-active-link {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.15);
  opacity: 1 !important;
}

::v-deep .q-item {
  color: #fff;
  border-radius: 5px;
  opacity: 0.6;
}

::v-deep .active-header {
  color: #fff;
  opacity: 1 !important;
}
</style>
