<template>
  <Login loginLabel="登入" @login="onLogin">
    <template #logo>
      <div class="text-center q-py-lg">Logo</div>
    </template>
    <template #bottom-center>
      <section class="q-gutter-y-md">
        <div>BACKEND MANAGEMENT SYSTEM</div>
        <div>Version : 0.0.1</div>
      </section>
    </template>
  </Login>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      onLogin(form: { username: string; password: string }) {
        console.log('onLogin');
        console.log(form);
      },
      // onSendEmail(email: string) {
      //   console.log('onSendEmail');
      //   console.log(email);
      //   type.value = 'RESET';
      // },
      // onResetPassword(form: { newPassword: string; rePassword: string }) {
      //   console.log('onResetPassword');
      //   console.log(form);
      // },
    };
  },
});
</script>
