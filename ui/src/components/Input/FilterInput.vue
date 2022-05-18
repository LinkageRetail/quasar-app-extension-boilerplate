<script lang="ts">
import { defineComponent, h } from 'vue';
import { QInput } from 'quasar';

export default defineComponent({
  name: 'FilterInput',
  components: { QInput },
  props: {
    dense: {
      type: Boolean,
      default: true,
    },
    outlined: {
      type: Boolean,
      default: true,
    },
    clearable: {
      type: Boolean,
      default: true,
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
