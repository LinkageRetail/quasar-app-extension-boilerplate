<template>
  <!-- Ref -->
  <!-- https://v2.quasar.dev/vue-components/table#qtable-api -->

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
    :table-header-class="tableHeaderClass"
    :flat="flat"
    :hide-bottom="hideBottom"
    :rows="list"
    :columns="columns"
    :loading="loading_"
    :selection="selection"
    v-model:selected="selectIds"
    v-model:pagination="pagination"
    @request="request"
  >
    <!-- @selection="select" -->
    <!-- @update:selected="select" -->

    <template v-if="$slots.top || sortMap_" #top="props">
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

    <template v-if="$slots.header" #header="props">
      <slot name="header" v-bind="props" />
    </template>

    <template v-if="$slots.body" #body="props">
      <slot name="body" v-bind="props" />
    </template>

    <template v-if="$slots['bottom-row']" #bottom-row="props">
      <slot name="bottom-row" v-bind="props" />
    </template>
  </q-table>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted, nextTick, PropType } from 'vue';
import { LocationQueryRaw, useRoute, useRouter } from 'vue-router';
import { QTable, QBadge, QIcon } from 'quasar';
import _ from 'lodash';

import { useModelWrapper } from '../hooks';

export default defineComponent({
  name: 'Table',
  components: { QTable, QBadge, QIcon },
  props: {
    modelValue: {
      type: Array as PropType<Array<any>>,
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
      type: Array as PropType<Array<any>>,
      default: () => [],
    },
    selection: {
      type: String as PropType<'multiple' | 'single' | 'none' | undefined>,
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
      type: Array as PropType<Array<any>>,
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
      type: Object as PropType<{ [key: string]: Array<string> }>,
      default: () => ({}),
    },
    paginationType: {
      // 自定義哪些參數需要儲存到 URL
      // Default ['rowsNumber', 'rowsPerPage', 'page']
      type: Array as PropType<Array<string>>,
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

    flat: {
      type: Boolean,
      default: true,
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
      type: Object as PropType<{ [key: string]: boolean }>,
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
  setup(props, context) {
    const $router = useRouter();
    const $route = useRoute();

    const table = ref();
    const filterShadow = ref({}); // Diff filter
    const filterType_ = ref({
      String: [] as Array<string>,
      Number: [] as Array<string>,
      Boolean: [] as Array<string>, // [true, false] can be ignore
      ArrayOfString: [] as Array<string>,
      ArrayOfNumber: [] as Array<string>,
      ArrayOfBoolean: [] as Array<string>,
    });
    const filterPrev = ref({}); // Previous filter
    const list = ref(useModelWrapper(props, context.emit, 'modelValue')); // Default datas from v-model
    const pagination = ref<any>({
      sortBy: '',
      descending: false,
      page: 1, // Current page (1 as first)
      rowsPerPage: 10, // Each page elements
      rowsNumber: 0, // Total elements
    });

    // pagination 初始值
    const pagination_ = ref({
      sortBy: null,
      descending: false,
      page: 1, // Current page (1 as first)
      rowsPerPage: 10, // Each page elements
      rowsNumber: 0, // Total elements
    });
    const sortMap_ = ref(useModelWrapper(props, context.emit, 'sortMap'));
    const sortByPrev = ref(null); // 前一次用戶點擊排序的欄位
    const paginationType_ = ref(['rowsNumber', 'rowsPerPage', 'page']);
    const loading_ = ref(useModelWrapper(props, context.emit, 'loading'));
    const selectIds = ref(useModelWrapper(props, context.emit, 'selected'));

    /**
     * 用戶手動移除指定 sort
     */
    const onRemoveSort = (sort: any) => {
      if (_.has(sortMap_.value, sort)) delete sortMap_.value[sort];
      if (_.keys(sortMap_.value).length === 0) sortMap_.value = null;
      sortByPrev.value = null;
      context.emit('update:sortMap', sortMap_.value);
      nextTick(() => {
        // Reset sortBy
        (table as any).requestServerInteraction({ pagination: { sortBy: null } });
      });
    };

    const request = (event = {}) => {
      //#region 數據請求透過 action(dispatch) 或者 api
      if (props.action || props.api) {
        context.emit('request', event);
        context.emit('update:loading', true);
        loading_.value = true;

        //#region 更新 pagination 屬性
        // 當前 request 方法是由 q-table @request 所 trigger, 便 sync pagination 數據
        if (_.hasIn(event, 'pagination')) {
          pagination.value = _.extend(pagination, _.get(event, 'pagination'));
        }
        // 當前 request 方法是由用戶 click search button
        else {
          // 如果查詢條件與前次不同，需要重設 pagination
          if (!_.isEqual(props.filter, filterPrev.value)) {
            pagination.value = { ...pagination.value };
          }
        }
        //#endregion

        //#region 生成 filter 參數
        // Support legacy api for mutiple selection:
        // hotfix, when type is defined array but current type is not array
        // sample case: 'PENDING' => ['PENDING']
        const filter = _.keys(props.filter).reduce((prev, key) => {
          if (props.filter[key]) {
            if (
              (filterType_.value.ArrayOfString.includes(key) &&
                !Array.isArray(props.filter[key])) ||
              (filterType_.value.ArrayOfNumber.includes(key) &&
                !Array.isArray(props.filter[key])) ||
              (filterType_.value.ArrayOfBoolean.includes(key) && !Array.isArray(props.filter[key]))
            ) {
              return _.extend(prev, { [key]: [props.filter[key]] });
            }
            return _.extend(prev, { [key]: props.filter[key] });
          }
          return _.extend(prev, { [key]: props.filter[key] });
        }, {});
        //#endregion

        // 將本次搜尋條件暫存
        filterPrev.value = { ...props.filter };

        //#region 生成 API Request params
        let params;
        if (_.isNull(props.actionPayload)) {
          const page = pagination.value.page - 1;
          const size = pagination.value.rowsPerPage || pagination.value.rowsNumber;

          //#region sortMap
          // Server API 支持的排序方法
          // 由於 q-table 只支持同時一個 sortBy 排序, 因此這段 logic 為客製化
          const { descending, sortBy } = pagination.value;
          // 避免 mutable props, 另用變數操作 this.sortMap_
          sortMap_.value = _.isObject(props.sortMap) ? { ...props.sortMap } : null;

          if (!_.isNull(sortBy)) {
            // 儲存本次用戶手動排序的欄位
            sortByPrev.value = sortBy;
            // 如果 this.sortMap_ 是 null, 需要初始 object
            if (!_.isObject(sortMap_.value)) sortMap_.value = {};
            // 如果用戶手動排序, 再更新到 this.sortMap_
            _.set(sortMap_.value, sortBy, descending);
          }
          // 如果 q-table response sortBy 是 null, 代表未有任何排序
          // 如果前次有用戶手動排序紀錄, 那就要移除
          else if (_.isNull(sortBy) && !_.isNull(sortByPrev.value)) {
            // 如果 this.sortMap_ 有這項屬性需要移除
            if (_.has(sortMap_.value, sortByPrev.value)) delete sortMap_.value[sortByPrev.value];
            // 如果 this.sortMap_ 沒有任何參數, 則設置為 null
            if (_.isObject(sortMap_.value) && _.keys(sortMap_.value).length === 0)
              sortMap_.value = null;
            sortByPrev.value = null;
          }
          context.emit('update:sortMap', sortMap_.value);
          //#endregion

          // 為了支援舊的 Server API
          // TODO: 應該重新評估 server api 要不要統一
          if (!props.legacy) {
            // TODO: 目前舊版 Server API 未提供 sortMap
            params = {
              ...filter,
              page,
              size,
              sortMap: sortMap_.value,
              sortBy: sortBy || props.defaultSortBy,
              descending: props.descending || descending,
            };
          } else {
            params = {
              [props.filterKey]: filter,
              paging: {
                page,
                size,
                sortBy: sortBy || props.defaultSortBy,
                descending: props.descending || descending,
              },
            };
          }
        }
        // 自定義 API Request params
        else {
          params = props.actionPayload;
        }
        //#endregion

        //#region 數據請求
        try {
          // 使用 store 的 dispatch action
          if (!_.isEmpty(props.action)) {
            // TODO: 評估是否不要依賴於 store
            // this.$store
            //   .dispatch(props.action, params)
            //   .then(res => handleResponse(res))
            //   .catch(error => {
            //     throw error;
            //   });
          }
          // 使用傳入的 api fuction
          else if (_.isFunction(props.api)) {
            props
              .api(params)
              .then((res: any) => handleResponse(res))
              .catch((error: Error) => {
                throw error;
              });
          }

          const handleResponse = (res: any) => {
            loading_.value = false;
            list.value = _.get(res, props.responseField);

            context.emit('update', list.value);
            context.emit('update:loading', false);
            context.emit('requested', res);

            // 如果 actionPayload 是 null, 便由此組件更新 pagination
            if (_.isNull(props.actionPayload)) {
              // 更新 pagination
              pagination.value.rowsNumber = _.get(res, 'totalElements');
              pagination.value.rowsPerPage = _.get(res, 'size');
              pagination.value.page = Number(_.get(res, 'number')) + 1;

              // 將搜索條件更新到 URL
              $router
                .replace({
                  path: $router.currentRoute.value.path,
                  query: queryToUrl(res) as LocationQueryRaw,
                })
                .catch(() => {});
            }
          };
        } catch (error) {
          console.error('request', error);
          context.emit('update:loading', false);
          loading_.value = false;
        }
        //#endregion
      }
      //#endregion

      //#region 手動處理數據請求
      // 如果使用手動數據請求, 強烈建議使用原生 q-table 自行處理
      else {
        context.emit('update:loading', false);
        loading_.value = false;
      }
      //#endregion
    };

    /**
     * 將 URL 參數轉為 filter 查詢物件
     */
    const queryFromUrl = () => {
      // Initial pagination
      paginationType_.value = _.extend(paginationType_.value, props.paginationType);
      pagination.value = _.extend(pagination.value, _.pick($route.query, paginationType_.value));

      // Initial filter
      filterShadow.value = { ...props.filter };

      filterType_.value = _.extend(filterType_.value, props.filterType);

      // Recovery filter from url
      const filterFromUrl = _.omit($route.query, paginationType_.value);

      if (_.keys(filterFromUrl).length > 0) {
        // Convert filter type from url query
        const filter = {
          ...props.filter,
          ..._.chain(filterFromUrl)
            .reduce((result, value, key) => {
              // Transform string boolean
              if (['true', 'false'].includes(value)) {
                return _.extend(result, { [key]: value === 'true' || false });
              }
              // Transform pure boolean,
              if (filterType_.value.Boolean.includes(value)) {
                return _.extend(result, { [key]: !!value });
              }
              // Transform number
              if (filterType_.value.Number.includes(key)) {
                return _.extend(result, { [key]: Number(value) });
              }
              // Transform string
              if (filterType_.value.String.includes(key)) {
                return _.extend(result, { [key]: String(value) });
              }
              // Transform array of number
              if (filterType_.value.ArrayOfNumber.includes(key)) {
                return _.isEmpty(value)
                  ? result
                  : _.extend(result, { [key]: (value as string).split(',').map(v => Number(v)) });
              }
              // Transform array of number
              if (filterType_.value.ArrayOfString.includes(key)) {
                return _.isEmpty(value)
                  ? result
                  : _.extend(result, { [key]: (value as string).split(',').map(v => String(v)) });
              }
              // Transform array of boolean
              if (filterType_.value.ArrayOfBoolean.includes(key)) {
                return _.isEmpty(value)
                  ? result
                  : _.extend(result, {
                      [key]: (value as string).split(',').map(v => v === 'true' || false),
                    });
              }
              // Unmatch or unset filter type
              // console.warn('queryFromUrl: transform default query', key, value);
              return _.extend(result, { [key]: value });
            }, {})
            .value(),
        };

        // 將 URL 的搜尋條件暫存
        filterPrev.value = { ...filter };

        context.emit('update:filter', filter);
      }
    };
    /**
     * 將 filter 查詢結果保存至 URL
     */
    const queryToUrl = (result: any) => {
      return _.extend(
        _.extend({}, !_.get(result, 'first') && _.pick(pagination.value, paginationType_.value)),
        _.chain(props.filter)
          .reduce((result, value, key) => {
            // console.warn('queryToUrl', key, value, this.filterShadow[key]);
            if (_.isEqual(value, _.get(filterShadow.value, key))) return result;
            if (_.isArray(value)) return _.extend(result, { [key]: value.join(',') });
            return _.extend(result, { [key]: value });
          }, {})
          .value()
      );
    };

    const select = (target: any) => {
      if (_.hasIn(target, `row.${props.rowKey}`)) {
        const select = _.findIndex(selectIds.value, [props.rowKey, target.row[props.rowKey]]);
        if (select > -1) {
          selectIds.value.splice(select);
        } else {
          selectIds.value.push(target.row);
        }
      }
    };

    const clearSelect = () => {
      selectIds.value = [];
    };

    onMounted(() => {
      queryFromUrl();
      // Request after event emitter
      nextTick(request);
    });

    watch(pagination.value, val => _.set(pagination.value, 'sortBy', val));

    watch(selectIds.value, val => context.emit('update:selected', val));

    return {
      table,
      filterShadow,
      filterType_,
      filterPrev, // Previous filter
      list, // Default datas from v-model
      pagination,
      pagination_,
      sortMap_,
      sortByPrev, // 前一次用戶點擊排序的欄位
      paginationType_,
      loading_,
      selectIds,

      // Methods
      onRemoveSort,
      request,
      queryFromUrl,
      queryToUrl,
      select,
      clearSelect,
    };
  },
});
</script>

<style lang="scss" scoped>
@import 'quasar/src/css/variables.sass';

:deep(.q-table) {
  & thead {
    th {
      color: #000;
      font-size: 14px;
      font-weight: 700;
      border-color: $grey-12;
    }
  }
  & tbody {
    tr {
      & td {
        color: $grey-8;
        font-size: 14px;
        font-weight: 400;
        border-color: $grey-11;
        a {
          color: var(--q-primary);
        }
      }
    }
  }
}
:deep(.q-table__bottom) {
  border-color: $grey-11;
}
</style>
