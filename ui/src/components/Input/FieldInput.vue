<script lang="ts">
import { defineComponent, h } from 'vue';
import { QInput, QIcon } from 'quasar';
import { set } from 'lodash';

export default defineComponent({
  name: 'FieldInput',
  components: { QInput },
  props: {
    modelValue: {},
    dense: {
      type: Boolean,
      default: true,
    },
    rounded: {
      type: Boolean,
      default: false,
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
      require: false,
    },
    lazyRules: {
      type: Boolean,
      default: true,
    },
    label: {
      type: String,
      require: false,
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
    required: {
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
      require: false,
    },
    hint: {
      type: String,
      require: false,
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
    prependIcon: {
      type: String,
      require: false,
    },
    appendIcon: {
      type: String,
      require: false,
    },
  },
  emits: ['update:modelValue'],
  setup(props, context) {
    const IconPrepend = h(QIcon, { name: props.prependIcon });

    const IconAppend = h(QIcon, { name: props.appendIcon });

    const slots = {};
    if (props.prependIcon) {
      set(slots, 'prepend', () => IconPrepend);
    }
    if (props.appendIcon) {
      set(slots, 'append', () => IconAppend);
    }

    return () =>
      /**
       * @see https://vuejs.org/guide/extras/render-function.html#v-model
       */
      h(
        QInput,
        {
          ...props,
          'onUpdate:modelValue': (value: any) => context.emit('update:modelValue', value),
          rules: props.required ? props.rules : [],
        },
        slots
      );
  },
});
</script>

<style lang="scss" scoped>
@import 'input.scss';
</style>
