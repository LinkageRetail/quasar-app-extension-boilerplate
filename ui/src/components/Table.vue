<template>
  <!-- Ref -->
  <!-- https://quasar.dev/vue-components/table#qtable-api -->

  <!-- Example -->
  <!-- <Table
    ref="table"
    row-key="orderAllocationId"
    action="product/getPage"
    :api="$api.product.getPage"
    :columns="listColumns"
    :selected.sync="listSelected"
    :filter.sync="filter"
    :filter-type="filterType"
    :sort-map="{ allocationTime: true, skuCode: false }"
    v-model="list"
  >
    <template #body="props">
      <q-tr>
        Important !!!
        <q-checkbox
          v-model="props.selected"
          @input="$refs.table.select(props)"
        />
        <q-td>xxx</q-td>
      </q-tr>
    </template>
  </Table> -->

  <!-- Event -->
  <!-- @request -->
  <!-- @requested -->

  <!-- Method -->
  <!-- $refs.table.request({ pagination: { page: 1 } }) -->

  <q-table
    ref="table"
    :row-key="rowKey"
    :class="tableHeaderDark && 'table-header-dark'"
    :table-header-class="tableHeaderClass"
    :rows-per-page-label="rowsPerPageLabel"
    :flat="flat"
    :hide-bottom="hideBottom"
    :data="list"
    :columns="columns"
    :loading="loading_"
    :selection="selection"
    :selected.sync="selectIds"
    :pagination.sync="pagination"
    @request="request"
  >
    <!-- @selection="select" -->
    <!-- @update:selected="select" -->

    <template v-if="$scopedSlots.top || sortMap_" #top="props">
      <div v-if="sortMap_" class="flex items-center q-mt-sm q-ml-sm">
        <div>Sort:</div>
        <q-badge
          v-for="sort in Object.keys(sortMap_)"
          :key="`sort-${sort}`"
          outline
          class="q-ml-sm q-pa-xs text-body2"
          color="primary"
        >
          {{ sort }}
          <q-icon v-show="sortMap_[sort]" name="south" />
          <q-icon v-show="!sortMap_[sort]" name="north" />
          <q-icon class="q-ml-sm cursor-pointer" name="cancel" @click="onRemoveSort(sort)" />
        </q-badge>
      </div>
      <slot name="top" v-bind="props" />
    </template>

    <template v-if="$scopedSlots.header" #header="props">
      <slot name="header" v-bind="props" />
    </template>

    <template v-if="$scopedSlots.body" #body="props">
      <slot name="body" v-bind="props" />
    </template>

    <template v-if="$scopedSlots['bottom-row']" #bottom-row="props">
      <slot name="bottom-row" v-bind="props" />
    </template>
  </q-table>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'Table',
  props: {
    value: {
      type: Array, // .sync
      default: () => [],
    },
    rowKey: {
      type: String,
      default: 'id',
    },
    action: {
      // Example
      // action="order/getAllocationPage"
      type: String,
      default: '',
    },
    api: {
      // Example
      // :api="$api.order.getAllocationPage"
      type: [Function, Object],
      default: null,
    },
    actionPayload: {
      // 強烈建議不要使用, 如果使用了, 請留意後續 filter, pagination 問題
      type: [Number, String, Array, Object],
      default: null, // 自行創建 request 參數 { filter, pagination... }
    },
    filterKey: {
      // 發出請求時, request payload 的 filter key name, legacy 專案出現了其他自定義的 key, 因此需要支持
      type: String,
      default: 'filter',
    },
    selected: {
      type: Array,
      default: () => [],
    },
    selection: {
      type: String,
      default: 'multiple', // 其他模式：'single' | 'multiple' | 'none'
    },
    columns: {
      // 如果允許用戶直接點擊 columns 進行二次排序, 記得將 columns object 添加 sortable: true
      //
      // Example:
      //  columns: [
      //   { name: 'allocationTime', label: 'Order Time', align: 'left', sortable: true },
      //   { name: 'orderNo', label: 'Order No', align: 'left' },
      // ],
      type: Array,
      default: () => [],
    },
    filter: {
      // Example:
      // <Table :filter.sync="filter" ... />
      //
      // filter: {
      //   skuCode: null,
      //   allocationStatus: 'PROCESSING',
      //   paymentStatus: 'PAID',
      // },
      type: Object, // 請搭配 .sync 使用
      default: () => ({}),
    },
    filterType: {
      // 描述 filter 每個參數的型別, 用於提取 URL 參數時的轉換型別參考
      // 參考: filterType_
      //
      // Example:
      // <Table :filter.sync="filter" :filter-type="filterType" />
      //
      // filter: {
      //   vendorId: null,
      //   paymentStatus: 'PAID',
      // },
      // filterType: {
      //   String: ['paymentStatus'],
      //   Number: ['vendorId'],
      // },
      type: Object,
      default: () => ({}),
    },
    paginationType: {
      // 自定義哪些參數需要儲存到 URL
      // Default ['rowsNumber', 'rowsPerPage', 'page']
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    legacy: {
      type: Boolean,
      default: false,
      // Server 存在兩種 table 架構, 如果架構需要支持 legacy, 則設置為 true
      // TODO: 這 server 應該要統一才對
      // latest api 參數為同一階層屬性 => { ...filter, ...paging }
      // legacy api 參數分為 filter 與 paging 屬性 => { filter: {}, paging: {} }
    },
    tableHeaderClass: {
      type: String,
      default: '',
    },
    tableHeaderDark: {
      // 如果為 true, 則套用 class='table-header-dark'
      type: Boolean,
      default: false,
    },
    rowsPerPageLabel: {
      type: String,
      default: '每頁紀錄',
    },
    flat: {
      type: Boolean,
      default: false,
    },
    hideBottom: {
      type: Boolean,
      default: false,
    },
    responseField: {
      type: String,
      default: 'content', // server API 回傳的數據源屬性名, 預設會從 content 提取出
    },
    sortMap: {
      // 提供多欄位排序
      // 初次搜索的排序規則
      // 如果允許用戶直接點擊 columns 進行二次排序, 記得將 columns object 添加 sortable: true
      //
      // Example: { allocationTime: true, skuCode: false }
      // boolean 表示為是否倒序
      type: Object,
      default: null,
    },
    defaultSortBy: {
      // 單一欄位排序 key
      //
      // Example: defaultSortBy="id"
      type: String,
      default: null,
    },
    descending: {
      // 單一欄位排序 排序方式
      // boolean 表示為是否倒序
      type: Boolean,
      default: null,
    },
  },
  data() {
    return {
      filterShadow: {}, // Diff filter
      filterType_: {
        String: [],
        Number: [],
        Boolean: [], // [true, false] can be ignore
        ArrayOfString: [],
        ArrayOfNumber: [],
        ArrayOfBoolean: [],
      },
      filterPrev: {}, // Previous filter
      list: this.value, // Default datas from v-model
      pagination: {
        sortBy: null,
        descending: false,
        page: 1, // Current page (1 as first)
        rowsPerPage: 10, // Each page elements
        rowsNumber: 0, // Total elements
      },
      // pagination 初始值
      pagination_: {
        sortBy: null,
        descending: false,
        page: 1, // Current page (1 as first)
        rowsPerPage: 10, // Each page elements
        rowsNumber: 0, // Total elements
      },
      sortMap_: this.sortMap,
      sortByPrev: null, // 前一次用戶點擊排序的欄位
      paginationType_: ['rowsNumber', 'rowsPerPage', 'page'],
      loading_: this.loading,
      selectIds: this.selected,
    };
  },
  created() {
    this.queryFromUrl();
    // Request after event emitter
    this.$nextTick(this.request);
  },
  methods: {
    /**
     * 用戶手動移除指定 sort
     */
    onRemoveSort(sort) {
      if (_.has(this.sortMap_, sort)) delete this.sortMap_[sort];
      if (_.keys(this.sortMap_).length === 0) this.sortMap_ = null;
      this.sortByPrev = null;
      this.$emit('update:sortMap', this.sortMap_);
      this.$nextTick(() => {
        // Reset sortBy
        this.$refs['table'].requestServerInteraction({ pagination: { sortBy: null } });
      });
    },
    request(event = {}) {
      //#region 數據請求透過 action(dispatch) 或者 api
      if (this.action || this.api) {
        this.$emit('request', event);
        this.$emit('update:loading', true);
        this.loading_ = true;

        //#region 更新 pagination 屬性
        // 當前 request 方法是由 q-table @request 所 trigger, 便 sync pagination 數據
        if (_.hasIn(event, 'pagination')) {
          this.pagination = _.extend(this.pagination, _.get(event, 'pagination'));
        }
        // 當前 request 方法是由用戶 click search button
        else {
          // 如果查詢條件與前次不同，需要重設 pagination
          if (!_.isEqual(this.filter, this.filterPrev)) {
            this.pagination = { ...this.pagination_ };
          }
        }
        //#endregion

        //#region 生成 filter 參數
        // Support legacy api for mutiple selection:
        // hotfix, when type is defined array but current type is not array
        // sample case: 'PENDING' => ['PENDING']
        const filter = _.keys(this.filter).reduce((prev, key) => {
          if (this.filter[key]) {
            if (
              (this.filterType_.ArrayOfString.includes(key) && !Array.isArray(this.filter[key])) ||
              (this.filterType_.ArrayOfNumber.includes(key) && !Array.isArray(this.filter[key])) ||
              (this.filterType_.ArrayOfBoolean.includes(key) && !Array.isArray(this.filter[key]))
            ) {
              return _.extend(prev, { [key]: [this.filter[key]] });
            }
            return _.extend(prev, { [key]: this.filter[key] });
          }
          return _.extend(prev, { [key]: this.filter[key] });
        }, {});
        //#endregion

        // 將本次搜尋條件暫存
        this.filterPrev = { ...this.filter };

        //#region 生成 API Request params
        let params;
        if (_.isNull(this.actionPayload)) {
          const page = this.pagination.page - 1;
          const size = this.pagination.rowsPerPage || this.pagination.rowsNumber;

          //#region sortMap
          // Server API 支持的排序方法
          // 由於 q-table 只支持同時一個 sortBy 排序, 因此這段 logic 為客製化
          const { descending, sortBy } = this.pagination;
          // 避免 mutable props, 另用變數操作 this.sortMap_
          this.sortMap_ = _.isObject(this.sortMap) ? { ...this.sortMap } : null;

          if (!_.isNull(sortBy)) {
            // 儲存本次用戶手動排序的欄位
            this.sortByPrev = sortBy;
            // 如果 this.sortMap_ 是 null, 需要初始 object
            if (!_.isObject(this.sortMap_)) this.sortMap_ = {};
            // 如果用戶手動排序, 再更新到 this.sortMap_
            _.set(this.sortMap_, sortBy, descending);
          }
          // 如果 q-table response sortBy 是 null, 代表未有任何排序
          // 如果前次有用戶手動排序紀錄, 那就要移除
          else if (_.isNull(sortBy) && !_.isNull(this.sortByPrev)) {
            // 如果 this.sortMap_ 有這項屬性需要移除
            if (_.has(this.sortMap_, this.sortByPrev)) delete this.sortMap_[this.sortByPrev];
            // 如果 this.sortMap_ 沒有任何參數, 則設置為 null
            if (_.isObject(this.sortMap_) && _.keys(this.sortMap_).length === 0)
              this.sortMap_ = null;
            this.sortByPrev = null;
          }
          this.$emit('update:sortMap', this.sortMap_);
          //#endregion

          // 為了支援舊的 Server API
          // TODO: 應該重新評估 server api 要不要統一
          if (!this.legacy) {
            // TODO: 目前舊版 Server API 未提供 sortMap
            params = {
              ...filter,
              page,
              size,
              sortMap: this.sortMap_,
              sortBy: sortBy || this.defaultSortBy,
              descending: this.descending || descending,
            };
          } else {
            params = {
              [this.filterKey]: filter,
              paging: {
                page,
                size,
                sortBy: sortBy || this.defaultSortBy,
                descending: this.descending || descending,
              },
            };
          }
        }
        // 自定義 API Request params
        else {
          params = this.actionPayload;
        }
        //#endregion

        //#region 數據請求
        try {
          // 使用 store 的 dispatch action
          if (!_.isEmpty(this.action)) {
            this.$store
              .dispatch(this.action, params)
              .then(res => handleResponse(res))
              .catch(error => {
                throw error;
              });
          }
          // 使用傳入的 api fuction
          else if (!_.isNull(this.api)) {
            this.api(params)
              .then(res => handleResponse(res))
              .catch(error => {
                throw error;
              });
          }

          const handleResponse = res => {
            this.loading_ = false;
            this.list = _.get(res, this.responseField);

            this.$emit('update', this.list);
            this.$emit('update:loading', false);
            this.$emit('requested', res);

            // 如果 actionPayload 是 null, 便由此組件更新 pagination
            if (_.isNull(this.actionPayload)) {
              // 更新 pagination
              this.pagination.rowsNumber = _.get(res, 'totalElements');
              this.pagination.rowsPerPage = _.get(res, 'size');
              this.pagination.page = Number(_.get(res, 'number')) + 1;

              // 將搜索條件更新到 URL
              this.$router
                .replace({
                  path: this.$router.currentRoute.path,
                  query: this.queryToUrl(res),
                })
                .catch(() => {});
            }
          };
        } catch (error) {
          console.error('request', error);
          this.$emit('update:loading', false);
          this.loading_ = false;
        }
        //#endregion
      }
      //#endregion

      //#region 手動處理數據請求
      // 如果使用手動數據請求, 強烈建議使用原生 q-table 自行處理
      else {
        this.$emit('update:loading', false);
        this.loading_ = false;
      }
      //#endregion
    },
    /**
     * 將 URL 參數轉為 filter 查詢物件
     */
    queryFromUrl() {
      // Initial pagination
      this.paginationType_ = _.extend(this.paginationType_, this.paginationType);
      this.pagination = _.extend(this.pagination, _.pick(this.$route.query, this.paginationType_));

      // Initial filter
      this.filterShadow = { ...this.filter };

      this.filterType_ = _.extend(this.filterType_, this.filterType);

      // Recovery filter from url
      const filterFromUrl = _.omit(this.$route.query, this.paginationType_);

      if (_.keys(filterFromUrl).length > 0) {
        // Convert filter type from url query
        const filter = {
          ...this.filter,
          ..._.chain(filterFromUrl)
            .reduce((result, value, key) => {
              // Transform string boolean
              if (['true', 'false'].includes(value)) {
                return _.extend(result, { [key]: value === 'true' || false });
              }
              // Transform pure boolean,
              if (this.filterType_.Boolean.includes(value)) {
                return _.extend(result, { [key]: !!value });
              }
              // Transform number
              if (this.filterType_.Number.includes(key)) {
                return _.extend(result, { [key]: Number(value) });
              }
              // Transform string
              if (this.filterType_.String.includes(key)) {
                return _.extend(result, { [key]: String(value) });
              }
              // Transform array of number
              if (this.filterType_.ArrayOfNumber.includes(key)) {
                return _.isEmpty(value)
                  ? result
                  : _.extend(result, { [key]: value.split(',').map(v => Number(v)) });
              }
              // Transform array of number
              if (this.filterType_.ArrayOfString.includes(key)) {
                return _.isEmpty(value)
                  ? result
                  : _.extend(result, { [key]: value.split(',').map(v => String(v)) });
              }
              // Transform array of boolean
              if (this.filterType_.ArrayOfBoolean.includes(key)) {
                return _.isEmpty(value)
                  ? result
                  : _.extend(result, { [key]: value.split(',').map(v => v === 'true' || false) });
              }
              // Unmatch or unset filter type
              // console.warn('queryFromUrl: transform default query', key, value);
              return _.extend(result, { [key]: value });
            }, {})
            .value(),
        };

        // 將 URL 的搜尋條件暫存
        this.filterPrev = { ...filter };

        this.$emit('update:filter', filter);
      }
    },
    /**
     * 將 filter 查詢結果保存至 URL
     */
    queryToUrl(result) {
      return _.extend(
        _.extend({}, !_.get(result, 'first') && _.pick(this.pagination, this.paginationType_)),
        _.chain(this.filter)
          .reduce((result, value, key) => {
            // console.warn('queryToUrl', key, value, this.filterShadow[key]);
            if (_.isEqual(value, this.filterShadow[key])) return result;
            if (_.isArray(value)) return _.extend(result, { [key]: value.join(',') });
            return _.extend(result, { [key]: value });
          }, {})
          .value()
      );
    },
    select(props) {
      if (_.hasIn(props, `row.${this.rowKey}`)) {
        const select = _.findIndex(this.selectIds, [this.rowKey, props.row[this.rowKey]]);
        if (select > -1) {
          this.selectIds.splice(select);
        } else {
          this.selectIds.push(props.row);
        }
      }
    },
    clearSelect() {
      this.selectIds = [];
    },
  },
  watch: {
    rowKey(val) {
      this.pagination.sortBy = val;
    },
    selectIds(val) {
      this.$emit('update:selected', val);
    },
  },
};
</script>

<style lang="scss" scoped>
.table-header-dark {
  ::v-deep thead tr {
    color: #fff;
    background-color: var(--q-color-primary);
  }
}
</style>
