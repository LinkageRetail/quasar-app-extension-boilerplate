<script>
import { QPopupEdit, QInput } from 'quasar';
import _ from 'lodash';

/*

Example:
    <PopupInput
      title="Quantity"
      type="number"
      @save="savePopup(props.row)"
      v-model="props.row.qty"
    />

Origin:
  <q-popup-edit
    @save="savePopup(props.row)"
    v-model="props.row.qty"
    :validate="val => val > 0"
    max-width="250px"
    title="Quantity"
    buttons
  >
    <q-input
      v-model="props.row.qty"
      :error="props.row.qty <= 0"
      hint="Use buttons to close"
      dense
      autofocus
    />
  </q-popup-edit>
*/

export default {
  name: 'PopupInput',
  extends: QPopupEdit,
  functional: true,
  props: {
    title: {
      type: String,
      required: true,
    },
    buttons: {
      type: Boolean,
      default: true,
    },
    maxWidth: {
      type: String,
      default: '250px',
    },
    required: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      default: 'string',
      validator: value => ['string', 'number'].includes(value.toLowerCase()),
    },
  },
  render(h, ctx) {
    // Initial validation
    const valid = { validate: () => {}, error: false };
    if (ctx.props.required) {
      switch (ctx.props.type) {
        default:
        case 'string':
          valid.validate = val => !_.isEmpty(val);
          valid.error = _.isEmpty(ctx.data.model.value);
          break;
        case 'number':
          valid.validate = val => val > 0;
          valid.error = Number(ctx.data.model.value) <= 0 || _.isNaN(Number(ctx.data.model.value));
          break;
      }
    }

    const { error, value, ...props } = _.extend(ctx.props, valid);
    const SlotInput = h(QInput, {
      ...ctx.data,
      props: { error, dense: true, autofocus: true, hint: 'Use buttons to close' },
    });

    return h(
      QPopupEdit,
      {
        ...ctx.data,
        props,
        scopedSlots: {
          ...ctx.scopedSlots,
          default: () => SlotInput,
        },
      },
      ...(ctx.children || [])
    );
  },
};
</script>
