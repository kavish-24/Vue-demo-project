<template>
  <q-form @submit.prevent="submit" class="q-gutter-md">
    <q-input v-model="form.designation " :options="['admin', 'user']" label="Designation" :rules="[val => !!val || 'Required']" />

    <q-input 
             v-model="form.userId" 
             label="User ID" 
             type="number"
             :rules="[val => Number.isInteger(+val) || 'Must be an integer']" />

    <q-btn type="submit" label="Next" color="primary" />
  </q-form>
</template>

<script setup>
import { reactive } from 'vue'
const emit = defineEmits(['next', 'update-user'])
const props = defineProps(['user'])

const form = reactive({ ...props.user })

function submit() {
  emit('update-user', { ...form })
  emit('next')
}
</script>
