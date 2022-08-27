<template>
  <q-input
    ref="refEl"
    mask="date"
    :dense="dense"
    :rounded="rounded"
    :color="color"
    :bg-color="bgColor"
    :label-color="labelColor"
    :borderless="borderless"
    :filled="filled"
    :outlined="outlined"
    :disable="disable"
    :readonly="readonly"
    :label="label"
    :rules="rulesData"
    :lazyRules="lazyRules"
    :clearable="clearable"
    :no-errorIcon="noErrorIcon"
    :hide-bottom-space="hideBottomSpace"
    :input-class="inputClass"
    @change="handleChange"
    @clear="handleClear"
    v-model="model"
  >
    <template #append>
      <q-icon class="cursor-pointer" :name="icon">
        <q-popup-proxy
          ref="datePickProxy"
          :transition-show="transition"
          :transition-hide="transition"
        >
          <q-date
            :title="parseTitle(model)"
            :subtitle="parseSubTitle(model)"
            :options="optionsVal"
            :mask="mask"
            @input="handleInput"
            @update:model-value="handleInput"
            v-model="model"
          />
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script lang="ts">
import { defineComponent, ref, computed, toRef } from 'vue';
import { QInput, QIcon, QPopupProxy, QDate, date } from 'quasar';

import { useModelWrapper } from '../../hooks';

export default defineComponent({
  name: 'FieldDate',
  components: { QInput, QIcon, QPopupProxy, QDate },
  props: {
    modelValue: {
      type: [Number, String, Date],
    },
    dense: {
      type: Boolean,
      default: true,
    },
    rounded: {
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
      required: false,
    },
    label: {
      type: String,
      required: false,
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
    disable: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: Array,
      default: () => [(val: any) => !!val],
    },
    mask: {
      type: String,
      default: 'YYYY/MM/DD',
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    icon: {
      type: String,
      default: 'event',
    },
    transition: {
      type: String,
      default: 'scale',
    },
    autoHide: {
      type: Boolean,
      default: true,
    },
    formatTitle: {
      type: String,
      default: 'ddd, MMM DD',
    },
    formatSubTitle: {
      type: String,
      default: 'YYYY',
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
    lazyRules: {
      type: Boolean,
      default: true,
    },
    options: {},
  },
  setup(props, context) {
    const refEl = ref();
    const datePickProxy = ref();
    const optionsVal: any = toRef(props, 'options');
    const model = ref(useModelWrapper(props, context.emit, 'modelValue'));
    const rulesData: any = computed(() => (props.required ? props.rules : []));
    const hasError = computed(() => refEl.value?.hasError ?? false);

    return {
      refEl,
      datePickProxy,
      optionsVal,
      model,
      rulesData,
      hasError,
      handleChange(newVal: any) {
        context.emit('update:modelValue', newVal);
      },
      handleInput(newVal: any) {
        context.emit('update:modelValue', newVal);
        if (props.autoHide) datePickProxy.value?.hide();
      },
      handleClear() {
        context.emit('update:modelValue', null);
      },
      parseTitle(value: any) {
        return value ? date.formatDate(value, props.formatTitle) : ' ';
      },
      parseSubTitle(value: any) {
        return value ? date.formatDate(value, props.formatSubTitle) : ' ';
      },
      validate() {
        return refEl.value?.validate();
      },
    };
  },
});
</script>

<style lang="scss" scoped>
@import 'input.scss';
</style>
