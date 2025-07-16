<template>
  <q-card style="min-width: 400px">
    <q-card-section>
      <div class="text-h6">Edit User</div>
    </q-card-section>

    <q-card-section>
      <q-input v-model="editUserData.username" label="Username" filled />
      <q-input v-model="editUserData.fullName" label="Full Name" filled />
      <q-input v-model="editUserData.email" label="Email" filled />
      <q-input v-model="editUserData.phone" label="Phone" filled />

      <!-- Uneditable Designation -->
      <q-input
        v-model="editUserData.designation"
        label="Designation"
        filled
        disable
      />

      <!-- Uneditable User ID (Only if user) -->
      <q-input
        v-if="editUserData.designation === 'user'"
        v-model="editUserData.userId"
        label="User ID"
        filled
        disable
      />

      <!-- Toggleable Password Field -->
      <q-input
        v-model="editUserData.password"
        :type="isPwdVisible ? 'text' : 'password'"
        label="Password"
        filled
      >
        <template v-slot:append>
          <q-icon
            :name="isPwdVisible ? 'visibility' : 'visibility_off'"
            class="cursor-pointer"
            @click="isPwdVisible = !isPwdVisible"
          />
        </template>
      </q-input>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="Cancel" color="primary" v-close-popup />
      <q-btn flat label="Save" color="positive" @click="saveEdit" />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: 'EditUserDialog',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editUserData: { ...this.user },
      isPwdVisible: false
    }
  },
  methods: {
    saveEdit() {
      this.$emit('save', { ...this.editUserData })
    }
  }
}
</script>
