<template>
  <!-- Example: -->
  <!-- <FileUpload api="/bnpl/user/identity/image" @uploaded="onUploaded" /> -->

  <q-uploader
    ref="uploader"
    class="full-width"
    color="primary"
    square
    flat
    bordered
    :style="'min-height: 300px;' + customStyle"
    :field-name="fieldName"
    :multiple="multiple"
    :disable="disable"
    :label="label"
    :accept="accept"
    :filter="filter"
    :form-fields="generateFormFields"
    :factory="factory"
    :max-files="maxFiles"
    @added="files => $emit('added', files)"
    @removed="files => $emit('removed', files)"
    @uploading="uploading"
    @uploaded="uploaded"
    @rejected="rejected"
    @failed="failed"
  />
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';
import { QUploader, QUploaderFactoryFn, useQuasar } from 'quasar';
import _ from 'lodash';

export default defineComponent({
  name: 'FileUpload',
  components: { QUploader },
  props: {
    /**
     * @example /api/bnpl/user/identity/image
     */
    api: {
      type: String,
      default: '',
      require: true,
    },
    accept: {
      type: String,
      default: '.png, .jpg, .jpeg',
    },
    fieldName: {
      type: String,
      default: 'file',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    /**
     * Default only allow image
     */
    fileType: {
      type: Array,
      default: () => ['image/png', 'image/jpg', 'image/jpeg'],
    },
    /**
     * Default 5MB
     */
    fileSize: {
      type: Number,
      default: 1024 * 1024 * 5,
    },
    label: {
      type: String,
      default: 'Drop file here Or Select (<2M size, png only)',
    },
    disable: {
      type: Boolean,
      default: false,
    },
    formFields: {
      type: Object as PropType<{ [key: string]: any }>,
      default: () => ({}),
      // Merge into FormData
      // Syntax example: { typeCode: 'PRODUCT', isDefault: false, ... }
    },
    customStyle: {
      type: String,
      default: '',
    },
    maxFiles: {
      type: Number,
      default: 10,
    },
    /**
     * @example
     *  [
     *   { name: 'Authorization', value: 'my-token' },
     *   { name: 'tenant', value: 'my-tenant' },
     *  ]
     */
    headers: {
      type: Array as PropType<Array<{ name: any; value: any }>>,
      default: () => [],
    },
  },
  setup(props, context) {
    const $q = useQuasar();
    const uploader = ref();

    const filter: any = (files: any[] | FileList) => {
      // eslint-disable-next-line
      return (files as Array<File>).filter(
        file => props.fileType.includes(file.type) && file.size <= props.fileSize
      );
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const factory: QUploaderFactoryFn = () => {
      // Factort mode: https://v2.quasar.dev/vue-components/uploader
      return {
        url: `${process.env.HOST}${props.api}`.replace('api//', 'api/'),
        method: 'POST',
        headers: props.headers,
      };
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const generateFormFields = (files: Array<File>) => {
      // Merge other request into formdata
      const formFields = _.keys(props.formFields).reduce((prev, key) => {
        prev.push({ name: key, value: _.get(props.formFields, key) });
        return prev;
      }, [] as Array<{ name: string; value: any }>);
      return formFields;
    };

    const addFiles = (files: Array<File> | File) => {
      uploader.value.addFiles(files);
    };

    const reset = () => {
      uploader.value.reset();
    };

    const uploading = (entries: any) => {
      const response = _.get(entries, 'xhr.response');
      try {
        context.emit('uploading', JSON.parse(JSON.stringify(response)));
      } catch (error) {
        context.emit('rejected', entries);
      }
    };

    const uploaded = (entries: any) => {
      const response = _.get(entries, 'xhr.response');
      try {
        context.emit('uploaded', JSON.parse(JSON.stringify(response)));
      } catch (error) {
        context.emit('rejected', entries);
      }
    };

    const rejected = (entries: any) => {
      console.error('rejected', entries);
      context.emit('rejected', entries);
      $q.notify({
        type: 'negative',
        message: 'File extension or size is not allowed.',
      });
    };

    const failed = (entries: any) => {
      const response = _.get(entries, 'xhr.response');
      try {
        context.emit('failed', JSON.parse(JSON.stringify(response)));
      } catch (error) {
        console.error('failed', entries);
        context.emit('failed', entries);
      }
    };

    return {
      filter,
      factory,
      generateFormFields,
      addFiles,
      reset,
      uploading,
      uploaded,
      rejected,
      failed,
    };
  },
});
</script>
