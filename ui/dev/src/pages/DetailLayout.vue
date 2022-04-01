<template>
  <q-page padding>
    <DetailLayout title="DetailLayout Example" search>
      <template #navs>
        navs
        <!-- Add some templates -->
      </template>

      <template #navs-buttons>
        <q-btn unelevated color="primary" label="Button" />
        <!-- Add some templates -->
      </template>

      <template #buttons>
        buttons
        <!-- Add some templates -->
      </template>

      <template #section-left>
        section-left
        <!-- Add some templates -->
      </template>

      <template #section-right>
        section-right
        <!-- Add some templates -->
      </template>

      <template #section-bottom>
        section-bottom
        <!-- Add some templates -->
      </template>
    </DetailLayout>

    <DetailLayout title="DetailLayout Example" search :top-rows="{ md: [6, 6], lg: [7, 5] }">
      <template #navs>
        navs
        <!-- Add some templates -->
      </template>

      <template #navs-buttons>
        <q-btn unelevated color="primary" label="Button" />
        <!-- Add some templates -->
      </template>

      <template #buttons>
        buttons
        <!-- Add some templates -->
      </template>

      <template #section-left>
        section-left
        <!-- Add some templates -->
      </template>

      <template #section-right>
        section-right
        <!-- Add some templates -->
      </template>

      <template #section-bottom>
        section-bottom
        <!-- Add some templates -->
      </template>
    </DetailLayout>
  </q-page>
</template>
