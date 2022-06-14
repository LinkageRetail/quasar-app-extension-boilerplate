<template>
  <q-page>
    <Login
      section-left-class="bg-primary"
      title="Ekbuy CMS"
      subtitle="BACKEND MANAGEMENT SYSTEM"
      version="Version: 1.0.0"
      account-placeholder="Email Address"
      password-placeholder="Password"
      :model-type="type"
      @login="login"
      @sendEmail="sendEmail"
      @resetPassword="resetPassword"
    />
  </q-page>
</template>
<script>
export default {
  data() {
    return {
      type: '',
    };
  },
  methods: {
    login(val) {
      console.log('login');
      console.log(val);
    },
    sendEmail(val) {
      console.log('sendEmail');
      console.log(val);
      this.type = 'RESET';
    },
    resetPassword(val) {
      console.log('resetPassword');
      console.log(val);
    },
  },
};
</script>
