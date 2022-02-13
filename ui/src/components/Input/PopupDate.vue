<script>
import { QPopupEdit } from 'quasar';

import FieldDate from './FieldDate.vue';

/*

Example:
  <PopupDate
    title="BirthDate"
    label="birthDate*"
    @save="savePopup(props.row)"
    v-model="props.row.birthDate"
  />

Origin:
    <q-popup-edit
      @save="savePopup(props.row)"
      v-model="props.row.enabled"
      max-width="200px"
      title="Enabled"
      buttons
    >
      <FieldDate
        dense
        filled
        color="blue-8"
        label-color="blue-8"
        label="status*"
        v-model="props.row.enabled"
      />
    </q-popup-edit>
*/

export default {
  name: 'PopupDate',
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
    ...FieldDate.props,
  },
  render(h, ctx) {
    const { title, buttons, maxWidth } = ctx.props;

    const SlotDate = h(FieldDate, {
      ...ctx.data,
      props: ctx.props,
    });

    return h(
      QPopupEdit,
      {
        ...ctx.data,
        props: {
          title,
          buttons,
          maxWidth,
        },
        scopedSlots: {
          ...ctx.scopedSlots,
          default: () => SlotDate,
        },
      },
      ...(ctx.children || [])
    );
  },
};
</script>
