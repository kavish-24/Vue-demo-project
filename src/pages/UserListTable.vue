<template>
  <div class="user-table">
    <h2 class="q-mb-md">All Users</h2>
    <q-table
      :rows="userStore.users"
      :columns="columns"
      row-key="username"
      flat
      bordered
    >
      <template v-slot:body-cell-actions="props">
  <q-td align="center">
    <q-btn flat round icon="edit" color="primary" @click="editUser(props.row)" />
    <q-btn flat round icon="delete" color="negative" @click="deleteUser(props.row.username)" />
  </q-td>
</template>

    </q-table>
  </div>
  <q-dialog v-model="editDialog">
  <q-card style="min-width: 400px">
    <q-card-section>
      <div class="text-h6">Edit User</div>
    </q-card-section>

    <q-card-section>
      <q-input v-model="editUserData.username" label="Username" filled />
      <q-input v-model="editUserData.fullName" label="Full Name" filled />
      <q-input v-model="editUserData.email" label="Email" filled />
      <q-input v-model="editUserData.phone" label="Phone" filled />
      <q-select
        v-model="editUserData.designation"
        :options="['admin', 'user']"
        label="Designation"
        filled
      />
      <q-input
        v-if="editUserData.designation === 'user'"
        v-model="editUserData.userId"
        label="User ID"
        filled
      />
      <q-input
  v-model="editUserData.password"
  :type="isPwdVisible ? 'text' : 'password'"
  label="Password"
  filled>
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
      <q-btn flat label="Save" color="positive" @click="saveUserEdit" />
    </q-card-actions>
  </q-card>
</q-dialog>

</template>

<script setup>

import { ref } from 'vue'
import { useUserStore } from 'src/stores/user.js'
import { useRouter } from 'vue-router'


const isPwdVisible = ref(false)


const userStore = useUserStore()
const router = useRouter()

const columns = [
  { name: 'username', label: 'Username', field: 'username', align: 'left' },
  { name: 'fullName', label: 'Full Name', field: 'fullName', align: 'left' },
  { name: 'email', label: 'Email', field: 'email', align: 'left' },
  { name: 'phone', label: 'Phone', field: 'phone', align: 'left' },
  { name: 'designation', label: 'Designation', field: 'designation', align: 'left' },
  { name: 'userId', label: 'User ID', field: 'userId', align: 'left' },
  { name: 'password', label: 'Password', field: 'password', align: 'left' },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'center' }

]

// 🗑 Delete a user by username
function deleteUser(username) {
  const confirm = window.confirm(`Are you sure you want to delete ${username}?`)
  if (confirm) {
    userStore.users = userStore.users.filter(u => u.username !== username)
  }
}

// ✏ Redirect to edit user form (for now, you can show alert or route)
const editDialog = ref(false)
const editUserData = ref({
  username: '',
  fullName: '',
  email: '',
  phone: '',
  designation: '',
  userId: '',
  password:''
})

function editUser(user) {
  editUserData.value = { ...user }
  editDialog.value = true
}

function saveUserEdit() {
  const index = userStore.users.findIndex(u => u.username === editUserData.value.username)
  if (index !== -1) {
    userStore.users[index] = { ...editUserData.value }
  }
  editDialog.value = false
}
</script>


<style scoped>
.user-table {
  margin-top: 24px;
}
</style>
