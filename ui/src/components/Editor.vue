<script>
import { QEditor } from 'quasar';
import ImageUpload from './Dialog/ImageUpload.vue';

export default {
  name: 'Editor',
  extends: QEditor,
  props: {
    dense: {
      type: Boolean,
      default: function () {
        return this.$q.screen.lt.md;
      },
    },
    toolbar: {
      type: Array,
      default: function () {
        return [
          // [
          //   {
          //     label: this.$q.lang.editor.align,
          //     icon: this.$q.iconSet.editor.align,
          //     fixedLabel: true,
          //     list: 'only-icons',
          //     options: ['left', 'center', 'right', 'justify'],
          //   },
          //   {
          //     label: this.$q.lang.editor.align,
          //     icon: this.$q.iconSet.editor.align,
          //     fixedLabel: true,
          //     options: ['left', 'center', 'right', 'justify'],
          //   },
          // ],
          [
            {
              // label: this.$q.lang.editor.align,
              icon: this.$q.iconSet.editor.align,
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
              label: this.$q.lang.editor.formatting,
              icon: this.$q.iconSet.editor.formatting,
              list: 'no-icons',
              options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code'],
            },
            {
              label: this.$q.lang.editor.fontSize,
              icon: this.$q.iconSet.editor.fontSize,
              fixedLabel: true,
              fixedIcon: true,
              list: 'no-icons',
              options: ['size-1', 'size-2', 'size-3', 'size-4', 'size-5', 'size-6', 'size-7'],
            },
            {
              label: this.$q.lang.editor.defaultFont,
              icon: this.$q.iconSet.editor.font,
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
        ];
      },
    },
    fonts: {
      type: Object,
      default: () => ({
        arial: 'Arial',
        arial_black: 'Arial Black',
        comic_sans: 'Comic Sans MS',
        courier_new: 'Courier New',
        impact: 'Impact',
        lucida_grande: 'Lucida Grande',
        times_new_roman: 'Times New Roman',
        verdana: 'Verdana',
      }),
    },
    definitions: {
      type: Object,
      default: function () {
        return {
          uploadImage: {
            // https://v1.quasar.dev/quasar-plugins/dialog#invoking-custom-component
            handler: () => this.onFileUpload(),
            icon: 'camera_enhance',
            tip: 'Upload Image',
          },
        };
      },
    },
  },
  methods: {
    onFileUpload() {
      this.$q.dialog({ component: ImageUpload, parent: this }).onOk(args => {
        const { src, className, style, width, height } = args;
        /**
         * @see https://v1.quasar.dev/vue-components/editor#plaintext-pasting
         * @see https://developer.mozilla.org/zh-TW/docs/Web/API/Document/execCommand
         */
        this.runCmd(
          'insertHTML',
          `<img src="${src}"
          ${className ? `class="${className}"` : ''}
          ${style ? `style="${style}"` : ''}
          ${width ? `width="${width}"` : ''}
          ${height ? `height="${height}"` : ''} />`
        );
      });
    },
  },
};
</script>
