<template>
  <q-form @submit.prevent="submit" class="q-gutter-md q-pa-sm">

    <div class="text-subtitle1 text-bold text-primary q-mb-md">
      Step 1: Basic Information
    </div>

    <q-input
      v-model="form.username"
      label="Username"
      filled
      :rules="[val => !!val || 'Required', checkUsernameUnique]"
      lazy-rules
    />

    <q-input
      v-model="form.fullName"
      label="Full Name"
      filled
      :rules="[val => !!val || 'Required']"
      lazy-rules
    />

    <q-input
      v-model="form.email"
      label="Email"
      filled
      :rules="[val => !!val || 'Required', val => /.+@.+\..+/.test(val) || 'Invalid Email', checkEmailUnique]"
      lazy-rules
    />

    <q-input
      v-model="form.phone"
      label="Phone"
      filled
      mask="##########"
      :rules="[val => val.length === 10 || 'Enter 10 digits']"
      lazy-rules
    />

    <div class="row justify-end">
      <q-btn type="submit" label="Next" color="primary" icon="arrow_forward" />
    </div>

  </q-form>
</template>


<script>
import { reactive } from 'vue'
import { useUserStore } from 'src/stores/user'

export default {
  name: 'StepOneForm',

  props: {
    user: {
      type: Object,
      required: true
    }
  },

  emits: ['next', 'update-user'],

  data() {
    return {
      form: { ...this.user },
      userStore: useUserStore()
    }
  },

  methods: {
    checkUsernameUnique(val) {
      if (!val) return 'Required'
      const exists = this.userStore.users.some(
        u => u.username === val && u.username !== this.user.username
      )
      return exists ? 'Username already exists' : true
    },

    checkEmailUnique(val) {
      if (!val) return 'Required'
      const exists = this.userStore.users.some(
        u => u.email === val && u.email !== this.user.email
      )
      return exists ? 'Email Already Registered' : true
    },

    submit() {
      this.$emit('update-user', { ...this.form })
      this.$emit('next')
    }
  }
}
</script>

