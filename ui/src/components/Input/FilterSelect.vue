<script>
import { QSelect } from 'quasar';
import _ from 'lodash';

export default {
  name: 'FilterSelect',
  extends: QSelect,
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
  data() {
    return {
      optionsShadow: this.options,
    };
  },
  methods: {
    handleFilter(val, update) {
      if (val === '') {
        update(() => {
          this.options = this.optionsShadow;
          // with Quasar v1.7.4+
          // here you have access to "ref" which
          // is the Vue reference of the QSelect
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.options = this.optionsShadow.filter(
          v => _.get(v, this.optionLabel).toLowerCase().indexOf(needle) > -1
        );
      });
    },
  },
};
</script>
