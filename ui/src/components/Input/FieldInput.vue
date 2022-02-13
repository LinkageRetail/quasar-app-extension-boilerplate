<script>
import { QInput } from 'quasar';

export default {
  name: 'FieldInput',
  extends: QInput,
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
      default: () => [val => !!val],
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    prefix: {
      type: String,
      default: '',
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
