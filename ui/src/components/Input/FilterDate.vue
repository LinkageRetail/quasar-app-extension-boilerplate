<template>
  <q-input
    ref="refEl"
    dense
    outlined
    mask="date"
    :color="color"
    :bg-color="bgColor"
    :label-color="labelColor"
    :disable="disable"
    :readonly="readonly"
    :label="label"
    :clearable="clearable"
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
import { defineComponent, ref, toRef } from 'vue';
import { QInput, date } from 'quasar';

import { useModelWrapper } from '../../hooks';

export default defineComponent({
  name: 'FilterDate',
  components: {
    QInput,
  },
  props: {
    modelValue: {
      type: [Number, String, Date],
      default: undefined,
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
      default: null,
    },
    label: {
      type: String,
      required: true,
    },
    disable: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
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
    options: {},
  },
  setup(props, context) {
    const refEl = ref();
    const datePickProxy = ref();
    const optionsVal: any = toRef(props, 'options');
    const model = ref(useModelWrapper(props, context.emit, 'modelValue'));

    return {
      refEl,
      datePickProxy,
      optionsVal,
      model,
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
    };
  },
});
</script>
