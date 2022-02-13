<template>
  <!-- This input date use for filter or search bar -->
  <q-input
    :clearable="clearable"
    :value="value"
    @change="handleChange"
    @clear="handleClear"
    dense
    outlined
  >
    <template #prepend>
      <q-icon :name="icon" class="cursor-pointer">
        <q-popup-proxy
          :transition-hide="transition"
          :transition-show="transition"
          ref="datePickProxy"
        >
          <q-date
            :options="options"
            :subtitle="parseSubTitle(value)"
            :title="parseTitle(value)"
            @input="handleInput"
            mask="YYYY/MM/DD HH:mm:ss"
            v-model="model"
          />
        </q-popup-proxy>
      </q-icon>
    </template>
    <template #append>
      <q-icon class="cursor-pointer" name="access_time">
        <q-popup-proxy :transition-hide="transition" :transition-show="transition">
          <q-time
            :options="options"
            :subtitle="parseSubTitle(value)"
            :title="parseTitle(value)"
            @input="handleInput"
            format24h
            mask="YYYY/MM/DD HH:mm:ss"
            v-model="model"
            with-seconds
          >
            <div class="row items-center justify-end">
              <q-btn color="primary" flat label="Close" v-close-popup />
            </div>
          </q-time>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
import { date, QInput } from 'quasar';

export default {
  name: 'FieldDateTime',
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
      default: 'datetime',
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

<style lang="scss" scoped>
.q-field {
  padding-bottom: 0;

  .q-field__bottom {
    display: none;
  }
}
</style>
