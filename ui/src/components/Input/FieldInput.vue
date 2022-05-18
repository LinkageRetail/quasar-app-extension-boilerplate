<script lang="ts">
import { defineComponent, h } from 'vue';
import { QInput } from 'quasar';

export default defineComponent({
  name: 'FieldInput',
  props: {
    modelValue: {},
    dense: {
      type: Boolean,
      default: true,
    },
    filled: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: 'blue-8',
    },
    labelColor: {
      type: String,
      default: 'blue-8',
    },
    lazyRules: {
      type: Boolean,
      default: true,
    },
    label: {
      type: String,
      default: '',
      require: false,
    },
    borderless: {
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
    autogrow: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: Array,
      default: () => [(val: any) => !!val],
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    prefix: {
      type: String,
      default: '',
    },
    error: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: '',
    },
    hint: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(props, context) {
    return () =>
      /**
       * @see https://vuejs.org/guide/extras/render-function.html#v-model
       */
      h(QInput, {
        ...props,
        'onUpdate:modelValue': (value: any) => context.emit('update:modelValue', value),
      });
  },
});
</script>

<style lang="scss" scoped>
.q-field {
  padding-bottom: 0;

  .q-field__bottom {
    display: none;
  }
}
</style>
