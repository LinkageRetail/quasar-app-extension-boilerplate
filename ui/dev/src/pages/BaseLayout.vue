<template>
  <q-page padding class="bg-grey-11">
    <BaseLayout title="BaseLayout Example">
      <template #buttons>
        <q-btn
          unelevated
          dense
          style="height: 32px"
          class="q-px-md"
          color="primary"
          label="Button"
        />
        <!-- Add some templates -->
      </template>

      <template #search>
        search
        <!-- Add some templates -->
      </template>

      <template #content>
        content
        <!-- Add some templates -->
      </template>
    </BaseLayout>
  </q-page>
</template>
