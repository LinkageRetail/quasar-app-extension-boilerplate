<template>
  <!-- Layout Design -->
  <!-- Link: https://linkage-retail.atlassian.net/l/c/C9JQnWWV -->
  <!-- Type: Type 1 -->

  <main class="wrapper">
    <!-- Header -->
    <section class="row items-center head">
      <!-- Props title -->
      <div class="title on-left text-weight-bold">{{ title }}</div>
      <nav class="navs" v-if="navs">
        <!-- Slot navs -->
        <slot name="navs" />
      </nav>
      <div class="buttons" v-if="buttons">
        <!-- Slot buttons -->
        <slot name="buttons" />
      </div>
    </section>

    <!-- Search -->
    <section class="search" v-if="search">
      <q-card flat bordered>
        <q-card-section
          class="row justify-between q-gutter-y-sm q-gutter-x-md search-section"
          :style="searchStyle"
        >
          <!-- Slot search -->
          <slot name="search" />
          <!-- Example -->
          <!-- <div class="col-12 col-sm-5 col-md-2 q-gutter-y-xs">
            <b>Memo Date</b>
            <FilterDate v-model="filter.memoDateStart" />
            <FilterDate v-model="filter.memoDateEnd" />
          </div> -->
          <div class="navs">
            <div @click="$emit('search')">{{ searchLabel }}</div>
          </div>
        </q-card-section>
      </q-card>
    </section>

    <!-- Content -->
    <section class="content">
      <!-- Slot default -->
      <slot />
      <!-- Slot content -->
      <slot name="content" />
    </section>
  </main>
</template>

<script>
export default {
  name: 'BaseLayout',
  props: {
    title: {
      type: String,
      default: '',
    },
    navs: {
      type: Boolean,
      default: true,
    },
    buttons: {
      type: Boolean,
      default: true,
    },
    search: {
      type: Boolean,
      default: false,
    },
    searchLabel: {
      type: String,
      default: 'filter',
    },
    searchStyle: {
      type: String,
      default: '',
      example: 'justify-content: space-between;',
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'quasar/src/css/variables.sass';

.wrapper {
  padding: 30px;
  color: $primary;
}
.head {
  position: relative;
  margin-bottom: 1.5rem;
  .title {
    font-size: 20px;
    border-bottom: 3px solid $primary;
  }
  .buttons {
    position: absolute;
    top: 0;
    right: 0;
    > button {
      margin-left: 0.5rem;
    }
  }
}
.search {
  position: relative;
  margin-bottom: 1rem;

  .search-section {
    // fix last item position to be left
    &::after {
      content: '';
      flex: auto;
    }
  }

  .navs {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
  }
}
</style>
