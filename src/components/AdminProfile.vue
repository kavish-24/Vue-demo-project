<template>
  <div class="q-pa-md">
    <div class="row items-center q-mb-sm">
      <div class="text-subtitle1 text-bold text-primary">👤 Profile</div>
      <q-space />
      <q-btn icon="close" dense flat round @click="$emit('close')" class="text-grey-7" />
    </div>

    <q-separator />
    <div class="text-center q-my-md">
      <q-avatar icon="account_circle" color="primary" text-color="white" size="56px" class="q-mb-sm" />
      <div class="text-h6 text-primary">{{ user.fullName }}</div>
      <div class="text-subtitle2">{{ user.designation }}</div>
    </div>

    <q-separator class="q-mb-md" />

    <div class="q-gutter-sm">
      <div><b>Username:</b> {{ user.username }}</div>
      <div><b>Full Name:</b> {{ user.fullName }}</div>
      <div><b>Email:</b> {{ user.email }}</div>
      <div><b>Phone:</b> {{ user.phone }}</div>
      <div><b>Designation:</b> {{ user.designation }}</div>
      <div class>
        <div><b>Password:</b> {{ isPwdVisible ? user.password : '••••••••' }} <q-icon
          :name="isPwdVisible ? 'visibility' : 'visibility_off'"
          class="cursor-pointer"
          @click="isPwdVisible = !isPwdVisible"
        /></div>       
      </div>
    </div>

   
    <div class="row justify-center q-mt-md">
      <q-btn label="Edit Profile" color="primary" icon="edit" @click="editUser(user)" />
    </div>

  
    <q-dialog v-model="editDialog" persistent>
      <q-card style="min-width: 400px;">
        <q-card-section class="q-gutter-md">
          <div class="text-h6 text-primary">✏️ Edit Profile</div>

          <q-input v-model="editUserData.fullName" label="Full Name" filled />
          <q-input v-model="editUserData.email" label="Email" filled />
          <q-input v-model="editUserData.phone" label="Phone" filled />

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

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Save" color="positive" @click="saveUserEdit" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { useUserStore } from 'stores/user'

export default {
  name: 'AdminProfile',
  data() {
    return {
      isPwdVisible: false,
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
    }
  }
}
</script>
