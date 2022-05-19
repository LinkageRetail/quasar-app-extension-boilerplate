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
          custom-style="min-height: 200px"
          :api="api"
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
          color="primary"
          :disable="payload.src === ''"
          :loading="loading"
          @click="onDebugUpload"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { useQuasar, QDialog, QCard, QCardSection, QCardActions } from 'quasar';

import FileUpload from '../FileUpload.vue';
import FilterInput from '../Input/FilterInput.vue';

/**
 * @see https://v2.quasar.dev/quasar-plugins/dialog#invoking-custom-component
 */
export default defineComponent({
  name: 'ImageUpload',
  components: { QDialog, QCard, QCardSection, QCardActions, FileUpload, FilterInput },
  emits: ['hide', 'ok'],
  props: {
    /**
     * @example process.env.STATIC_PATH + '/ponti-hk/image/
     */
    path: {
      type: String,
      default: '',
    },
    /**
     * @example /admin/product/detailImage/upload
     */
    api: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const $q = useQuasar();

    const dialog = ref();
    const loading = ref(false);
    const payload = reactive({
      src: '',
      className: null,
      style: null,
      width: '200px',
      height: null,
    });

    const onStart = () => (loading.value = true);

    const onUploaded = (files: any) => {
      loading.value = false;
      payload.src = props.path + files;
    };

    const onFailed = (entries: any) => {
      loading.value = false;
      try {
        $q.notify({ type: 'negative', message: JSON.parse(entries.xhr.response).message });
      } catch (error) {
        $q.notify({ type: 'negative', message: error as string });
      }
    };

    return {
      dialog,
      loading,
      payload,
      onStart,
      onUploaded,
      onFailed,
    };
  },
  methods: {
    onDebugUpload() {
      this.loading = false;
      this.$q.notify({ message: 'Successfully uploaded.' });
      this.$emit('ok', this.payload);
      this.hide();
    },
    show() {
      (this.$refs['dialog'] as any).show();
    },
    hide() {
      (this.$refs['dialog'] as any).hide();
    },
  },
});
</script>
