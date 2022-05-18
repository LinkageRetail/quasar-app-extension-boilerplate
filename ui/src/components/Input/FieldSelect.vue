<script lang="ts">
import { defineComponent, h } from 'vue';
import { QSelect } from 'quasar';

export default defineComponent({
  name: 'FieldSelect',
  props: {
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
      required: true,
    },
    required: {
      type: Boolean,
      default: true,
    },
    lazyRules: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
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
  },
  emits: ['update:modelValue'],
  setup(props, context) {
    return () =>
      /**
       * @see https://vuejs.org/guide/extras/render-function.html#v-model
       */
      h(QSelect, {
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
