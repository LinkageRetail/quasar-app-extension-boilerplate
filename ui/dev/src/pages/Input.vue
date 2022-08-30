<template>
  <q-page padding>
    <div class="q-gutter-y-md" style="max-width: 600px">
      <div>
        <div class="text-h6">Field</div>
        <div class="text-body1">用於表單填寫欄位</div>
      </div>
      <div style="height: 55px">
        <FieldDate placeholder="FieldDate" v-model="FieldDate" />
        <span class="text-caption text-grey-7">{{ FieldDate }}</span>
      </div>
      <div style="height: 55px">
        <FieldDateTime rounded placeholder="FieldDateTime" v-model="FieldDateTime" />
        <span class="text-caption text-grey-7">{{ FieldDateTime }}</span>
      </div>
      <div style="height: 55px">
        <FieldInput placeholder="FieldInput" v-model="FieldInput" />
        <span class="text-caption text-grey-7">{{ FieldInput }}</span>
      </div>

      <div style="height: 55px">
        <FieldSelect placeholder="FieldSelect" :options="['Red', 'Blue']" v-model="FieldSelect" />
        <span class="text-caption text-grey-7">{{ FieldSelect }}</span>
      </div>

      <div style="height: 55px">
        <FieldDate outlined placeholder="FieldDate - outlined" v-model="FieldDateOutlined" />
        <span class="text-caption text-grey-7">{{ FieldDateOutlined }}</span>
      </div>
      <div style="height: 55px">
        <FieldDateTime
          outlined
          rounded
          placeholder="FieldDateTime - outlined"
          v-model="FieldDateTimeOutlined"
        />
        <span class="text-caption text-grey-7">{{ FieldDateTimeOutlined }}</span>
      </div>
      <div style="height: 55px">
        <FieldInput
          outlined
          required
          placeholder="FieldInput - outlined"
          appendIcon="edit"
          v-model="FieldInputOutlined"
        />
        <span class="text-caption text-grey-7"> required {{ FieldInputOutlined }}</span>
      </div>
      <div style="height: 55px">
        <FieldInput
          outlined
          placeholder="FieldInput - outlined - bg-white"
          bgColor="bg-white"
          prependIcon="search"
          v-model="FieldInputOutlined"
        />
        <span class="text-caption text-grey-7"> {{ FieldInputOutlined }}</span>
      </div>
      <div style="height: 55px">
        <FieldSelect
          outlined
          required
          placeholder="FieldSelect - outlined"
          :options="['Red', 'Blue']"
          v-model="FieldSelectOutlined"
        />
        <span class="text-caption text-grey-7"> required{{ FieldSelectOutlined }}</span>
      </div>

      <hr />

      <div>
        <div class="text-h6">Popup</div>
        <div class="text-body1">用於 Table 中的欄位修改, 通常依附在 Text 上</div>
      </div>
      <div style="width: 200px">
        PopupDate Click Me
        <PopupDate
          title="PopupDate"
          label="PopupDate*"
          @save="onSave('PopupDate', $event)"
          v-model="PopupDate"
        />
        {{ PopupDate }}
      </div>
      <div style="width: 200px">
        PopupEditInput Click Me
        <PopupEditInput
          title="PopupEditInput"
          type="number"
          @save="onSave('PopupInput', $event)"
          v-model="PopupEditInput"
        />
      </div>
      <div style="width: 200px">
        PopupInput Click Me
        <PopupInput
          title="PopupInput"
          type="number"
          @save="onSave('PopupInput', $event)"
          v-model="PopupInput"
        />
        {{ PopupInput }}
      </div>
      <div style="width: 200px">
        PopupSelect Click Me
        <PopupSelect
          title="PopupInput"
          label="PopupInput"
          @save="onSave('PopupSelect', $event)"
          :options="['Red', 'Blue']"
          v-model="PopupSelect"
        />
        {{ PopupSelect }}
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    return {
      // Field - Standard
      FieldDate: ref(null),
      FieldDateTime: ref(null),
      FieldInput: ref(null),
      FieldSelect: ref(null),
      // Field - Outlined
      FieldDateOutlined: ref(null),
      FieldDateTimeOutlined: ref(null),
      FieldInputOutlined: ref(null),
      FieldSelectOutlined: ref(null),
      // Popup
      PopupDate: ref(null),
      PopupEditInput: ref(null),
      PopupInput: ref(null),
      PopupSelect: ref(null),
    };
  },
  methods: {
    onSave(event: string, value: any) {
      console.log(event, value);
    },
  },
});
</script>
