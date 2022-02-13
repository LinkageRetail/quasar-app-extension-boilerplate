<template>
  <q-page padding>
    <div class="q-gutter-y-md" style="max-width: 600px">
      <div>
        <div class="text-h6">Field</div>
        <div class="text-body1">用於表單填寫欄位, 需要驗證的欄位</div>
      </div>
      <FieldDate label="FieldDate" v-model="FieldDate" />
      <FieldDateTime label="FieldDateTime" v-model="FieldDateTime" />
      <FieldInput label="FieldInput" v-model="FieldInput" />
      <FieldSelect label="FieldSelect" :options="['Red', 'Blue']" v-model="FieldSelect" />

      <hr />

      <div>
        <div class="text-h6">Filter</div>
        <div class="text-body1">用於查詢欄位, 不會進行數值驗證</div>
      </div>
      <FilterDate label="FilterDate" v-model="FilterDate" />
      <FilterDateTime label="FilterDateTime" v-model="FilterDateTime" />
      <FilterInput label="FilterInput" v-model="FilterInput" />
      <FilterSelect label="FilterSelect" :options="['Red', 'Blue']" v-model="FilterSelect" />

      <hr />

      <div>
        <div class="text-h6">Popup</div>
        <div class="text-body1">用於 Table 中的欄位修改, 通常依附在 Text 上</div>
      </div>
      <div>
        PopupDate Click Me
        <PopupDate
          title="PopupDate"
          label="PopupDate*"
          @save="val => onSave('PopupDate', val)"
          v-model="PopupDate"
        />
      </div>
      <div>
        PopupEditInput Click Me
        <PopupEditInput
          title="PopupEditInput"
          type="number"
          @save="val => onSave('PopupEditInput', val)"
          v-model="PopupEditInput"
        />
      </div>
      <div>
        PopupInput Click Me
        <PopupInput
          title="PopupInput"
          type="number"
          @save="val => onSave('PopupInput', val)"
          v-model="PopupInput"
        />
      </div>
      <div>
        PopupSelect Click Me
        <PopupSelect
          title="PopupInput"
          label="PopupInput"
          @save="val => onSave('PopupSelect', val)"
          :options="['Red', 'Blue']"
          v-model="PopupSelect"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      // Field
      FieldDate: null,
      FieldDateTime: null,
      FieldInput: null,
      FieldSelect: null,
      // Filter
      FilterDate: null,
      FilterDateTime: null,
      FilterInput: null,
      FilterSelect: null,
      // Popup
      PopupDate: null,
      PopupEditInput: null,
      PopupInput: null,
      PopupSelect: null,
    };
  },
  methods: {
    onSave(event, value) {
      console.log(event, value);
    },
  },
};
</script>
