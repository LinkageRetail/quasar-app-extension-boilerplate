<template>
  <q-popup-edit buttons :title="title" :validate="validate" v-model="model" v-slot="scope">
    <FieldSelect :label="label" :options="options" v-model="scope.value" />
  </q-popup-edit>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType } from 'vue';
import { QPopupEdit } from 'quasar';

import FieldSelect from './FieldSelect.vue';
import { useModelWrapper } from '../../hooks';

/**
 * @see https://quasar.dev/vue-components/popup-edit#example--click-on-text
 */
export default defineComponent({
  name: 'PopupSelect',
  components: {
    QPopupEdit,
    FieldSelect,
  },
  props: {
    modelValue: {},
    options: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
      default: '',
    },
    title: {
      type: String,
    },
    buttons: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String as PropType<'number' | 'text'>,
      default: 'text', // 'text' || 'number'
    },
    errorMessage: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, context) {
    const model = ref(useModelWrapper(props, context.emit, 'modelValue'));
    const error = ref(false);
    const errorMsg = ref('');

    const validateText = (value: string) => {
      if (value.length === 0) {
        error.value = true;
        errorMsg.value = props.errorMessage;
        return false;
      }
      error.value = false;
      errorMsg.value = '';
      return true;
    };

    const validateNumber = (value: number) => {
      if (value < 0) {
        error.value = true;
        errorMsg.value = props.errorMessage;
        return false;
      }
      error.value = false;
      errorMsg.value = '';
      return true;
    };

    const validate = computed(() => {
      if (props.required && props.type === 'text') return validateText;
      if (props.required && props.type === 'number') return validateNumber;
      return () => true;
    });

    return {
      model,
      validate,
      error,
      errorMsg,
    };
  },
});
</script>
