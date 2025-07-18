<template>
  <q-form @submit.prevent="submit" class="q-gutter-md q-pa-sm">

    <div class="text-subtitle1 text-bold text-primary q-mb-md">
      Step 2: User Details
    </div>

   
    <q-input
      v-model="form.designation"
      label="Designation"
      filled
      readonly
    />

    <q-input 
      v-model="form.userId" 
      label="User ID" 
      type="number"
      filled
      :rules="[
        val => !!val || 'Required',
        val => Number.isInteger(+val) || 'Must be an integer',
        checkUserIdUnique
      ]"
      lazy-rules
    />

  
    <div class="row justify-end">
      <q-btn type="submit" label="Next" color="primary" icon="arrow_forward" />
    </div>

  </q-form>
</template>


<script>
import { useUserStore } from 'src/stores/user'

export default {
  name: 'StepTwoForm',

  props: {
    user: {
      type: Object,
      required: true
    }
  },

  emits: ['next', 'update-user'],

  data() {
    return {
      form: {
        ...this.user,
        designation: this.user.designation || 'user'
      }
    }
  },

  computed: {
    userStore() {
      return useUserStore()
    }
  },

  methods: {
    checkUserIdUnique(val) {
      const exists = this.userStore.users.some(
        u => u.userId === val && u.username !== this.user.username
      )
      return exists ? 'User ID already exists' : true
    },

    submit() {
      this.$emit('update-user', { ...this.form })
      this.$emit('next')
    }
  }
}
</script>
