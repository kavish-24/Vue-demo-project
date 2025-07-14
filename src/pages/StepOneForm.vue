<template>
  <q-form @submit.prevent="submit" class="q-gutter-md">
    <q-input v-model="form.username" label="Username" :rules="[val => !!val || 'Required']" />
    <q-input v-model="form.fullName" label="Full Name" :rules="[val => !!val || 'Required']" />
    <q-input v-model="form.email" label="Email" :rules="[val => /.+@.+\..+/.test(val) || 'Invalid Email']" />
    <q-input v-model="form.phone" label="Phone" mask="##########" :rules="[val => val.length === 10 || '10 digits']" />

    <q-btn type="submit" label="Next" color="primary" />
  </q-form>
</template>

<script >
import { reactive } from 'vue'
export default {
  name: 'StepOneForm',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  emits: ['next', 'update-user'],
  setup(props, { emit }) {
    const form = reactive({ ...props.user })

    function submit() {
      emit('update-user', { ...form })
      emit('next')
    }

    return { form, submit }
  }
}

</script>
