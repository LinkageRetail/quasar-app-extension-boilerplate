<script>
import { QPopupEdit } from 'quasar';

import FieldSelect from './FieldSelect';

/*

Example:
    <PopupSelect
      title="Enabled"
      label="status*"
      @save="savePopup(props.row)"
      :options="[
        { label: 'Active', value: true },
        { label: 'Inactive', value: false },
      ]"
      v-model="props.row.enabled"
    />

Origin:
    <q-popup-edit
      @save="savePopup(props.row)"
      v-model="props.row.enabled"
      max-width="200px"
      title="Enabled"
      buttons
    >
      <q-select
        dense
        filled
        color="blue-8"
        label-color="blue-8"
        label="status*"
        map-options
        emit-value
        :options="[
          { label: 'Active', value: true },
          { label: 'Inactive', value: false },
        ]"
        v-model="props.row.enabled"
      />
    </q-popup-edit>
*/

export default {
  name: 'PopupSelect',
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
    ...FieldSelect.props,
  },
  render(h, ctx) {
    const { title, buttons, maxWidth, ...selectProps } = ctx.props;

    const SlotSelect = h(FieldSelect, {
      ...ctx.data,
      props: { ...selectProps, hint: 'Use buttons to close' },
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
          default: () => SlotSelect,
        },
      },
      ...(ctx.children || [])
    );
  },
};
</script>
