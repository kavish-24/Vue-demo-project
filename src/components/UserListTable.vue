<template>
  <div class="user-table q-pa-md">
    <div class="row items-center q-mb-md">
      <div class="text-h6 text-primary">👥 All Users</div>
      <q-space />
      <q-input
        v-model="search"
        filled
        dense
        debounce="200"
        placeholder="Search by username, email, or user ID..."
        class="q-ml-sm"
        prepend-inner-icon="search"
        clearable
        style="max-width: 300px"
      />
    </div>

    <q-table
      :rows="filteredUsers"
      :columns="columns"
      row-key="username"
      flat
      bordered
      dense
      :pagination="{ rowsPerPage: 5 }"
      class="shadow-1"
    >
      <template v-slot:body-cell-actions="props">
        <q-td align="center">
          <q-btn dense flat round icon="edit" color="primary" @click="editUser(props.row)" />
          <q-btn dense flat round icon="delete" color="negative" @click="deleteUser(props.row.username)" />
        </q-td>
      </template>
    </q-table>

    <!-- Edit Dialog -->
    <q-dialog v-model="editDialog" persistent>
      <q-card style="min-width: 400px; max-width: 90vw">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">✏️ Edit User</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-separator />

        <q-card-section class="q-gutter-md">
          <q-input v-model="editUserData.username" label="Username" filled readonly />
          <q-input v-model="editUserData.fullName" label="Full Name" filled />
          <q-input v-model="editUserData.email" label="Email" filled />
          <q-input v-model="editUserData.phone" label="Phone" filled />
          <q-input v-model="editUserData.designation" label="Designation" filled readonly />

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

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Save" color="positive" @click="saveUserEdit" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>


<script>
import { useUserStore } from 'src/stores/user.js'
import { useRouter } from 'vue-router'

export default {
  name: 'UserListTable',

  data() {
    return {
      search: '',
      editDialog: false,
      isPwdVisible: false,
      editUserData: {
        username: '',
        fullName: '',
        email: '',
        phone: '',
        designation: '',
        userId: '',
        password: '',
        
      },
      columns: [
        { name: 'username', label: 'Username', field: 'username', align: 'left' },
        { name: 'fullName', label: 'Full Name', field: 'fullName', align: 'left' },
        { name: 'email', label: 'Email', field: 'email', align: 'left' },
        { name: 'phone', label: 'Phone', field: 'phone', align: 'left' },
        { name: 'designation', label: 'Designation', field: 'designation', align: 'left' },
        { name: 'userId', label: 'User ID', field: 'userId', align: 'left' },
        { name: 'password', label: 'Password', field: 'password', align: 'left' },
        { name: 'actions', label: 'Actions', field: 'actions', align: 'center' }
      ],
      
    }
  },

  computed: {
    userStore() {
      return useUserStore()
    },
    filteredUsers() {
    const text = this.search
    return this.userStore.users.filter(user => {
      return (
        user.email?.toLowerCase().includes(text) ||
        user.username?.toLowerCase().includes(text) ||
        user.userId?.toLowerCase().includes(text)
      )
    })
  }
  },

  methods: {
    deleteUser(username) {
      const confirmDelete = window.confirm(`Are you sure you want to delete ${username}?`)
      if (confirmDelete) {
        this.userStore.users = this.userStore.users.filter(u => u.username !== username)
      }
    },

    editUser(user) {
      this.editUserData = { ...user }
      this.editDialog = true
    },

    saveUserEdit() {
      const index = this.userStore.users.findIndex(u => u.username === this.editUserData.username)
      if (index !== -1) {
        this.userStore.users[index] = { ...this.editUserData }
      }
      this.editDialog = false
    }
  },

  mounted() {
    const router = useRouter()
    if (!this.userStore.currentUser) {
      router.push('/')
    }
  }
}
</script>

<style scoped>
.user-table {
  margin-top: 24px;
}
</style>
