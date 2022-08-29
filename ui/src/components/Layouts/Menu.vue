<template>
  <div v-if="modelValue && modelValue.length !== 0" class="q-py-md">
    <div v-if="title" class="q-px-md q-mb-sm text-caption text-weight-regular text-grey-6">
      {{ title }}
    </div>
    <section class="q-col-gutter-y-md">
      <q-expansion-item
        v-for="(menu, index) in modelValue"
        dense
        class="text-grey-8 text-subtitle2 text-weight-regular"
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
            dense
            class="text-grey-8 text-subtitle2 text-weight-regular"
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
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { QExpansionItem } from 'quasar';

interface IItem {
  label: string;
  path: string;
  icon?: string;
  children?: Array<IItem>;
}

export default defineComponent({
  name: 'Menu',
  components: { QExpansionItem },
  props: {
    modelValue: {
      type: Array as PropType<Array<IItem>>,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
  },
});
</script>

<style lang="scss" scoped>
@import 'quasar/src/css/variables.sass';

:deep(.q-item--dense) {
  min-height: 36px;
}

:deep(.hid-expand-icon) {
  display: none;
}

:deep(.q-item) {
  border-radius: 5px;
}

:deep(.active-header) {
  background: $grey-11;
}
:deep(.q-item__section--side) {
  > .q-icon {
    font-size: 22px;
  }
}
:deep(.q-item__section--avatar) {
  min-width: auto;
  padding-right: 15px;
}
:deep(.q-item__section--main) {
  ~ .q-item__section--side {
    padding-left: 10px;
  }
}
</style>
