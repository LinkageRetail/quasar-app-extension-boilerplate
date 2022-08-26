<template>
  <q-select
    :dense="dense"
    :optionsDense="optionsDense"
    :rounded="rounded"
    :borderless="borderless"
    :filled="filled"
    :outlined="outlined"
    :color="color"
    :bgColor="bgColor"
    :labelColor="labelColor"
    :inputDebounce="inputDebounce"
    :useInput="useInput"
    :label="label"
    :required="required"
    :lazyRules="lazyRules"
    :clearable="clearable"
    :rules="rulesData"
    :options="options"
    :mapOptions="mapOptions"
    :emitValue="emitValue"
    :optionLabel="optionLabel"
    :optionValue="optionValue"
    :dropdown-icon="dropdownIcon"
    :noErrorIcon="noErrorIcon"
    :hide-bottom-space="hideBottomSpace"
    :popup-content-class="popupContentClass"
    :options-selected-class="optionsSelectedClass"
    :input-class="inputClass"
    :popupContentStyle="{
      boxShadow: 'rgba(0, 0, 0, 0.05) 0 2px 6px 0',
      border: '2px solid #F5F5F5',
      borderRadius: '5px',
    }"
    v-model="model"
  >
    <template #selected>
      <template v-if="model">
        {{ model }}
      </template>
      <template v-else>
        <span class="text-grey-9">{{ placeholder }}</span>
      </template>
    </template>

    <!-- TODO: 選項分組 待確認 -->
    <!-- <template v-slot:option="scope">
      <section class="q-px-md q-mt-md">
        <div class="text-caption text-grey-9" >A</div>
        <q-separator color="grey-11" />
      </section>
      <q-list dense>
        <q-item v-bind="scope.itemProps">
          <q-item-section dense>
            {{ scope.opt }}
          </q-item-section>
        </q-item>
      </q-list>
    </template> -->
  </q-select>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

import { useModelWrapper } from '../../hooks';

export default defineComponent({
  name: 'FieldSelect',
  props: {
    modelValue: {},
    dense: {
      type: Boolean,
      default: true,
    },
    optionsDense: {
      type: Boolean,
      default: true,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    borderless: {
      type: Boolean,
      default: true,
    },
    filled: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: 'grey-13',
    },
    bgColor: {
      type: String,
      default: 'grey-11',
    },
    labelColor: {
      type: String,
      default: 'red',
      require: false,
    },
    popupContentClass: {
      type: String,
      default: 'text-grey-9',
    },
    optionsSelectedClass: {
      type: String,
      default: 'text-primary',
    },
    lazyRules: {
      type: Boolean,
      default: true,
    },
    inputDebounce: {
      type: String,
      default: '0',
    },
    useInput: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      required: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    rules: {
      type: Array,
      default: () => [(val: any) => !!val],
    },
    options: {
      type: Array,
      default: () => [],
    },
    mapOptions: {
      type: Boolean,
      default: true,
    },
    emitValue: {
      type: Boolean,
      default: true,
    },
    optionLabel: {
      type: String,
      default: 'label',
    },
    optionValue: {
      type: String,
      default: 'value',
    },
    placeholder: {
      type: String,
      require: false,
    },
    dropdownIcon: {
      type: String,
      default: 'expand_more',
    },
    noErrorIcon: {
      type: Boolean,
      default: true,
    },
    hideBottomSpace: {
      type: Boolean,
      default: true,
    },
    inputClass: {
      type: String || Array || Object,
      require: false,
    },
  },
  setup(props, context) {
    const model = ref(useModelWrapper(props, context.emit, 'modelValue'));
    const rulesData: any = computed(() => (props.required ? props.rules : []));

    return {
      model,
      rulesData,
    };
  },
});
</script>

<style scoped lang="scss" src="../../css/input.scss"></style>
