<template>
  <q-page>
    <Login
      section-left-class="bg-primary"
      title="Ekbuy CMS"
      subtitle="BACKEND MANAGEMENT SYSTEM"
      version="Version: 1.0.0"
      :model-type="type"
      @login="onLogin"
      @sendEmail="onSendEmail"
      @resetPassword="onResetPassword"
    />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const type = ref('');
    return {
      type,
      onLogin(form: { username: string; password: string }) {
        console.log('onLogin');
        console.log(form);
      },
      onSendEmail(email: string) {
        console.log('onSendEmail');
        console.log(email);
        type.value = 'RESET';
      },
      onResetPassword(form: { newPassword: string; rePassword: string }) {
        console.log('onResetPassword');
        console.log(form);
      },
    };
  },
});
</script>
