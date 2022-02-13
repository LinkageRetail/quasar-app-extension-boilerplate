<template>
  <!-- Example: -->
  <!-- <FileUpload api="/bnpl/user/identity/image" @uploaded="onUploaded" /> -->

  <q-uploader
    ref="uploader"
    class="full-width"
    color="green-custom-1"
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

<script>
import { mapState } from 'vuex';
import _ from 'lodash';

export default {
  name: 'FileUpload',
  props: {
    api: {
      type: String,
      default: '',
      require: true, // /bnpl/user/identity/image
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
    fileType: {
      type: Array,
      default: () => ['image/png', 'image/jpg', 'image/jpeg'], // Default only allow image
    },
    fileSize: {
      type: Number,
      default: 1024 * 1024 * 5, // 5MB
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
      type: Object,
      default: () => {},
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
  },
  methods: {
    filter(files) {
      return files.filter(file => this.fileType.includes(file.type) && file.size <= this.fileSize);
    },
    factory(files) {
      // Factort mode: https://v1.quasar.dev/vue-components/uploader
      return {
        url: `${process.env.API}${this.api}`.replace('api//', 'api/'),
        method: 'POST',
        headers: [
          { name: 'Authorization', value: this.token },
          { name: 'tenant', value: 'PONTI-HK' },
        ],
      };
    },
    generateFormFields(files) {
      // Merge other request into formdata
      const formFields = _.keys(this.formFields).reduce((prev, key) => {
        prev.push({ name: key, value: _.get(this.formFields, key) });
        return prev;
      }, []);
      return formFields;
    },
    addFiles(files) {
      this.$refs.uploader.addFiles(files);
    },
    reset() {
      this.$refs.uploader.reset();
    },
    upload() {
      this.$refs.uploader.upload();
    },
    uploading(entries) {
      const response = _.get(entries, 'xhr.response');
      try {
        this.$emit('uploading', JSON.parse(JSON.stringify(response)));
      } catch (error) {
        this.$emit('rejected', entries);
      }
    },
    uploaded(entries) {
      const response = _.get(entries, 'xhr.response');
      try {
        this.$emit('uploaded', JSON.parse(JSON.stringify(response)));
      } catch (error) {
        this.$emit('rejected', entries);
      }
    },
    rejected(entries) {
      console.error('rejected', entries);
      this.$emit('rejected', entries);
      this.$q.notify({
        type: 'negative',
        message: 'File extension or size is not allowed.',
      });
    },
    failed(entries) {
      const response = _.get(entries, 'xhr.response');
      try {
        this.$emit('failed', JSON.parse(JSON.stringify(response)));
      } catch (error) {
        console.error('failed', entries);
        this.$emit('failed', entries);
      }
    },
  },
  computed: {
    ...mapState('auth', ['token']),
  },
};
</script>
