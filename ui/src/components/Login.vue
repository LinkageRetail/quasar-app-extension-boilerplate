<template>
  <q-page>
    <div class="fixed-center" style="width: 300px">
      <!-- LOGO -->
      <section>
        <slot name="logo" />
      </section>

      <!-- Input -->
      <section class="q-gutter-y-md">
        <!-- Username -->
        <FieldInput
          outlined
          required
          prependIcon="o_person"
          bgColor="bg-white"
          :placeholder="usernameLabel"
          v-model="formLogin.username"
        />
        <!-- Password -->
        <FieldInput
          outlined
          required
          prependIcon="o_lock"
          bgColor="bg-white"
          :placeholder="passwordLabel"
          v-model="formLogin.password"
        />
      </section>

      <!-- Btn -->
      <section class="q-mt-lg">
        <q-btn
          unelevated
          no-caps
          dense
          type="submit"
          class="full-width q-px-md bg-primary text-white text-body2"
          style="height: 32px; border-radius: 5px"
          :label="loginLabel"
          :loading="loadingLogin"
          @click="$emit('login', formLogin)"
        />
      </section>
    </div>
    <div class="fixed-bottom text-center text-caption text-grey-5" style="margin-bottom: 80px">
      <slot name="bottom-center" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { QPage, QBtn } from 'quasar';

export default defineComponent({
  name: 'Login',
  components: { QPage, QBtn },

  emits: ['login'],
  props: {
    loadingLogin: {
      type: Boolean,
      default: false,
    },
    loginLabel: {
      type: String,
      default: 'LOGIN',
    },
    usernameLabel: {
      type: String,
      default: 'Username',
    },
    passwordLabel: {
      type: String,
      default: 'Password',
    },
  },
  setup() {
    const formLogin = reactive({
      username: '',
      password: '',
    });

    return {
      formLogin,
    };
  },
});
</script>
