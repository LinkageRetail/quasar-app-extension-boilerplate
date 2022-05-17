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
            v-model="form.username"
            :rules="[val => (val && val.length > 0) || 'Please input Email Address']"
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
            :type="loginIsPwd ? 'password' : 'text'"
            autocomplete="off"
            placeholder="Password (compulsory)"
            v-model="form.password"
            @keyup.enter="$emit('login', form)"
            :rules="[val => (val && val.length > 0) || 'Please input Password']"
          >
            <template #prepend>
              <q-icon name="o_lock" />
            </template>
            <template #append>
              <q-icon
                :name="loginIsPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="loginIsPwd = !loginIsPwd"
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
          :color="buttonColor"
          label="Login"
          @click="$emit('login', form)"
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
          v-model="email"
          :rules="[val => (val && val.length > 0) || 'Please input Email Address']"
        >
          <template #prepend>
            <q-icon name="o_email" />
          </template>
        </q-input>
        <q-btn
          unelevated
          class="q-mt-lg q-px-lg text-capitalize"
          :color="buttonColor"
          label="Request reset password"
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
        @submit="$emit('resetPassword', reset)"
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
          v-model="reset.newPassword"
          :type="isPwd.newPwd ? 'password' : 'text'"
          :rules="[val => (val && val.length > 0) || 'Please input new password']"
        >
          <template #prepend>
            <q-icon name="o_lock" />
          </template>
          <template #append>
            <q-icon
              :name="isPwd.newPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd.newPwd = !isPwd.newPwd"
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
          v-model="reset.rePassword"
          placeholder="Enter Confirm Password"
          :type="isPwd.rePwd ? 'password' : 'text'"
          :rules="[
            val => (val && val.length > 0) || 'Please input confirm password',
            val => val === reset.newPassword || 'Confirm password must be same as the new password',
          ]"
        >
          <template #prepend>
            <q-icon name="o_lock" />
          </template>
          <template #append>
            <q-icon
              :name="isPwd.rePwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd.rePwd = !isPwd.rePwd"
            />
          </template>
        </q-input>

        <q-input
          name="username"
          autocomplete="username"
          style="opacity: 0"
          :value="form.username"
          hidden
        />

        <q-btn
          unelevated
          no-caps
          color="grey-9"
          type="submit"
          style="width: 120px; color: #ffc119"
          class="q-mt-lg q-px-lg"
        >
          Reset
        </q-btn>
      </q-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
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
  },
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      forget: false,
      email: '',
      loginModel: 'LOGIN',
      loginIsPwd: true,
      isPwd: {
        newPwd: true,
        rePwd: true,
      },
      resetError1: '',
      resetError2: '',
      reset: {
        newPassword: '',
        rePassword: '',
      },
    };
  },
  watch: {
    modelType(val) {
      this.loginModel = val;
    },
  },
};
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
