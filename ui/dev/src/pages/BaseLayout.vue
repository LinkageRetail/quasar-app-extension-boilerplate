<template>
  <q-page padding>
    <BaseLayout title="BaseLayout Example" search>
      <template #navs>
        <div>navs1</div>
        <div>navs2</div>
        <div>navs3</div>
        <!-- Add some templates -->
      </template>

      <template #buttons>
        <q-btn unelevated color="primary" label="Button" />
        <!-- Add some templates -->
      </template>

      <template #search>
        <div class="col-12 col-sm-4 col-md-3 q-gutter-y-xs">search</div>
        <!-- Add some templates -->
      </template>

      <template #content>
        content
        <!-- Add some templates -->
      </template>
    </BaseLayout>
  </q-page>
</template>
