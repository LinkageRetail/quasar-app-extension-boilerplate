<script lang="ts">
import { defineComponent, h } from 'vue';
import { QSelect } from 'quasar';

export default defineComponent({
  name: 'FilterSelect',
  components: { QSelect },
  props: {
    dense: {
      type: Boolean,
      default: true,
    },
    outlined: {
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
    clearable: {
      type: Boolean,
      default: true,
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
