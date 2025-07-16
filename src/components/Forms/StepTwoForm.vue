<template>
  <q-form @submit.prevent="submit" class="q-gutter-md q-pa-sm">

    <div class="text-subtitle1 text-bold text-primary q-mb-md">
      Step 2: User Details
    </div>

    <!-- Readonly Designation -->
    <q-input
      v-model="form.designation"
      label="Designation"
      filled
      readonly
    />

    <!-- User ID Input -->
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

    <!-- Next Button -->
    <div class="row justify-end">
      <q-btn type="submit" label="Next" color="primary" icon="arrow_forward" />
    </div>

  </q-form>
</template>


<script>
import { defineComponent, reactive } from 'vue'
import { useUserStore } from 'src/stores/user'

export default defineComponent({
  name: 'StepTwoForm',

  props: {
    user: {
      type: Object,
      required: true
    }
  },

  emits: ['next', 'update-user'],

  setup(props, { emit }) {
    const userStore = useUserStore()
    const form = reactive({ ...props.user })

    const checkUserIdUnique = (val) => {
      const exists = userStore.users.some(
        u => u.userId === val && u.username !== props.user.username
      )
      return exists ? 'User ID already exists' : true
    }

    const submit = () => {
      emit('update-user', { ...form })
      emit('next')
    }

    return {
      form,
      submit,
      checkUserIdUnique
    }
  }
})
</script>
