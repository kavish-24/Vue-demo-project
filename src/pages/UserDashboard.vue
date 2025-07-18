<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card class="q-pa-lg" style="max-width: 600px; width: 100%">
      <q-card-section>
        <div class="text-h6 text-primary text-center">
          👤 Welcome {{ user.fullName }} ({{ user.designation }})
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="q-gutter-sm">
          <div class="row q-col-gutter-md">
            <div class="col-6"><b>Username:</b></div>
            <div class="col-6">{{ user.username }}</div>

            <div class="col-6"><b>Full Name:</b></div>
            <div class="col-6">{{ user.fullName }}</div>

            <div class="col-6"><b>Email:</b></div>
            <div class="col-6">{{ user.email }}</div>

            <div class="col-6"><b>Phone:</b></div>
            <div class="col-6">{{ user.phone }}</div>

            <div class="col-6"><b>Designation:</b></div>
            <div class="col-6">{{ user.designation }}</div>

            <div class="col-6"><b>User ID:</b></div>
            <div class="col-6">{{ user.userId }}</div>

            <div class="col-6"><b>Password:</b></div>
            <div class="col-6 row items-center">
              {{ isPwdVisible ? user.password : '••••••••' }}
              <q-icon
                :name="isPwdVisible ? 'visibility' : 'visibility_off'"
                class="cursor-pointer q-ml-sm"
                @click="isPwdVisible = !isPwdVisible"
              />
            </div>
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="center">
        <q-btn label="Edit Profile" icon="edit" color="primary" @click="editUser(user)" />
        <q-btn label="Logout" color="negative" @click="logout" />
      </q-card-actions>
    </q-card>

 
    <q-dialog v-model="editDialog">
      <q-card style="width: 100%; max-width: 500px;">
        <q-card-section class="text-h6 text-primary">
          ✏️ Edit Profile
        </q-card-section>

        <q-separator />

        <q-card-section class="q-gutter-md">
          <q-input v-model="editUserData.fullName" label="Full Name" filled />
          <q-input v-model="editUserData.email" label="Email" filled />
          <q-input v-model="editUserData.phone" label="Phone" filled />
          
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
