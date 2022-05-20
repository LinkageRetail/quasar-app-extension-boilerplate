<template>
  <!-- This input date use for form field -->
  <q-input
    ref="ref"
    dense
    color="blue-8"
    label-color="blue-8"
    :filled="filled"
    :disable="disable"
    :readonly="readonly"
    :mask="mask"
    :label="label"
    :rules="rulesData"
    :clearable="clearable"
    :value="value"
    @change="handleChange"
    @clear="handleClear"
    v-on="$listeners"
    v-bind="[$attrs, $props]"
  >
    <template #append>
      <q-icon :name="icon" class="cursor-pointer">
        <q-popup-proxy
          ref="datePickProxy"
          :transition-show="transition"
          :transition-hide="transition"
        >
          <q-date
            :title="parseTitle(value)"
            :subtitle="parseSubTitle(value)"
            :options="options"
            @input="handleInput"
            v-model="model"
          />
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
import { QInput, date, QIcon, QPopupProxy, QDate } from 'quasar';
import _ from 'loadsh';

export default {
  name: 'FieldDate',
  components: { QInput, QIcon, QPopupProxy, QDate },
  props: {
    ...QInput.props,
    value: {
      // v-model
      type: [Number, String, Date],
      default: '',
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
      default: () => [val => !!val],
    },
    mask: {
      type: String,
      default: 'date',
    },
    clearable: {
      type: Boolean,
      default: false,
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
    options: {
      type: [Array, Function, String, Date],
      default: date => date,
    },
  },
  data() {
    return {
      model: this.value, // Inner value for q-date
      rulesData: this.required ? this.rules : [],
      hasError: _.has(this.$refs['ref'], 'hasError') ? this.$refs['ref'].hasError : false,
    };
  },
  methods: {
    handleChange(newVal) {
      this.$emit('input', newVal.target.value);
    },
    handleInput() {
      this.$emit('input', this.model);
      if (this.autoHide) this.$refs.datePickProxy.hide();
    },
    handleClear() {
      this.$emit('input', null);
    },
    parseTitle(value) {
      return value ? date.formatDate(value, this.formatTitle) : ' ';
    },
    parseSubTitle(value) {
      return value ? date.formatDate(value, this.formatSubTitle) : ' ';
    },
    validate() {
      return _.isFunction(this.$refs['ref'].validate) && this.$refs['ref'].validate();
    },
  },
};
</script>
