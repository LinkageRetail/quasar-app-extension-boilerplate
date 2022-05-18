<template>
  <q-page padding>
    <div class="q-gutter-y-md" style="max-width: 600px">
      <div>
        <div class="text-h6">Field</div>
        <div class="text-body1">用於表單填寫欄位, 需要驗證的欄位</div>
      </div>
      <FieldDate ref="aaa" label="FieldDate" v-model="FieldDate" />
      {{ FieldDate }}
      <FieldDateTime label="FieldDateTime" v-model="FieldDateTime" />
      {{ FieldDateTime }}
      <FieldInput label="FieldInput" v-model="FieldInput" />
      {{ FieldInput }}
      <FieldSelect label="FieldSelect" :options="['Red', 'Blue']" v-model="FieldSelect" />
      {{ FieldSelect }}

      <hr />

      <div>
        <div class="text-h6">Filter</div>
        <div class="text-body1">用於查詢欄位, 不會進行數值驗證</div>
      </div>
      <FilterDate label="FilterDate" v-model="FilterDate" />
      {{ FilterDate }}
      <FilterDateTime label="FilterDateTime" v-model="FilterDateTime" />
      {{ FilterDateTime }}
      <FilterInput label="FilterInput" v-model="FilterInput" />
      {{ FilterInput }}
      <FilterSelect label="FilterSelect" :options="['Red', 'Blue']" v-model="FilterSelect" />
      {{ FilterSelect }}

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
      // Field
      FieldDate: ref(null),
      FieldDateTime: ref(null),
      FieldInput: ref(null),
      FieldSelect: ref(null),
      // Filter
      FilterDate: ref(null),
      FilterDateTime: ref(null),
      FilterInput: ref(null),
      FilterSelect: ref(null),
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
