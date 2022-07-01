<template>
  <!-- This input date use for filter or search bar -->
  <q-input
    dense
    outlined
    :clearable="clearable"
    :disable="disable"
    :readonly="readonly"
    :value="value"
    @change="handleChange"
    @clear="handleClear"
  >
    <template #append>
      <q-icon :name="icon" class="cursor-pointer" rea>
        <q-popup-proxy
          ref="datePickProxy"
          :transition-show="transition"
          :transition-hide="transition"
        >
          <q-date
            :disable="disable"
            :readonly="readonly"
            :title="parseTitle(value)"
            :subtitle="parseSubTitle(value)"
            :options="options"
            :mask="dateMask"
            @input="handleInput"
            v-model="model"
          />
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
import { QInput, date } from 'quasar';
export default {
  name: 'FilterDate',
  components: {
    QInput,
  },
  props: {
    ...QInput,
    value: {
      type: [Number, String, Date],
      default: '',
    },
    mask: {
      type: String,
      default: 'date',
    },
    dateMask: {
      type: String,
      default: 'YYYY/MM/DD',
    },
    disable: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
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
    options: {
      type: [Array, Function, String, Date],
      default: date => date,
    },
  },
  data() {
    return {
      model: this.value, // Inner value for q-date
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
      this.model = null;
    },
    parseTitle(value) {
      return value ? date.formatDate(value, this.formatTitle) : ' ';
    },
    parseSubTitle(value) {
      return value ? date.formatDate(value, this.formatSubTitle) : ' ';
    },
  },
};
</script>
