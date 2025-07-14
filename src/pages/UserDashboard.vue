<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card class="q-pa-lg" style="max-width: 500px; width: 100%">
      <q-card-section>
        <div class="text-h6">👤 Welcome {{ user.fullName }} ({{ user.designation }})</div>
      </q-card-section>

      <q-separator color="black"/>

      <q-card-section>
        <q-item>
          <q-item-section>
            <q-item-label><b>Username:</b></q-item-label>
            <q-item-label caption>{{ user.username }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label><b>Full Name:</b></q-item-label>
            <q-item-label caption>{{ user.fullName }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label><b>Email:</b></q-item-label>
            <q-item-label caption>{{ user.email }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label><b>Phone:</b></q-item-label>
            <q-item-label caption>{{ user.phone }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label><b>Designation:</b></q-item-label>
            <q-item-label caption>{{ user.designation }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item v-if="user.designation === 'user'">
          <q-item-section>
            <q-item-label><b>User ID:</b></q-item-label>
            <q-item-label caption>{{ user.userId }}</q-item-label>
          </q-item-section>
        </q-item>
      <q-item>
  <q-item-section>
    <q-item-label><b>Password:</b></q-item-label>
    <q-item-label caption>
      {{ isPwdVisible ? user.password : '••••••••' }}
    </q-item-label>
  </q-item-section>

  <q-item-section side>
    <q-icon
      :name="isPwdVisible ? 'visibility' : 'visibility_off'"
      class="cursor-pointer"
      @click="isPwdVisible = !isPwdVisible"
    />
  </q-item-section>
</q-item>

       
      </q-card-section>

      <q-separator color="black"/>

      <q-card-actions align="center">
  <q-btn label="Edit Profile" icon="edit" color="primary" @click="editUser(user)" />
  <q-btn label="Logout" color="negative" @click="logout" />
</q-card-actions>
    </q-card>
    <q-dialog v-model="editDialog">
      <q-card style="min-width: 400px">
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
 
  </q-page>
  
</template>

<script>
import { useUserStore } from 'stores/user'
import { useRouter } from 'vue-router'

export default {
  name: 'UserDashboard',
  data() {
    return {
      isPwdVisible: false,
      isFormPwdVisible: false,
      editDialog: false,
      editUserData: {
        username: '',
        fullName: '',
        email: '',
        phone: '',
        designation: '',
        userId: '',
        password: ''
      }
    }
  },
  computed: {
    userStore() {
      return useUserStore()
    },
    user() {
      return this.userStore.currentUser
    }
  },
  methods: {
    editUser(user) {
      this.editUserData = { ...user }
      this.editDialog = true
    },
    saveUserEdit() {
      const index = this.userStore.users.findIndex(u => u.username === this.editUserData.username)
      if (index !== -1) {
        this.userStore.users.splice(index, 1, { ...this.editUserData })
        if (this.userStore.currentUser.username === this.editUserData.username) {
          this.userStore.currentUser = { ...this.editUserData }
        }
      }
      this.editDialog = false
    },
    logout() {
      this.userStore.logout()
      this.$router.push('/')
    }
  },
  mounted() {
    this.router = useRouter()
  }
}
</script>
