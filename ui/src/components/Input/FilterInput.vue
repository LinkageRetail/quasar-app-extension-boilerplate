<script>
import { QInput } from 'quasar';

export default {
  name: 'FilterInput',
  extends: QInput,
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
};
</script>
