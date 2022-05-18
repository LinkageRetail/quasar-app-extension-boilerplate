<template>
  <q-editor
    ref="editor"
    :dense="denseVal"
    :toolbar="toolbarVal"
    :definitions="definitionsVal"
    :fonts="fontsVal"
    v-model="model"
  />
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';
import { QEditor, useQuasar, Screen } from 'quasar';

import { useModelWrapper } from '../hooks';
import ImageUpload from './Dialog/ImageUpload.vue';

export default defineComponent({
  name: 'Editor',
  components: { QEditor },
  props: {
    modelValue: {
      default: '',
    },
    dense: {
      type: Boolean,
      default: Screen.lt.md,
    },
    toolbar: {
      type: Array as PropType<Array<any>>,
      default: () => [],
    },
    fonts: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, context) {
    const $q = useQuasar();
    const editor = ref<QEditor>();

    const model = ref(useModelWrapper(props, context.emit, 'modelValue'));

    const denseVal = ref(useModelWrapper(props, context.emit, 'dense'));

    /**
     * @see https://v2.quasar.dev/vue-components/editor#example--kitchen-sink
     */
    const toolbarVal = ref([
      // [
      //   {
      //     label: this.$q.lang.editor.align,
      //     icon: iconSet.editor.align,
      //     fixedLabel: true,
      //     list: 'only-icons',
      //     options: ['left', 'center', 'right', 'justify'],
      //   },
      //   {
      //     label: this.$q.lang.editor.align,
      //     icon: iconSet.editor.align,
      //     fixedLabel: true,
      //     options: ['left', 'center', 'right', 'justify'],
      //   },
      // ],
      [
        {
          label: $q.lang.editor.align,
          icon: $q.iconSet.editor.align,
          fixedLabel: true,
          list: 'only-icons',
          options: ['left', 'center', 'right', 'justify'],
        },
        'bold',
        'italic',
        'strike',
        'underline',
        // 'subscript',
        // 'superscript',
        'token',
        'hr',
        'link',
        'removeFormat',
      ],
      [
        {
          label: $q.lang.editor.formatting,
          icon: $q.iconSet.editor.formatting,
          list: 'no-icons',
          options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code'],
        },
        {
          label: $q.lang.editor.fontSize,
          icon: $q.iconSet.editor.fontSize,
          fixedLabel: true,
          fixedIcon: true,
          list: 'no-icons',
          options: ['size-1', 'size-2', 'size-3', 'size-4', 'size-5', 'size-6', 'size-7'],
        },
        {
          label: $q.lang.editor.defaultFont,
          icon: $q.iconSet.editor.font,
          fixedIcon: true,
          list: 'no-icons',
          options: [
            'default_font',
            'arial',
            'arial_black',
            'comic_sans',
            'courier_new',
            'impact',
            'lucida_grande',
            'times_new_roman',
            'verdana',
          ],
        },
      ],
      ['uploadImage'],
      ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
      ['undo', 'redo'],
      ['viewsource', 'fullscreen'], // 'print',
      ...props.toolbar,
    ]);

    const definitionsVal: any = {
      uploadImage: {
        // https://v2.quasar.dev/quasar-plugins/dialog#invoking-custom-component
        handler: function () {
          $q.dialog({ component: ImageUpload /** parent: ? */ }).onOk(args => {
            const { src, className, style, width, height } = args;
            /**
             * @see https://v2.quasar.dev/vue-components/editor#plaintext-pasting
             * @see https://developer.mozilla.org/zh-TW/docs/Web/API/Document/execCommand
             */
            if (editor.value) {
              editor.value.runCmd(
                'insertHTML',
                `<img src="${src}"
          ${className ? `class="${className}"` : ''}
          ${style ? `style="${style}"` : ''}
          ${width ? `width="${width}"` : ''}
          ${height ? `height="${height}"` : ''} />`
              );
            }
          });
        },
        icon: 'camera_enhance',
        tip: 'Upload Image',
      },
    };

    const fontsVal = ref({
      arial: 'Arial',
      arial_black: 'Arial Black',
      comic_sans: 'Comic Sans MS',
      courier_new: 'Courier New',
      impact: 'Impact',
      lucida_grande: 'Lucida Grande',
      times_new_roman: 'Times New Roman',
      verdana: 'Verdana',
      ...props.fonts,
    });

    return {
      model,
      editor,
      denseVal,
      toolbarVal,
      definitionsVal,
      fontsVal,
    };
  },
});
</script>
