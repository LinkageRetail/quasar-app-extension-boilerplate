<template>
  <q-input
    ref="refEl"
    dense
    mask="datetime"
    :color="color"
    :bg-color="bgColor"
    :label-color="labelColor"
    :filled="filled"
    :disable="disable"
    :readonly="readonly"
    :label="label"
    :rules="rulesData"
    :clearable="clearable"
    @change="handleChange"
    @clear="handleClear"
    v-model="model"
  >
    <template #prepend>
      <q-icon class="cursor-pointer" :name="icon">
        <q-popup-proxy
          ref="datePickProxy"
          :transition-hide="transition"
          :transition-show="transition"
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
    <template #append>
      <q-icon class="cursor-pointer" :name="iconTime">
        <q-popup-proxy
          ref="timePickProxy"
          :transition-hide="transition"
          :transition-show="transition"
        >
          <q-time
            format24h
            :title="parseTitle(model)"
            :subtitle="parseSubTitle(model)"
            :options="optionsVal"
            :mask="mask"
            @input="handleInput"
            @update:model-value="handleInput"
            v-model="model"
          >
          </q-time>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script lang="ts">
import { defineComponent, ref, computed, toRef } from 'vue';
import { QInput, QIcon, QPopupProxy, QDate, QTime, date } from 'quasar';

import { useModelWrapper } from '../../hooks';

export default defineComponent({
  name: 'FieldDateTime',
  components: { QInput, QIcon, QPopupProxy, QDate, QTime },
  props: {
    modelValue: {
      type: [Number, String, Date],
    },
    color: {
      type: String,
      default: 'primary',
    },
    bgColor: {
      type: String,
      default: null,
    },
    labelColor: {
      type: String,
      default: 'primary',
    },
    label: {
      type: String,
      required: true,
    },
    filled: {
      type: Boolean,
      default: true,
    },
    required: {
      type: Boolean,
      default: true,
    },
    disable: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: Array,
      default: () => [(val: any) => !!val],
    },
    mask: {
      type: String,
      default: 'YYYY/MM/DD HH:mm',
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    icon: {
      type: String,
      default: 'event',
    },
    iconTime: {
      type: String,
      default: 'access_time',
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
    options: {},
  },
  setup(props, context) {
    const refEl = ref();
    const datePickProxy = ref();
    const timePickProxy = ref();
    const optionsVal: any = toRef(props, 'options');
    const model = ref(useModelWrapper(props, context.emit, 'modelValue'));
    const rulesData: any = computed(() => (props.required ? props.rules : []));
    const hasError = computed(() => refEl.value?.hasError ?? false);

    return {
      refEl,
      datePickProxy,
      timePickProxy,
      optionsVal,
      model,
      rulesData,
      hasError,
      handleChange(newVal: any) {
        context.emit('update:modelValue', newVal);
      },
      handleInput(newVal: any) {
        context.emit('update:modelValue', newVal);
        if (props.autoHide) {
          datePickProxy.value?.hide();
          timePickProxy.value?.hide();
        }
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
