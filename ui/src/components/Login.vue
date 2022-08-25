<template>
  <div class="form-container fixed-center row">
    <div class="col-4 bg-primary flex items-center" :class="sectionLeftClass">
      <!-- Section Left -->
      <div class="text-center full-width text-white">
        <slot name="logo" />
        <div class="text-h5 text-weight-bold q-mt-xs">{{ title }}</div>
        <div class="text-caption text-weight-medium q-mt-xs">{{ subtitle }}</div>
        <div class="text-caption text-weight-medium q-mt-xl">{{ version }}</div>
      </div>
    </div>
    <div class="col-8 q-pa-xl bg-white" :class="sectionRightClass">
      <!-- login -->
      <q-form v-show="loginModel === 'LOGIN'">
        <div
          class="text-h5 text-weight-medium text-primary"
          style="letter-spacing: 1px"
          :style="{ color: titleColor }"
        >
          Login to CMS
        </div>
        <div
          class="text-subtitle1 text-weight-regular text-grey-6"
          :style="{ color: subtitleColor }"
        >
          Sign in to your account
        </div>
        <section class="q-mb-md">
          <q-input
            dense
            square
            outlined
            class="q-mt-lg"
            name="username"
            type="text"
            placeholder="Email Address (compulsory)"
            :rules="[(val:any) => (val && val.length > 0) || 'Please input Email Address']"
            v-model="formLogin.username"
          >
            <template #prepend>
              <q-icon name="person_outline" />
            </template>
          </q-input>

          <q-input
            dense
            square
            outlined
            class="q-mt-md"
            name="username"
            autocomplete="off"
            placeholder="Password (compulsory)"
            :type="visiblePwd ? 'password' : 'text'"
            :rules="[(val:any) => (val && val.length > 0) || 'Please input Password']"
            @keyup.enter="$emit('login', formLogin)"
            v-model="formLogin.password"
          >
            <template #prepend>
              <q-icon name="o_lock" />
            </template>
            <template #append>
              <q-icon
                class="cursor-pointer"
                :name="visiblePwd ? 'visibility_off' : 'visibility'"
                @click="visiblePwd = !visiblePwd"
              />
            </template>
          </q-input>
        </section>
        <div class="q-mt-md flex justify-end">
          <div
            class="cursor-pointer text-grey-8"
            :style="{ color: captionColor }"
            @click="loginModel = 'FORGET'"
          >
            I forget password
          </div>
        </div>
        <q-btn
          unelevated
          class="q-mt-lg q-px-lg"
          label="Login"
          :loading="loadingLogin"
          :color="buttonColor"
          @click="$emit('login', formLogin)"
        />
      </q-form>

      <!-- forget password -->
      <q-form v-show="loginModel === 'FORGET'" class="full-height">
        <div
          class="text-h5 text-weight-medium text-primary"
          style="letter-spacing: 1px"
          :style="{ color: titleColor }"
        >
          Forget your password !
        </div>
        <div
          class="text-subtitle1 text-weight-regular text-grey-6"
          :style="{ color: subtitleColor }"
        >
          Enter the email address you see and you will recevie an email containing a link for
          changing your password.
        </div>
        <q-input
          dense
          square
          outlined
          autofocus
          class="q-mt-lg"
          name="username"
          type="text"
          placeholder="Email Address"
          :rules="[(val:any) => (val && val.length > 0) || 'Please input Email Address']"
          v-model="email"
        >
          <template #prepend>
            <q-icon name="o_email" />
          </template>
        </q-input>
        <q-btn
          unelevated
          class="q-mt-lg q-px-lg text-capitalize"
          label="Request reset password"
          :loading="loadingForget"
          :color="buttonColor"
          @click="$emit('sendEmail', email)"
        />
        <div class="absolute-bottom text-right text-grey-8" :style="{ color: captionColor }">
          <q-icon name="arrow_back_ios" />
          <div class="cursor-pointer inline-block" @click="loginModel = 'LOGIN'">Back</div>
        </div>
      </q-form>

      <!-- Reset Password -->
      <q-form
        v-show="loginModel === 'RESET'"
        class="forget-box"
        @submit="$emit('resetPassword', formReset)"
      >
        <div class="text-h5 text-weight-medium" style="letter-spacing: 1px">Reset Password</div>

        <q-input
          dense
          borderless
          square
          outlined
          class="q-mt-lg"
          name="new-password"
          autocomplete="new-password"
          placeholder="Enter New Password"
          :type="visible.newPwd ? 'password' : 'text'"
          :rules="[(val:any) => (val && val.length > 0) || 'Please input new password']"
          v-model="formReset.newPassword"
        >
          <template #prepend>
            <q-icon name="o_lock" />
          </template>
          <template #append>
            <q-icon
              class="cursor-pointer"
              :name="visible.newPwd ? 'visibility_off' : 'visibility'"
              @click="visible.newPwd = !visible.newPwd"
            />
          </template>
        </q-input>

        <q-input
          dense
          borderless
          square
          outlined
          class="q-mt-sm"
          name="new-password"
          autocomplete="new-password"
          placeholder="Enter Confirm Password"
          :type="visible.rePwd ? 'password' : 'text'"
          :rules="[
            (val:any) => (val && val.length > 0) || 'Please input confirm password',
            (val:any) =>
              val === formReset.newPassword || 'Confirm password must be same as the new password',
          ]"
          v-model="formReset.rePassword"
        >
          <template #prepend>
            <q-icon name="o_lock" />
          </template>
          <template #append>
            <q-icon
              class="cursor-pointer"
              :name="visible.rePwd ? 'visibility_off' : 'visibility'"
              @click="visible.rePwd = !visible.rePwd"
            />
          </template>
        </q-input>

        <q-input
          name="username"
          autocomplete="username"
          hidden
          style="opacity: 0"
          :model-value="formLogin.username"
        />

        <q-btn
          unelevated
          no-caps
          color="grey-9"
          type="submit"
          class="q-mt-lg q-px-lg"
          style="width: 120px; color: #ffc119"
          :loading="loadingReset"
        >
          Reset
        </q-btn>
      </q-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch } from 'vue';
import { QForm, QInput, QBtn, QIcon } from 'quasar';

export default defineComponent({
  name: 'Login',
  components: { QForm, QInput, QBtn, QIcon },
  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    version: {
      type: String,
      default: '',
    },
    sectionLeftClass: {
      type: String,
      default: '',
    },
    sectionRightClass: {
      type: String,
      default: '',
    },
    buttonColor: {
      type: String,
      default: 'grey-9',
    },
    modelType: {
      type: String,
      default: '',
    },
    titleColor: {
      type: String,
      default: '',
    },
    subtitleColor: {
      type: String,
      default: '',
    },
    captionColor: {
      type: String,
      default: '',
    },
    loadingLogin: {
      type: Boolean,
      default: false,
    },
    loadingForget: {
      type: Boolean,
      default: false,
    },
    loadingReset: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const formLogin = reactive({
      username: '',
      password: '',
    });

    const formReset = reactive({
      newPassword: '',
      rePassword: '',
    });

    const forget = ref(false);

    const email = ref('');

    const loginModel = ref('LOGIN');

    const visiblePwd = ref(true);

    const visible = reactive({
      newPwd: true,
      rePwd: true,
    });

    watch(
      () => props.modelType,
      value => (loginModel.value = value)
    );

    return {
      formLogin,
      formReset,
      forget,
      email,
      loginModel,
      visiblePwd,
      visible,
    };
  },
});
</script>

<style lang="scss" scoped>
.form-container {
  width: 800px;
  min-height: 450px;
  box-shadow: 2px 18px 48px -34px #242424;
}

:deep(.q-field__native) {
  padding: 6px;
}
</style>
