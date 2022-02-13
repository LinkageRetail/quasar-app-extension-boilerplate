<template>
  <q-dialog ref="dialog" @hide="$emit('hide')">
    <q-card class="card-rounded q-pa-md-lg q-ma-lg" style="width: 100%; max-width: 500px">
      <q-card-section class="text-body1 text-weight-medium">
        <div>Image Upload</div>
      </q-card-section>

      <q-card-section class="q-gutter-y-md">
        <div class="row q-gutter-x-md justify-between">
          <div class="col row items-center">
            <div class="col-4">Width</div>
            <div class="col-8"><FilterInput v-model="payload.width" /></div>
          </div>
          <div class="col row items-center">
            <div class="col-4">Height</div>
            <div class="col-8"><FilterInput v-model="payload.height" /></div>
          </div>
          <div class="col row items-center">
            <div class="col-4">Class Name</div>
            <div class="col-8"><FilterInput v-model="payload.className" /></div>
          </div>
        </div>
        <div class="row items-center">
          <div class="col-auto q-mr-lg">Style</div>
          <div class="col"><FilterInput v-model="payload.style" /></div>
        </div>
      </q-card-section>

      <q-card-section>
        <!-- TODO: check image api -->
        <FileUpload
          ref="uploader"
          api="/admin/product/detailImage/upload"
          custom-style="min-height: 200px"
          :max-files="1"
          @start="onStart"
          @uploaded="onUploaded"
          @uploading="loading = true"
          @failed="onFailed"
        />
      </q-card-section>
      <q-card-actions align="right" class="q-pa-md">
        <q-btn label="Cancel" color="grey" @click="hide" />
        <q-btn
          label="Insert"
          color="blue"
          :disable="payload.src === ''"
          :loading="loading"
          @click="onDebugUpload"
        />
        <!-- <q-btn label="Insert" color="blue" :loading="loading" @click="$refs.uploader.upload()" /> -->
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import FileUpload from '../FileUpload.vue';
import FilterInput from '../Input/FilterInput.vue';

/**
 * @see https://v1.quasar.dev/quasar-plugins/dialog#invoking-custom-component
 */
export default {
  name: 'ImageUpload',
  components: {
    FileUpload,
    FilterInput,
  },
  data() {
    return {
      loading: false,
      payload: {
        src: '',
        className: null,
        style: null,
        width: '200px',
        height: null,
      },
    };
  },
  methods: {
    onDebugUpload() {
      this.loading = false;
      this.$q.notify({ message: 'Successfully uploaded.' });
      this.$emit('ok', this.payload);
      this.hide();
    },
    onStart() {
      this.loading = true;
    },
    onUploaded(files) {
      this.loading = false;
      // this.$q.notify({ message: 'Successfully uploaded.' });
      console.log(files);
      this.payload.src = this.$path.image + files;
      // this.$emit('ok', this.payload);
      // this.hide();
    },
    onFailed(entries) {
      this.loading = false;
      try {
        this.$utils.showAlert(
          'ERROR',
          `<span style="white-space: pre-line">${JSON.parse(entries.xhr.response).message}</span>`
        );
      } catch (error) {
        this.$utils.showAlert('ERROR', error);
      }
    },
    show() {
      this.$refs.dialog.show();
    },
    hide() {
      this.$refs.dialog.hide();
    },
  },
};
</script>
